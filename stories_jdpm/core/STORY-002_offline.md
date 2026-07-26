# STORY-002 : Mode Hors Ligne (PWA)

## 📌 Métadonnées
- **ID** : STORY-002
- **Titre** : Mode hors ligne avec Service Worker et PWA
- **Priorité** : ⭐⭐⭐⭐⭐ (High)
- **Estimation** : 4h
- **Dépendances** : STORY-001 (Initialisation du projet)
- **Fichiers impactés** :
  - `js/service-worker.js` (nouveau)
  - `manifest.json` (nouveau)
  - `hub.html` (modifié)
  - `game-1.html` à `game-5.html` (modifiés)
  - `success.html` (modifié)

---

## 🎯 Description

Cette story consiste à **rendre le site fonctionnel hors ligne** en implémentant :
1. Un **Service Worker** pour cache les assets (HTML, CSS, JS, images).
2. Un **manifest PWA** pour permettre l'installation sur mobile.
3. La **détection du mode hors ligne** et l'affichage d'un message si nécessaire.
4. Le **préchargement des assets critiques** pour une expérience fluide.

> **Contexte** : Le site sera utilisé dans un environnement où le réseau peut être **instable ou absent** (ex : dans le musée). Il doit donc fonctionner **une fois chargé** sans dépendre d'Internet.

---

## ✅ Critères d'Acceptation

- [ ] **Service Worker** :
  - [ ] Le fichier `service-worker.js` est créé et enregistré.
  - [ ] Tous les assets (HTML, CSS, JS, images) sont **cachés** au premier chargement.
  - [ ] Les pages fonctionnent **hors ligne** après le premier chargement.

- [ ] **Manifest PWA** :
  - [ ] Le fichier `manifest.json` est créé et lié dans les pages HTML.
  - [ ] Le site peut être **installé sur mobile** (via "Ajouter à l'écran d'accueil").
  - [ ] Les icônes et couleurs du thème sont définies.

- [ ] **Détection hors ligne** :
  - [ ] Un message est affiché si l'utilisateur est **hors ligne** (ex : "Mode hors ligne activé").
  - [ ] Le site **ne plante pas** en mode hors ligne.

- [ ] **Préchargement** :
  - [ ] Les assets critiques (CSS, JS, polices) sont **préchargés** pour éviter les clignotements.

- [ ] **Tests** :
  - [ ] Le site fonctionne sur **Chrome (Android)** en mode hors ligne.
  - [ ] Le site fonctionne sur **Safari (iOS)** en mode hors ligne.

---

## 🛠️ Tâches Techniques

### 1️⃣ Créer `manifest.json`
**Fichier** : `/manifest.json`
**Contenu** :
```json
{
  "name": "JDPM - Chasse aux Énigmes",
  "short_name": "JDPM",
  "description": "Journées du Patrimoine et Matrimoine - Chasse aux énigmes au MAD",
  "start_url": "/hub.html",
  "display": "standalone",
  "background_color": "#EFDAD2",
  "theme_color": "#0D4D96",
  "icons": [
    {
      "src": "image/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "image/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "image/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "image/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "image/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "image/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "image/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "image/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

> **Note** : Les icônes doivent être générées (ex : avec [Favicon Generator](https://realfavicongenerator.net/)). Pour l'instant, utilisez des **placeholders** (ex : un carré coloré avec le logo JDPM).

---

### 2️⃣ Créer `js/service-worker.js`
**Fichier** : `/js/service-worker.js`
**Contenu** :
```javascript
// ==========================================
// SERVICE-WORKER.JS
// Cache des assets pour le mode hors ligne (PWA)
// JDPM - Journées du Patrimoine et Matrimoine
// ==========================================

const CACHE_NAME = 'jdpm-v1';
const ASSETS_TO_CACHE = [
  // Pages HTML
  '/',
  '/hub.html',
  '/game-1.html',
  '/game-2.html',
  '/game-3.html',
  '/game-4.html',
  '/game-5.html',
  '/success.html',
  
  // CSS
  '/css/_variables.css',
  '/css/base.css',
  '/css/hub.css',
  '/css/game-base.css',
  '/css/game-1.css',
  '/css/game-2.css',
  '/css/game-3.css',
  '/css/game-4.css',
  '/css/game-5.css',
  '/css/success.css',
  
  // JS
  '/js/state.js',
  '/js/utils.js',
  '/js/qr-scanner.js',
  '/js/translations.js',
  
  // Images (placeholders)
  '/image/placeholders/mad-logo.png',
  '/image/placeholders/1300gang-logo.png',
  '/image/placeholders/jpm-logo.png',
  '/image/qcm/qcm-1.webp',
  '/image/qcm/qcm-2.webp',
  '/image/qcm/qcm-3.webp',
  '/image/qcm/qcm-4.webp',
  
  // Librairies externes (à télécharger localement)
  '/js/lib/aframe.min.js',
  '/js/lib/mindar-image-aframe.prod.js',
  '/js/lib/jsqr.min.js',
  
  // Polices (optionnel : précharger les polices Google Fonts)
  'https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=Nunito:wght@400;600;700;800&display=swap',
  
  // Manifest
  '/manifest.json',
];

// ------------------------------------------
// Installation du Service Worker
// ------------------------------------------
self.addEventListener('install', (event) => {
  console.log('🚀 Service Worker : Installation en cours...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Service Worker : Cache ouvert');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        console.log('✅ Service Worker : Assets cachés avec succès');
        return self.skipWaiting(); // Force l'activation immédiate
      })
      .catch((error) => {
        console.error('❌ Service Worker : Erreur lors du cache:', error);
      })
  );
});

// ------------------------------------------
// Activation du Service Worker
// ------------------------------------------
self.addEventListener('activate', (event) => {
  console.log('✨ Service Worker : Activé');
  
  // Supprimer les anciens caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log(`🗑️ Service Worker : Suppression du cache ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// ------------------------------------------
// Interception des requêtes (Fetch)
// ------------------------------------------
self.addEventListener('fetch', (event) => {
  // Ignorer les requêtes non-GET
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Stratégie : Cache First, puis réseau
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          console.log(`📖 Service Worker : ${event.request.url} servi depuis le cache`);
          return response;
        }
        
        // Si pas dans le cache, récupérer depuis le réseau et cache le résultat
        console.log(`🌐 Service Worker : ${event.request.url} récupéré depuis le réseau`);
        return fetch(event.request)
          .then((response) => {
            // Cloner la réponse pour la mettre en cache
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseClone);
              });
            return response;
          });
      })
      .catch((error) => {
        console.error('❌ Service Worker : Erreur lors de la récupération:', error);
        // Retourner une réponse de fallback si disponible
        return caches.match('/offline.html') || new Response('Hors ligne', { status: 503 });
      })
  );
});

// ------------------------------------------
// Gestion des messages (pour la détection hors ligne)
// ------------------------------------------
self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
```

---

### 3️⃣ Télécharger les librairies externes localement
Pour éviter les dépendances au réseau, téléchargez les librairies suivantes et placez-les dans `/js/lib/` :

| **Librairie**               | **URL**                                                                 | **Fichier de destination**          |
|-----------------------------|-------------------------------------------------------------------------|--------------------------------------|
| A-Frame                     | [Lien CDN](https://cdn.jsdelivr.net/npm/aframe@1.4.2/dist/aframe.min.js) | `/js/lib/aframe.min.js`             |
| MindAR (Image Tracking)     | [Lien CDN](https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js) | `/js/lib/mindar-image-aframe.prod.js` |
| jsQR                        | [Lien GitHub](https://github.com/cozmo/jsQR/releases) (télécharger `jsQR.min.js`) | `/js/lib/jsqr.min.js`               |

> **Note** : Vous pouvez utiliser `wget` ou `curl` pour télécharger ces fichiers :
> ```bash
> wget https://cdn.jsdelivr.net/npm/aframe@1.4.2/dist/aframe.min.js -O js/lib/aframe.min.js
> wget https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js -O js/lib/mindar-image-aframe.prod.js
> ```

---

### 4️⃣ Modifier les pages HTML pour utiliser le Service Worker
**À ajouter dans toutes les pages HTML** (`hub.html`, `game-1.html`, etc.) :

#### a) Lien vers le manifest
```html
<link rel="manifest" href="/manifest.json">
```

#### b) Enregistrement du Service Worker
```html
<script>
  // Enregistrement du Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/js/service-worker.js')
        .then((registration) => {
          console.log('✅ Service Worker enregistré avec succès:', registration.scope);
        })
        .catch((error) => {
          console.error('❌ Erreur lors de l\'enregistrement du Service Worker:', error);
        });
    });
  }
</script>
```

#### c) Détection du mode hors ligne
```html
<script>
  // Détection du mode hors ligne
  function checkOnlineStatus() {
    const isOnline = navigator.onLine;
    const offlineMessage = document.getElementById('offline-message');
    
    if (!isOnline && offlineMessage) {
      offlineMessage.style.display = 'block';
    } else if (offlineMessage) {
      offlineMessage.style.display = 'none';
    }
  }
  
  // Écouter les changements de statut
  window.addEventListener('online', checkOnlineStatus);
  window.addEventListener('offline', checkOnlineStatus);
  
  // Vérifier au chargement
  document.addEventListener('DOMContentLoaded', checkOnlineStatus);
</script>
```

#### d) Ajouter un message hors ligne dans le HTML
```html
<div id="offline-message" style="display: none; position: fixed; top: 0; left: 0; right: 0; background: #E83C6E; color: white; padding: 10px; text-align: center; z-index: 1000;">
  ⚠️ Mode hors ligne activé. Certaines fonctionnalités peuvent être limitées.
</div>
```

---

### 5️⃣ Précharger les assets critiques
**À ajouter dans le `<head>` de toutes les pages HTML** :
```html
<!-- Préchargement des assets critiques -->
<link rel="preload" href="css/base.css" as="style">
<link rel="preload" href="css/hub.css" as="style">
<link rel="preload" href="js/state.js" as="script">
<link rel="preload" href="js/utils.js" as="script">

<!-- Préchargement des polices -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
```

---

### 6️⃣ Créer une page `offline.html` (optionnel)
**Fichier** : `/offline.html`
**Contenu** :
```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hors Ligne - JDPM</title>
  <link rel="stylesheet" href="css/_variables.css">
  <link rel="stylesheet" href="css/base.css">
  <style>
    body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      text-align: center;
      padding: var(--spacing-lg);
    }
    .offline-icon {
      font-size: 64px;
      margin-bottom: var(--spacing-md);
    }
    h1 {
      color: var(--magenta);
    }
    p {
      max-width: 300px;
      margin-bottom: var(--spacing-md);
    }
    .retry-btn {
      background: var(--teal);
      color: var(--white);
      border: none;
      padding: var(--spacing-sm) var(--spacing-lg);
      border-radius: var(--border-radius-md);
      font-family: var(--font-display);
      font-weight: 700;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="offline-icon">📵</div>
  <h1>Mode Hors Ligne</h1>
  <p>Vous êtes actuellement hors ligne. Le site fonctionne avec les données cachées, mais certaines fonctionnalités peuvent être limitées.</p>
  <button class="retry-btn" onclick="window.location.reload()">Recharger</button>
  <script>
    // Vérifier si on est de retour en ligne
    window.addEventListener('online', () => {
      window.location.reload();
    });
  </script>
</body>
</html>
```

---

## 🧪 Tests

### 1️⃣ **Test sur Chrome (Android)**
1. Ouvrir le site en **mode navigation privée** (pour éviter le cache existant).
2. Charger la page `hub.html` et attendre que le Service Worker s’installe.
3. **Désactiver le réseau** (via DevTools > Network > Offline).
4. Recharger la page : elle doit fonctionner **sans erreur**.
5. Naviguer vers `game-1.html` : la page doit s’afficher **sans dépendre d’Internet**.

### 2️⃣ **Test sur Safari (iOS)**
1. Ouvrir le site sur un iPhone/iPad.
2. **Ajouter à l’écran d’accueil** (pour installer la PWA).
3. **Désactiver le Wi-Fi/Données mobiles**.
4. Ouvrir l’app depuis l’écran d’accueil : elle doit fonctionner **hors ligne**.

### 3️⃣ **Test des assets cachés**
1. Ouvrir DevTools > Application > Service Workers.
2. Vérifier que le Service Worker est **enregistré et actif**.
3. Vérifier que les assets sont **bien cachés** (onglet Cache Storage).

### 4️⃣ **Test de la détection hors ligne**
1. Désactiver le réseau.
2. Vérifier que le message **"Mode hors ligne activé"** s’affiche.

---

## 📝 Notes

- **HTTPS requis** : Les Service Workers **ne fonctionnent pas** sur `http://` (sauf `localhost`). Pour les tests en local, utilisez `localhost` ou un serveur HTTPS.
- **Cache dynamique** : Le Service Worker cache **dynamiquement** les nouvelles requêtes (stratégie 