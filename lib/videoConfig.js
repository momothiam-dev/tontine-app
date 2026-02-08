// 🎬 Configuration des vidéos de démonstration
// À configurer selon votre choix: YouTube, Vimeo ou Local

/**
 * OPTION 1: YOUTUBE (RECOMMANDÉ)
 * Remplacez VIDEO_ID_X par vos véritables IDs YouTube
 * 
 * Procédure:
 * 1. Uploadez vos vidéos sur YouTube (mode non listé)
 * 2. Copiez l'ID depuis l'URL: youtube.com/watch?v=ID_ICI
 * 3. Remplacez ci-dessous
 */
export const DEMO_VIDEOS_YOUTUBE = [
  {
    id: 1,
    title: "Comment créer une tontine",
    description: "Apprenez à créer votre première tontine en 2 minutes",
    source: "https://youtu.be/dQw4w9WgXcQ",  // ← Remplacez l'ID
    type: "youtube",
    icon: "📝",
    steps: ["Remplissez les détails", "Créez la tontine", "Invitez vos amis"]
  },
  {
    id: 2,
    title: "Inviter des membres",
    description: "Ajoutez facilement vos amis à votre tontine",
    source: "https://youtu.be/9bZkp7q19f0",  // ← Remplacez l'ID
    type: "youtube",
    icon: "👥",
    steps: ["Partagez le lien unique", "Envoyez par email", "Suivez les acceptations"]
  },
  {
    id: 3,
    title: "Gérer les paiements",
    description: "Enregistrez et suivez tous les paiements en temps réel",
    source: "https://youtu.be/jNQXAC9IVRw",  // ← Remplacez l'ID
    type: "youtube",
    icon: "💳",
    steps: ["Enregistrez un paiement", "Vue d'ensemble claire", "Historique complet"]
  },
  {
    id: 4,
    title: "Recevoir des rappels",
    description: "Configurez des notifications automatiques pour les échéances",
    source: "https://youtu.be/OPf0YbXqDm0",  // ← Remplacez l'ID
    type: "youtube",
    icon: "🔔",
    steps: ["Rappels 3 jours avant", "Notification le jour J", "Jamais oublier un paiement"]
  },
  // Vidéo vedette bonus (démo complète)
  {
    id: 5,
    title: "Démo complète - 5 minutes",
    description: "Tour complet de TontineApp avec toutes les fonctionnalités",
    source: "https://youtu.be/dQw4w9WgXcQ",  // ← Remplacez l'ID
    type: "youtube",
    icon: "🎬",
    featured: true
  }
];

/**
 * OPTION 2: VIMEO
 * Remplacez VIMEO_ID_X par vos véritables IDs Vimeo
 * 
 * Procédure:
 * 1. Uploadez sur Vimeo
 * 2. Copiez l'ID depuis l'URL: vimeo.com/ID_ICI
 * 3. Remplacez ci-dessous
 */
export const DEMO_VIDEOS_VIMEO = [
  {
    id: 1,
    title: "Comment créer une tontine",
    description: "Apprenez à créer votre première tontine en 2 minutes",
    source: "https://vimeo.com/123456789",  // ← Remplacez l'ID
    type: "vimeo",
    icon: "📝",
    steps: ["Remplissez les détails", "Créez la tontine", "Invitez vos amis"]
  },
  {
    id: 2,
    title: "Inviter des membres",
    description: "Ajoutez facilement vos amis à votre tontine",
    source: "https://vimeo.com/123456790",  // ← Remplacez l'ID
    type: "vimeo",
    icon: "👥",
    steps: ["Partagez le lien unique", "Envoyez par email", "Suivez les acceptations"]
  },
  {
    id: 3,
    title: "Gérer les paiements",
    description: "Enregistrez et suivez tous les paiements en temps réel",
    source: "https://vimeo.com/123456791",  // ← Remplacez l'ID
    type: "vimeo",
    icon: "💳",
    steps: ["Enregistrez un paiement", "Vue d'ensemble claire", "Historique complet"]
  },
  {
    id: 4,
    title: "Recevoir des rappels",
    description: "Configurez des notifications automatiques pour les échéances",
    source: "https://vimeo.com/123456792",  // ← Remplacez l'ID
    type: "vimeo",
    icon: "🔔",
    steps: ["Rappels 3 jours avant", "Notification le jour J", "Jamais oublier un paiement"]
  }
];

/**
 * OPTION 3: STOCKAGE LOCAL (public/videos/)
 * Fichiers MP4 dans public/videos/
 * 
 * Procédure:
 * 1. Créez: public/videos/demo-1.mp4, etc.
 * 2. Créez: public/videos/thumbnails/demo-1.jpg
 * 3. Utilisez cette config
 */
export const DEMO_VIDEOS_LOCAL = [
  {
    id: 1,
    title: "Comment créer une tontine",
    description: "Apprenez à créer votre première tontine en 2 minutes",
    source: "/videos/demo-1-creer-tontine.mp4",
    type: "local",
    thumbnail: "/videos/thumbnails/demo-1.jpg",
    icon: "📝",
    steps: ["Remplissez les détails", "Créez la tontine", "Invitez vos amis"]
  },
  {
    id: 2,
    title: "Inviter des membres",
    description: "Ajoutez facilement vos amis à votre tontine",
    source: "/videos/demo-2-inviter-membres.mp4",
    type: "local",
    thumbnail: "/videos/thumbnails/demo-2.jpg",
    icon: "👥",
    steps: ["Partagez le lien unique", "Envoyez par email", "Suivez les acceptations"]
  },
  {
    id: 3,
    title: "Gérer les paiements",
    description: "Enregistrez et suivez tous les paiements en temps réel",
    source: "/videos/demo-3-gerer-paiements.mp4",
    type: "local",
    thumbnail: "/videos/thumbnails/demo-3.jpg",
    icon: "💳",
    steps: ["Enregistrez un paiement", "Vue d'ensemble claire", "Historique complet"]
  },
  {
    id: 4,
    title: "Recevoir des rappels",
    description: "Configurez des notifications automatiques pour les échéances",
    source: "/videos/demo-4-rappels.mp4",
    type: "local",
    thumbnail: "/videos/thumbnails/demo-4.jpg",
    icon: "🔔",
    steps: ["Rappels 3 jours avant", "Notification le jour J", "Jamais oublier un paiement"]
  }
];

/**
 * CONFIGURATION ACTIVE
 * Choisissez une option:
 * - DEMO_VIDEOS_YOUTUBE (recommandé)
 * - DEMO_VIDEOS_VIMEO
 * - DEMO_VIDEOS_LOCAL
 */
export const DEMO_VIDEOS = DEMO_VIDEOS_YOUTUBE;

// Alias pour compatibilité
export default DEMO_VIDEOS;
