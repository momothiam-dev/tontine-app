'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useParams, useRouter } from 'next/navigation'
import { calculateTourDates, shuffleArray } from '@/lib/helpers'
import { sendInvitationEmail, sendTonTourEmail, sendPaiementValideEmail } from '@/app/actions/emailActions'
import { emailTemplates } from '@/lib/email-templates'

export default function TontineDetail() {
  const { id } = useParams()
  const router = useRouter()
  
  // États
  const [tontine, setTontine] = useState(null)
  const [membres, setMembres] = useState([])
  const [tours, setTours] = useState([])
  const [paiements, setPaiements] = useState([])
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [inviteLink, setInviteLink] = useState('')
  const [showPaiementModal, setShowPaiementModal] = useState(false)
  const [reference, setReference] = useState('')
  const [loading, setLoading] = useState(true)
  const [emailInvite, setEmailInvite] = useState('')
  const [showEmailModal, setShowEmailModal] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (!user) {
        router.push('/auth')
        return
      }

      const { data: tontineData } = await supabase
        .from('tontines')
        .select('*')
        .eq('id', id)
        .single()
      setTontine(tontineData)

      const { data: membresData } = await supabase
        .from('membres_tontine')
        .select(`
          *,
          profile:user_id (
            id,
            nom,
            email
          )
        `)
        .eq('tontine_id', id)
        .order('position')
      
      setMembres(membresData || [])

      const meAdmin = membresData?.find(m => m.user_id === user.id && m.role === 'admin')
      setIsAdmin(!!meAdmin)

      const { data: toursData } = await supabase
        .from('tours')
        .select(`
          *,
          profile:beneficiaire_id (
            id,
            nom,
            email
          )
        `)
        .eq('tontine_id', id)
        .order('numero')
      
      setTours(toursData || [])

      if (toursData && toursData.length > 0) {
        const { data: paiementsData } = await supabase
          .from('paiements')
          .select(`
            *,
            profile:user_id (
              id,
              nom,
              email
            )
          `)
          .in('tour_id', toursData.map(t => t.id))

        setPaiements(paiementsData || [])
      }

      setInviteLink(`${window.location.origin}/invite/${id}`)

    } catch (error) {
      console.error('Erreur chargement:', error)
      alert('Erreur lors du chargement des données')
    } finally {
      setLoading(false)
    }
  }

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink)
    alert('✅ Lien copié dans le presse-papier !')
  }

  const inviterParEmail = async () => {
    if (!emailInvite.trim()) {
      alert('Entre un email valide !')
      return
    }

    try {
      const result = await sendInvitationEmail(
        emailInvite,
        tontine.nom,
        tontine.montant,
        tontine.periodicite,
        inviteLink
      )

      if (result.success) {
        alert('✅ Invitation envoyée par email !')
        setShowEmailModal(false)
        setEmailInvite('')
      } else {
        alert('❌ Erreur lors de l\'envoi de l\'email')
      }
    } catch (error) {
      alert('Erreur : ' + error.message)
    }
  }

  const lancerTours = async () => {
    if (!confirm('Es-tu sûr de lancer les tours ? Cette action est irréversible.')) {
      return
    }

    try {
      if (membres.length < tontine.nb_membres) {
        alert(`Il manque ${tontine.nb_membres - membres.length} membres !`)
        return
      }

      const tourDates = calculateTourDates(
        tontine.date_debut,
        tontine.periodicite,
        tontine.nb_membres
      )

      let ordredMembres = shuffleArray([...membres])

      const toursToInsert = tourDates.map((tour, index) => ({
        tontine_id: tontine.id,
        numero: tour.numero,
        beneficiaire_id: ordredMembres[index].user_id,
        date_limite: tour.date_limite,
        statut: index === 0 ? 'en_cours' : 'a_venir'
      }))

      const { error } = await supabase
        .from('tours')
        .insert(toursToInsert)

      if (error) throw error

      const premierBeneficiaire = ordredMembres[0]
      const result = await sendTonTourEmail(
        premierBeneficiaire.profile?.email,
        tontine.nom,
        tontine.montant * membres.length,
        new Date(tourDates[0].date_limite).toLocaleDateString('fr-FR')
      )

      if (!result.success) {
        console.error('Erreur envoi email:', result.error)
      }
    } catch (error) {
      alert('Erreur : ' + error.message)
    }
  }

  const marquerPaiement = async () => {
    if (!reference.trim()) {
      alert('Entre le numéro de transaction !')
      return
    }

    try {
      const tourEnCours = tours.find(t => t.statut === 'en_cours')
      
      if (!tourEnCours) {
        alert('Aucun tour en cours')
        return
      }

      const { error } = await supabase
        .from('paiements')
        .insert({
          tour_id: tourEnCours.id,
          user_id: user.id,
          montant: tontine.montant,
          reference: reference,
          valide: false
        })

      if (error) throw error

      alert('✅ Paiement enregistré ! En attente de validation.')
      setShowPaiementModal(false)
      setReference('')
      loadData()
      
    } catch (error) {
      alert('Erreur : ' + error.message)
    }
  }

  const validerPaiement = async (paiementId) => {
    if (!confirm('Valider ce paiement ?')) return

    try {
      const paiement = paiements.find(p => p.id === paiementId)
      const membre = membres.find(m => m.user_id === paiement.user_id)

      const { error } = await supabase
        .from('paiements')
        .update({ valide: true })
        .eq('id', paiementId)

      if (error) throw error

      const result = await sendPaiementValideEmail(
        membre.profile?.email,
        tontine.nom,
        paiement.montant
      )

      if (!result.success) {
        console.error('Erreur envoi email:', result.error)
      }

      alert('✅ Paiement validé ! Email envoyé.')
      loadData()
    } catch (error) {
      alert('Erreur : ' + error.message)
    }
  }

  const refuserPaiement = async (paiementId) => {
    if (!confirm('Refuser ce paiement ? Il sera supprimé.')) return

    const { error } = await supabase
      .from('paiements')
      .delete()
      .eq('id', paiementId)

    if (error) {
      alert('Erreur : ' + error.message)
      return
    }

    alert('Paiement refusé')
    loadData()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-green-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-green-600"></div>
          <p className="mt-4 text-gray-600 font-medium">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!tontine) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-green-50">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p className="text-xl text-gray-600 mb-4">Tontine non trouvée</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            Retour au dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour au dashboard
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{tontine.nom}</h1>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <div className="flex items-center gap-1.5 text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold">{tontine.montant.toLocaleString()} FCFA</span>
                </div>
                <span className="text-gray-400">•</span>
                <div className="flex items-center gap-1.5 text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="capitalize">{tontine.periodicite}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Carte invitation */}
        {isAdmin && membres.length < tontine.nb_membres && (
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6 mb-6 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-blue-900 mb-1">📨 Inviter des membres</h3>
                <p className="text-sm text-blue-700 mb-4">
                  Il manque encore <span className="font-bold">{tontine.nb_membres - membres.length} membre(s)</span> pour compléter la tontine
                </p>
                
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inviteLink}
                      readOnly
                      className="flex-1 px-4 py-2.5 bg-white border-2 border-blue-200 rounded-xl text-sm font-mono"
                    />
                    <button
                      onClick={copyInviteLink}
                      className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copier
                    </button>
                  </div>

                  <button
                    onClick={() => setShowEmailModal(true)}
                    className="w-full py-2.5 bg-white border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Inviter par email
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bouton lancer tours */}
        {isAdmin && membres.length === tontine.nb_membres && tours.length === 0 && (
          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-6 mb-6 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-green-900 mb-1">✅ Tous les membres sont là !</h3>
                <p className="text-sm text-green-700 mb-4">
                  Vous pouvez maintenant lancer les tours. Le calendrier sera généré automatiquement et l'ordre des bénéficiaires sera tiré au sort.
                </p>
                <button
                  onClick={lancerTours}
                  className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Lancer les tours
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Liste des membres */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Membres
            </h2>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-xl">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="font-bold text-green-700">{membres.length}/{tontine.nb_membres}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {membres.map((membre, index) => (
              <div
                key={membre.id}
                className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    {membre.profile?.nom || membre.profile?.email}
                  </p>
                  <p className="text-sm text-gray-500">
                    {membre.role === 'admin' ? '👑 Administrateur' : '👤 Membre'}
                  </p>
                </div>
                
                {tours.length > 0 && (
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Tour</p>
                    <p className="font-bold text-green-600">
                      #{tours.findIndex(t => t.beneficiaire_id === membre.user_id) + 1}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {membres.length < tontine.nb_membres && (
            <div className="mt-6 text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <p className="text-gray-600">
                En attente de <span className="font-bold">{tontine.nb_membres - membres.length} membre(s)</span>...
              </p>
            </div>
          )}
        </div>

        {/* Calendrier des tours */}
        {tours.length > 0 && (
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Calendrier des Tours
            </h2>
            
            <div className="space-y-4">
              {tours.map((tour) => {
                const paiementsTour = paiements.filter(p => p.tour_id === tour.id)
                const monPaiement = paiementsTour.find(p => p.user_id === user?.id)
                const tousPaye = paiementsTour.filter(p => p.valide).length === membres.length
                
                return (
                  <div
                    key={tour.id}
                    className={`rounded-2xl border-2 overflow-hidden transition-all ${
                      tour.statut === 'en_cours' 
                        ? 'border-green-300 bg-gradient-to-br from-green-50 to-green-100 shadow-lg' 
                        : tour.statut === 'termine'
                        ? 'border-gray-300 bg-gray-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    {/* En-tête du tour */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl font-bold text-gray-900">Tour #{tour.numero}</span>
                            {tour.statut === 'en_cours' && (
                              <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full animate-pulse">
                                EN COURS
                              </span>
                            )}
                            {tour.statut === 'termine' && (
                              <span className="px-3 py-1 bg-gray-600 text-white text-xs font-bold rounded-full">
                                TERMINÉ
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Bénéficiaire</p>
                              <p className="font-bold text-gray-900">
                                {tour.profile?.nom || tour.profile?.email}
                              </p>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Date limite : <span className="font-semibold">{new Date(tour.date_limite).toLocaleDateString('fr-FR', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}</span>
                          </p>
                        </div>
                        
                        <div className="text-right bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                          <p className="text-sm text-gray-600 mb-1">Montant à recevoir</p>
                          <p className="text-3xl font-bold text-green-600">
                            {(tontine.montant * membres.length).toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">FCFA</p>
                        </div>
                      </div>

                      {/* Section paiements */}
                      {tour.statut === 'en_cours' && (
                        <div className="mt-6 pt-6 border-t-2 border-white">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Paiements
                            </h4>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-gray-200">
                              <span className="font-bold text-green-600">{paiementsTour.filter(p => p.valide).length}</span>
                              <span className="text-gray-400">/</span>
                              <span className="font-bold text-gray-700">{membres.length}</span>
                            </div>
                          </div>

                          {tousPaye && (
                            <div className="mb-4 p-3 bg-green-600 text-white rounded-xl font-semibold text-center flex items-center justify-center gap-2">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              ✅ Tous les membres ont payé !
                            </div>
                          )}
                          
                          {/* Liste compacte des paiements */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                            {membres.map((membre) => {
                              const paiement = paiementsTour.find(p => p.user_id === membre.user_id)
                              
                              return (
                                <div 
                                  key={membre.id} 
                                  className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200"
                                >
                                  <span className="font-medium text-gray-900 text-sm">
                                    {membre.profile?.nom || membre.profile?.email?.split('@')[0]}
                                  </span>
                                  
                                  <div className="flex items-center gap-2">
                                    {paiement ? (
                                      <>
                                        {paiement.valide ? (
                                          <span className="flex items-center gap-1 text-green-600 font-semibold text-sm">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Validé
                                          </span>
                                        ) : (
                                          <>
                                            <span className="text-yellow-600 font-medium text-sm">⏳ En attente</span>
                                            {isAdmin && (
                                              <div className="flex gap-1">
                                                <button
                                                  onClick={() => validerPaiement(paiement.id)}
                                                  className="p-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                                  title="Valider"
                                                >
                                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                  </svg>
                                                </button>
                                                <button
                                                  onClick={() => refuserPaiement(paiement.id)}
                                                  className="p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                                  title="Refuser"
                                                >
                                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                  </svg>
                                                </button>
                                              </div>
                                            )}
                                          </>
                                        )}
                                      </>
                                    ) : (
                                      <span className="text-gray-400 text-sm">❌ Pas payé</span>
                                    )}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                          
                          {/* Actions membre */}
                          {!monPaiement && (
                            <button
                              onClick={() => setShowPaiementModal(true)}
                              className="w-full py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                            >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              J'ai payé mes {tontine.montant.toLocaleString()} FCFA
                            </button>
                          )}
                          
                          {monPaiement && (
                            <div className={`p-4 rounded-xl text-center font-semibold ${
                              monPaiement.valide 
                                ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                                : 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300'
                            }`}>
                              <div className="flex items-center justify-center gap-2 mb-1">
                                {monPaiement.valide ? (
                                  <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    ✅ Ton paiement est validé
                                  </>
                                ) : (
                                  <>
                                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    ⏳ En attente de validation par l'admin
                                  </>
                                )}
                              </div>
                              <div className="text-xs opacity-75 mt-2">
                                Référence : <span className="font-mono">{monPaiement.reference}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Message si pas de tours */}
        {tours.length === 0 && membres.length === tontine.nb_membres && !isAdmin && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-yellow-800 font-semibold text-lg">
              ⏳ En attente que l'administrateur lance les tours...
            </p>
          </div>
        )}
      </main>

      {/* Modal de paiement */}
      {showPaiementModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Confirmer mon paiement
              </h3>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl mb-6 border-2 border-green-200">
                <p className="text-sm text-green-700 mb-2 font-medium">Montant à payer</p>
                <p className="text-4xl font-bold text-green-600">
                  {tontine.montant.toLocaleString()} <span className="text-xl">FCFA</span>
                </p>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Numéro de transaction *
                </label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="Ex: OM123456789 ou WAVE987654"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none font-mono"
                  autoFocus
                />
                <p className="text-xs text-gray-500 mt-2 flex items-start gap-1.5">
                  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Entre le code de ta transaction Orange Money, Wave, MTN, etc.
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowPaiementModal(false)
                    setReference('')
                  }}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={marquerPaiement}
                  disabled={!reference.trim()}
                  className="flex-1 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal invitation email */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                Inviter par email
              </h3>
              
              <p className="text-sm text-gray-600 mb-6">
                La personne recevra un email avec un lien pour rejoindre la tontine.
              </p>
              
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email de la personne à inviter
                </label>
                <input
                  type="email"
                  value={emailInvite}
                  onChange={(e) => setEmailInvite(e.target.value)}
                  placeholder="exemple@email.com"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  autoFocus
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowEmailModal(false)
                    setEmailInvite('')
                  }}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={inviterParEmail}
                  disabled={!emailInvite.trim()}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Envoyer l'invitation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}