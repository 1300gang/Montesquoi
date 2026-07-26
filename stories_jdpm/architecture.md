# 🏗️ Architecture Technique - JDPM (Journées du Patrimoine et Matrimoine)

Ce document décrit l'**architecture technique** du projet **JDPM**, basé sur le site Montesquoi existant. Il inclut :
- La **structure des dossiers**.
- Les **flux utilisateur** (navigation entre les pages).
- Les **technologies utilisées**.
- Les **schémas de données** (état, sauvegarde).

---

## 📁 Structure des Dossiers

```
1300gang__Montesquoi/
├── css/                          # Styles CSS (modulaires)
│   ├── _variables.css           # Variables CSS globales (couleurs, polices, etc.)
│   ├── base.css                 # Reset CSS + styles de base (background, typographie)
│   ├── hub.css                  # Styles spécifiques au HUB
│   ├── game-base.css            # Styles communs à tous les jeux (header, footer, boutons)
│   ├── game-1.css               # Styles spécifiques au Jeu 1 (AR)
│   ├── game-2.css               # Styles spécifiques au Jeu 2 (NFC/QR)
│   ├── game-3.css               # Styles spécifiques au Jeu 3 (recherche d'image)
│   ├── game-4.css               # Styles spécifiques au Jeu 4 (énigme)
│   └── game-5.css               # Styles spécifiques au Jeu 5 (QCM)
│
├── js/                           # Scripts JavaScript
│   ├── state.js                 # Gestion de l'état global (fusion de state_jdpm.js)
│   ├── qr-scanner.js            # Module pour scanner les QR Codes (jsQR)
│   ├── service-worker.js        # Service Worker pour le mode hors ligne (PWA)
│   ├── translations.js          # Gestion des traductions (fr/en/es)
│   └── utils.js                 # Fonctions utilitaires (ex : normalisation de texte)
│
├── image/                        # Images et assets
│   ├── placeholders/            # Images placeholder (MAD, 1300gang, JPM)
│   │   ├── mad-logo.png         # Logo du MAD (placeholder)
│   │   ├── 1300gang-logo.png     # Logo 1300gang (placeholder)
│   │   └── jpm-logo.png         # Logo Journées du Patrimoine (placeholder)
│   ├── qr-targets/              # Images cibles pour le Jeu 2 (QR)
│   │   └── qr-target-1.png      # Exemple de QR code à scanner (placeholder)
│   └── qcm/                     # Images pour le QCM (Jeu 5)
│       ├── qcm-1.webp           # Image 1 (placeholder)
│       ├── qcm-2.webp           # Image 2 (placeholder)
│       ├── qcm-3.webp           # Image 3 (placeholder)
│       └── qcm-4.webp           # Image 4 (placeholder)
│
├── stories_jdpm/                # User Stories (ce dossier)
│   ├── architecture.md          # Ce fichier
│   ├── README.md                # Guide d'utilisation
│   ├── core/                    # Stories transverses
│   ├── hub/                     # Stories pour le HUB
│   ├── games/                   # Stories pour les jeux
│   └── shared/                  # Stories pour les éléments partagés
│
├── hub.html                     # Page centrale (HUB)
├── game-1.html                  # Jeu 1 : Réalité Augmentée (AR)
├── game-2.html                  # Jeu 2 : NFC/QR Code
├── game-3.html                  # Jeu 3 : Recherche d'image
├── game-4.html                  # Jeu 4 : Énigme
├── game-5.html                  # Jeu 5 : QCM
├── success.html                 # Page de réussite globale
├── manifest.json                # Manifest PWA pour le mode hors ligne
└── .gitignore                   # Fichiers à ignorer (ex : node_modules)
```

---

## 🗺️ Flux Utilisateur

### 1️⃣ **Flux Principal (HUB → Jeux → Réussite)**
```
┌───────────────────────────────────────────────────────────────────────────────┐
│                                                                               │
│   [HUB]                                                                       │
│   ┌───────────────────────────────────────────────────────────────────────┐   │
│   │  - Titre : "Journées du Patrimoine et Matrimoine"                     │   │
│   │  - Sous-titre : "Chasse aux énigmes au MAD"                            │   │
│   │  - Bouton QR géant : "Commencer l'aventure" (lien vers hub.html)       │   │
│   │  - Mention du lot : "Gagnez un livre sur le design !"                   │   │
│   │  - Sélecteur de langue : 🇫🇷 🇬🇧 🇪🇸                                      │   │
│   │  - 5 cartes de jeu (Jeu 1 à Jeu 5) avec :                              │   │
│   │    - Titre + logo du jeu                                                │   │
│   │    - État (✅ Résolu / ❌ Non résolu)                                   │   │
│   │    - Bouton "Info" (ouvre modal avec règles)                          │   │
│   │  - Barre de progression : "X/5 énigmes résolues"                      │   │
│   └───────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│                              ▼                                               │
│   ┌───────────────────────────────────────────────────────────────────────┐   │
│   │  [Jeu 1 : Réalité Augmentée]                                          │   │
│   │  ┌───────────────────────────────────────────────────────────────┐   │   │
│   │  │  - Header :                                                           │   │   │
│   │  │    - Bouton "Retour au HUB" (←)                                      │   │   │
│   │  │    - Titre : "Jeu 1 - Réalité Augmentée" + logo                     │   │   │
│   │  │    - Bouton "Info" (ⓘ)                                               │   │   │
│   │  │  - Contenu :                                                         │   │   │
│   │  │    - Caméra AR (MindAR.js)                                           │   │   │
│   │  │    - Instructions : "Pointez la caméra vers la cible"               │   │   │
│   │  │  - Footer :                                                          │   │   │
│   │  │    - Bouton "Activer la caméra"                                     │   │   │
│   │  └───────────────────────────────────────────────────────────────┘   │   │
│   │  - Validation :                                                         │   │
│   │    - Si cible détectée → Modal "Réussite !" + bouton "Retour au HUB"   │   │
│   │    - Sauvegarde : `localStorage.setItem('game_1_done', true)`          │   │
│   └───────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│   ┌───────────────────────────────────────────────────────────────────────┐   │
│   │  [Jeu 2 : NFC/QR Code]                                                 │   │
│   │  ┌───────────────────────────────────────────────────────────────┐   │   │
│   │  │  - Header : (identique aux autres jeux)                            │   │   │
│   │  │  - Contenu :                                                         │   │   │
│   │  │    - Bouton "Scanner NFC/QR"                                         │   │   │
│   │  │    - Modal QR :                                                      │   │   │
│   │  │      - Caméra en continu (jsQR)                                      │   │   │
│   │  │      - Bouton "Annuler"                                             │   │   │
│   │  │      - Détection automatique du QR code                             │   │   │
│   │  │  - Footer : (vide ou instructions)                                  │   │   │
│   │  └───────────────────────────────────────────────────────────────┘   │   │
│   │  - Validation :                                                         │   │
│   │    - Si QR code valide → Modal "Réussite !" + sauvegarde             │   │
│   └───────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│   ┌───────────────────────────────────────────────────────────────────────┐   │
│   │  [Jeu 3 : Recherche d'image]                                           │   │
│   │  ┌───────────────────────────────────────────────────────────────┐   │   │
│   │  │  - Header : (identique)                                              │   │   │
│   │  │  - Contenu :                                                         │   │   │
│   │  │    - Image d'un meuble de l'expo                                    │   │   │
│   │  │    - Question : "Quel est le nom de ce meuble ?"                     │   │   │
│   │  │    - Input pour la réponse                                           │   │   │
│   │  │  - Footer :                                                          │   │   │
│   │  │    - Bouton "Valider"                                                │   │   │
│   │  └───────────────────────────────────────────────────────────────┘   │   │
│   │  - Validation :                                                         │   │
│   │    - Si réponse correcte → Modal "Réussite !" + sauvegarde            │   │
│   └───────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│   ┌───────────────────────────────────────────────────────────────────────┐   │
│   │  [Jeu 4 : Énigme]                                                       │   │
│   │  ┌───────────────────────────────────────────────────────────────┐   │   │
│   │  │  - Header : (identique)                                              │   │   │
│   │  │  - Contenu :                                                         │   │   │
│   │  │    - Texte de l'énigme (ex : "Je suis un meuble du XVIIIème...")    │   │   │
│   │  │    - Bouton "Indice" (affiche un indice supplémentaire)               │   │   │
│   │  │    - Input pour la réponse                                           │   │   │
│   │  │  - Footer :                                                          │   │   │
│   │  │    - Bouton "Valider"                                                │   │   │
│   │  └───────────────────────────────────────────────────────────────┘   │   │
│   │  - Validation : (identique aux autres jeux)                            │   │
│   └───────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│   ┌───────────────────────────────────────────────────────────────────────┐   │
│   │  [Jeu 5 : QCM]                                                          │   │
│   │  ┌───────────────────────────────────────────────────────────────┐   │   │
│   │  │  - Header : (identique)                                              │   │   │
│   │  │  - Contenu :                                                         │   │   │
│   │  │    - Question : "Quel est le designer de ce meuble ?"                 │   │   │
│   │  │    - 4 cartes :                                                      │   │   │
│   │  │      - Carte 1 : Image (webp) + Titre                                │   │   │
│   │  │      - Carte 2 : Image (webp) + Titre                                │   │   │
│   │  │      - Carte 3 : Image (webp) + Titre                                │   │   │
│   │  │      - Carte 4 : Image (webp) + Titre                                │   │   │
│   │  │  - Footer : (vide)                                                   │   │   │
│   │  └───────────────────────────────────────────────────────────────┘   │   │
│   │  - Validation :                                                         │   │
│   │    - Si bonne réponse → Modal "Réussite !" + sauvegarde                │   │
│   └───────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│                              ▼                                               │
│   ┌───────────────────────────────────────────────────────────────────────┐   │
│   │  [Page de Réussite Globale : success.html]                              │   │
│   │  - Message : "Félicitations ! Vous avez résolu les 5 énigmes !"        │   │
│   │  - Badge virtuel (image statique)                                       │   │
│   │  - Bouton "Remplir le formulaire" :                                    │   │
│   │    - Message : "Vous allez être redirigé vers Google Form..."         │   │
│   │    - Redirection vers : `https://forms.gle/placeholder` (onglet externe)│   │
│   │  - Bouton "Retour au HUB"                                              │   │
│   └───────────────────────────────────────────────────────────────────────┘   │
│                                                                               │
└───────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔌 Technologies Utilisées

| **Catégorie**       | **Technologie**               | **Version** | **Usage**                                                                 | **Lien**                                                                 |
|---------------------|-------------------------------|-------------|---------------------------------------------------------------------------|--------------------------------------------------------------------------|
| **Frontend**        | HTML5                        | -           | Structure des pages                                                      | -                                                                        |
|                     | CSS3 (Vanilla)               | -           | Styles modulaires                                                        | -                                                                        |
|                     | JavaScript (Vanilla)          | ES6+        | Logique des jeux et interactions                                          | -                                                                        |
| **AR**             | MindAR.js                    | 1.2.5       | Réalité augmentée pour le Jeu 1                                          | [Lien](https://hiukim.github.io/mind-ar-js-doc/)                        |
|                     | A-Frame                      | 1.4.2       | Framework 3D pour MindAR                                                 | [Lien](https://aframe.io/)                                              |
| **QR Code**        | jsQR                         | -           | Détection des QR codes pour le Jeu 2                                     | [Lien](https://github.com/cozmo/jsQR)                                   |
| **PWA**            | Service Worker              | -           | Cache des assets pour le mode hors ligne                                | [MDN](https://developer.mozilla.org/fr/docs/Web/API/Service_Worker_API) |
| **État**           | localStorage                 | -           | Sauvegarde de la progression (jeux résolus)                              | -                                                                        |
| **Polices**         | Google Fonts (Baloo 2, Nunito)| -           | Typographie                                                             | [Lien](https://fonts.google.com/)                                       |

---

## 📊 Schéma de Données (État Global)

### 1️⃣ **`localStorage` (Sauvegarde de la progression)**
```json
{
  "jdpm_madd_state": {
    "game_1_done": false,  // Jeu 1 (AR) résolu ?
    "game_2_done": false,  // Jeu 2 (NFC/QR) résolu ?
    "game_3_done": false,  // Jeu 3 (Recherche d'image) résolu ?
    "game_4_done": false,  // Jeu 4 (Énigme) résolu ?
    "game_5_done": false   // Jeu 5 (QCM) résolu ?
  },
  "jdpm_visited": true,     // Premier visite ? (pour afficher la modale d'intro)
  "jdpm_lang": "fr"         // Langue sélectionnée (fr/en/es)
}
```

### 2️⃣ **Fichier `state.js` (Fonctions de gestion)**
```javascript
// Exemple de fonctions à implémenter
const JDPM_STATE_KEY = 'jdpm_madd_state';

function loadJdpmState() {
  // Charge l'état depuis localStorage
}

function saveJdpmState(state) {
  // Sauvegarde l'état dans localStorage
}

function markJdpmGameDone(gameId) {
  // Marque un jeu comme résolu (gameId: 1-5)
}

function resetJdpmState() {
  // Réinitialise toute la progression
}

function isAllGamesDone() {
  // Vérifie si les 5 jeux sont résolus
}
```

---

## 🌐 Intégration des Librairies Externes

### 1️⃣ **MindAR.js (Jeu 1 : AR)**
- **Intégration** : Via CDN ou téléchargement local (pour le hors ligne).
- **Fichiers nécessaires** :
  - `aframe.min.js` (A-Frame)
  - `mindar-image-aframe.prod.js` (MindAR)
- **Exemple d'utilisation** :
  ```html
  <script src="js/aframe.min.js"></script>
  <script src="js/mindar-image-aframe.prod.js"></script>
  <a-scene mindar-image="imageTargetSrc: image/targets.mind; uiScanning: no">
    <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
    <a-entity mindar-image-target="targetIndex: 0">
      <a-image src="image/letters/letter-A.png" width="1" height="1"></a-image>
    </a-entity>
  </a-scene>
  ```

### 2️⃣ **jsQR (Jeu 2 : QR Code)**
- **Intégration** : Via CDN ou téléchargement local.
- **Fonctionnement** :
  - Utilise la **Camera API** pour capturer la vidéo.
  - Analyse chaque frame avec `jsQR` pour détecter les QR codes.
- **Exemple d'utilisation** :
  ```javascript
  import jsQR from "jsqr";
  
  const video = document.getElementById("qr-video");
  const canvas = document.getElementById("qr-canvas");
  const ctx = canvas.getContext("2d");
  
  function scanQR() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    if (code) {
      console.log("QR Code détecté :", code.data);
      // Valider le jeu si le QR code est correct
    }
    requestAnimationFrame(scanQR);
  }
  ```

---

## 📱 Compatibilité Mobile

| **Fonctionnalité**       | **iOS** | **Android** | **Remarques**                                                                 |
|--------------------------|---------|-------------|-------------------------------------------------------------------------------|
| **AR (MindAR.js)**       | ✅ Oui  | ✅ Oui      | Nécessite une caméra et un navigateur moderne (Safari/Chrome).              |
| **QR Code (jsQR)**       | ✅ Oui  | ✅ Oui      | Utilise la Camera API (nécessite HTTPS ou localhost).                       |
| **NFC**                  | ❌ Non  | ✅ Oui      | NFC non supporté sur iOS (sauf avec des apps dédiées). Utiliser QR en fallback. |
| **localStorage**         | ✅ Oui  | ✅ Oui      | Fonctionne sur tous les navigateurs modernes.                                |
| **Service Worker**       | ✅ Oui  | ✅ Oui      | Nécessite HTTPS pour fonctionner en production.                            |
| **PWA (Mode hors ligne)**| ✅ Oui  | ✅ Oui      | Cache les assets pour une utilisation hors ligne.                          |

---

## 🔒 Sécurité et Bonnes Pratiques

### 1️⃣ **Service Worker (PWA)**
- **Fichier** : `service-worker.js`
- **Rôle** : Cache les assets (HTML, CSS, JS, images) pour le mode hors ligne.
- **Exemple de code** :
  ```javascript
  const CACHE_NAME = "jdpm-v1";
  const ASSETS_TO_CACHE = [
    "/",
    "/hub.html",
    "/game-1.html",
    "/game-2.html",
    "/css/base.css",
    "/css/hub.css",
    "/js/state.js",
    "/image/placeholders/mad-logo.png"
  ];
  
  self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => cache.addAll(ASSETS_TO_CACHE))
    );
  });
  
  self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request)
        .then((response) => response || fetch(event.request))
    );
  });
  ```

### 2️⃣ **Manifest PWA**
- **Fichier** : `manifest.json`
- **Rôle** : Déclare l'application comme une PWA (pour l'installation sur mobile).
- **Exemple de code** :
  ```json
  {
    "name": "JDPM - Chasse aux Énigmes",
    "short_name": "JDPM",
    "start_url": "/hub.html",
    "display": "standalone",
    "background_color": "#EFDAD2",
    "theme_color": "#0D4D96",
    "icons": [
      {
        "src": "image/icons/icon-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "image/icons/icon-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ]
  }
  ```

### 3️⃣ **Intégration dans le HTML**
- **Lien vers le manifest** :
  ```html
  <link rel="manifest" href="/manifest.json">
  ```
- **Enregistrement du Service Worker** :
  ```javascript
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js');
    });
  }
  ```

---

## 🎨 Charte Graphique

### Couleurs (Variables CSS)
```css
:root {
  --white: #FFFFFF;
  --pink: #F6BACC;
  --teal: #239DAB;
  --cyan: #37B7C0;
  --blue: #0D4D96;
  --orange: #F49B2E;
  --yellow: #FDD211;
  --cream: #EFDAD2;
  --magenta: #E83C6E;
  --font-display: 'Baloo 2', sans-serif;
  --font-body: 'Nunito', sans-serif;
}
```

### Polices
- **Titres** : `Baloo 2` (Google Fonts) - Poids : 500, 700, 800
- **Texte** : `Nunito` (Google Fonts) - Poids : 400, 600, 700, 800

### Logos
- **MAD** : `image/placeholders/mad-logo.png` (placeholder)
- **1300gang** : `image/placeholders/1300gang-logo.png` (placeholder)
- **JPM** : `image/placeholders/jpm-logo.png` (placeholder)

---

## 📞 Résumé des Points Clés

| **Aspect**               | **Détails**                                                                                     |
|--------------------------|-------------------------------------------------------------------------------------------------|
| **Structure**            | Modulaire (CSS/JS séparés par composant).                                                      |
| **Navigation**           | HUB → Jeux → Réussite (flux linéaire).                                                          |
| **Sauvegarde**           | `localStorage` (pas de backend).                                                                |
| **Hors ligne**           | Service Worker + PWA (cache des assets).                                                      |
| **Multilingue**          | Français, Anglais, Espagnol (fichiers JSON).                                                   |
| **AR**                   | MindAR.js + A-Frame (Jeu 1).                                                                   |
| **QR Code**              | jsQR + Camera API (Jeu 2, fallback pour NFC).                                                 |
| **Compatibilité**        | Mobile first (iOS/Android).                                                                    |
| **Lot**                  | "Gagnez un livre sur le design !" + lien vers Google Form.                                    |

---

## 🔗 Liens Utiles
- [MindAR.js - Documentation](https://hiukim.github.io/mind-ar-js-doc/)
- [jsQR - GitHub](https://github.com/cozmo/jsQR)
- [A-Frame - Documentation](https://aframe.io/docs/)
- [Service Worker - MDN](https://developer.mozilla.org/fr/docs/Web/API/Service_Worker_API)
- [PWA - Google Developers](https://developers.google.com/web/progressive-web-apps)
- [Google Fonts](https://fonts.google.com/)
