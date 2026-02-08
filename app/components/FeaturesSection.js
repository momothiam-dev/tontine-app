'use client'
import { FaCheck, FaBell, FaMobileScreen, FaLock, FaUserGroup, FaChartBar, FaClock, FaShieldHalved, FaLightbulb } from 'react-icons/fa6'
import { useState } from 'react'

export default function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const mainFeatures = [
    {
      icon: FaCheck,
      title: "100% Transparent",
      description: "Chaque membre voit en temps réel qui a payé, qui doit payer et l'historique complet des transactions.",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-white",
      borderColor: "border-green-100 hover:border-green-300",
    },
    {
      icon: FaBell,
      title: "Rappels automatiques",
      description: "Recevez des notifications par email 3 jours avant et le jour de l'échéance. Plus besoin de relancer.",
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-white",
      borderColor: "border-orange-100 hover:border-orange-300",
    },
    {
      icon: FaMobileScreen,
      title: "Mobile-first",
      description: "Accessible partout, sur tous vos appareils. Interface optimisée pour smartphone et tablette.",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-white",
      borderColor: "border-blue-100 hover:border-blue-300",
    },
    {
      icon: FaLock,
      title: "Sécurisé",
      description: "Vos données sont protégées avec un cryptage de niveau bancaire. Confidentialité garantie.",
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-white",
      borderColor: "border-purple-100 hover:border-purple-300",
    },
    {
      icon: FaUserGroup,
      title: "Collaboratif",
      description: "Invitez facilement vos proches par email ou lien. Gestion simplifiée pour les administrateurs.",
      color: "from-pink-500 to-pink-600",
      bgColor: "from-pink-50 to-white",
      borderColor: "border-pink-100 hover:border-pink-300",
    },
    {
      icon: FaChartBar,
      title: "Statistiques",
      description: "Suivez l'évolution de vos tontines avec des rapports détaillés et des graphiques clairs.",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "from-yellow-50 to-white",
      borderColor: "border-yellow-100 hover:border-yellow-300",
    },
  ]

  const advancedFeatures = [
    {
      icon: FaClock,
      title: "Gestion des échéances",
      description: "Planifiez et suivez automatiquement les cycles de paiement de votre tontine."
    },
    {
      icon: FaShieldHalved,
      title: "Contrôle d'accès",
      description: "Définir les rôles et permissions pour chaque membre du groupe."
    },
    {
      icon: FaLightbulb,
      title: "Suggestions intelligentes",
      description: "Recommandations basées sur vos données pour optimiser votre épargne."
    },
  ]

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-6">
            ✨ Fonctionnalités Complètes
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une solution complète et intuitive pour gérer vos tontines en toute simplicité
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {mainFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative p-8 bg-gradient-to-br ${feature.bgColor} rounded-2xl border-2 ${feature.borderColor} hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer animate-fadeInUp`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Background Glow */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 rounded-full filter blur-3xl transition-all duration-300`}></div>

                {/* Icon */}
                <div className={`relative w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-white`}>
                  <Icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <h3 className="relative text-xl font-bold text-gray-900 mb-3 group-hover:text-gradient">
                  {feature.title}
                </h3>
                <p className="relative text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </p>

                {/* Hover Indicator */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-orange-400 rounded-full w-0 group-hover:w-full transition-all duration-300"></div>
              </div>
            )
          })}
        </div>

        {/* Advanced Features */}
        <div className="bg-gradient-to-r from-green-50 to-orange-50 rounded-3xl p-12 border-2 border-green-100 animate-slideInUp">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Fonctionnalités Avancées 🚀
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {advancedFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div 
                  key={index}
                  className="flex flex-col items-center text-center p-6 bg-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fadeInUp"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <Icon className="w-12 h-12 text-green-600 mb-4" />
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-20 animate-slideInUp">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Pourquoi choisir TontineApp ?
          </h3>
          
          <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* Column 1 */}
              <div className="p-8 border-r border-gray-200 hover:bg-green-50 transition-colors">
                <h4 className="font-bold text-gray-900 mb-4">❌ Avant</h4>
                <ul className="space-y-3 text-gray-600 text-sm">
                  <li>Calculs manuels complexes</li>
                  <li>Oublis de paiements fréquents</li>
                  <li>Manque de transparence</li>
                  <li>Documents éparpillés</li>
                  <li>Gestion chronophage</li>
                </ul>
              </div>

              {/* Column 2 - Middle */}
              <div className="p-8 bg-gradient-to-b from-green-50 to-transparent border-r border-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-3">✨</div>
                  <p className="font-bold text-green-600">TontineApp</p>
                </div>
              </div>

              {/* Column 3 */}
              <div className="p-8 hover:bg-green-50 transition-colors">
                <h4 className="font-bold text-gray-900 mb-4">✅ Maintenant</h4>
                <ul className="space-y-3 text-gray-600 text-sm">
                  <li>Automatisation complète</li>
                  <li>Rappels intelligents</li>
                  <li>Traçabilité totale</li>
                  <li>Données centralisées</li>
                  <li>Gestion 100% en ligne</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
