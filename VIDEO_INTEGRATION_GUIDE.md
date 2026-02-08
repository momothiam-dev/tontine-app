# 🎬 Guide Intégration - Vidéos de Démonstration

## 5 Minutes pour Intégrer les Vidéos

### Étape 1: Configurez vos vidéos (2 min)

**Fichier:** `lib/videoConfig.js`

```javascript
// Option A: YouTube (RECOMMANDÉ)
export const DEMO_VIDEOS = DEMO_VIDEOS_YOUTUBE;

// Remplacez les IDs vidéo:
// dQw4w9WgXcQ → Votre VIDEO_ID_1
// 9bZkp7q19f0 → Votre VIDEO_ID_2
// jNQXAC9IVRw → Votre VIDEO_ID_3
// OPf0YbXqDm0 → Votre VIDEO_ID_4
```

**Comment obtenir les IDs YouTube:**

1. Allez sur youtube.com
2. Cliquez "Uploader"
3. Uploadez vos vidéos
4. Pour chaque vidéo, allez sur la page de détails
5. L'URL ressemble à: `youtube.com/watch?v=XXXXX`
6. Copiez le `XXXXX` (28 caractères)

### Étape 2: Utilisez le composant (1 min)

**Dans VideoSection.js:**

```javascript
import { DEMO_VIDEOS } from "@/lib/videoConfig";
import DemoVideoPlayer from "./DemoVideoPlayer";

export default function VideoSection() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {DEMO_VIDEOS.map((video) => (
        <DemoVideoPlayer
          key={video.id}
          videoSource={video.source}
          videoType={video.type}
          title={video.title}
        />
      ))}
    </div>
  );
}
```

### Étape 3: Testez (2 min)

```bash
npm run dev
```

Ouvrez: `http://localhost:3000`

Cliquez sur une vidéo → Devrait s'ouvrir en modal ✅

---

## 📊 Comparaison des 3 Options

| Option      | Avantages              | Inconvénients             | Temps  |
| ----------- | ---------------------- | ------------------------- | ------ |
| **YouTube** | Gratuit, fiable, stats | Compte requis             | 30 min |
| **Vimeo**   | Qualité premium        | Limite 5 vidéos (gratuit) | 30 min |
| **Local**   | Contrôle total         | Doit servir               | 20 min |

---

## 🚀 Option A: YouTube - Mode Express

### 1. Enregistrer (10 min)

**Avec OBS Studio (gratuit):**

1. Téléchargez: https://obsproject.com
2. Ouvrez votre app: `npm run dev`
3. Lancez OBS
4. Sources → Ajouter → Capture d'écran
5. Appuyez sur "Commencer l'enregistrement"
6. Testez 2 minutes dans votre app
7. Appuyez sur "Arrêter"

**Fichier généré:** `C:\Users\Mettech\Videos\obs_*.mp4`

### 2. Uploader (10 min)

1. Allez sur https://youtube.com
2. Cliquez "Uploader" (en haut à droite)
3. Sélectionnez le fichier video
4. Remplissez:

   ```
   Titre: TontineApp - Comment créer une tontine
   Description:
   Apprenez à créer votre première tontine en 2 minutes.

   Rejoignez TontineApp: https://tontine-app.com

   Tags: TontineApp,tutoriel,épargne
   Visibilité: Non listée
   ```

5. Cliquez "Publier"
6. Attendez le traitement (2-5 min)
7. Copiez l'ID depuis l'URL

### 3. Configurer (5 min)

**Fichier:** `lib/videoConfig.js`

```javascript
{
  source: "https://youtu.be/VOTRE_ID_ICI",  // ← Collez ici
  type: "youtube"
}
```

### 4. Testez (5 min)

```bash
npm run dev
```

✅ **Vidéo fonctionne !**

---

## 💻 Option B: Local - Pour Développement

### 1. Créer le dossier

```bash
mkdir -p public/videos/thumbnails
```

### 2. Placer les fichiers

```
public/videos/
├── demo-1-creer-tontine.mp4
├── demo-2-inviter-membres.mp4
├── demo-3-gerer-paiements.mp4
├── demo-4-rappels.mp4
└── thumbnails/
    ├── demo-1.jpg
    ├── demo-2.jpg
    ├── demo-3.jpg
    └── demo-4.jpg
```

### 3. Configurer

**Fichier:** `lib/videoConfig.js`

```javascript
export const DEMO_VIDEOS = DEMO_VIDEOS_LOCAL;
```

### 4. Testez

```bash
npm run dev
```

---

## 🎬 Composant DemoVideoPlayer

### Props Disponibles

```javascript
<DemoVideoPlayer
  videoSource="URL ou chemin" // Requis
  videoType="youtube|vimeo|local" // Défaut: youtube
  title="Titre de la vidéo" // Optionnel
  thumbnail="URL image" // Optionnel
/>
```

### Exemple Complet

```javascript
import DemoVideoPlayer from "@/app/components/DemoVideoPlayer";

export default function Demo() {
  return (
    <DemoVideoPlayer
      videoSource="https://youtu.be/dQw4w9WgXcQ"
      videoType="youtube"
      title="Ma vidéo de démo"
      thumbnail="https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
    />
  );
}
```

---

## 📱 Galerie de Vidéos

Utilisez le composant `DemoVideoGallery`:

```javascript
import { DemoVideoGallery } from "@/app/components/DemoVideoPlayer";
import { DEMO_VIDEOS } from "@/lib/videoConfig";

export default function VideoSection() {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-16">Découvrez TontineApp</h2>
        <DemoVideoGallery videos={DEMO_VIDEOS} />
      </div>
    </div>
  );
}
```

---

## 🔍 Dépannage

### Problème: Vidéo YouTube ne s'affiche pas

```
✓ Vérifiez l'ID YouTube (28 caractères)
✓ Vérifiez que la vidéo n'est pas "Privée"
✓ Mettez-la en "Non listée" au lieu de "Publique"
```

### Problème: Vidéo local ne charge pas

```
✓ Vérifiez que le fichier existe dans public/videos/
✓ Vérifiez le chemin exact: /videos/demo-1.mp4
✓ Le fichier doit être en MP4 (H.264 video codec)
```

### Problème: Modal ne s'ouvre pas

```
✓ Vérifiez que DemoVideoPlayer est importé
✓ Vérifiez que videoType est correct
✓ Vérifiez la console pour les erreurs (F12)
```

---

## ✨ Améliorations Possibles

### Ajouter les sous-titres

```javascript
<track
  kind="subtitles"
  src="/videos/subtitles/fr-1.srt"
  srcLang="fr"
  label="Français"
/>
```

### Ajouter une playlist

```javascript
const PLAYLIST = DEMO_VIDEOS.slice(0, 4);

videos.map((video) => <DemoVideoPlayer key={video.id} {...video} />);
```

### Ajouter des statistiques

```javascript
const [viewCount, setViewCount] = useState(0);

useEffect(() => {
  // Charger depuis YouTube API ou DB
}, [videoSource]);
```

---

## 📊 Checklist Rapide

- [ ] Choisir Option A (YouTube), B (Vimeo) ou C (Local)
- [ ] Enregistrer/uploader 4 vidéos
- [ ] Copier les IDs vidéo/URLs
- [ ] Mettre à jour `lib/videoConfig.js`
- [ ] Vérifier que `videoType` est correct
- [ ] Tester avec `npm run dev`
- [ ] Cliquer sur une vidéo pour ouvrir le modal
- [ ] Vérifier son audio et qualité
- [ ] ✅ C'est bon !

---

## 🎯 Résumé

```
YouTube (Recommandé): 30 minutes total
Vimeo: 30 minutes total
Local: 20 minutes total

Intégration: 5 minutes
Total: 25-35 minutes
```

**Vous êtes prêt ! 🚀**
