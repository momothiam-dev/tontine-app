# 🎬 Configuration des Vidéos de Démonstration

## 📹 4 Vidéos Requises

### Vidéo 1: Créer une Tontine

```
Titre: Comment créer une tontine
Durée: 2 minutes
Type: Tutoriel écran partagé
```

### Vidéo 2: Inviter des Membres

```
Titre: Inviter des membres
Durée: 2 minutes
Type: Tutoriel écran partagé
```

### Vidéo 3: Gérer les Paiements

```
Titre: Gérer les paiements
Durée: 2 minutes
Type: Tutoriel écran partagé
```

### Vidéo 4: Recevoir des Rappels

```
Titre: Recevoir des rappels
Durée: 2 minutes
Type: Tutoriel écran partagé
```

---

## 🎯 Options de Stockage

### Option A: YouTube (GRATUIT & SIMPLE)

✅ Gratuit
✅ Hébergement fiable
✅ Format embed simple
❌ Nécessite un compte YouTube

**Procédure:**

1. Créez une chaîne YouTube
2. Uploadez les 4 vidéos (modo "Non listée")
3. Copyez les IDs vidéo
4. Collez dans le fichier de config

### Option B: Vimeo (GRATUIT PLAN)

✅ Gratuit pour 5 vidéos
✅ Qualité supérieure
✅ Contrôle total
❌ Compte requis

**Procédure:**

1. Créez un compte Vimeo
2. Uploadez les vidéos
3. Copiez les IDs
4. Utilisez dans la config

### Option C: Stockage Local (AUCUN COÛT)

✅ Complètement gratuit
✅ Contrôle total
✅ Sans dépendances externes
❌ Doit servir les fichiers soi-même

**Procédure:**

1. Créez: `public/videos/`
2. Placez les fichiers `.mp4` dedans
3. Référencez dans la config

---

## 🔧 Configuration dans le Code

### Fichier de Configuration: `lib/videoConfig.js`

```javascript
// Option A: YouTube
export const DEMO_VIDEOS = [
  {
    id: 1,
    title: "Comment créer une tontine",
    description: "Apprenez à créer votre première tontine en 2 minutes",
    source: "https://youtu.be/VIDEO_ID_1",
    type: "youtube",
    thumbnail: "https://img.youtube.com/vi/VIDEO_ID_1/hqdefault.jpg",
  },
  // ... 3 autres
];

// Option B: Vimeo
export const DEMO_VIDEOS = [
  {
    id: 1,
    title: "Comment créer une tontine",
    description: "...",
    source: "https://vimeo.com/VIMEO_ID_1",
    type: "vimeo",
  },
  // ... 3 autres
];

// Option C: Local
export const DEMO_VIDEOS = [
  {
    id: 1,
    title: "Comment créer une tontine",
    description: "...",
    source: "/videos/demo-1-creer-tontine.mp4",
    type: "local",
    thumbnail: "/videos/thumbnails/demo-1.jpg",
  },
  // ... 3 autres
];
```

---

## 📺 Utilisation dans VideoSection.js

Modifiez `app/components/VideoSection.js`:

```javascript
import { DEMO_VIDEOS } from "@/lib/videoConfig";
import DemoVideoPlayer, { DemoVideoGallery } from "./DemoVideoPlayer";

export default function VideoSection() {
  return (
    <div id="videos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Démonstrations pas à pas
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Regardez ces courtes vidéos pour maîtriser TontineApp
          </p>
        </div>

        {/* Galerie de vidéos */}
        <DemoVideoGallery videos={DEMO_VIDEOS.slice(0, 4)} />

        {/* Vidéo vedette */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Voir la démo complète (5 min)
          </h3>
          {DEMO_VIDEOS[4] && (
            <DemoVideoPlayer
              videoSource={DEMO_VIDEOS[4].source}
              videoType={DEMO_VIDEOS[4].type}
              title={DEMO_VIDEOS[4].title}
              thumbnail={DEMO_VIDEOS[4].thumbnail}
            />
          )}
        </div>
      </div>
    </div>
  );
}
```

---

## 🌐 Création Rapide des Vidéos YouTube

### Étape 1: Enregistrer avec OBS Studio

1. Téléchargez OBS: https://obsproject.com
2. Configurez la capture d'écran
3. Enregistrez chaque vidéo (2 minutes)
4. Fichiers générés: `demo-1.mp4`, `demo-2.mp4`, etc.

### Étape 2: Édition Basique (Optionnel)

Outils gratuits:

- DaVinci Resolve (gratuit): https://davinciresolve.com
- Adobe Express (gratuit): https://www.adobe.com/express
- Shotcut (gratuit): https://shotcut.org

Actions à faire:

- Couper les parties inutiles
- Ajouter une intro (3 secondes)
- Ajouter une outro (3 secondes)
- Ajouter les sous-titres

### Étape 3: Upload YouTube

1. Allez sur https://youtube.com
2. Cliquez "Uploader"
3. Sélectionnez le fichier video
4. Remplissez:
   - Titre (ex: "TontineApp - Créer une tontine")
   - Description (copiez depuis DEMO_VIDEOS)
   - Tag: "TontineApp, tutoriel"
   - Visibilité: "Non listée"
5. Publiez
6. Copiez l'ID vidéo (dans l'URL: `youtube.com/watch?v=XXXXX`)

### Étape 4: Mettez à Jour le Config

```javascript
// lib/videoConfig.js
{
  source: "https://youtu.be/XXXXX",  // Remplacez XXXXX
  // ...
}
```

---

## 📝 Script d'Upload Automatisé (Avancé)

Créez `scripts/youtube-upload.js`:

```javascript
const { google } = require("googleapis");
const fs = require("fs");

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

async function uploadVideo(filePath, title, description) {
  try {
    const response = await youtube.videos.insert({
      part: ["snippet", "status"],
      requestBody: {
        snippet: {
          title,
          description,
          tags: ["TontineApp", "tutoriel", "épargne"],
        },
        status: {
          privacyStatus: "unlisted",
        },
      },
      media: {
        body: fs.createReadStream(filePath),
      },
    });

    console.log(`✓ Video uploadé: ${response.data.id}`);
    return response.data.id;
  } catch (error) {
    console.error("Erreur upload:", error);
  }
}

// Utilisation
uploadVideo(
  "demo-1.mp4",
  "TontineApp - Créer une tontine",
  "Apprenez à créer votre première tontine...",
);
```

---

## 💾 Structure Locale (Option C)

Créez cette structure:

```
public/
├── videos/
│   ├── demo-1-creer-tontine.mp4
│   ├── demo-2-inviter-membres.mp4
│   ├── demo-3-gerer-paiements.mp4
│   ├── demo-4-rappels.mp4
│   ├── demo-5-complete.mp4
│   ├── thumbnails/
│   │   ├── demo-1.jpg
│   │   ├── demo-2.jpg
│   │   ├── demo-3.jpg
│   │   ├── demo-4.jpg
│   │   └── demo-5.jpg
│   └── subtitles/
│       ├── fr-1.srt
│       ├── fr-2.srt
│       ├── fr-3.srt
│       └── fr-4.srt
```

---

## 🎬 Résumé des Actions

```
☐ Enregistrer 4 vidéos (OBS Studio)   → 20 minutes
☐ Éditer si besoin                     → 10 minutes
☐ Uploader vers YouTube/Vimeo         → 10 minutes
☐ Copier les IDs vidéo               → 5 minutes
☐ Mettre à jour videoConfig.js        → 5 minutes
☐ Tester dans l'app                   → 5 minutes
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL: ~55 minutes
```

---

## 🎯 Recommandation

**Utilisez YouTube (Option A)** car:
✅ Plus simple
✅ Entièrement gratuit
✅ Qualité garantie
✅ Statistiques de vue
✅ Partage facile

**Temps total:** ~40 minutes

---

**Besoin d'aide? Consultez `VIDEO_RECORDING_GUIDE.md` ! 🎬**
