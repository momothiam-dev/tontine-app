# 📹 Guide Complet - Créer les Vidéos de Démonstration

## 🎬 3 Approches Disponibles

### ✅ Approche 1: SIMPLE (Recommandée) - OBS Studio GRATUIT

### ✅ Approche 2: AUTOMATISÉ - Script FFmpeg

### ✅ Approche 3: INTÉGRÉ - Vidéos Animées en Code

---

## 🎯 APPROCHE 1: OBS Studio (GRATUIT & FACILE)

### Installation

1. Téléchargez OBS Studio: https://obsproject.com/download
2. Installez-le
3. Lancez votre app: `npm run dev`
4. Ouvrez http://localhost:3000

### Enregistrement Vidéo #1: "Comment créer une tontine"

**Durée finale:** 2 minutes

**Contenu à filmer:**

```
00:00-00:15  Afficher la page d'accueil
             - Clic sur "Commencer gratuitement"

00:15-00:45  Remplir le formulaire d'inscription
             - Email: demo@tontine.com
             - Nom: Ma Tontine Test
             - Montant: 50,000 FCFA
             - Fréquence: Mensuel

00:45-01:15  Créer la tontine
             - Cliquez "Créer"
             - Montrez le dashboard

01:15-01:45  Inviter des membres
             - Copier le lien d'invitation
             - Afficher le code QR

01:45-02:00  Résumé
             - Montrez la tontine créée
             - Statistiques
```

### Étapes pour Enregistrer

1. **Ouvrir OBS Studio**
2. **Créer une Scène:**
   - Clic droit → Scènes → Créer
   - Nommez "TontineApp Demo"

3. **Ajouter Source:**
   - Clic droit Sources → Ajouter → Capture d'écran
   - Sélectionnez votre écran

4. **Paramètres d'Enregistrement:**
   - Format: MP4
   - Qualité: 1080p 60fps (ou 720p 30fps)
   - Bitrate: 5000-8000 kbps

5. **Lancez l'Enregistrement:**
   - Clic "Commencer l'enregistrement"
   - Performez votre démonstration
   - Clic "Arrêter l'enregistrement"

6. **Fichier Généré:**
   - Sera dans: `C:\Users\Mettech\Videos\`
   - Nom: `obs_*_*.mp4`

---

## 🎬 VIDÉO #2: "Inviter des membres"

**Durée finale:** 2 minutes

**Contenu à filmer:**

```
00:00-00:20  Dashboard de la tontine
             - Afficher les membres actuels
             - Montrer l'onglet "Membres"

00:20-00:40  Cliquer "Ajouter un membre"
             - Formulaire d'invitation

00:40-01:20  Remplir l'email et les détails
             - Email: ami@email.com
             - Rôle: Membre
             - Part: 50,000 FCFA

01:20-01:45  Envoyer l'invitation
             - Clic "Envoyer l'invitation"
             - Confirmation

01:45-02:00  Afficher la liste mise à jour
             - Nouveau membre en attente
             - Statut: "Invitation envoyée"
```

---

## 🎬 VIDÉO #3: "Gérer les paiements"

**Durée finale:** 2 minutes

**Contenu à filmer:**

```
00:00-00:20  Section Paiements
             - Afficher la liste des paiements
             - Vue d'ensemble

00:20-00:40  Enregistrer un nouveau paiement
             - Clic "Enregistrer un paiement"

00:40-01:10  Remplir les détails
             - Membre: Sélectionner
             - Montant: 50,000
             - Date: Aujourd'hui
             - Méthode: Virement

01:10-01:40  Confirmer le paiement
             - Clic "Enregistrer"
             - Afficher la confirmation

01:40-02:00  Historique mis à jour
             - Nouveau paiement visible
             - Totaux recalculés
```

---

## 🎬 VIDÉO #4: "Recevoir des rappels"

**Durée finale:** 2 minutes

**Contenu à filmer:**

```
00:00-00:20  Paramètres de la tontine
             - Allez aux Paramètres

00:20-00:50  Onglet "Notifications"
             - Afficher les différentes options
             - Rappels 3 jours avant: ✓
             - Rappels le jour J: ✓

00:50-01:20  Configurer les rappels
             - Choisir le type (Email, SMS)
             - Sélectionner l'heure
             - Ajouter un message personnalisé

01:20-01:45  Sauvegarder
             - Clic "Enregistrer les paramètres"
             - Confirmation

01:45-02:00  Résumé
             - Montrez que c'est activé
             - Animation de notification
```

---

## 🎫 SCRIPT DE SOUS-TITRES (SRT)

Créez `videos/subtitles_1_fr.srt`:

```srt
1
00:00:00,000 --> 00:00:05,000
Bienvenue dans TontineApp

2
00:00:05,000 --> 00:00:10,000
Apprenez à créer votre première tontine en 2 minutes

3
00:00:10,000 --> 00:00:20,000
Commencez par cliquer sur "Commencer gratuitement"
```

---

## 📊 APPROCHE 2: Script FFmpeg AUTOMATISÉ

### Installation FFmpeg

```bash
# Sur Windows, à installer via chocolatey
choco install ffmpeg

# Ou télécharger: https://ffmpeg.org/download.html
```

### Script pour Générer une Vidéo de Démonstration

Créez `scripts/generate-demo-video.js`:

```javascript
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

// Générer une vidéo de démonstration avec FFmpeg
const generateDemoVideo = (outputPath) => {
  // Durée: 2 minutes
  const duration = 120;

  // Commande FFmpeg pour créer une vidéo test
  const cmd =
    `ffmpeg -f lavfi -i color=c=green:s=1920x1080:d=${duration} ` +
    `-f lavfi -i sine=f=1000:d=${duration} ` +
    `-pix_fmt yuv420p ` +
    `-vf "drawtext=text='TontineApp - Démo':fontsize=60:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2" ` +
    `${outputPath}`;

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    console.log(`✓ Vidéo créée: ${outputPath}`);
  });
};

// Utilisation
generateDemoVideo("public/videos/demo-1.mp4");
```

Lancez:

```bash
node scripts/generate-demo-video.js
```

---

## 🎨 APPROCHE 3: Vidéos Animées en Code (INTÉGRÉ)

Créez `app/components/AnimatedDemoVideo.js`:

```javascript
"use client";
import { useEffect, useRef } from "react";

export default function AnimatedDemoVideo({ videoType = 1 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let frame = 0;
    const duration = 120 * 30; // 120 secondes à 30fps

    const draw = () => {
      // Fond dégradé
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height,
      );
      gradient.addColorStop(0, "#0f172a");
      gradient.addColorStop(1, "#1e293b");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Texte principal
      ctx.fillStyle = "#fff";
      ctx.font = "bold 48px Arial";
      ctx.textAlign = "center";

      switch (videoType) {
        case 1:
          ctx.fillText("Comment créer une tontine", canvas.width / 2, 100);
          drawCreationDemo(ctx, frame, canvas);
          break;
        case 2:
          ctx.fillText("Inviter des membres", canvas.width / 2, 100);
          drawInviteDemo(ctx, frame, canvas);
          break;
        case 3:
          ctx.fillText("Gérer les paiements", canvas.width / 2, 100);
          drawPaymentDemo(ctx, frame, canvas);
          break;
        case 4:
          ctx.fillText("Recevoir des rappels", canvas.width / 2, 100);
          drawReminderDemo(ctx, frame, canvas);
          break;
      }

      // Compteur de temps
      const seconds = Math.floor(frame / 30);
      const minutes = Math.floor(seconds / 60);
      const displaySeconds = seconds % 60;
      ctx.fillStyle = "#94a3b8";
      ctx.font = "24px Arial";
      ctx.textAlign = "right";
      ctx.fillText(
        `${minutes}:${displaySeconds.toString().padStart(2, "0")}`,
        canvas.width - 40,
        canvas.height - 40,
      );

      frame = (frame + 1) % duration;
      requestAnimationFrame(draw);
    };

    draw();
  }, [videoType]);

  return (
    <canvas
      ref={canvasRef}
      width={1920}
      height={1080}
      className="w-full rounded-lg shadow-lg"
    />
  );
}

// Animations de démonstration
function drawCreationDemo(ctx, frame, canvas) {
  const progress = (frame % 3600) / 3600; // Une minute complète

  // Animation des étapes
  const steps = [
    "Remplir les détails",
    "Créer la tontine",
    "Inviter des membres",
  ];
  steps.forEach((step, i) => {
    const y = 300 + i * 150;
    const opacity = Math.sin((progress + i * 0.3) * Math.PI) * 0.5 + 0.5;

    ctx.fillStyle = `rgba(34, 197, 94, ${opacity})`;
    ctx.fillRect(150, y, canvas.width - 300, 100);

    ctx.fillStyle = "#fff";
    ctx.font = "32px Arial";
    ctx.fillText(step, canvas.width / 2, y + 60);
  });
}

function drawInviteDemo(ctx, frame, canvas) {
  // Simulation d'une liste de membres
  const members = [
    { name: "Mariama", status: "Actif" },
    { name: "Moussa", status: "Actif" },
    { name: "Awa", status: "Invitation en attente" },
  ];

  members.forEach((member, i) => {
    const y = 300 + i * 120;
    const alpha = Math.sin(((frame + i * 10) / 30) * Math.PI) * 0.5 + 0.5;

    ctx.fillStyle = `rgba(100, 150, 255, ${alpha})`;
    ctx.fillRect(200, y, canvas.width - 400, 100);

    ctx.fillStyle = "#fff";
    ctx.font = "bold 28px Arial";
    ctx.textAlign = "left";
    ctx.fillText(member.name, 250, y + 35);
    ctx.font = "24px Arial";
    ctx.fillStyle = "#cbd5e1";
    ctx.fillText(member.status, 250, y + 70);
  });
}

function drawPaymentDemo(ctx, frame, canvas) {
  // Tableau de paiements animé
  const payments = [
    { user: "Mariama", amount: "50,000", status: "Payé" },
    { user: "Moussa", amount: "50,000", status: "Payé" },
    { user: "Awa", amount: "50,000", status: "En attente" },
  ];

  // En-têtes
  ctx.fillStyle = "#16a34a";
  ctx.fillRect(100, 250, canvas.width - 200, 60);

  ctx.fillStyle = "#fff";
  ctx.font = "bold 24px Arial";
  ctx.textAlign = "left";
  ctx.fillText("Membre", 150, 295);
  ctx.fillText("Montant", 650, 295);
  ctx.fillText("Statut", 1200, 295);

  // Lignes
  payments.forEach((payment, i) => {
    const y = 350 + i * 140;
    const animate = Math.sin((frame / 30) * Math.PI) * 0.3 + 0.7;

    ctx.fillStyle = `rgba(100, 200, 100, ${animate})`;
    ctx.fillRect(100, y, canvas.width - 200, 120);

    ctx.fillStyle = "#fff";
    ctx.font = "24px Arial";
    ctx.textAlign = "left";
    ctx.fillText(payment.user, 150, y + 60);
    ctx.fillText(payment.amount, 650, y + 60);
    ctx.fillText(payment.status, 1200, y + 60);
  });
}

function drawReminderDemo(ctx, frame, canvas) {
  // Afficher une notification de rappel animée
  const progress = (frame % 1800) / 1800;

  // Notification flottante
  const y = 300 + Math.sin(progress * Math.PI * 2) * 20;
  const scale = Math.sin(progress * Math.PI * 2) * 0.1 + 0.9;

  ctx.save();
  ctx.translate(canvas.width / 2, y);
  ctx.scale(scale, scale);
  ctx.translate(-canvas.width / 2, -y);

  ctx.fillStyle = "rgba(34, 197, 94, 0.9)";
  ctx.fillRect(canvas.width / 2 - 300, y, 600, 100);

  ctx.fillStyle = "#fff";
  ctx.font = "bold 28px Arial";
  ctx.textAlign = "center";
  ctx.fillText("🔔 Rappel de paiement", canvas.width / 2, y + 65);

  ctx.restore();
}
```

---

## 📁 Structure des Vidéos

Créez ce dossier:

```
public/
├── videos/
│   ├── demo-1-creer-tontine.mp4      (2 min)
│   ├── demo-2-inviter-membres.mp4    (2 min)
│   ├── demo-3-gerer-paiements.mp4    (2 min)
│   ├── demo-4-rappels.mp4            (2 min)
│   └── subtitles/
│       ├── fr-1.srt
│       ├── fr-2.srt
│       ├── fr-3.srt
│       └── fr-4.srt
```

---

## 🎬 Intégration dans VideoSection.js

Modifiez `app/components/VideoSection.js`:

```javascript
const getVideoUrl = (id) => {
  return `/videos/demo-${id}-*.mp4`;
  // Remplacez * par le nom réel
};

// Dans le composant :
<iframe
  src={`https://www.youtube.com/embed/${getVideoEmbed(videoId)}`}
  // OU
  src={getVideoUrl(videoId)}
/>;
```

---

## 🎯 Checklist Enregistrement

- [ ] **Vidéo 1:** Créer une tontine (2 min)
- [ ] **Vidéo 2:** Inviter des membres (2 min)
- [ ] **Vidéo 3:** Gérer les paiements (2 min)
- [ ] **Vidéo 4:** Recevoir des rappels (2 min)
- [ ] **Sous-titres:** Ajouter pour chaque vidéo
- [ ] **Vérification:** Tester la qualité (1080p, 60fps)
- [ ] **Upload:** Vers YouTube ou stockage local

---

## 💾 Options d'Hébergement

### Option 1: YouTube (GRATUIT)

```
1. Créez une chaîne YouTube
2. Uploadez les vidéos (non listées)
3. Obtenez l'ID vidéo
4. Remplacez dans VideoModal.js
```

### Option 2: Vimeo

```
1. Compte gratuit: https://vimeo.com
2. Uploadez les vidéos
3. Récupérez le code embed
```

### Option 3: Stockage Local

```
1. Sauvegardez dans public/videos/
2. Servir avec <video> tag
3. Inclure un lecteur HTML5
```

---

## 📝 Exemple Complet avec <video> Tag

Modifiez VideoSection.js pour utiliser `<video>`:

```javascript
<video
  width="100%"
  height="auto"
  controls
  poster="/videos/thumb-1.jpg"
  className="rounded-xl"
>
  <source src="/videos/demo-1.mp4" type="video/mp4" />
  <track
    kind="subtitles"
    src="/videos/subtitles/fr-1.srt"
    srcLang="fr"
    label="Français"
  />
  Votre navigateur ne supporte pas la vidéo.
</video>
```

---

## 🎬 Variables d'Environnement

Créez `.env.local`:

```env
# URLs des vidéos
NEXT_PUBLIC_VIDEO_1_URL=https://youtu.be/xxxxx
NEXT_PUBLIC_VIDEO_2_URL=https://youtu.be/yyyyy
NEXT_PUBLIC_VIDEO_3_URL=https://youtu.be/zzzzz
NEXT_PUBLIC_VIDEO_4_URL=https://youtu.be/aaaaa

# Ou locales
NEXT_PUBLIC_VIDEO_1_URL=/videos/demo-1.mp4
```

---

## 🚀 Résumé

**Méthode Recommandée:**

1. ✅ **OBS Studio** pour enregistrement facile
2. ✅ **YouTube** pour hébergement gratuit
3. ✅ **VideoSection.js** déjà prête pour intégration

**Durée Totale:**

- Enregistrement: ~20 minutes (4 vidéos)
- Post-production: ~10 minutes
- Upload: ~10 minutes
- **Total: ~40 minutes pour 4 vidéos**

---

**Bon enregistrement ! 🎬**
