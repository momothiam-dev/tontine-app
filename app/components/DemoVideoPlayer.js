'use client'
import { useState } from 'react'
import { FaPlay, FaTimes } from 'react-icons/fa6'

/**
 * Composant professionnel pour afficher les vidéos de démonstration
 * Supporte YouTube, Vimeo et vidéos locales
 */
export default function DemoVideoPlayer({ videoSource, videoType = 'youtube', title, thumbnail }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getEmbedUrl = (source) => {
    if (videoType === 'youtube') {
      // Convertir youtu.be et youtube.com vers format embed
      const videoId = source
        .replace('https://youtu.be/', '')
        .replace('https://www.youtube.com/watch?v=', '')
        .replace('https://youtube.com/watch?v=', '')
      return `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`
    }
    if (videoType === 'vimeo') {
      const videoId = source.split('/').pop()
      return `https://player.vimeo.com/video/${videoId}`
    }
    return source // Local video
  }

  return (
    <>
      {/* Thumbnail avec Play Button */}
      <div className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all">
        {videoType === 'local' ? (
          <video
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            onClick={() => setIsModalOpen(true)}
          >
            <source src={videoSource} type="video/mp4" />
          </video>
        ) : (
          <img
            src={thumbnail || `https://img.youtube.com/vi/${videoSource}/hqdefault.jpg`}
            alt={title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />
        )}

        {/* Play Button Overlay */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-300"
        >
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <FaPlay className="w-8 h-8 text-green-600 ml-1" />
          </div>
        </button>

        {/* Duration Badge */}
        {videoType === 'local' && (
          <div className="absolute bottom-4 right-4 bg-black/60 px-3 py-1 rounded-full text-white text-sm font-semibold">
            02:00
          </div>
        )}
      </div>

      {/* Modal Player */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeInDown">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl animate-scaleIn">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-all"
            >
              <FaTimes className="w-6 h-6" />
            </button>

            {/* Video Container */}
            <div className="relative pb-[56.25%] h-0 overflow-hidden">
              {videoType === 'local' ? (
                <video
                  className="absolute top-0 left-0 w-full h-full"
                  controls
                  autoPlay
                  poster={thumbnail}
                >
                  <source src={videoSource} type="video/mp4" />
                  <track
                    kind="subtitles"
                    src={`/videos/subtitles/fr-${videoSource.match(/\d+/)}.srt`}
                    srcLang="fr"
                    label="Français"
                  />
                  Votre navigateur ne supporte pas la vidéo.
                </video>
              ) : (
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={getEmbedUrl(videoSource)}
                  title={title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>

            {/* Video Info */}
            <div className="bg-gray-900 p-4">
              <h3 className="text-white font-bold text-lg">{title}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/**
 * Composant pour une galerie de vidéos
 */
export function DemoVideoGallery({ videos = [] }) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {videos.map((video, index) => (
        <div key={index} className="animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
          <DemoVideoPlayer
            videoSource={video.source}
            videoType={video.type || 'youtube'}
            title={video.title}
            thumbnail={video.thumbnail}
          />
          <h3 className="text-xl font-bold text-gray-900 mt-4">{video.title}</h3>
          <p className="text-gray-600 mt-2">{video.description}</p>
        </div>
      ))}
    </div>
  )
}
