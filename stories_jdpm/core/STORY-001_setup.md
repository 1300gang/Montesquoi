# STORY-001 : Initialisation du Projet

## 📌 Métadonnées
- **ID** : STORY-001
- **Titre** : Initialisation du projet (structure des dossiers et fichiers de base)
- **Priorité** : ⭐⭐⭐⭐⭐ (High)
- **Estimation** : 4h
- **Dépendances** : Aucune
- **Fichiers impactés** :
  - `css/_variables.css` (nouveau)
  - `css/base.css` (nouveau)
  - `css/game-base.css` (nouveau)
  - `js/state.js` (nouveau, fusion de `state_jdpm.js`)
  - `js/utils.js` (nouveau)
  - `image/placeholders/` (nouveau dossier)
  - `hub.html` (modifié)
  - `game-1.html` à `game-5.html` (nouveaux)
  - `success.html` (nouveau)

---

## 🎯 Description

Cette story consiste à **initialiser la structure du projet** pour les Journées du Patrimoine et Matrimoine (JDPM). L'objectif est de :
1. Créer une **arborescence modulaire** (dossiers `css/`, `js/`, `image/`).
2. Définir les **variables CSS globales** (couleurs, polices).
3. Créer les **fichiers de base** (CSS, JS) réutilisables par toutes les pages.
4. Préparer les **placeholders** pour les images (logos, QCM).
5. **Nettoyer** les fichiers existants (supprimer les doublons, fusionner `state_jdpm.js` dans `state.js`).

---

## ✅ Critères d'Acceptation

- [ ] **Dossiers créés** :
  - `css/` (avec `_variables.css`, `base.css`, `game-base.css`)
  - `js/` (avec `state.js`, `utils.js`)
  - `image/placeholders/` (avec `mad-logo.png`, `1300gang-logo.png`, `jpm-logo.png`)
  - `image/qr-targets/` (vide pour l'instant)
  - `image/qcm/` (avec `qcm-1.webp` à `qcm-4.webp` en placeholders)

- [ ] **Fichiers CSS de base** :
  - `_variables.css` : Contient toutes les **variables CSS** (couleurs, polices, etc.).
  - `base.css` : Contient le **reset CSS** et les styles globaux (background, typographie).
  - `game-base.css` : Contient les styles **communs à tous les jeux** (header, footer, boutons).

- [ ] **Fichiers JS de base** :
  - `state.js` : Fusion de `state_jdpm.js` et `state.js` existants, avec gestion des 5 jeux.
  - `utils.js` : Fonctions utilitaires (ex : normalisation de texte, gestion des erreurs).

- [ ] **Placeholders** :
  - Images placeholder pour les logos (MAD, 1300gang, JPM).
  - Images placeholder pour le QCM (4 images `.webp`).

- [ ] **Fichiers HTML** :
  - `hub.html` : Structure de base (sans contenu, juste le squelette).
  - `game-1.html` à `game-5.html` : Squelettes vides avec liens vers CSS/JS.
  - `success.html` : Squelette vide.

- [ ] **Propreté du code** :
  - Pas de doublons dans les fichiers CSS/JS.
  - Commentaires clairs pour chaque section.

---

## 🛠️ Tâches Techniques

### 1️⃣ Créer les dossiers
```bash
mkdir -p css js image/placeholders image/qr-targets image/qcm
```

### 2️⃣ Créer `css/_variables.css`
**Contenu** :
```css
/* ============================================
   VARIABLES CSS GLOBALES
   JDPM - Journées du Patrimoine et Matrimoine
   ============================================ */

:root {
  /* Couleurs */
  --white: #FFFFFF;
  --pink: #F6BACC;
  --teal: #239DAB;
  --cyan: #37B7C0;
  --blue: #0D4D96;
  --orange: #F49B2E;
  --yellow: #FDD211;
  --cream: #EFDAD2;
  --magenta: #E83C6E;
  --black: #000000;
  --gray: #666666;
  --light-gray: #f0f0f0;
  
  /* Polices */
  --font-display: 'Baloo 2', sans-serif;
  --font-body: 'Nunito', sans-serif;
  
  /* Espacements */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* Bordures */
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 16px;
  --border-radius-xl: 24px;
  
  /* Ombres */
  --box-shadow-sm: 0 2px 4px rgba(13, 77, 150, 0.1);
  --box-shadow-md: 0 4px 8px rgba(13, 77, 150, 0.15);
  --box-shadow-lg: 0 10px 25px rgba(13, 77, 150, 0.2);
  
  /* Transitions */
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;
}
```

### 3️⃣ Créer `css/base.css`
**Contenu** :
```css
/* ============================================
   BASE CSS
   Reset + Styles globaux
   ============================================ */

/* Import des variables */
@import url('_variables.css');

/* Reset CSS */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  -webkit-text-size-adjust: 100%; /* Empêche le redimensionnement sur iOS */
  -webkit-tap-highlight-color: transparent; /* Supprime le surlignage au clic */
}

body {
  min-height: 100vh;
  min-height: 100dvh; /* Pour les mobiles avec barre de navigation */
  font-family: var(--font-body);
  color: var(--blue);
  background: var(--cream);
  /* Texture papier grain (optionnel) */
  background-image:
    radial-gradient(rgba(13, 77, 150, 0.05) 1px, transparent 1px),
    radial-gradient(rgba(13, 77, 150, 0.04) 1px, transparent 1px);
  background-size: 24px 24px, 17px 17px;
  background-position: 0 0, 8px 8px;
  line-height: 1.5;
  overflow-x: hidden; /* Empêche le scroll horizontal */
}

/* Typographie */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-weight: 800;
  color: var(--blue);
  line-height: 1.2;
}

h1 { font-size: clamp(26px, 7vw, 34px); }
h2 { font-size: clamp(22px, 6vw, 28px); }
h3 { font-size: clamp(18px, 5vw, 24px); }

p {
  font-size: 14px;
  line-height: 1.6;
  color: rgba(13, 77, 150, 0.85);
}

a {
  color: var(--teal);
  text-decoration: none;
  cursor: pointer;
}

a:hover {
  text-decoration: underline;
}

/* Boutons */
button {
  font-family: var(--font-display);
  font-weight: 700;
  cursor: pointer;
  border: none;
  border-radius: var(--border-radius-md);
  transition: all var(--transition-fast);
}

button:active {
  transform: scale(0.98);
}

button:focus {
  outline: 2px solid var(--orange);
  outline-offset: 2px;
}

/* Images */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Conteneurs */
.container {
  max-width: 460px;
  width: 100%;
  margin: 0 auto;
  padding: var(--spacing-md);
}

/* Utilitaires */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.mt-xs { margin-top: var(--spacing-xs); }
.mt-sm { margin-top: var(--spacing-sm); }
.mt-md { margin-top: var(--spacing-md); }
.mt-lg { margin-top: var(--spacing-lg); }
.mt-xl { margin-top: var(--spacing-xl); }

.mb-xs { margin-bottom: var(--spacing-xs); }
.mb-sm { margin-bottom: var(--spacing-sm); }
.mb-md { margin-bottom: var(--spacing-md); }
.mb-lg { margin-bottom: var(--spacing-lg); }
.mb-xl { margin-bottom: var(--spacing-xl); }

/* Accessibilité */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Pour les mobiles */
@media (hover: none) {
  /* Styles spécifiques pour les appareils tactiles */
  button:focus:not(:focus-visible) {
    outline: none;
  }
}

/* Animation pour les modales */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Suppression des animations pour les utilisateurs qui préfèrent moins de mouvement */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 4️⃣ Créer `css/game-base.css`
**Contenu** :
```css
/* ============================================
   GAME BASE CSS
   Styles communs à tous les jeux
   ============================================ */

@import url('_variables.css');

/* Conteneur principal des jeux */
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
}

/* Header des jeux (commun à toutes les pages) */
.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 2px dashed var(--teal);
}

/* Bouton retour au HUB */
.back-btn {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 14px;
  color: var(--teal);
  text-decoration: none;
  border: 2px solid var(--teal);
  border-radius: 999px;
  padding: var(--spacing-xs) var(--spacing-md);
  background: var(--white);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.back-btn:hover {
  background: var(--teal);
  color: var(--white);
}

.back-btn:active {
  background: var(--teal);
  color: var(--white);
  transform: translateY(2px);
}

/* Titre du jeu */
.game-title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 22px;
  margin: 0;
  color: var(--blue);
}

/* Bouton Info (ouvre la modal) */
.info-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2px solid var(--blue);
  background: var(--white);
  color: var(--blue);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 3px 0 rgba(13, 77, 150, 0.25);
  transition: all var(--transition-fast);
}

.info-btn:active {
  transform: translateY(2px);
  box-shadow: 0 1px 0 rgba(13, 77, 150, 0.25);
}

/* Footer des jeux (commun) */
.game-footer {
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-md);
  border-top: 2px dashed var(--teal);
}

/* Input pour les réponses (Jeu 3, 4, 5) */
.game-input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  font-family: var(--font-body);
  font-size: 16px;
  border: 2px solid var(--teal);
  border-radius: var(--border-radius-md);
  background: var(--white);
  color: var(--blue);
  transition: border-color var(--transition-fast);
}

.game-input:focus {
  outline: none;
  border-color: var(--orange);
}

.game-input::placeholder {
  color: rgba(13, 77, 150, 0.4);
}

/* Bouton de validation */
.validate-btn {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 15px;
  color: var(--white);
  background: linear-gradient(135deg, var(--orange), var(--magenta));
  border: none;
  border-radius: 999px;
  padding: var(--spacing-sm) var(--spacing-lg);
  cursor: pointer;
  box-shadow: 0 6px 0 rgba(232, 60, 110, 0.35);
  transition: all var(--transition-fast);
  margin-top: var(--spacing-sm);
}

.validate-btn:active {
  transform: translateY(3px);
  box-shadow: 0 2px 0 rgba(232, 60, 110, 0.35);
}

/* Bouton pour activer la caméra (Jeu 1, 2) */
.camera-btn {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 15px;
  color: var(--white);
  background: var(--teal);
  border: none;
  border-radius: var(--border-radius-md);
  padding: var(--spacing-sm) var(--spacing-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.camera-btn:active {
  background: var(--cyan);
}

/* Zone de feedback (erreur/succès) */
.feedback {
  font-family: var(--font-display);
  font-size: 12px;
  margin-top: var(--spacing-xs);
  min-height: 16px;
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.feedback.show {
  opacity: 1;
}

.feedback.error {
  color: var(--magenta);
}

.feedback.success {
  color: var(--teal);
}

/* Bouton indice (Jeu 4) */
.hint-btn {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 12px;
  color: var(--orange);
  background: transparent;
  border: 1px solid var(--orange);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  margin-top: var(--spacing-sm);
}

.hint-btn:hover {
  background: rgba(244, 155, 46, 0.1);
}

/* Cartes pour le QCM (Jeu 5) */
.qcm-card {
  background: var(--white);
  border: 2px solid var(--teal);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
  margin: var(--spacing-sm) 0;
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.qcm-card:hover {
  background: rgba(35, 157, 171, 0.05);
  border-color: var(--cyan);
}

.qcm-card.selected {
  background: rgba(35, 157, 171, 0.1);
  border-color: var(--cyan);
}

.qcm-card img {
  width: 60px;
  height: 60px;
  border-radius: var(--border-radius-sm);
  object-fit: cover;
}

.qcm-card .title {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 14px;
  color: var(--blue);
}
```

### 5️⃣ Créer `js/state.js` (Fusion de `state_jdpm.js` et `state.js`)
**Contenu** :
```javascript
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
```

### 6️⃣ Créer `js/utils.js`
**Contenu** :
```javascript
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
```

### 7️⃣ Créer les placeholders pour les images
- **Logos** :
  - `image/placeholders/mad-logo.png` : Logo du MAD (taille : 200x100px, fond transparent).
  - `image/placeholders/1300gang-logo.png` : Logo 1300gang (taille : 200x100px).
  - `image/placeholders/jpm-logo.png` : Logo Journées du Patrimoine (taille : 200x100px).
- **QCM** :
  - `image/qcm/qcm-1.webp` à `image/qcm/qcm-4.webp` : Images placeholder (taille : 200x200px, format `.webp`).

> **Note** : Pour l'instant, vous pouvez utiliser des images génériques (ex : un carré coloré avec le texte "Image 1").

### 8️⃣ Créer les squelettes HTML
- **`hub.html`** :
  ```html
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>JDPM - Chasse aux Énigmes</title>
    <link rel="stylesheet" href="css/_variables.css">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/hub.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
  </head>
  <body>
    <!-- Contenu à ajouter plus tard -->
    <div class="container">
      <h1>JDPM - Chasse aux Énigmes</h1>
      <p>Page HUB en construction...</p>
    </div>
    <script src="js/state.js"></script>
    <script src="js/utils.js"></script>
  </body>
  </html>
  ```

- **`game-1.html` à `game-5.html`** :
  ```html
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>Jeu 1 - JDPM</title>
    <link rel="stylesheet" href="css/_variables.css">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/game-base.css">
    <link rel="stylesheet" href="css/game-1.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
  </head>
  <body>
    <div class="container">
      <div class="game-container">
        <header class="game-header">
          <a href="hub.html" class="back-btn">← HUB</a>
          <h1 class="game-title">Jeu 1 - Réalité Augmentée</h1>
          <button class="info-btn" id="infoBtn">ⓘ</button>
        </header>
        <main>
          <p>Contenu du jeu en construction...</p>
        </main>
        <footer class="game-footer">
          <!-- Boutons/inputs à ajouter -->
        </footer>
      </div>
    </div>
    <script src="js/state.js"></script>
    <script src="js/utils.js"></script>
  </body>
  </html>
  ```

- **`success.html`** :
  ```html
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>Félicitations ! - JDPM</title>
    <link rel="stylesheet" href="css/_variables.css">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/success.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
  </head>
  <body>
    <div class="container">
      <h1>Félicitations !</h1>
      <p>Page de réussite en construction...</p>
    </div>
    <script src="js/state.js"></script>
    <script src="js/utils.js"></script>
  </body>
  </html>
  ```

---

## 🧪 Tests

### 1️⃣ **Vérification des dossiers**
- [ ] Tous les dossiers (`css/`, `js/`, `image/placeholders/`, etc.) existent.
- [ ] Tous les fichiers CSS/JS de base existent.

### 2️⃣ **Vérification des imports**
- [ ] Les fichiers HTML importent correctement les CSS/JS (pas d'erreurs 404).
- [ ] Les variables CSS sont accessibles dans tous les fichiers.

### 3️⃣ **Vérification des placeholders**
- [ ] Les images placeholder sont présentes et affichables.

### 4️⃣ **Vérification du code**
- [ ] Pas d'erreurs de syntaxe dans les fichiers CSS/JS.
- [ ] Les fonctions `loadJdpmState()` et `markJdpmGameDone()` fonctionnent.

---

## 📝 Notes

- **Priorité** : Cette story doit être terminée **avant toutes les autres**, car elle pose les bases du projet.
- **Modularité** : Le CSS et le JS sont **découpés en modules** pour faciliter la maintenance.
- **Compatibilité** : Les fichiers sont conçus pour fonctionner sur **mobile** (tactile).
- **Placeholders** : Les images placeholder peuvent être **remplacées plus tard** par les vraies images.

---

## 🔗 Dépendances pour les prochaines stories

Cette story est **requise** pour :
- STORY-002 (Mode hors ligne)
- STORY-003 (Multilingue)
- STORY-010 (HUB)
- STORY-020 à STORY-025 (Jeux)
- STORY-030 (Modales)
- STORY-031 (État)
