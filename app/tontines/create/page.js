// app/tontines/create/page.js
'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function CreateTontine() {
  const [nom, setNom] = useState('')
  const [montant, setMontant] = useState('')
  const [periodicite, setPeriodicite] = useState('mensuel')
  const [nbMembres, setNbMembres] = useState('')
  const [dateDebut, setDateDebut] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()

      const { data: tontine, error } = await supabase
        .from('tontines')
        .insert({
          nom,
          montant: parseFloat(montant),
          periodicite,
          nb_membres: parseInt(nbMembres),
          date_debut: dateDebut,
          createur_id: user.id
        })
        .select()
        .single()

      if (error) throw error

      await supabase.from('membres_tontine').insert({
        tontine_id: tontine.id,
        user_id: user.id,
        role: 'admin',
        position: 1
      })

      router.push(`/tontines/${tontine.id}`)
      
    } catch (error) {
      alert('Erreur : ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour au dashboard
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Créer une nouvelle tontine
          </h1>
          <p className="text-lg text-gray-600">
            Remplissez les informations ci-dessous pour démarrer votre tontine
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nom de la tontine */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nom de la tontine *
              </label>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Ex: Tontine Famille Diop"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Choisissez un nom clair et reconnaissable par tous les membres
              </p>
            </div>

            {/* Montant */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Montant par cotisation (FCFA) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={montant}
                  onChange={(e) => setMontant(e.target.value)}
                  placeholder="10000"
                  min="1000"
                  step="1000"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                  required
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  FCFA
                </div>
              </div>
              {montant && (
                <p className="text-sm text-green-600 mt-2 font-medium">
                  💰 Cagnotte totale: {(parseInt(montant) * parseInt(nbMembres || 0)).toLocaleString()} FCFA
                </p>
              )}
            </div>

            {/* Périodicité */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Périodicité des paiements *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPeriodicite('hebdomadaire')}
                  className={`py-4 px-6 rounded-xl border-2 font-semibold transition-all ${
                    periodicite === 'hebdomadaire'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">📅</div>
                  Hebdomadaire
                </button>
                <button
                  type="button"
                  onClick={() => setPeriodicite('mensuel')}
                  className={`py-4 px-6 rounded-xl border-2 font-semibold transition-all ${
                    periodicite === 'mensuel'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">📆</div>
                  Mensuel
                </button>
              </div>
            </div>

            {/* Nombre de membres */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre de membres *
              </label>
              <input
                type="number"
                value={nbMembres}
                onChange={(e) => setNbMembres(e.target.value)}
                placeholder="10"
                min="2"
                max="100"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Minimum 2 membres, maximum 100 membres
              </p>
            </div>

            {/* Date de début */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date de début *
              </label>
              <input
                type="date"
                value={dateDebut}
                onChange={(e) => setDateDebut(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Date du premier paiement et début des tours
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">📋 Prochaines étapes :</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Invitez les membres via email ou lien</li>
                    <li>Attendez que tous les membres rejoignent</li>
                    <li>Lancez les tours automatiquement</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className="flex-1 py-3.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3.5 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Création...
                  </span>
                ) : (
                  'Créer la tontine'
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}