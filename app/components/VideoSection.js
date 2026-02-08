'use client'
import { useState } from 'react'
import { FaPlay } from 'react-icons/fa6'

export default function VideoSection() {
  const [playing, setPlaying] = useState(null)

  const videos = [
    {
      id: 1,
      title: "Comment créer une tontine",
      description: "Apprenez à créer votre première tontine en 2 minutes",
      thumbnail: "bg-gradient-to-br from-blue-400 to-blue-600",
      icon: "📝",
      steps: ["Cliquez sur 'Créer'", "Remplissez les détails", "Invitez vos amis"]
    },
    {
      id: 2,
      title: "Inviter des membres",
      description: "Ajoutez facilement vos amis à votre tontine",
      thumbnail: "bg-gradient-to-br from-purple-400 to-purple-600",
      icon: "👥",
      steps: ["Partager le lien unique", "Envoyer par email", "Suivre les acceptations"]
    },
    {
      id: 3,
      title: "Gérer les paiements",
      description: "Enregistrez et suivez tous les paiements en temps réel",
      thumbnail: "bg-gradient-to-br from-pink-400 to-pink-600",
      icon: "💳",
      steps: ["Enregistrer un paiement", "Vue d'ensemble claire", "Historique complet"]
    },
    {
      id: 4,
      title: "Recevoir des rappels",
      description: "Configurez des notifications automatiques pour les échéances",
      thumbnail: "bg-gradient-to-br from-green-400 to-green-600",
      icon: "🔔",
      steps: ["Rappels 3 jours avant", "Notification le jour J", "Jamais oublier un paiement"]
    }
  ]

  return (
    <div id="videos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full text-orange-700 text-sm font-medium mb-6">
            📚 Tutoriels Video
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Démonstrations pas à pas
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Regardez ces courtes vidéos pour maîtriser TontineApp en quelques minutes
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {videos.map((video, index) => (
            <div 
              key={video.id}
              className="group animate-fadeInUp"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="relative h-48 rounded-xl overflow-hidden mb-4 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                {/* Thumbnail */}
                <div className={`absolute inset-0 ${video.thumbnail} opacity-90`}></div>
                
                {/* Play Button */}
                <button
                  onClick={() => setPlaying(video.id)}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-all duration-300 group-hover:bg-black/30"
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    <FaPlay className="w-6 h-6 text-green-600 ml-1" />
                  </div>
                </button>

                {/* Icon */}
                <div className="absolute top-4 right-4 text-4xl">{video.icon}</div>

                {/* Duration */}
                <div className="absolute bottom-4 right-4 bg-black/60 px-3 py-1 rounded-full text-white text-sm font-semibold">
                  02:00
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                {video.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {video.description}
              </p>

              {/* Steps */}
              <div className="space-y-2">
                {video.steps.map((step, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-xs">
                      {i + 1}
                    </div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Large Featured Video */}
        <div className="relative h-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow animate-slideInUp">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-green-600 to-green-700"></div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}} />

          <div className="relative h-full flex flex-col md:flex-row items-center justify-between p-8 md:p-12">
            {/* Text Content */}
            <div className="flex-1 text-white mb-8 md:mb-0 animate-slideInLeft">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Voir la démo complète
              </h2>
              <p className="text-lg text-green-100 mb-8 max-w-xl">
                Regardez une démonstration complète de TontineApp et découvrez toutes ses fonctionnalités en action
              </p>
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:bg-green-50 hover:scale-105 transition-all duration-200">
                <FaPlay className="w-5 h-5" />
                Regarder la vidéo (5 min)
              </button>
            </div>

            {/* Illustration */}
            <div className="flex-1 flex justify-center animate-slideInRight">
              <div className="relative">
                <div className="w-32 h-32 bg-white/20 rounded-2xl transform rotate-45 animate-spin3d" style={{animationDuration: '4s'}}></div>
                <div className="absolute inset-0 w-32 h-32 bg-white/10 rounded-2xl transform -rotate-45 animate-spin3d" style={{animationDuration: '6s', animationDirection: 'reverse'}}></div>
                <div className="absolute inset-1/4 w-16 h-16 bg-white/30 rounded-xl flex items-center justify-center text-4xl">
                  ▶️
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
