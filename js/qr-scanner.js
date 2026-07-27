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
  if (typeof NDEFReader === 'undefined') {
    console.warn('⚠️ NFC non supporté sur cet appareil.');
    return false;
  }

  try {
    const reader = new NDEFReader();
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

    await reader.scan();
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
