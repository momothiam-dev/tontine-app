# 🎨 Guide de Personnalisation - Exemples Pratiques

Ce fichier contient des exemples de comment personnaliser facilement les composants de votre application.

---

## 1️⃣ Changer les Couleurs Principales

### Exemple : Passer du Vert/Orange au Violet/Rose

**Fichier**: `app/tailwind.config.mjs`

```javascript
// Avant
bg-gradient-to-r from-green-600 to-green-500

// Après
bg-gradient-to-r from-purple-600 to-purple-500
```

### Remplacer partout en une fois

Utilisez **Ctrl+H** (Find and Replace)

- Chercher: `green-`
- Remplacer par: `purple-`

---

## 2️⃣ Ajouter Un Nouveau Témoignage

**Fichier**: `app/components/Testimonials.js`

```javascript
const testimonials = [
  // ... témoignages existants ...
  {
    name: "Votre Nom",
    role: "Votre Rôle",
    avatar: "👨‍💻", // Changer l'emoji
    rating: 5,
    text: "Votre texte de témoignage ici...",
    city: "Votre Ville, Pays",
  },
];
```

---

## 3️⃣ Modifier Les Plans de Tarification

**Fichier**: `app/components/PricingPlans.js`

```javascript
const plans = [
  {
    name: "Gratuit",
    price: "0",
    description: "Pour une petite tontine",
    features: [
      { name: "Jusqu'à 5 membres", included: true },
      // Ajoutez plus de features ici
    ],
    emoji: "🌱",
    cta: "Commencer gratuit",
    highlighted: false,
  },
  // ... autres plans ...
];
```

### Changer une feature d'un plan

```javascript
// Pour désactiver une feature
{ name: "Rapport d'activité", included: false },

// Pour activer une feature
{ name: "Rapport d'activité", included: true },
```

---

## 4️⃣ Ajouter Une Nouvelle Section Design

Voici un composant template à copier et adapter:

**Créez** : `app/components/MyNewSection.js`

```javascript
"use client";

export default function MyNewSection() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Mon Titre
          </h2>
          <p className="text-xl text-gray-600">Ma description</p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 bg-gradient-to-br from-green-50 to-white rounded-2xl border-2 border-green-100 hover:shadow-xl transition-all animate-fadeInUp">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Mon Item</h3>
            <p className="text-gray-600">Contenu de mon item</p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

Puis ajoutez-le dans `app/page.js` :

```javascript
import MyNewSection from "./components/MyNewSection";

export default function Home() {
  return (
    <div>
      {/* ... autres sections ... */}
      <MyNewSection />
    </div>
  );
}
```

---

## 5️⃣ Personnaliser Les Animations

**Fichier**: `app/tailwind.config.mjs`

### Changer la duration d'une animation

```javascript
// Dans keyframes, modifiez la valeur de la fonction
animation: {
  // Change de 7s à 5s
  blob: "blob 5s infinite",  // ← changez 7s en 5s
}
```

### Rendre une animation plus rapide

```javascript
// Ajouter un nouveau keyframe personnalisé
keyframes: {
  fastSlide: {
    "0%": { transform: "translateX(-30px)", opacity: "0" },
    "100%": { transform: "translateX(0)", opacity: "1" },
  }
}

// Puis utiliser :
animation: {
  fastSlide: "fastSlide 0.3s ease-out",  // 0.3s au lieu de 0.6s
}
```

---

## 6️⃣ Ajouter Des Vidéos Personnalisées

**Fichier**: `app/components/VideoSection.js`

```javascript
const videos = [
  {
    id: 1,
    title: "Comment créer une tontine",
    description: "Apprenez à créer votre première tontine en 2 minutes",
    thumbnail: "bg-gradient-to-br from-blue-400 to-blue-600",
    icon: "📝",
    steps: [
      "Cliquez sur 'Créer'",
      "Remplissez les détails",
      "Invitez vos amis",
    ],
  },
  // ← Ajoutez vos vidéos ici
  {
    id: 5,
    title: "Ma Nouvelle Vidéo",
    description: "Une description intéressante",
    thumbnail: "bg-gradient-to-br from-indigo-400 to-indigo-600",
    icon: "🎬",
    steps: ["Étape 1", "Étape 2", "Étape 3"],
  },
];
```

Et dans `app/components/VideoModal.js`, ajoutez l'URL :

```javascript
const getVideoEmbed = (id) => {
  const videoUrls = {
    1: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    2: "https://www.youtube.com/embed/9bZkp7q19f0",
    3: "https://www.youtube.com/embed/jNQXAC9IVRw",
    4: "https://www.youtube.com/embed/OPf0YbXqDm0",
    5: "https://www.youtube.com/embed/VOTRE_VIDEO_ID", // ← Ajoutez ici
  };
  return videoUrls[id] || "";
};
```

---

## 7️⃣ Changements de Statistiques

**Fichier**: `app/components/AnimatedStats.js`

```javascript
const stats = [
  {
    value: 1000, // ← Changez le nombre
    label: "Tontines", // ← Changez le label
    icon: "📊", // ← Changez l'emoji
    color: "from-blue-400 to-blue-600", // ← Couleur
    suffix: "", // Ajoutez + ou % si nécessaire
  },
];
```

---

## 8️⃣ Modifier Le Hero Section

**Fichier**: `app/components/HeroSection.js`

### Changer le texte principal

```javascript
h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
  Gérez vos tontines
  <span className="block bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent animate-fadeInUp">
    simplement et en ligne  {/* ← Changez ce texte */}
  </span>
</h1>
```

### Changer la description

```javascript
<p className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
  Votre nouveau texte ici
</p>
```

### Changer les statistiques

```javascript
<div className="mt-8 grid grid-cols-3 gap-4">
  <div className="text-center p-4 bg-white rounded-xl">
    <div className="text-2xl font-bold text-green-600">1000+</div>{" "}
    {/* ← Changez */}
    <div className="text-xs text-gray-600 mt-1">Nouveau label</div>{" "}
    {/* ← Changez */}
  </div>
</div>
```

---

## 9️⃣ Ajouter Une Fonctionnalité Nueva

**Fichier**: `app/components/FeaturesSection.js`

```javascript
// Ajouter à mainFeatures
{
  icon: FaLightbulb,  // Changez l'icône
  title: "Ma Nouvelle Feature",
  description: "Description de ma feature",
  color: "from-teal-500 to-teal-600",
  bgColor: "from-teal-50 to-white",
  borderColor: "border-teal-100 hover:border-teal-300",
},
```

Assurez-vous d'importer l'icône:

```javascript
import { FaLightbulb } from "react-icons/fa6"; // ← Ajoutez
```

---

## 🔟 Styles CSS Personnalisés

**Fichier**: `app/globals.css`

```css
/* Ajouter une nouvelle animation personnalisée */
@keyframes myCustomAnimation {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Ajouter une classe utilitaire */
.my-custom-style {
  @apply p-8 bg-gradient-to-br from-indigo-50 to-white rounded-2xl shadow-lg transition-all;
}
```

Ensuite utiliser:

```javascript
<div className="my-custom-style hover:shadow-2xl">Contenu</div>
```

---

## 🎯 Checklist de Personnalisation

- [ ] Changer le logo/emoji
- [ ] Adapter les couleurs primaires
- [ ] Mettre à jour les textes de description
- [ ] Ajouter vos propres témoignages
- [ ] Adapter les plans de tarification
- [ ] Ajouter vos vidéos YouTube
- [ ] Mettre à jour les statistiques
- [ ] Personnaliser les fonctionnalités
- [ ] Tester sur mobile
- [ ] Déployer sur Vercel

---

## 🚀 Déployer Vos Changements

```bash
# Tester localement
npm run dev

# Vérifier qu'il n'y a pas d'erreurs
npm run lint

# Créer une version production
npm run build

# Si tout est bon, déployer
git add .
git commit -m "Mise à jour design personnalisé"
git push origin main
```

---

**Vous êtes maintenant prêt à personnaliser votre application ! 🎨**
