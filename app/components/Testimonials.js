'use client'
import { FaStar } from 'react-icons/fa6'

export default function Testimonials() {
  const testimonials = [
    {
      name: "Mariama Sow",
      role: "Organisatrice tontine",
      avatar: "👩‍💼",
      rating: 5,
      text: "TontineApp a révolutionné la gestion de ma tontine. Plus de calculs fastidieux, tout est automatisé. Mes membres adorent !",
      city: "Dakar, Sénégal"
    },
    {
      name: "Moussa Diallo",
      role: "Membre tontine",
      avatar: "👨‍💼",
      rating: 5,
      text: "J'aime la transparence et les rappels automatiques. Je n'oublie jamais une échéance et je sais toujours où en est mon épargne.",
      city: "Abidjan, Côte d'Ivoire"
    },
    {
      name: "Awa Thiam",
      role: "Responsable de groupe",
      avatar: "👩‍🦰",
      rating: 5,
      text: "Avec 20 membres dans ma tontine, c'était un cauchemar avant. Maintenant, tout fonctionne comme sur des roulettes !",
      city: "Accra, Ghana"
    },
  ]

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full text-pink-700 text-sm font-medium mb-6">
            💬 Témoignages Clients
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Ce que disent nos utilisateurs
          </h2>
          <p className="text-xl text-gray-600">
            Ils nous font confiance. À votre tour ! 
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-8 bg-gradient-to-br from-green-50 to-white rounded-2xl border-2 border-green-100 hover:border-green-300 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 animate-fadeInUp"
              style={{animationDelay: `${index * 0.15}s`}}
            >
              {/* Quote Mark */}
              <div className="absolute top-4 right-6 text-4xl opacity-20">💬</div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 italic mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="border-t-2 border-green-100 pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-gray-500 mt-1">{testimonial.city}</p>
                  </div>
                </div>
              </div>

              {/* Accent Bar */}
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-orange-400 w-0 group-hover:w-full transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Rating Summary */}
        <div className="mt-16 bg-gradient-to-r from-green-50 to-orange-50 rounded-2xl p-12 border-2 border-green-100 animate-slideInUp">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="inline-flex items-baseline gap-2 text-6xl font-bold text-green-600">
                4.9
                <span className="text-2xl text-gray-600">/5</span>
              </div>
              <div className="flex justify-center gap-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mt-3">Note moyenne</p>
            </div>

            <div>
              <div className="text-4xl font-bold text-orange-600">98%</div>
              <p className="text-gray-600 mt-3">Clients satisfaits</p>
            </div>

            <div>
              <div className="text-4xl font-bold text-green-600">+1200</div>
              <p className="text-gray-600 mt-3">Avis positifs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
