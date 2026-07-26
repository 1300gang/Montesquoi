// ==========================================
// STATE.JS – État global partagé
// JDPM - Journées du Patrimoine et Matrimoine
// ==========================================

const JDPM_STATE_KEY = 'jdpm_madd_state';

const DEFAULT_JDPM_STATE = {
  game_1_done: false,  // Jeu 1 : AR
  game_2_done: false,  // Jeu 2 : NFC/QR
  game_3_done: false,  // Jeu 3 : Recherche d'image
  game_4_done: false,  // Jeu 4 : Énigme
  game_5_done: false,  // Jeu 5 : QCM
};

// ------------------------------------------
// Lecture de l'état
// ------------------------------------------
function loadJdpmState() {
  try {
    const raw = localStorage.getItem(JDPM_STATE_KEY);
    if (!raw) return { ...DEFAULT_JDPM_STATE };
    return { ...DEFAULT_JDPM_STATE, ...JSON.parse(raw) };
  } catch (e) {
    console.warn('⚠️ state.js – Impossible de lire localStorage:', e);
    return { ...DEFAULT_JDPM_STATE };
  }
}

// ------------------------------------------
// Écriture de l'état
// ------------------------------------------
function saveJdpmState(state) {
  try {
    localStorage.setItem(JDPM_STATE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('⚠️ state.js – Impossible d’écrire localStorage:', e);
  }
}

// ------------------------------------------
// Marquer un jeu comme terminé
// ------------------------------------------
function markJdpmGameDone(gameId) {
  const state = loadJdpmState();
  const key = `game_${gameId}_done`;
  if (state.hasOwnProperty(key)) {
    state[key] = true;
    saveJdpmState(state);
    console.log(`✅ Énigme ${gameId} validée !`);
  }
  return state;
}

// ------------------------------------------
// Réinitialiser toute la progression
// ------------------------------------------
function resetJdpmState() {
  try {
    localStorage.removeItem(JDPM_STATE_KEY);
    console.log('🗑️ État JDPM remis à zéro');
  } catch (e) {
    console.warn('⚠️ state.js – Impossible de réinitialiser:', e);
  }
}

// ------------------------------------------
// Vérifier si tous les jeux sont terminés
// ------------------------------------------
function isAllJdpmGamesDone() {
  const state = loadJdpmState();
  return (
    state.game_1_done &&
    state.game_2_done &&
    state.game_3_done &&
    state.game_4_done &&
    state.game_5_done
  );
}

// ------------------------------------------
// Compter le nombre de jeux terminés
// ------------------------------------------
function getJdpmProgress() {
  const state = loadJdpmState();
  return Object.values(state).filter(Boolean).length;
}

// ------------------------------------------
// Exporter pour les modules ES6 (si besoin)
// ------------------------------------------
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    loadJdpmState,
    saveJdpmState,
    markJdpmGameDone,
    resetJdpmState,
    isAllJdpmGamesDone,
    getJdpmProgress,
  };
}
