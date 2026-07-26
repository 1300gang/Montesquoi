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
  '/offline.html',
  
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
  '/js/translations.js',
  
  // Images (placeholders)
  '/image/placeholders/mad-logo.svg',
  '/image/placeholders/1300gang-logo.svg',
  '/image/placeholders/jpm-logo.svg',
  '/image/qcm/qcm-1.svg',
  '/image/qcm/qcm-2.svg',
  '/image/qcm/qcm-3.svg',
  '/image/qcm/qcm-4.svg',
  
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
          console.log(`📄 Service Worker : ${event.request.url} servi depuis le cache`);
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
