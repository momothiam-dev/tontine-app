'use client'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaArrowRight } from 'react-icons/fa6'
import { useState } from 'react'

export default function FooterSection() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const footerLinks = [
    {
      title: "Produit",
      links: ["Fonctionnalités", "Tarification", "Sécurité", "Feuille de route"]
    },
    {
      title: "Ressources",
      links: ["Blog", "Guide complet", "Tutoriels vidéo", "API Documentation"]
    },
    {
      title: "Entreprise",
      links: ["À propos", "Carrières", "Nous contacter", "Partenaires"]
    },
    {
      title: "Légal",
      links: ["Conditions d'utilisation", "Politique de confidentialité", "Cookies", "RGPD"]
    }
  ]

  const socialLinks = [
    { icon: FaFacebook, name: "Facebook" },
    { icon: FaTwitter, name: "Twitter" },
    { icon: FaLinkedin, name: "LinkedIn" },
    { icon: FaInstagram, name: "Instagram" }
  ]

  return (
    <div className="bg-gray-900 text-gray-400 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      {/* Newsletter Section */}
      <div className="relative py-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Newsletter Content */}
            <div className="animate-slideInLeft">
              <h3 className="text-3xl font-bold text-white mb-4">
                Restez informé
              </h3>
              <p className="text-gray-400 mb-6">
                Recevez nos dernières actualités, tutoriels et offres exclusives directement dans votre boîte email.
              </p>
            </div>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="animate-slideInRight">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email"
                  className="flex-1 px-6 py-4 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-l-xl focus:outline-none focus:border-green-500 transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-r-xl font-bold hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                >
                  {subscribed ? "✓ Abonné" : "S'abonner"}
                  {!subscribed && <FaArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Footer Grid */}
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            {/* Brand Column */}
            <div className="md:col-span-1 animate-fadeInUp">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg font-bold">T</span>
                </div>
                <span className="text-xl font-bold text-white">TontineApp</span>
              </div>
              <p className="text-gray-500 text-sm mb-6">
                La plateforme de gestion d'épargne collective la plus simple et sécurisée.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={index}
                      href="#"
                      className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
                      title={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Links Columns */}
            {footerLinks.map((column, index) => (
              <div key={index} className="animate-fadeInUp" style={{animationDelay: `${(index + 1) * 0.1}s`}}>
                <h4 className="font-bold text-white mb-6">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-gray-500 text-sm">
                © 2026 TontineApp. Tous droits réservés.
              </p>
              <div className="flex items-center gap-6">
                <span className="text-sm text-gray-500">Paiements sécurisés par</span>
                <div className="flex gap-3">
                  <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center text-xs font-bold text-gray-400">
                    💳
                  </div>
                  <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center text-xs font-bold text-gray-400">
                    🔒
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Decorations */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500 opacity-5 rounded-full filter blur-3xl"></div>
    </div>
  )
}
