// ==========================================
// STATE_JDPM.JS — État global partagé
// JDPM MADD · Super 1300
// ==========================================

const JDPM_STATE_KEY = 'jdpm_madd_state';

const DEFAULT_JDPM_STATE = {
  game_1_done: false,
  game_2_done: false,
  game_3_done: false,
  game_4_done: false,
  game_5_done: false,
};

// ── Lecture ──────────────────────────────
function loadJdpmState() {
  try {
    const raw = localStorage.getItem(JDPM_STATE_KEY);
    if (!raw) return { ...DEFAULT_JDPM_STATE };
    return { ...DEFAULT_JDPM_STATE, ...JSON.parse(raw) };
  } catch (e) {
    console.warn('⚠️ state_jdpm.js — impossible de lire localStorage:', e);
    return { ...DEFAULT_JDPM_STATE };
  }
}

// ── Écriture ─────────────────────────────
function saveJdpmState(state) {
  try {
    localStorage.setItem(JDPM_STATE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('⚠️ state_jdpm.js — impossible d\'écrire localStorage:', e);
  }
}

// ── Marquer un jeu comme terminé ────
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

// ── Reset complet ─────────────────────────
function resetJdpmState() {
  try {
    localStorage.removeItem(JDPM_STATE_KEY);
    console.log('🔄 État JDPM MADD remis à zéro');
  } catch (e) {
    console.warn('⚠️ state_jdpm.js — impossible de reset:', e);
  }
}
