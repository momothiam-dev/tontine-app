// app/invite/[id]/page.js
'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useParams, useRouter } from 'next/navigation'

export default function InvitePage() {
  const { id } = useParams()
  const router = useRouter()
  const [tontine, setTontine] = useState(null)
  const [user, setUser] = useState(null)
  const [alreadyMember, setAlreadyMember] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const { data: tontineData } = await supabase
        .from('tontines')
        .select('*')
        .eq('id', id)
        .single()
      setTontine(tontineData)

      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data } = await supabase
          .from('membres_tontine')
          .select('*')
          .eq('tontine_id', id)
          .eq('user_id', user.id)
          .single()
        
        setAlreadyMember(!!data)
      }
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  const joinTontine = async () => {
    if (!user) {
      alert('Tu dois d\'abord te connecter !')
      router.push('/auth')
      return
    }

    try {
      const { count } = await supabase
        .from('membres_tontine')
        .select('*', { count: 'exact', head: true })
        .eq('tontine_id', id)

      if (count >= tontine.nb_membres) {
        alert('Désolé, cette tontine est complète !')
        return
      }

      const { error } = await supabase
        .from('membres_tontine')
        .insert({
          tontine_id: id,
          user_id: user.id,
          role: 'membre',
          position: count + 1
        })

      if (error) throw error

      alert('🎉 Tu as rejoint la tontine !')
      router.push(`/tontines/${id}`)
      
    } catch (error) {
      alert('Erreur : ' + error.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-orange-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-green-600"></div>
          <p className="mt-4 text-gray-600 font-medium">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!tontine) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-red-50 p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invitation invalide</h2>
          <p className="text-gray-600 mb-6">Cette invitation n'existe pas ou a expiré.</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>

      {/* Invitation Card */}
      <div className="relative max-w-lg w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2 group">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-white text-2xl font-bold">T</span>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              TontineApp
            </span>
          </a>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-green-600 to-green-500 p-8 text-center text-white">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">Invitation Tontine</h1>
            <p className="text-green-100">Tu as été invité(e) à rejoindre une tontine</p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl mb-6 border-2 border-green-200">
              <h2 className="text-2xl font-bold text-green-900 mb-4">
                {tontine.nom}
              </h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 px-4 bg-white rounded-xl">
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">Cotisation</span>
                  </div>
                  <span className="font-bold text-green-600 text-lg">
                    {tontine.montant.toLocaleString()} FCFA
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 px-4 bg-white rounded-xl">
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">Périodicité</span>
                  </div>
                  <span className="font-bold text-gray-900 capitalize">
                    {tontine.periodicite === 'mensuel' ? 'Mensuelle' : 'Hebdomadaire'}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 px-4 bg-white rounded-xl">
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="font-medium">Membres</span>
                  </div>
                  <span className="font-bold text-gray-900">{tontine.nb_membres}</span>
                </div>

                <div className="flex items-center justify-between py-3 px-4 bg-white rounded-xl">
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="font-medium">Début</span>
                  </div>
                  <span className="font-bold text-gray-900">
                    {new Date(tontine.date_debut).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t-2 border-green-200">
                <div className="text-center">
                  <p className="text-sm text-green-700 mb-1">Tu recevras au total</p>
                  <p className="text-3xl font-bold text-green-600">
                    {(tontine.montant * tontine.nb_membres).toLocaleString()} FCFA
                  </p>
                </div>
              </div>
            </div>

            {alreadyMember ? (
              <div>
                <div className="bg-green-100 border-2 border-green-300 text-green-800 p-4 rounded-xl mb-4 text-center font-semibold flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  ✅ Tu es déjà membre de cette tontine
                </div>
                <button
                  onClick={() => router.push(`/tontines/${id}`)}
                  className="w-full py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                >
                  Voir la tontine
                </button>
              </div>
            ) : (
              <div>
                {user ? (
                  <button
                    onClick={joinTontine}
                    className="w-full py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Rejoindre cette tontine
                  </button>
                ) : (
                  <div>
                    <p className="text-sm text-gray-600 mb-4 text-center bg-yellow-50 border border-yellow-200 p-3 rounded-xl">
                      ⚠️ Tu dois d'abord créer un compte pour rejoindre la tontine
                    </p>
                    <button
                      onClick={() => router.push('/auth')}
                      className="w-full py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                    >
                      Se connecter / S'inscrire
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => router.push('/')}
              className="w-full mt-4 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              ← Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}