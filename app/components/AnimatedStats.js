'use client'
import { useEffect, useState } from 'react'

const AnimatedCounter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = end / (duration / 50)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 50)
    return () => clearInterval(timer)
  }, [end, duration])

  return <span>{count.toLocaleString('fr-FR')}</span>
}

export default function AnimatedStats() {
  const stats = [
    {
      value: 500,
      label: "Tontines actives",
      icon: "📊",
      color: "from-blue-400 to-blue-600"
    },
    {
      value: 5000,
      label: "Utilisateurs satisfaits",
      icon: "👥",
      color: "from-green-400 to-green-600"
    },
    {
      value: 10000000,
      label: "FCFA sous gestion",
      icon: "💰",
      color: "from-orange-400 to-orange-600",
      suffix: "+"
    },
    {
      value: 98,
      label: "% de satisfaction",
      icon: "⭐",
      color: "from-yellow-400 to-yellow-600",
      suffix: "%"
    }
  ]

  return (
    <div className="py-24 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Les chiffres qui parlent
          </h2>
          <p className="text-xl text-gray-600">
            Rejoignez des milliers d'utilisateurs qui font confiance à TontineApp
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative p-8 bg-white rounded-2xl border-2 border-gray-100 hover:border-green-300 hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 animate-fadeInUp group overflow-hidden"
              style={{animationDelay: `${index * 0.15}s`}}
            >
              {/* Background Gradient */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 rounded-full filter blur-3xl transition-all duration-300`}></div>

              {/* Icon */}
              <div className="text-5xl mb-6 transform group-hover:scale-125 transition-transform duration-300">
                {stat.icon}
              </div>

              {/* Value */}
              <div className="relative">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter end={stat.value} />
                  {stat.suffix && <span>{stat.suffix}</span>}
                </div>

                {/* Label */}
                <p className="text-gray-600 font-medium">
                  {stat.label}
                </p>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-orange-400 w-0 group-hover:w-full transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Achievement Badges */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="relative p-6 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl border-2 border-purple-200 hover:shadow-lg transition-all text-center animate-slideInUp">
            <div className="text-4xl mb-3">🏆</div>
            <h4 className="font-bold text-gray-900 mb-1">Prix de l'Innovation</h4>
            <p className="text-sm text-gray-600">2025 - Meilleure App Fintech</p>
          </div>

          <div className="relative p-6 bg-gradient-to-br from-green-100 to-green-50 rounded-xl border-2 border-green-200 hover:shadow-lg transition-all text-center animate-slideInUp" style={{animationDelay: '0.1s'}}>
            <div className="text-4xl mb-3">🔒</div>
            <h4 className="font-bold text-gray-900 mb-1">Certifiée Sécurisée</h4>
            <p className="text-sm text-gray-600">Normes bancaires internationales</p>
          </div>

          <div className="relative p-6 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl border-2 border-orange-200 hover:shadow-lg transition-all text-center animate-slideInUp" style={{animationDelay: '0.2s'}}>
            <div className="text-4xl mb-3">📱</div>
            <h4 className="font-bold text-gray-900 mb-1">Disponible 24/7</h4>
            <p className="text-sm text-gray-600">Support client réactif</p>
          </div>
        </div>
      </div>
    </div>
  )
}
