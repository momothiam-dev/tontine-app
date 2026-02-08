# 🎬 ARCHITECTURE DU SYSTÈME VIDÉO

## 🏗️ Vue d'Ensemble

```
┌─────────────────────────────────────────────────────────────────┐
│                     APPLICATION TONTINE                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐         ┌──────────────────┐             │
│  │   VideoSection   │         │    Appelle:      │             │
│  │   (page.js)      │────────→│ DemoVideoPlayer  │             │
│  └──────────────────┘         └──────────────────┘             │
│           │                            │                       │
│           │                            │                       │
│           ▼                            ▼                       │
│  ┌──────────────────────────────────────────┐                  │
│  │       lib/videoConfig.js                 │                  │
│  │  (Configuration des vidéos)              │                  │
│  └──────────────────────────────────────────┘                  │
│    ├─ DEMO_VIDEOS_YOUTUBE  (3 IDs à remplacer)                 │
│    ├─ DEMO_VIDEOS_VIMEO    (3 IDs à remplacer)                 │
│    └─ DEMO_VIDEOS_LOCAL    (3 chemins à remplacer)             │
│                                                                 │
│  ┌──────────────────────────────────────────┐                  │
│  │     Choix de fonte vidéo:                │                  │
│  │  export const DEMO_VIDEOS =              │                  │
│  │    DEMO_VIDEOS_YOUTUBE; ← 1 ligne        │                  │
│  └──────────────────────────────────────────┘                  │
│           │                                                    │
│           │ (Source configurée)                               │
│           ▼                                                    │
│  ┌──────────────────────────────────────────┐                  │
│  │     DemoVideoPlayer.js                   │                  │
│  │  (Lecteur vidéo universel)               │                  │
│  └──────────────────────────────────────────┘                  │
│    ├─ Si YouTube: <iframe src="...">                           │
│    ├─ Si Vimeo: <iframe src="...">                             │
│    └─ Si Local: <video src="public/...">                       │
│                                                                 │
│  ┌──────────────────────────────────────────┐                  │
│  │     Utilisateur voit:                    │                  │
│  │  • Thumbnail avec icône play             │                  │
│  │  • Modal au clic                         │                  │
│  │  • Vidéo en plein écran                  │                  │
│  │  • Fermenture (ESC ou bouton)            │                  │
│  └──────────────────────────────────────────┘                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 3 ARCHITECTURES SUPPORTÉES

### 1️⃣ ARCHITECTURE YOUTUBE (Recommandée)

```
Flux:
User (YouTube)
    ↓
Enregistre 4 vidéos (OBS)
    ↓
Upload sur YouTube.com
    ↓
Copie ID vidéo (ex: dQw4w9WgXcQ)
    ↓
Colle dans lib/videoConfig.js
    ↓
DemoVideoPlayer génère:
<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ">
    ↓
Utilisateur clique sur thumbnail
    ↓
Modal s'ouvre avec vidéo YouTube

Avantages:
✓ Gratuit
✓ Hébergement inclus
✓ Pas de dépendance serveur
✓ Partageable
✓ Statistiques d'engagement
✓ Qualité auto-adaptée

Fichiers affectés:
- lib/videoConfig.js (DEMO_VIDEOS_YOUTUBE)
- Aucun changement de composant
- Aucun stockage local requis
```

---

### 2️⃣ ARCHITECTURE VIMEO

```
Flux:
User (Vimeo)
    ↓
Enregistre 4 vidéos (OBS)
    ↓
Upload sur Vimeo.com
    ↓
Copie ID vidéo (ex: 123456789)
    ↓
Colle dans lib/videoConfig.js
    ↓
DemoVideoPlayer génère:
<iframe src="https://player.vimeo.com/video/123456789">
    ↓
Modal avec vidéo Vimeo

Avantages:
✓ Qualité supérieure
✓ Lecteur personnalisable
✓ Contrôle plus granulaire
✗ 5 vidéos max en gratuit (upgrade nécessaire après)
✗ Limite de bande passante

Fichiers affectés:
- lib/videoConfig.js (DEMO_VIDEOS_VIMEO)
- Aucun changement de composant
```

---

### 3️⃣ ARCHITECTURE LOCAL (Fichiers publics)

```
Flux:
User (Serveur local)
    ↓
Enregistre 4 vidéos (OBS)
    ↓
Crée: public/videos/
    ↓
Place: public/videos/demo-1.mp4, demo-2.mp4, etc.
    ↓
Crée: public/videos/thumbnails/
    ↓
Place: public/videos/thumbnails/thumb-1.jpg, etc.
    ↓
Colle URL dans lib/videoConfig.js
    ↓
DemoVideoPlayer génère:
<video src="/videos/demo-1.mp4">
    ↓
Modal avec lecteur vidéo HTML5

Arborescence:
public/
├── videos/
│   ├── demo-1.mp4
│   ├── demo-2.mp4
│   ├── demo-3.mp4
│   ├── demo-4.mp4
│   └── thumbnails/
│       ├── thumb-1.jpg
│       ├── thumb-2.jpg
│       ├── thumb-3.jpg
│       └── thumb-4.jpg
└── ...

Avantages:
✓ Zéro dépendance externe
✓ Fonctionne hors-ligne
✓ Latence ultra-basse
✓ Contrôle total
✗ Stocke sur votre serveur (taille disque)
✗ Bande passante affectée

Fichiers affectés:
- lib/videoConfig.js (DEMO_VIDEOS_LOCAL)
- public/videos/ (créer + ajouter MP4)
- public/videos/thumbnails/ (créer + ajouter JPG)
```

---

## 🔄 FLUX DE DONNÉES DÉTAILLÉ

### VideoSection.js → DemoVideoPlayer.js

```javascript
// VideoSection.js (app/components/VideoSection.js)
import { DEMO_VIDEOS } from "@/lib/videoConfig";
import DemoVideoPlayer from "@/app/components/DemoVideoPlayer";

<DemoVideoPlayer
  videoSource={DEMO_VIDEOS[0].source} // "https://youtu.be/XXX"
  videoType={DEMO_VIDEOS[0].type} // "youtube"
  title={DEMO_VIDEOS[0].title} // "Comment créer une tontine"
  thumbnail={DEMO_VIDEOS[0].thumbnail} // "data:image/..."
/>;
```

### DemoVideoPlayer.js → Rendu Dynamique

```javascript
// DemoVideoPlayer.js (app/components/DemoVideoPlayer.js)
const [showModal, setShowModal] = useState(false);

// Rendu basé sur videoType:
if (videoType === "youtube") {
  return <iframe src={`https://www.youtube.com/embed/${videoSource}`} />;
} else if (videoType === "vimeo") {
  return <iframe src={`https://player.vimeo.com/video/${videoSource}`} />;
} else if (videoType === "local") {
  return <video src={videoSource} controls />;
}
```

---

## 📝 CONFIGURATION COMPLÈTE

### lib/videoConfig.js - Structure

```javascript
// Configuration pour YouTube (par défaut)
export const DEMO_VIDEOS_YOUTUBE = [
  {
    id: 1,
    title: "Comment créer une tontine",
    description: "Tutoriel complet pour créer votre première tontine",
    source: "dQw4w9WgXcQ", // ← ID YouTube (remplacer)
    type: "youtube",
    icon: "👥",
    step: "Étape 1: Créer sa tontine",
    featured: true,
  },
  {
    id: 2,
    title: "Inviter des membres",
    description: "Ajouter vos amis et famille à la tontine",
    source: "9bZkp7q19f0", // ← ID YouTube (remplacer)
    type: "youtube",
    icon: "📨",
    step: "Étape 2: Inviter",
    featured: false,
  },
  // ... 2 vidéos supplémentaires
];

// Configuration pour Vimeo (optionnel)
export const DEMO_VIDEOS_VIMEO = [
  {
    source: "452537873", // ← ID Vimeo (remplacer)
    type: "vimeo",
    // ... mêmes autres propriétés
  },
];

// Configuration pour Local (optionnel)
export const DEMO_VIDEOS_LOCAL = [
  {
    source: "/videos/demo-1.mp4", // ← Chemin (remplacer)
    type: "local",
    // ... mêmes autres propriétés
  },
];

// ⭐ LIGNE CLÉE - Changez celle-ci pour changer de source
export const DEMO_VIDEOS = DEMO_VIDEOS_YOUTUBE;
// export const DEMO_VIDEOS = DEMO_VIDEOS_VIMEO;
// export const DEMO_VIDEOS = DEMO_VIDEOS_LOCAL;
```

---

## 🎯 POINTS D'INTÉGRATION

### Où les vidéos s'affichent

#### 1. Section Vidéos (Landing Page)

```
app/page.js
├── <VideoSection />
│   ├── Affiche 4 vidéos en grille
│   ├── Affiche 1 vidéo "featured" en 3D
│   └── Clic → Ouvre modal avec <DemoVideoPlayer />
```

#### 2. Dashboard (Futur)

```
app/dashboard/page.js
└── <DemoVideoPlayer
      videoSource={DEMO_VIDEOS[0].source}
      videoType={DEMO_VIDEOS[0].type}
      title="Bienvenue dans votre tontine"
    />
```

#### 3. Page FAQ (Futur)

```
app/faq/page.js
├── Q: "Comment ça marche ?"
└── A: <DemoVideoPlayer videoSource={...} />
```

---

## 🔐 SÉCURITÉ & PERFORMANCE

### YouTube

- ✅ HTTPS forcé (YouTube mandate HTTPS)
- ✅ Lecture contrôlée par YouTube (protection anti-piratage)
- ✅ CDN global (rapidité mondiale)
- ✅ Contrôle d'accès (Listée/Non-listée/Privée)

### Vimeo

- ✅ HTTPS forcé
- ✅ Contrôle granulaire des droits
- ✅ Webhooks disponibles
- ✅ Contrôle d'accès avancé

### Local

- ⚠️ Responsabilité du serveur
- ⚠️ Vérifier HTTPS en production
- ⚠️ Limiter par referer si souhaité
- ✅ Aucune dépendance tierce

---

## 📈 MÉTRIQUES & ANALYTICS

### YouTube

```
Tableau YouTube Studio:
├─ Vues (globales)
├─ Taux de rétention (% qui regardent jusqu'à la fin)
├─ Clics sortants
├─ Provenance du trafic
└─ Données démographiques des viewers
```

### Vimaid

```
Vimeo Analytics:
├─ Vues par vidéo
├─ Durée moyenne regardée
├─ Localisation
├─ Appareils utilisés
└─ Tendances dans le temps
```

### Local

```
Vous devez implémenter:
├─ Logs personnalisés
├─ Analytics via Mixpanel/Amplitude
├─ Suivi des clics vidéo
└─ Durée viewing
```

---

## 🐛 DÉBOGAGE

### Console Errors

```javascript
// Si vous voyez une erreur:
❌ "Cannot GET /videos/demo-1.mp4"
   → Fichier manquant in public/videos/
   → Solution: Placer le fichier

❌ "403 Forbidden (YouTube)"
   → Vidéo privée/supprimée
   → Solution: Faire "Non-listée" ou nouveau lien

❌ "CORS error (Vimeo)"
   → Referer non autorisé
   → Solution: Configurer les domaines dans Vimeo
```

### Vérification Configuration

```javascript
// Dans la console browser:
// 1. Importer la config
import { DEMO_VIDEOS } from '@/lib/videoConfig'

// 2. Vérifier les données
console.log(DEMO_VIDEOS)

// 3. Vérifier une vidéo
console.log(DEMO_VIDEOS[0])

// Output expected:
{
  id: 1,
  title: "...",
  source: "...", // ← Vérifier qu'il y a une valeur
  type: "youtube" // ← Vérifier le type
}
```

---

## 🚀 DÉPLOIEMENT

### Variables d'Environnement (Optionnel)

```bash
# .env.local (si vous voulez externaliser)
NEXT_PUBLIC_VIDEO_SOURCE_TYPE=youtube
NEXT_PUBLIC_VIDEO_API_KEY=your_key
```

### Vercel Deployment

```bash
# Tout fonctionne sur Vercel par défaut
# ✓ YouTube - Pas de config
# ✓ Vimeo - Pas de config
# ✓ Local - Les fichiers public/ sont inclus

# Déployer:
git add .
git commit -m "Add video system"
git push
# Vercel détecte automatiquement
```

### Docker Deployment

```dockerfile
# Si vous utilisez Docker:
FROM node:18-alpine

WORKDIR /app
COPY . .

# Les fichiers public/ sont inclus
RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

---

## 📞 SUPPORT ARCHITECTURE

### En Cas de Modification Ultérieure

**Ajouter une 5e vidéo:**

```javascript
// lib/videoConfig.js
export const DEMO_VIDEOS_YOUTUBE = [
  // ... 4 vidéos existantes
  {
    id: 5,
    title: "Nouvelle vidéo",
    source: "NEW_VIDEO_ID",
    type: "youtube",
    icon: "🎥",
    step: "Étape 5",
  },
];
```

**Changer de source globalement:**

```javascript
// Une seule ligne à changer:
// De:
export const DEMO_VIDEOS = DEMO_VIDEOS_YOUTUBE;
// À:
export const DEMO_VIDEOS = DEMO_VIDEOS_LOCAL;
// Tout le reste fonctionne automatiquement
```

**Ajouter des sous-titres:**

```javascript
// Dans DemoVideoPlayer.js:
<video controls>
  <source src={videoSource} type="video/mp4" />
  <track
    src="/videos/subtitles/fr-1.srt"
    kind="subtitles"
    srcLang="fr"
    label="Français"
  />
</video>
```

---

## ✅ CHECKLIST DÉPANNAGE

```
Vidéo ne s'affiche pas?
[ ] Fichier existe?
[ ] Chemin correct?
[ ] Format correct (MP4 pour local)?
[ ] Console error? (F12)

Iframe YouTube vide?
[ ] ID YouTube correct?
[ ] Pas d'espace avant/après?
[ ] Vidéo en "Non-listée" ou "Publique"?
[ ] Pas "Privée"?

Modal ne s'ouvre pas?
[ ] Composant importé?
[ ] Props passées?
[ ] État useState?
[ ] onClick sur le bon élément?

Performance faible?
[ ] Vidéo trop volumineuse? (> 100MB)
[ ] Résolution trop haute? (> 1080p)
[ ] Bitrate trop haut? (Réduire à 5Mbps)
[ ] Trop de vidéos simultanées?
```

---

## 🎓 PROCHAINES ÉTAPES RECOMMANDÉES

1. **Immédiat:** Choisir une option (YouTube recommandée)
2. **Enregistrement:** Suivre VIDEO_RECORDING_GUIDE.md
3. **Configuration:** Mettre à jour lib/videoConfig.js
4. **Teste:** npm run dev
5. **Déployer:** git push (Vercel)

---

**Système vidéo architecturalement solide et prêt pour la production! 🚀**
