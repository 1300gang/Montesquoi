// ==========================================
// UTILS.JS – Fonctions utilitaires
// JDPM - Journées du Patrimoine et Matrimoine
// ==========================================

// ------------------------------------------
// Normalisation de texte (pour les réponses)
// ------------------------------------------
function normalizeText(text) {
  if (!text) return '';
  return text
    .trim()
    .toUpperCase()
    .normalize('NFD') // Décompose les caractères accentués
    .replace(/[\u0300-\u036f]/g, ''); // Supprime les diacritiques
}

// ------------------------------------------
// Générer un ID unique
// ------------------------------------------
function generateId(prefix = 'jdpm') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// ------------------------------------------
// Afficher un toast (notification temporaire)
// ------------------------------------------
function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

// ------------------------------------------
// Rediriger vers une URL avec un paramètre
// ------------------------------------------
function redirectWithParam(url, param) {
  const separator = url.includes('?') ? '&' : '?';
  window.location.href = `${url}${separator}${param}`;
}

// ------------------------------------------
// Vérifier si l'utilisateur est sur mobile
// ------------------------------------------
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// ------------------------------------------
// Vérifier si l'appareil supporte la caméra
// ------------------------------------------
async function checkCameraSupport() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    stream.getTracks().forEach(track => track.stop());
    return true;
  } catch (e) {
    console.warn('⚠️ Caméra non supportée:', e);
    return false;
  }
}

// ------------------------------------------
// Ouvrir une modal
// ------------------------------------------
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Empêche le scroll en arrière-plan
  }
}

// ------------------------------------------
// Fermer une modal
// ------------------------------------------
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = ''; // Réactive le scroll
  }
}

// ------------------------------------------
// Gérer les erreurs
// ------------------------------------------
function handleError(error, context = 'Erreur') {
  console.error(`❌ ${context}:`, error);
  showToast(`${context}: ${error.message || 'Une erreur est survenue'}`);
}

// ------------------------------------------
// Exporter pour les modules ES6 (si besoin)
// ------------------------------------------
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    normalizeText,
    generateId,
    showToast,
    redirectWithParam,
    isMobile,
    checkCameraSupport,
    openModal,
    closeModal,
    handleError,
  };
}
