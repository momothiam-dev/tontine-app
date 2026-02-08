'use client'
import { FaArrowRight, FaPlay } from 'react-icons/fa6'

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-orange-50 pt-20">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }} />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-32">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-20 animate-fadeInDown">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
              <span className="text-white text-xl font-bold">T</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              TontineApp
            </span>
          </div>
          <a 
            href="/auth" 
            className="px-6 py-2.5 border-2 border-green-600 text-green-600 rounded-xl font-semibold hover:bg-green-600 hover:text-white hover:scale-105 transition-all duration-200"
          >
            Se connecter
          </a>
        </nav>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="animate-slideInLeft">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-6 animate-pulse2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Nouveau : Gestion automatique des rappels
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              Gérez vos tontines
              <span className="block bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent animate-fadeInUp">
                simplement et en ligne
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
              Terminé les calculs compliqués et les oublis. TontineApp automatise tout pour vous et votre groupe d'épargne collective.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <a 
                href="/auth" 
                className="group px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                Commencer gratuitement
                <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => document.getElementById('videos').scrollIntoView({ behavior: 'smooth' })}
                className="group px-8 py-4 bg-white border-2 border-green-200 text-gray-700 rounded-xl font-semibold text-lg hover:border-green-600 hover:text-green-600 hover:bg-green-50 transition-all duration-200 flex items-center gap-2"
              >
                <FaPlay className="w-5 h-5" />
                Voir comment ça marche
              </button>
            </div>
          </div>

          {/* Illustration Section */}
          <div className="animate-slideInRight">
            <div className="relative h-96 bg-gradient-to-br from-green-100 to-orange-100 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              {/* Animated Illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Main Circle Animation */}
                  <div className="absolute w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full opacity-80 animate-blob"></div>
                  <div className="absolute w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full opacity-80 animate-blob animation-delay-2000" style={{right: '10%'}}></div>
                  
                  {/* Floating Elements */}
                  <div className="absolute top-10 left-10 w-16 h-16 bg-yellow-400 rounded-lg opacity-60 animate-float" style={{animationDelay: '0s'}}></div>
                  <div className="absolute bottom-10 right-10 w-16 h-16 bg-purple-400 rounded-lg opacity-60 animate-float" style={{animationDelay: '1s'}}></div>
                  <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-pink-400 rounded-full opacity-60 animate-float" style={{animationDelay: '0.5s'}}></div>

                  {/* Center Icon */}
                  <div className="relative z-10 text-6xl animate-scaleIn">💰</div>
                </div>
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent"></div>
            </div>

            {/* Stats Below Illustration */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="text-2xl font-bold text-green-600">500+</div>
                <div className="text-xs text-gray-600 mt-1">Tontines</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="text-2xl font-bold text-green-600">5K+</div>
                <div className="text-xs text-gray-600 mt-1">Utilisateurs</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="text-2xl font-bold text-green-600">10M+</div>
                <div className="text-xs text-gray-600 mt-1">FCFA gérés</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
