'use client'
import { FaCheck } from 'react-icons/fa6'

export default function PricingPlans() {
  const plans = [
    {
      name: "Gratuit",
      price: "0",
      description: "Pour une petite tontine",
      features: [
        { name: "Jusqu'à 5 membres", included: true },
        { name: "1 tontine active", included: true },
        { name: "Rappels email", included: true },
        { name: "Statistiques basiques", included: true },
        { name: "Support par email", included: true },
        { name: "Rapport d'activité", included: false },
        { name: "Export avancé", included: false },
      ],
      emoji: "🌱",
      cta: "Commencer gratuit",
      highlighted: false
    },
    {
      name: "Pro",
      price: "9.99",
      description: "Pour les tontines plus importantes",
      features: [
        { name: "Jusqu'à 50 membres", included: true },
        { name: "Tontines illimitées", included: true },
        { name: "Rappels SMS + Email", included: true },
        { name: "Statistiques avancées", included: true },
        { name: "Support prioritaire 24/7", included: true },
        { name: "Rapport d'activité", included: true },
        { name: "Export PDF & Excel", included: true },
      ],
      emoji: "🚀",
      cta: "Essayer 30 jours gratuits",
      highlighted: true,
      badge: "POPULAIRE"
    },
    {
      name: "Entreprise",
      price: "Sur devis",
      description: "Pour les grandes organisations",
      features: [
        { name: "Membres illimités", included: true },
        { name: "Tontines illimitées", included: true },
        { name: "Tous les canaux (SMS/Email/Push)", included: true },
        { name: "API d'intégration", included: true },
        { name: "Support dédié 24/7", included: true },
        { name: "Rapports personnalisés", included: true },
        { name: "Configuration personnalisée", included: true },
      ],
      emoji: "⭐",
      cta: "Contacter un expert",
      highlighted: false
    }
  ]

  return (
    <div className="py-24 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-6">
            💳 Plans de Tarification
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Choisissez votre plan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transparent, simple et sans engagement. Cancellation anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 animate-fadeInUp ${
                plan.highlighted 
                  ? 'md:scale-105 border-2 border-green-500 bg-gradient-to-br from-green-50 to-white shadow-2xl' 
                  : 'border-2 border-gray-200 bg-white hover:shadow-xl'
              }`}
              style={{animationDelay: `${index * 0.15}s`}}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-1 rounded-bl-lg text-sm font-bold">
                  {plan.badge}
                </div>
              )}

              {/* Content */}
              <div className="p-10">
                {/* Icon */}
                <div className="text-6xl mb-4">{plan.emoji}</div>

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    {plan.price !== "Sur devis" && (
                      <>
                        <span className="text-gray-600">FCFA</span>
                        <span className="text-gray-600 text-sm">/mois</span>
                      </>
                    )}
                  </div>
                  {plan.name === "Pro" && (
                    <p className="text-green-600 text-sm mt-2 font-semibold">
                      Premier mois gratuit
                    </p>
                  )}
                </div>

                {/* CTA Button */}
                <button className={`w-full py-3 rounded-xl font-bold text-lg mb-8 transition-all duration-200 ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg hover:scale-105'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}>
                  {plan.cta}
                </button>

                {/* Features List */}
                <div className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        feature.included 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {feature.included ? (
                          <FaCheck className="w-3 h-3" />
                        ) : (
                          <span className="text-lg">×</span>
                        )}
                      </div>
                      <span className={`text-sm ${
                        feature.included 
                          ? 'text-gray-900 font-medium' 
                          : 'text-gray-400 line-through'
                      }`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-12 animate-slideInUp">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Questions fréquentes
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Puis-je changer de plan ?</h4>
              <p className="text-gray-600">Oui, vous pouvez passer à un plan supérieur ou inférieur à tout moment. Le changement prendra effet immédiatement.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Y a-t-il des frais cachés ?</h4>
              <p className="text-gray-600">Non, notre tarification est transparente. Aucun frais supplémentaire. Vous ne payez que ce que vous voyez.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Puis-je annuler mon abonnement ?</h4>
              <p className="text-gray-600">Oui, vous pouvez annuler à tout moment sans engagement. Aucune période de verrouillage.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Offrez-vous une garantie de remboursement ?</h4>
              <p className="text-gray-600">Oui, 30 jours de garantie remboursement 100% si vous n'êtes pas satisfait.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
