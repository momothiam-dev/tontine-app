'use client'
import { FaArrowRight, FaCreditCard, FaWandMagicSparkles } from 'react-icons/fa6'

export default function CTASection() {
  return (
    <div className="py-24 bg-gradient-to-r from-green-600 to-green-700 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="animate-slideInLeft">
            <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
              Prêt à transformer votre tontine ?
            </h2>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              Rejoignez des milliers d'utilisateurs qui ont simplifié leur gestion d'épargne collective. C'est gratuit, simple et sécurisé.
            </p>

            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3 text-white text-lg">
                <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                Sans frais cachés
              </div>
              <div className="flex items-center gap-3 text-white text-lg">
                <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                Création immédiate
              </div>
              <div className="flex items-center gap-3 text-white text-lg">
                <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                Support 24/7
              </div>
            </div>

            <a 
              href="/auth"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 group"
            >
              <span>Commencer maintenant</span>
              <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <p className="text-green-100 text-sm mt-6">
              📧 Ou recevez une démo personnalisée par email
            </p>
          </div>

          {/* Right Illustration */}
          <div className="relative h-96 animate-slideInRight">
            {/* Main Card */}
            <div className="absolute inset-0 bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
              {/* Card Content */}
              <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-green-50 to-orange-50">
                {/* Top Section */}
                <div className="mb-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-4xl mb-4 animate-bounce2">
                    💚
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Votre tontine
                  </h3>
                  <p className="text-gray-600 mt-2">gérée simplement</p>
                </div>

                {/* Features in Card */}
                <div className="space-y-4 w-full">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <FaCreditCard className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Paiements sécurisés</p>
                      <p className="text-xs text-gray-600">Niveau bancaire</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <FaWandMagicSparkles className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Automatisation</p>
                      <p className="text-xs text-gray-600">Calculs intelligents</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Element */}
                <div className="mt-8 text-center">
                  <p className="text-4xl mb-2">🎯</p>
                  <p className="text-green-600 font-bold">Résultat = Efficacité</p>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-400 rounded-full opacity-60 animate-float"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-400 rounded-full opacity-60 animate-float animation-delay-2000"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
