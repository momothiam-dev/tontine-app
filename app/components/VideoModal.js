'use client'
import { useState } from 'react'
import { FaPlay, FaTimes } from 'react-icons/fa6'

export default function VideoModal({ videoId, onClose }) {
  const getVideoEmbed = (id) => {
    const videoUrls = {
      1: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      2: "https://www.youtube.com/embed/9bZkp7q19f0",
      3: "https://www.youtube.com/embed/jNQXAC9IVRw",
      4: "https://www.youtube.com/embed/OPf0YbXqDm0",
    }
    return videoUrls[id] || ""
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeInDown">
      <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl animate-scaleIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-all"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        {/* Video Container */}
        <div className="relative pb-[56.25%] h-0 overflow-hidden">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={getVideoEmbed(videoId)}
            title="Video démonstration"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
