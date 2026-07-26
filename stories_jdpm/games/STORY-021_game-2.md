# STORY-021 : Jeu 2 - NFC/QR Code

## 📌 Métadonnées
- **ID** : STORY-021
- **Titre** : Jeu 2 - NFC/QR Code avec jsQR
- **Priorité** : ⭐⭐⭐⭐ (High)
- **Estimation** : 6h
- **Dépendances** : 
  - STORY-001 (Initialisation du projet)
  - STORY-002 (Mode hors ligne)
  - STORY-003 (Multilingue)
  - STORY-010 (Page HUB)
- **Fichiers impactés** :
  - `game-2.html` (nouveau)
  - `css/game-2.css` (nouveau)
  - `js/qr-scanner.js` (nouveau)
  - `js/lib/jsqr.min.js` (téléchargé)
  - `image/qr-targets/` (dossier pour les QR codes)

---

## 🎯 Description

Cette story consiste à **créer le Jeu 2 : NFC/QR Code**. L'objectif est de :
1. Permettre à l’utilisateur de **scanner un QR code** (ou un tag NFC) via la caméra.
2. **Détecter automatiquement** le QR code avec **jsQR** (meilleure détection que les APIs natives).
3. **Valider le jeu** si le QR code est **correct** (ex : contient un code spécifique).
4. **Afficher une modal** avec le scanner QR (fallback pour les appareils sans NFC).
5. **Sauvegarder la progression** dans `localStorage`.
6. **Rediriger vers le HUB** avec un paramètre de succès (`?win=2`).

> **Contexte** : 
> - Le **NFC ne fonctionne pas sur iOS** (sauf avec des apps dédiées). On utilise donc le **QR code comme solution de fallback**.
> - Le scanner doit être **léger** et **rapide**, avec une **détection en continu** (toutes les X ms).
> - La taille de la photo de la caméra doit être **fixe** pour optimiser la détection.

---

## ✅ Critères d'Acceptation

- [ ] **Scanner QR Code** :
  - [ ] Une **modal** s’ouvre avec la caméra en continu.
  - [ ] La détection utilise **jsQR** (pas l’API native `BarcodeDetector`).
  - [ ] Le scanner **analyse chaque frame** de la vidéo.
  - [ ] Un **bouton "Annuler"** permet de fermer la modal.

- [ ] **Détection automatique** :
  - [ ] Le QR code est **détecté automatiquement** (pas besoin de bouton "Scanner").
  - [ ] Si le QR code est **valide**, le jeu est **validé**.
  - [ ] Si le QR code est **invalide**, un message d’erreur s’affiche.

- [ ] **NFC (optionnel)** :
  - [ ] Sur **Android**, tentative de détection NFC (si disponible).
  - [ ] Si NFC échoue, **fallback automatique** vers le scanner QR.

- [ ] **Éléments communs** :
  - [ ] **Header** : Bouton "Retour au HUB" + Titre "Jeu 2 - NFC/QR Code" + Bouton "Info".
  - [ ] **Footer** : Bouton "Scanner NFC/QR" (ouvre la modal).
  - [ ] **Modal "Info"** : Explication des règles du jeu.

- [ ] **Sauvegarde** :
  - [ ] Le jeu est **marqué comme terminé** (`markJdpmGameDone(2)`).
  - [ ] Redirection vers le HUB avec `?win=2`.

- [ ] **Multilingue** :
  - [ ] Tous les textes sont **traduits** (fr/en/es).

- [ ] **Hors ligne** :
  - [ ] Le jeu fonctionne **sans connexion Internet** (après le premier chargement).

- [ ] **Mobile** :
  - [ ] Le jeu est **100% compatible mobile** (iOS/Android).
  - [ ] La caméra est **accessible** et **fonctionnelle**.

---

## 🛠️ Tâches Techniques

### 1️⃣ Télécharger jsQR localement
Téléchargez `jsQR` et placez-le dans `/js/lib/` :

```bash
# Télécharger jsQR depuis GitHub (version minifiée)
wget https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js -O js/lib/jsqr.min.js
```

> **Note** : Pour le **mode hors ligne**, il est **obligatoire** de télécharger cette librairie localement.

---

### 2️⃣ Créer `js/qr-scanner.js`
**Fichier** : `/js/qr-scanner.js`
**Contenu** :
```javascript
// ==========================================
// QR-SCANNER.JS
// Module pour scanner les QR Codes avec jsQR
// JDPM - Journées du Patrimoine et Matrimoine
// ==========================================

// ------------------------------------------
// Configuration
// ------------------------------------------
const QR_SCANNER_CONFIG = {
  // Taille de la vidéo (fixe pour optimiser la détection)
  videoWidth: 300,
  videoHeight: 200,
  // Fréquence de scan (en ms)
  scanInterval: 200,
  // Codes QR valides (pour le Jeu 2)
  validCodes: ['JDPM-GAME-2', 'MAD-EXPO-2024', '1300GANG-JDPM'],
  // Callback appelé quand un QR code valide est détecté
  onSuccess: null,
  // Callback appelé quand un QR code invalide est détecté
  onError: null,
};

// ------------------------------------------
// État du scanner
// ------------------------------------------
let videoStream = null;
let scanIntervalId = null;
let isScanning = false;

// ------------------------------------------
// Initialiser le scanner
// ------------------------------------------
async function initQRScanner(config = {}) {
  // Fusionner la config par défaut avec celle passée en paramètre
  Object.assign(QR_SCANNER_CONFIG, config);
  
  // Vérifier que jsQR est chargé
  if (typeof jsQR === 'undefined') {
    throw new Error('jsQR n\'est pas chargé. Vérifiez que jsqr.min.js est inclus.');
  }
  
  // Vérifier l'accès à la caméra
  const hasCamera = await checkCameraAccess();
  if (!hasCamera) {
    throw new Error('Accès à la caméra refusé ou non supporté.');
  }
  
  return true;
}

// ------------------------------------------
// Vérifier l'accès à la caméra
// ------------------------------------------
async function checkCameraAccess() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: QR_SCANNER_CONFIG.videoWidth },
        height: { ideal: QR_SCANNER_CONFIG.videoHeight },
        facingMode: 'environment', // Caméra arrière (pour scanner des QR codes physiques)
      },
    });
    
    // Arrêter le stream immédiatement (on le redémarrera quand nécessaire)
    stream.getTracks().forEach(track => track.stop());
    return true;
  } catch (error) {
    console.error('❌ Erreur d\'accès à la caméra:', error);
    return false;
  }
}

// ------------------------------------------
// Démarrer le scanner
// ------------------------------------------
async function startQRScanner(videoElementId, canvasElementId) {
  if (isScanning) {
    console.warn('⚠️ Le scanner est déjà en cours.');
    return;
  }
  
  try {
    // Démarrer le stream vidéo
    const video = document.getElementById(videoElementId);
    const canvas = document.getElementById(canvasElementId);
    const ctx = canvas.getContext('2d');
    
    if (!video || !canvas) {
      throw new Error(`Éléments non trouvés: ${videoElementId} ou ${canvasElementId}`);
    }
    
    // Configurer la taille du canvas
    canvas.width = QR_SCANNER_CONFIG.videoWidth;
    canvas.height = QR_SCANNER_CONFIG.videoHeight;
    
    // Démarrer le stream
    videoStream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: QR_SCANNER_CONFIG.videoWidth },
        height: { ideal: QR_SCANNER_CONFIG.videoHeight },
        facingMode: 'environment',
      },
    });
    
    video.srcObject = videoStream;
    video.play();
    
    // Attendre que la vidéo soit prête
    await new Promise((resolve) => {
      video.onloadedmetadata = resolve;
    });
    
    // Démarrer le scan en continu
    isScanning = true;
    scanIntervalId = setInterval(() => {
      scanFrame(video, canvas, ctx);
    }, QR_SCANNER_CONFIG.scanInterval);
    
    console.log('🎥 Scanner QR démarré');
    return true;
  } catch (error) {
    console.error('❌ Erreur lors du démarrage du scanner:', error);
    stopQRScanner();
    return false;
  }
}

// ------------------------------------------
// Scanner une frame
// ------------------------------------------
function scanFrame(video, canvas, ctx) {
  if (!isScanning) return;
  
  // Dessiner la frame actuelle sur le canvas
  ctx.drawImage(
    video,
    0, 0, video.videoWidth, video.videoHeight,
    0, 0, canvas.width, canvas.height
  );
  
  // Récupérer les données de l'image
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
  // Détecter le QR code
  const code = jsQR(imageData.data, imageData.width, imageData.height);
  
  if (code) {
    console.log('📌 QR Code détecté:', code.data);
    
    // Vérifier si le code est valide
    if (QR_SCANNER_CONFIG.validCodes.includes(code.data)) {
      console.log('✅ QR Code valide !');
      stopQRScanner();
      if (QR_SCANNER_CONFIG.onSuccess) {
        QR_SCANNER_CONFIG.onSuccess(code.data);
      }
    } else {
      console.log('❌ QR Code invalide:', code.data);
      if (QR_SCANNER_CONFIG.onError) {
        QR_SCANNER_CONFIG.onError(code.data);
      }
    }
  }
}

// ------------------------------------------
// Arrêter le scanner
// ------------------------------------------
function stopQRScanner() {
  if (!isScanning) return;
  
  // Arrêter l'intervalle de scan
  if (scanIntervalId) {
    clearInterval(scanIntervalId);
    scanIntervalId = null;
  }
  
  // Arrêter le stream vidéo
  if (videoStream) {
    videoStream.getTracks().forEach(track => track.stop());
    videoStream = null;
  }
  
  isScanning = false;
  console.log('🛑 Scanner QR arrêté');
}

// ------------------------------------------
// Détecter un tag NFC (Android uniquement)
// ------------------------------------------
async function detectNFC() {
  if (typeof NDDefReader === 'undefined') {
    console.warn('⚠️ NFC non supporté sur cet appareil.');
    return false;
  }
  
  try {
    const reader = new NDDefReader();
    reader.onreading = (event) => {
      const message = event.message;
      const record = message.records[0];
      const text = new TextDecoder().decode(record.data);
      
      console.log('📌 NFC détecté:', text);
      
      // Vérifier si le tag NFC est valide
      if (QR_SCANNER_CONFIG.validCodes.includes(text)) {
        console.log('✅ Tag NFC valide !');
        if (QR_SCANNER_CONFIG.onSuccess) {
          QR_SCANNER_CONFIG.onSuccess(text);
        }
        return true;
      } else {
        console.log('❌ Tag NFC invalide:', text);
        if (QR_SCANNER_CONFIG.onError) {
          QR_SCANNER_CONFIG.onError(text);
        }
        return false;
      }
    };
    
    await reader.startScanning();
    console.log('📱 Détection NFC démarrée');
    return true;
  } catch (error) {
    console.error('❌ Erreur NFC:', error);
    return false;
  }
}

// ------------------------------------------
// Exporter pour les modules ES6
// ------------------------------------------
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initQRScanner,
    startQRScanner,
    stopQRScanner,
    detectNFC,
    QR_SCANNER_CONFIG,
  };
}
```

---

### 3️⃣ Créer `css/game-2.css`
**Fichier** : `/css/game-2.css`
**Contenu** :
```css
/* ============================================
   GAME-2 CSS
   Styles spécifiques au Jeu 2 (NFC/QR Code)
   ============================================ */

@import url('_variables.css');

/* Conteneur principal */
.game-container {
  max-width: 440px;
  width: 100%;
  background: var(--white);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--box-shadow-md);
  text-align: center;
  position: relative;
  margin: var(--spacing-md) auto;
  border: 3px solid var(--cyan);
}

/* Section du scanner */
.scanner-section {
  margin: var(--spacing-lg) 0;
}

.scanner-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 18px;
  color: var(--blue);
  margin-bottom: var(--spacing-sm);
}

.scanner-subtitle {
  font-size: 14px;
  color: rgba(13, 77, 150, 0.7);
  margin-bottom: var(--spacing-md);
}

/* Bouton pour ouvrir le scanner */
#scan-btn {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 16px;
  color: var(--white);
  background: var(--cyan);
  border: none;
  border-radius: var(--border-radius-md);
  padding: var(--spacing-sm) var(--spacing-xl);
  cursor: pointer;
  box-shadow: 0 4px 0 rgba(55, 183, 192, 0.3);
  transition: all var(--transition-fast);
  width: 100%;
}

#scan-btn:active {
  transform: translateY(2px);
  box-shadow: 0 2px 0 rgba(55, 183, 192, 0.3);
}

/* Modal du scanner QR */
#qr-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
  z-index: 50;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--transition-normal);
}

#qr-modal.open {
  display: flex;
  opacity: 1;
  pointer-events: auto;
}

#qr-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin-bottom: var(--spacing-sm);
}

#qr-modal-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 18px;
  color: var(--white);
}

#qr-close-btn {
  background: none;
  border: none;
  color: var(--white);
  font-size: 24px;
  cursor: pointer;
  padding: var(--spacing-xs);
  transition: all var(--transition-fast);
}

#qr-close-btn:hover {
  color: var(--magenta);
}

/* Conteneur de la caméra */
#qr-video-container {
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 300px;
  background: #000;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  margin-bottom: var(--spacing-md);
}

#qr-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

#qr-canvas {
  display: none; /* Le canvas est utilisé pour la détection, pas pour l'affichage */
}

/* Instructions du scanner */
#qr-instructions {
  font-family: var(--font-body);
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin-bottom: var(--spacing-md);
}

/* Feedback du scanner */
#qr-feedback {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  min-height: 20px;
  opacity: 0;
  transition: opacity var(--transition-fast);
}

#qr-feedback.show {
  opacity: 1;
}

#qr-feedback.error {
  color: var(--magenta);
}

#qr-feedback.success {
  color: var(--teal);
}

/* Cadre de visée */
#qr-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  border: 2px solid var(--cyan);
  border-radius: var(--border-radius-md);
  box-sizing: border-box;
}

#qr-overlay::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border: 1px solid rgba(55, 183, 192, 0.3);
  border-radius: var(--border-radius-sm);
}

/* Écran de victoire */
#win-screen {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(10, 8, 4, 0.95);
  backdrop-filter: blur(14px);
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-xl);
}

#win-screen.show {
  display: flex;
}

.win-icon {
  font-size: 58px;
  animation: pop 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s both;
}

@keyframes pop {
  from {
    transform: scale(0) rotate(-15deg);
    opacity: 0;
  }
  to {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

.win-title {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 400;
  color: var(--cyan);
  letter-spacing: 0.12em;
  text-align: center;
  animation: fadeUp 0.5s ease 0.35s both;
}

.win-sub {
  font-size: 15px;
  font-style: italic;
  font-weight: 300;
  color: rgba(245, 240, 232, 0.8);
  text-align: center;
  line-height: 1.8;
  animation: fadeUp 0.5s ease 0.55s both;
}

#btn-hub {
  display: block;
  padding: var(--spacing-sm) var(--spacing-xl);
  background: var(--cyan);
  border: none;
  border-radius: var(--border-radius-sm);
  color: var(--white);
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  margin-top: var(--spacing-sm);
  animation: fadeUp 0.5s ease 0.7s both;
  transition: all var(--transition-fast);
}

#btn-hub:active {
  transform: scale(0.98);
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Modal Info */
#info-modal {
  position: fixed;
  inset: 0;
  background: rgba(13, 77, 150, 0.55);
  backdrop-filter: blur(2px);
  display: none;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
  z-index: 50;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--transition-normal);
}

#info-modal.open {
  display: flex;
  opacity: 1;
  pointer-events: auto;
}

#info-modal .modal-box {
  background: var(--white);
  max-width: 380px;
  width: 100%;
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  position: relative;
  text-align: center;
  transform: translateY(14px) scale(0.97);
  transition: transform var(--transition-normal);
  box-shadow: var(--box-shadow-lg);
}

#info-modal.open .modal-box {
  transform: translateY(0) scale(1);
}

#info-modal .modal-close {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: var(--cream);
  color: var(--blue);
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1;
}

/* Responsive */
@media (max-width: 480px) {
  #qr-video-container {
    height: 250px;
  }
  
  #scan-btn {
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: 14px;
  }
}

/* Accessibilité */
#scan-btn:focus,
#qr-close-btn:focus,
#info-modal .modal-close:focus,
#btn-hub:focus {
  outline: 3px dashed var(--orange);
  outline-offset: 3px;
}
```

---

### 4️⃣ Créer `game-2.html`
**Fichier** : `/game-2.html`
**Contenu complet** :
```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title data-i18n="games.game2.title">Jeu 2 - NFC/QR Code</title>
  <link rel="manifest" href="/manifest.json">
  <link rel="stylesheet" href="css/_variables.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/game-base.css">
  <link rel="stylesheet" href="css/game-2.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
  <!-- Sélecteur de langue -->
  <div class="lang-selector" id="lang-selector"></div>

  <!-- Message hors ligne -->
  <div id="offline-message" style="display: none; position: fixed; top: 0; left: 0; right: 0; background: #E83C6E; color: white; padding: 10px; text-align: center; z-index: 1000;">
    ⚠️ <span data-i18n="misc.offline">Mode hors ligne activé</span>
  </div>

  <div class="container">
    <div class="game-container">
      <header class="game-header">
        <a href="hub.html" class="back-btn" data-i18n="buttons.backToHub">← HUB</a>
        <h1 class="game-title" data-i18n="games.game2.title">Jeu 2 - NFC/QR Code</h1>
        <button class="info-btn" id="infoBtn" aria-label="Info" data-i18n-title="buttons.info">ⓘ</button>
      </header>

      <main>
        <section class="scanner-section">
          <h2 class="scanner-title" data-i18n="games.game2.subtitle">Scannez le code pour continuer</h2>
          <p class="scanner-subtitle" data-i18n="games.game2.instructions">
            Approchez votre appareil du tag NFC ou scannez le QR code.
          </p>
          <button id="scan-btn" data-i18n="games.game2.qrModalTitle">Scanner NFC/QR</button>
        </section>
      </main>

      <footer class="game-footer">
        <!-- Vide pour ce jeu -->
      </footer>
    </div>
  </div>

  <!-- Modal du scanner QR -->
  <div id="qr-modal">
    <div id="qr-modal-header">
      <h2 id="qr-modal-title" data-i18n="games.game2.qrModalTitle">Scanner un QR Code</h2>
      <button id="qr-close-btn" aria-label="Fermer">✕</button>
    </div>
    <div id="qr-video-container">
      <video id="qr-video" autoplay playsinline></video>
      <canvas id="qr-canvas"></canvas>
      <div id="qr-overlay"></div>
    </div>
    <p id="qr-instructions" data-i18n="games.game2.qrModalInstructions">Pointez la caméra vers le QR code.</p>
    <p id="qr-feedback"></p>
  </div>

  <!-- Écran de victoire -->
  <div id="win-screen">
    <div class="win-icon">🎉</div>
    <h2 class="win-title" data-i18n="modals.success.title">Félicitations !</h2>
    <p class="win-sub" data-i18n="games.game2.qrSuccess">QR Code valide ! Vous avez résolu cette énigme.</p>
    <a href="hub.html?win=2" id="btn-hub" data-i18n="buttons.backToHub">Retour au HUB</a>
  </div>

  <!-- Modal Info -->
  <div id="info-modal">
    <div class="modal-box">
      <button class="modal-close" id="infoModalClose" aria-label="Fermer">✕</button>
      <div class="modal-emoji">📱</div>
      <h2 class="modal-title" data-i18n="games.game2.title">Jeu 2 - NFC/QR Code</h2>
      <p class="modal-text" data-i18n="games.game2.instructions">
        Approchez votre appareil d'un tag NFC ou scannez le QR code affiché dans l'exposition pour valider ce jeu.
      </p>
      <button class="modal-cta" id="infoModalCta" data-i18n="modals.welcome.cta">OK</button>
    </div>
  </div>

  <!-- Scripts -->
  <script src="js/state.js"></script>
  <script src="js/utils.js"></script>
  <script src="js/translations.js"></script>
  <script src="js/lib/jsqr.min.js"></script>
  <script src="js/qr-scanner.js"></script>
  
  <script>
    // ==========================================
    // CONFIGURATION
    // ==========================================
    const VALID_QR_CODES = ['JDPM-GAME-2', 'MAD-EXPO-2024', '1300GANG-JDPM'];
    let gameWon = false;

    // ==========================================
    // INITIALISATION
    // ==========================================
    document.addEventListener('DOMContentLoaded', async () => {
      await initTranslations();
      
      // Enregistrer le Service Worker
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/js/service-worker.js');
      }
      
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
      window.addEventListener('online', checkOnlineStatus);
      window.addEventListener('offline', checkOnlineStatus);
      checkOnlineStatus();
      
      // Vérifier si le jeu est déjà terminé
      const state = loadJdpmState();
      if (state.game_2_done) {
        gameWon = true;
        showWinScreen();
      }
      
      // Initialiser le scanner QR
      try {
        await initQRScanner({
          validCodes: VALID_QR_CODES,
          onSuccess: onQRSuccess,
          onError: onQRError,
        });
      } catch (error) {
        console.error('❌ Erreur d\'initialisation du scanner:', error);
        showFeedback(t('games.game2.qrError'), true);
      }
    });

    // ==========================================
    // GESTION DU SCANNER QR
    // ==========================================
    const qrModal = document.getElementById('qr-modal');
    const scanBtn = document.getElementById('scan-btn');
    const qrCloseBtn = document.getElementById('qr-close-btn');
    const qrFeedback = document.getElementById('qr-feedback');

    // Ouvrir la modal du scanner
    scanBtn.addEventListener('click', async () => {
      if (gameWon) return;
      
      try {
        await startQRScanner('qr-video', 'qr-canvas');
        qrModal.classList.add('open');
        qrFeedback.textContent = '';
        qrFeedback.className = '';
      } catch (error) {
        console.error('❌ Erreur:', error);
        qrFeedback.textContent = t('games.game2.qrError');
        qrFeedback.className = 'show error';
      }
    });

    // Fermer la modal du scanner
    qrCloseBtn.addEventListener('click', () => {
      stopQRScanner();
      qrModal.classList.remove('open');
    });

    // Fermer la modal en cliquant à l'extérieur
    qrModal.addEventListener('click', (e) => {
      if (e.target === qrModal) {
        stopQRScanner();
        qrModal.classList.remove('open');
      }
    });

    // Succès : QR code valide
    function onQRSuccess(code) {
      console.log('✅ QR Code valide:', code);
      qrFeedback.textContent = t('games.game2.qrSuccess');
      qrFeedback.className = 'show success';
      
      // Marquer le jeu comme terminé après un délai
      setTimeout(() => {
        qrModal.classList.remove('open');
        onSuccess();
      }, 1000);
    }

    // Erreur : QR code invalide
    function onQRError(code) {
      qrFeedback.textContent = t('games.game2.qrError');
      qrFeedback.className = 'show error';
      
      // Réinitialiser le feedback après 2 secondes
      setTimeout(() => {
        qrFeedback.className = '';
      }, 2000);
    }

    // ==========================================
    // VICTOIRE
    // ==========================================
    function onSuccess() {
      if (gameWon) return;
      gameWon = true;
      markJdpmGameDone(2);
      showWinScreen();
    }

    function showWinScreen() {
      document.getElementById('win-screen').classList.add('show');
    }

    // ==========================================
    // MODAL INFO
    // ==========================================
    const infoModal = document.getElementById('info-modal');
    function openInfoModal() { infoModal.classList.add('open'); }
    function closeInfoModal() { infoModal.classList.remove('open'); }

    document.getElementById('infoBtn').addEventListener('click', openInfoModal);
    document.getElementById('infoModalClose').addEventListener('click', closeInfoModal);
    document.getElementById('infoModalCta').addEventListener('click', closeInfoModal);
    infoModal.addEventListener('click', e => { if (e.target === infoModal) closeInfoModal(); });

    // ==========================================
    // UTILITAIRES
    // ==========================================
    function showFeedback(msg, isError) {
      qrFeedback.textContent = msg;
      qrFeedback.className = 'show ' + (isError ? 'error' : 'success');
    }
  </script>
</body>
</html>
```

---

## 🧪 Tests

### 1️⃣ **Test du scanner QR**
1. Ouvrir `game-2.html` sur un **smartphone** (iOS/Android).
2. Cliquer sur "Scanner NFC/QR" : la **modal du scanner** doit s’ouvrir.
3. Pointer la caméra vers un **QR code valide** (ex : contenant `JDPM-GAME-2`) :
   - Le QR code doit être **détecté automatiquement**.
   - Un message **"QR Code valide !"** doit s’afficher.
   - Le jeu doit être **marqué comme terminé** et rediriger vers le HUB.

### 2️⃣ **Test du QR code invalide**
1. Scanner un **QR code invalide** (ex : contenant `TEST`).
2. Un message d’erreur doit s’afficher : **"QR Code invalide. Essayez un autre code."**.

### 3️⃣ **Test du bouton "Annuler"**
1. Ouvrir la modal du scanner.
2. Cliquer sur "✕" : la modal doit **se fermer** et le scanner doit **s’arrêter**.

### 4️⃣ **Test de la détection automatique**
1. Ouvrir la modal du scanner.
2. Pointer la caméra vers un QR code valide : il doit être **détecté sans cliquer**.

### 5️⃣ **Test de la sauvegarde**
1. Scanner un QR code valide.
2. **Fermer le navigateur** et le rouvrir.
3. Recharger `game-2.html` : le jeu doit être **déjà marqué comme terminé**.

### 6️⃣ **Test du bouton "Retour au HUB"**
1. Cliquer sur "← HUB" : redirection vers `hub.html`.
2. Vérifier que le **Jeu 2** est marqué comme ✅ dans le HUB.

### 7️⃣ **Test de la modal "Info"**
1. Cliquer sur le bouton "ⓘ" : la modal doit s’afficher.
2. Vérifier que le texte est **traduit** (fr/en/es).
3. Fermer la modal : elle doit **disparaître**.

### 8️⃣ **Test multilingue**
1. Changer de langue via le sélecteur : tous les textes doivent être **traduits**.
2. Vérifier que les **messages du scanner** sont traduits.

### 9️⃣ **Test hors ligne**
1. Charger `game-2.html` **une première fois** (avec Internet).
2. **Désactiver le réseau**.
3. Recharger la page : elle doit fonctionner **sans erreur**.
4. Ouvrir le scanner : il doit **toujours fonctionner**.

### 🔟 **Test mobile (iOS/Android)**
1. Ouvrir `game-2.html` sur un **iPhone** et un **Android**.
2. Vérifier que :
   - La caméra est **accessible**.
   - Le scanner **détecte les QR codes**.
   - Le jeu est **jouable** de bout en bout.

---

## 📝 Notes

- **jsQR** : Cette librairie est **plus fiable** que l’API native `BarcodeDetector` pour les QR codes.
- **NFC** : Le NFC **ne fonctionne pas sur iOS** (sauf avec des apps dédiées comme "NFC Tools"). On utilise donc le **QR code comme solution universelle**.
- **Taille de la vidéo** : La taille est **fixée à 300x200px** pour optimiser la détection. Vous pouvez l’ajuster si nécessaire.
- **Fréquence de scan** : Le scanner analyse **toutes les 200ms** (5 FPS). Vous pouvez augmenter cette valeur pour une meilleure performance.
- **Codes valides** : Les codes valides (`VALID_QR_CODES`) peuvent être **modifiés** pour coller à votre exposition.

---

## 🔗 Dépendances pour les prochaines stories

Cette story est **indépendante** des autres jeux, mais elle est **requise** pour :
- STORY-025 (Page de réussite globale, si vous voulez afficher un message spécial pour le Jeu 2).

---

## 📚 Ressources
- [jsQR - GitHub](https://github.com/cozmo/jsQR)
- [jsQR - Demo](https://cozmo.github.io/jsQR/)
- [NFC API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_NFC_API) (pour Android)
- [BarcodeDetector API](https://developer.mozilla.org/en-US/docs/Web/API/BarcodeDetector) (alternative, mais moins fiable)
- [QR Code Generator](https://www.qr-code-generator.com/) (pour générer des QR codes de test)

---

## ⚠️ Problèmes Connus et Solutions

| **Problème**                          | **Solution**                                                                                     |
|---------------------------------------|-------------------------------------------------------------------------------------------------|
| Caméra non accessible                  | Vérifier que le site est servi via **HTTPS** ou `localhost`. Sur iOS, autoriser l’accès à la caméra. |
| QR code non détecté                    | Vérifier que le QR code est **nettement visible** et **bien éclairé**. Utiliser un QR code avec un **contraste élevé**. |
| Scanner lent                           | Réduire `QR_SCANNER_CONFIG.scanInterval` (ex : 100ms) ou réduire la taille de la vidéo.          |
| Modal ne se ferme pas                  | Vérifier que `stopQRScanner()` est appelé et que `qrModal.classList.remove('open')` est exécuté. |
| Jeu marqué comme terminé mais pas de redirection | Vérifier que `markJdpmGameDone(2)` est appelé et que l’URL est `hub.html?win=2`. |
| Erreur "jsQR n'est pas défini"         | Vérifier que `jsqr.min.js` est **bien chargé** avant `qr-scanner.js`.                              |

---

## ✅ Checklist de Validation

- [ ] `js/qr-scanner.js` est créé et fonctionnel.
- [ ] `js/lib/jsqr.min.js` est téléchargé localement.
- [ ] `css/game-2.css` est créé et fonctionnel.
- [ ] `game-2.html` est **complètement fonctionnel** (scanner QR, validation).
- [ ] La **modal du scanner** s’ouvre et se ferme correctement.
- [ ] Le **QR code est détecté automatiquement**.
- [ ] Les **codes valides/invalides** sont correctement gérés.
- [ ] Le jeu est **marqué comme terminé** dans `localStorage`.
- [ ] La **redirection vers le HUB** fonctionne (`?win=2`).
- [ ] Le **bouton "Retour au HUB"** fonctionne.
- [ ] La **modal "Info"** s’affiche et est traduite.
- [ ] Le **sélecteur de langue** est intégré et fonctionnel.
- [ ] Le jeu fonctionne **hors ligne** (après le premier chargement).
- [ ] Le jeu est **testé sur mobile** (iOS/Android).
- [ ] Aucun erreur dans la console.

---

## 🎉 Livrable

À la fin de cette story, vous aurez :
✅ Un **scanner QR complet** avec jsQR.
✅ Une **détection automatique** des QR codes.
✅ Un **fallback pour le NFC** (non fonctionnel sur iOS).
✅ Une **validation du jeu** via QR code.
✅ Une **intégration avec le HUB** (progression sauvegardée).
✅ Un **design responsive** (mobile-first).
✅ Un **système multilingue** (fr/en/es).

---

**Prochaine étape** : [STORY-022 - Jeu 3 (Recherche d'image)](STORY-022_game-3.md)
