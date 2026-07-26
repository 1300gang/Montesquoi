# STORY-010 : Page HUB

## 📌 Métadonnées
- **ID** : STORY-010
- **Titre** : Page HUB (centrale) avec design nouveau et QR code
- **Priorité** : ⭐⭐⭐⭐⭐ (High)
- **Estimation** : 6h
- **Dépendances** : 
  - STORY-001 (Initialisation du projet)
  - STORY-002 (Mode hors ligne)
  - STORY-003 (Multilingue)
- **Fichiers impactés** :
  - `hub.html` (modifié)
  - `css/hub.css` (nouveau)
  - `js/translations.js` (modifié si besoin)

---

## 🎯 Description

Cette story consiste à **créer la page HUB** (centrale) du projet JDPM. Le HUB est la **page d’accueil** qui permet aux utilisateurs de :
1. **Démarrer l’aventure** via un **QR code géant** ou un bouton.
2. **Voir leur progression** (nombre d’énigmes résolues).
3. **Accéder aux 5 jeux** via des cartes cliquables.
4. **Obtenir des informations** sur le jeu (modal d’introduction).
5. **Voir le lot à gagner** (mentionné dès le HUB).

> **Contexte** : Le HUB est la **page principale** du site. Elle doit être **attractive, intuitive et mobile-first**.

---

## ✅ Critères d'Acceptation

- [ ] **Design** :
  - [ ] Design **complètement nouveau** (inspiré de `hub.html` existant mais repensé).
  - [ ] **Couleurs** : Utilisation de la charte graphique (variables CSS).
  - [ ] **Polices** : `Baloo 2` (titres) + `Nunito` (texte).
  - [ ] **Responsive** : 100% compatible mobile (tactile).

- [ ] **QR Code géant** :
  - [ ] Un **QR code** (lien vers `hub.html`) est affiché en **grand format** (ex : 80% de la largeur de l’écran).
  - [ ] Le QR code est **généré dynamiquement** (ou image statique si plus simple).
  - [ ] Message : "Scannez-moi pour commencer !" (traduction en fr/en/es).

- [ ] **Mention du lot** :
  - [ ] Le texte **"Gagnez un livre sur le design !"** est affiché de manière visible.

- [ ] **Cartes des jeux** :
  - [ ] 5 cartes (une par jeu) avec :
    - **Titre** (ex : "Jeu 1 - Réalité Augmentée").
    - **Logo/icône** (placeholder pour l’instant).
    - **Sous-titre** (ex : "Décodez le message caché").
    - **État** : ✅ Résolu / ❌ Non résolu (via `localStorage`).
    - **Bouton "Info"** (ouvre une modal avec les règles du jeu).
  - [ ] Les cartes sont **cliquables** et redirigent vers la page du jeu.

- [ ] **Barre de progression** :
  - [ ] Affiche : "X/5 énigmes résolues" (traduction en fr/en/es).
  - [ ] Barre de progression visuelle (remplissage au fur et à mesure).

- [ ] **Modal d’introduction** :
  - [ ] S’affiche **au premier chargement** (via `localStorage`).
  - [ ] Contient :
    - Titre : "Bienvenue, explorateur·ice !"
    - Texte : Explication des règles.
    - Bouton : "C’est parti !"
  - [ ] Bouton "Info" dans le header ouvre la même modal.

- [ ] **Bouton de réinitialisation** :
  - [ ] Bouton "Réinitialiser le jeu" en bas de page.
  - [ ] Confirme avant de réinitialiser (modal de confirmation).

- [ ] **Sélecteur de langue** :
  - [ ] Intégré en haut à droite (via STORY-003).

- [ ] **Navigation** :
  - [ ] Bouton "Retour" absent (car c’est la page principale).

---

## 🛠️ Tâches Techniques

### 1️⃣ Créer `css/hub.css`
**Fichier** : `/css/hub.css`
**Contenu** :
```css
/* ============================================
   HUB CSS
   Styles spécifiques à la page HUB
   ============================================ */

@import url('_variables.css');

/* Conteneur principal */
.hub-wrap {
  max-width: 460px;
  margin: 0 auto;
  padding: var(--spacing-md) var(--spacing-sm);
}

/* ---------- HEADER ---------- */
.hub-header {
  position: relative;
  text-align: center;
  padding: var(--spacing-sm) var(--spacing-md) var(--spacing-lg);
}

/* Eyebrow (bandeau décoratif) */
.eyebrow {
  display: inline-block;
  font-family: var(--font-body);
  font-weight: 800;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--magenta);
  background: var(--white);
  border: 2px solid var(--magenta);
  border-radius: 999px;
  padding: 4px 14px;
  margin-bottom: var(--spacing-xs);
  transform: rotate(-2deg);
}

/* Titre principal */
.hub-title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(26px, 7vw, 34px);
  line-height: 1.1;
  margin: 0;
  color: var(--blue);
}

.hub-title span {
  color: var(--orange);
}

/* Ligne pointillée sous le titre */
.dashed-rule {
  width: 120px;
  height: 0;
  margin: var(--spacing-md) auto 0;
  border-top: 3px dashed var(--teal);
  opacity: 0.6;
}

/* Message du lot à gagner */
.prize-message {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 14px;
  color: var(--magenta);
  margin-top: var(--spacing-sm);
  background: rgba(232, 60, 110, 0.1);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--border-radius-md);
  display: inline-block;
}

/* ---------- QR CODE SECTION ---------- */
.qr-section {
  text-align: center;
  margin: var(--spacing-lg) 0;
  padding: var(--spacing-md);
  background: var(--white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow-sm);
  border: 2px dashed var(--teal);
}

.qr-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 18px;
  color: var(--blue);
  margin-bottom: var(--spacing-sm);
}

.qr-subtitle {
  font-size: 14px;
  color: rgba(13, 77, 150, 0.7);
  margin-bottom: var(--spacing-md);
}

.qr-code-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md);
  flex-direction: column;
}

.qr-code {
  width: 80vw;
  max-width: 300px;
  height: auto;
  border: 4px solid var(--teal);
  border-radius: var(--border-radius-md);
  box-shadow: var(--box-shadow-md);
}

.qr-instructions {
  font-size: 12px;
  color: rgba(13, 77, 150, 0.6);
  font-style: italic;
}

/* ---------- CARDS (Jeux) ---------- */
.cards {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
}

.game-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  background: var(--white);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-md);
  text-align: left;
  border: none;
  width: 100%;
  cursor: pointer;
  box-shadow: var(--box-shadow-sm);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal), background var(--transition-normal);
  overflow: hidden;
}

/* Perforation entre le stub et le contenu */
.game-card::before {
  content: "";
  position: absolute;
  left: 64px;
  top: 10px;
  bottom: 10px;
  border-left: 2px dashed rgba(13, 77, 150, 0.18);
}

/* Coin de papier décollé (effet hover) */
.game-card::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 26px;
  height: 26px;
  background: linear-gradient(135deg, transparent 50%, var(--cream) 50%);
  box-shadow: -3px 3px 6px rgba(13, 77, 150, 0);
  transition: width var(--transition-normal), height var(--transition-normal), box-shadow var(--transition-normal);
}

/* Effet hover (desktop) */
@media (hover: hover) {
  .game-card:hover {
    transform: translateY(-5px) rotate(-0.6deg);
    box-shadow: var(--box-shadow-lg);
  }
  
  .game-card:nth-child(even):hover {
    transform: translateY(-5px) rotate(0.6deg);
  }
  
  .game-card:hover::after {
    width: 34px;
    height: 34px;
    box-shadow: -4px 4px 8px rgba(13, 77, 150, 0.25);
  }
}

/* Effet active (mobile) */
.game-card:active {
  transform: translateY(-1px) scale(0.99);
  box-shadow: var(--box-shadow-sm);
}

/* Stub (numéro du jeu) */
.stub {
  flex: 0 0 46px;
  height: 46px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 19px;
  color: var(--white);
  background: var(--teal);
}

/* Couleurs des stubs par jeu */
.game-card:nth-child(1) .stub { background: var(--teal); }
.game-card:nth-child(2) .stub { background: var(--cyan); }
.game-card:nth-child(3) .stub { background: var(--orange); }
.game-card:nth-child(4) .stub { background: var(--blue); }
.game-card:nth-child(5) .stub { background: var(--magenta); }

/* Contenu de la carte */
.card-body {
  flex: 1;
  min-width: 0;
}

.card-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 16px;
  margin: 0 0 var(--spacing-xs);
  color: var(--blue);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-sub {
  font-size: 12.5px;
  font-weight: 600;
  color: rgba(13, 77, 150, 0.62);
  margin: 0;
}

/* État "Résolu" */
.status {
  flex: 0 0 30px;
  height: 30px;
  border-radius: 50%;
  border: 2.5px solid rgba(13, 77, 150, 0.28);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-normal);
}

.status svg {
  width: 15px;
  height: 15px;
  opacity: 0;
  transform: scale(0.5);
  transition: all var(--transition-fast);
}

/* Carte résolue */
.game-card.done {
  background: linear-gradient(0deg, rgba(253, 210, 17, 0.16), rgba(253, 210, 17, 0.16)), var(--white);
}

.game-card.done .status {
  background: var(--magenta);
  border-color: var(--magenta);
  animation: stamp 0.35s ease;
}

.game-card.done .status svg {
  opacity: 1;
  transform: scale(1);
}

.game-card.done .status svg path {
  stroke: var(--white);
}

@keyframes stamp {
  0% { transform: scale(0.4) rotate(-18deg); }
  60% { transform: scale(1.15) rotate(4deg); }
  100% { transform: scale(1) rotate(0); }
}

/* ---------- PROGRESS BAR (fixed bottom) ---------- */
.progress-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--white);
  padding: var(--spacing-sm) var(--spacing-md) calc(var(--spacing-sm) + env(safe-area-inset-bottom));
  box-shadow: 0 -4px 14px rgba(13, 77, 150, 0.14);
  z-index: 20;
}

.progress-inner {
  max-width: 460px;
  margin: 0 auto;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 13px;
  color: var(--blue);
  margin-bottom: var(--spacing-xs);
}

.progress-label b {
  color: var(--magenta);
  font-size: 15px;
}

.progress-track {
  position: relative;
  height: 14px;
  border-radius: 999px;
  background: var(--cream);
  overflow: hidden;
  border: 1.5px solid rgba(13, 77, 150, 0.15);
}

.progress-fill {
  height: 100%;
  width: 0%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--pink), var(--cyan) 45%, var(--blue) 100%);
  transition: width 0.5s cubic-bezier(0.4, 1.4, 0.5, 1);
}

/* ---------- MODAL ---------- */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(13, 77, 150, 0.55);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
  z-index: 50;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--transition-normal);
}

.modal-overlay.open {
  opacity: 1;
  pointer-events: auto;
}

.modal-box {
  background: var(--white);
  max-width: 380px;
  width: 100%;
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl) var(--spacing-lg) var(--spacing-lg);
  position: relative;
  text-align: center;
  transform: translateY(14px) scale(0.97);
  transition: transform var(--transition-normal);
  box-shadow: var(--box-shadow-lg);
  clip-path: polygon(
    0% 6px, 4% 0%, 9% 5px, 14% 0%, 19% 5px, 24% 0%, 29% 5px, 34% 0%, 39% 5px, 44% 0%,
    49% 5px, 54% 0%, 59% 5px, 64% 0%, 69% 5px, 74% 0%, 79% 5px, 84% 0%, 89% 5px, 94% 0%, 100% 6px,
    100% 100%, 0% 100%
  );
}

.modal-overlay.open .modal-box {
  transform: translateY(0) scale(1);
}

.modal-emoji {
  font-size: 38px;
  margin-bottom: var(--spacing-xs);
}

.modal-title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 22px;
  color: var(--blue);
  margin: 0 0 var(--spacing-sm);
}

.modal-text {
  font-size: 14.5px;
  line-height: 1.55;
  color: rgba(13, 77, 150, 0.85);
  margin: 0 0 var(--spacing-lg);
}

.modal-cta {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 15px;
  color: var(--white);
  background: linear-gradient(135deg, var(--orange), var(--magenta));
  border: none;
  border-radius: 999px;
  padding: var(--spacing-sm) var(--spacing-xl);
  cursor: pointer;
  box-shadow: 0 6px 0 rgba(232, 60, 110, 0.35);
  transition: all var(--transition-fast);
}

.modal-cta:active {
  transform: translateY(3px);
  box-shadow: 0 2px 0 rgba(232, 60, 110, 0.35);
}

.modal-close {
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
  transition: all var(--transition-fast);
}

.modal-close:hover {
  background: rgba(13, 77, 150, 0.1);
}

/* Reset Button */
.reset-btn-container {
  text-align: center;
  margin-top: var(--spacing-lg);
}

.reset-btn {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 11px;
  color: rgba(13, 77, 150, 0.5);
  background: transparent;
  border: 1px solid rgba(13, 77, 150, 0.2);
  border-radius: 999px;
  padding: var(--spacing-xs) var(--spacing-md);
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all var(--transition-fast);
}

.reset-btn:active {
  background: rgba(13, 77, 150, 0.05);
  color: var(--blue);
}

/* Toast Notification */
.toast {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(-20px);
  background: var(--teal);
  color: var(--white);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 14px;
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: 999px;
  box-shadow: var(--box-shadow-sm);
  z-index: 100;
  opacity: 0;
  transition: transform var(--transition-normal), opacity var(--transition-normal);
  pointer-events: none;
}

.toast.show {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}

/* Responsive */
@media (max-width: 480px) {
  .hub-wrap {
    padding: var(--spacing-sm);
  }
  
  .game-card {
    padding: var(--spacing-sm);
  }
  
  .stub {
    flex: 0 0 40px;
    height: 40px;
    font-size: 16px;
  }
}

/* Accessibilité */
.info-btn:focus-visible,
.game-card:focus-visible,
.modal-close:focus-visible,
.modal-cta:focus-visible {
  outline: 3px dashed var(--orange);
  outline-offset: 3px;
}

/* Suppression des animations pour les utilisateurs qui préfèrent moins de mouvement */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

---

### 2️⃣ Modifier `hub.html`
**Fichier** : `/hub.html`
**Contenu complet** :
```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title data-i18n="hub.title">JDPM - Chasse aux Énigmes</title>
  <link rel="manifest" href="/manifest.json">
  <link rel="stylesheet" href="css/_variables.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/hub.css">
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

  <div class="hub-wrap">
    <header class="hub-header">
      <span class="eyebrow" data-i18n="hub.subtitle">Chasse aux énigmes</span>
      <h1 class="hub-title" data-i18n="hub.title">Super <span>1300</span></h1>
      <div class="dashed-rule"></div>
      <p class="prize-message" data-i18n="hub.prize">Gagnez un livre sur le design !</p>
    </header>

    <!-- Section QR Code -->
    <section class="qr-section">
      <h2 class="qr-title" data-i18n="games.game2.title">Commencez l'aventure</h2>
      <p class="qr-subtitle" data-i18n="games.game2.instructions">Scannez ce QR code pour démarrer</p>
      <div class="qr-code-container">
        <!-- QR Code généré via un service en ligne (ex: https://www.qr-code-generator.com/) -->
        <img 
          src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://1300gang.github.io/Montesquoi/hub.html" 
          alt="QR Code pour commencer l'aventure" 
          class="qr-code"
        >
        <p class="qr-instructions" data-i18n="misc.loading">Chargement en cours...</p>
      </div>
    </section>

    <!-- Cartes des jeux -->
    <main class="cards" id="cardsContainer"></main>

    <!-- Bouton de réinitialisation -->
    <div class="reset-btn-container">
      <button class="reset-btn" id="resetBtn" data-i18n="hub.resetBtn">Réinitialiser le jeu</button>
    </div>
  </div>

  <!-- Barre de progression -->
  <div class="progress-bar">
    <div class="progress-inner">
      <div class="progress-label">
        <span data-i18n="hub.progress">Progression</span>
        <span><b id="progressCount">0</b> <span data-i18n="hub.of">/</span>5 <span data-i18n="hub.enigmasSolved">énigmes résolues</span></span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" id="progressFill"></div>
      </div>
    </div>
  </div>

  <!-- Modal d'introduction -->
  <div class="modal-overlay" id="modalOverlay">
    <div class="modal-box">
      <button class="modal-close" id="modalClose" aria-label="Fermer">✕</button>
      <div class="modal-emoji">🎭</div>
      <h2 class="modal-title" data-i18n="modals.welcome.title">Bienvenue, explorateur·ice !</h2>
      <p class="modal-text" data-i18n="modals.welcome.text">
        5 énigmes t'attendent sur le chemin. Résous-les une par une pour remplir la jauge en bas de l'écran et débloquer le trésor final. Touche une carte pour démarrer une énigme.
      </p>
      <button class="modal-cta" id="modalCta" data-i18n="modals.welcome.cta">C'est parti !</button>
    </div>
  </div>

  <!-- Toast -->
  <div class="toast" id="toast"></div>

  <!-- Scripts -->
  <script src="js/state.js"></script>
  <script src="js/utils.js"></script>
  <script src="js/translations.js"></script>
  <script>
    // Initialiser les traductions
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
    });

    // ---- Données des 5 jeux ----
    const games = [
      { id: 1, title: "Jeu 1 - Réalité Augmentée", sub: "Décodez le message caché", emoji: "🔍", href: "game-1.html" },
      { id: 2, title: "Jeu 2 - NFC/QR Code", sub: "Scannez le code pour continuer", emoji: "📱", href: "game-2.html" },
      { id: 3, title: "Jeu 3 - Recherche d'image", sub: "Trouvez le détail caché", emoji: "🖼️", href: "game-3.html" },
      { id: 4, title: "Jeu 4 - Énigme", sub: "Résolvez l'énigme", emoji: "🤔", href: "game-4.html" },
      { id: 5, title: "Jeu 5 - QCM", sub: "Choisissez la bonne réponse", emoji: "💡", href: "game-5.html" },
    ];

    const checkSvg = `<svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

    const container = document.getElementById('cardsContainer');

    function render() {
      const state = loadJdpmState();
      container.innerHTML = '';
      games.forEach(g => {
        const isDone = state[`game_${g.id}_done`];
        const card = document.createElement('button');
        card.className = 'game-card' + (isDone ? ' done' : '');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-pressed', isDone);
        card.innerHTML = `
          <div class="stub">${isDone ? '✓' : g.id}</div>
          <div class="card-body">
            <p class="card-title">${g.emoji} ${g.title}</p>
            <p class="card-sub">${isDone ? 'Résolue – bravo !' : g.sub}</p>
          </div>
          <div class="status">${checkSvg}</div>
        `;

        card.addEventListener('click', () => {
          window.location.href = g.href;
        });
        container.appendChild(card);
      });
    }

    function updateProgress() {
      const state = loadJdpmState();
      const doneCount = games.filter(g => state[`game_${g.id}_done`]).length;
      document.getElementById('progressCount').textContent = doneCount;
      document.getElementById('progressFill').style.width = (doneCount / games.length * 100) + '%';
    }

    // ---- Modal ----
    const overlay = document.getElementById('modalOverlay');
    function openModal() { overlay.classList.add('open'); }
    function closeModal() { overlay.classList.remove('open'); }

    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalCta').addEventListener('click', closeModal);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

    // ---- Reset Button ----
    document.getElementById('resetBtn').addEventListener('click', () => {
      if (confirm("Réinitialiser toute ta progression ? Toutes les énigmes résolues seront perdues.")) {
        resetJdpmState();
        render();
        updateProgress();
        showToast("Progression réinitialisée !");
      }
    });

    // ---- Toast ----
    function showToast(msg) {
      const toast = document.getElementById('toast');
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    }

    // ---- Check URL Params ----
    function checkUrlParams() {
      const params = new URLSearchParams(window.location.search);
      const winParam = params.get('win');
      if (winParam) {
        const gameId = parseInt(winParam);
        if (gameId >= 1 && gameId <= 5) {
          markJdpmGameDone(gameId);
          showToast(`Bravo ! Énigme ${gameId} résolue ! 🎉`);
          history.replaceState(null, '', window.location.pathname);
        }
      }
    }

    // ---- Initialize ----
    checkUrlParams();
    render();
    updateProgress();

    // Open introductory modal on first visit
    if (!localStorage.getItem('jdpm_visited')) {
      localStorage.setItem('jdpm_visited', 'true');
      window.addEventListener('load', () => setTimeout(openModal, 300));
    }
  </script>
</body>
</html>
```

---

## 🧪 Tests

### 1️⃣ **Test du design**
1. Ouvrir `hub.html` dans un navigateur.
2. Vérifier que :
   - Le **design est nouveau** (pas le même que l’ancien `hub.html`).
   - Les **couleurs** correspondent à la charte graphique.
   - Les **polices** (`Baloo 2`, `Nunito`) sont correctement chargées.
   - Le **QR code** est affiché en grand format.
   - Le **message du lot** est visible.

### 2️⃣ **Test des cartes de jeu**
1. Vérifier que les **5 cartes** sont affichées.
2. Cliquer sur une carte : redirection vers la page du jeu.
3. **Résoudre un jeu** (via `localStorage` manuellement) :
   ```javascript
   localStorage.setItem('jdpm_madd_state', JSON.stringify({ game_1_done: true, game_2_done: false, game_3_done: false, game_4_done: false, game_5_done: false }));
   ```
4. Recharger la page : la carte du **Jeu 1** doit afficher ✅ et "Résolue – bravo !".

### 3️⃣ **Test de la barre de progression**
1. Résoudre **3 jeux** manuellement (via `localStorage`).
2. Recharger la page : la barre de progression doit afficher **"3/5 énigmes résolues"** et être remplie à 60%.

### 4️⃣ **Test de la modal d’introduction**
1. Ouvrir `hub.html` pour la **première fois** : la modal doit s’afficher.
2. Fermer la modal et recharger la page : la modal **ne doit pas** s’afficher.
3. Cliquer sur le bouton "Info" (ⓘ) dans le header : la modal doit s’afficher.

### 5️⃣ **Test du bouton de réinitialisation**
1. Résoudre quelques jeux manuellement.
2. Cliquer sur "Réinitialiser le jeu" : une **confirmation** doit s’afficher.
3. Confirmer : la progression doit être **réinitialisée**.

### 6️⃣ **Test du QR code**
1. Scanner le QR code avec un **smartphone** : il doit rediriger vers `hub.html`.
2. Vérifier que le QR code est **lisible** (test avec plusieurs apps de scan).

### 7️⃣ **Test multilingue**
1. Changer de langue via le sélecteur : tous les textes doivent être **traduits**.
2. Vérifier que le **QR code** et les **cartes de jeu** sont toujours fonctionnels.

### 8️⃣ **Test mobile**
1. Ouvrir `hub.html` sur un **smartphone** (iOS/Android).
2. Vérifier que :
   - Le design est **adapté** (pas de débordement).
   - Les boutons sont **assez grands** pour être cliquables.
   - Le QR code est **scannable**.

---

## 📝 Notes

- **QR Code** : Le QR code peut être **généré dynamiquement** (via une librairie comme `qrcode.js`) ou **statique** (image pré-générée). Pour simplifier, on utilise une **image statique** pointant vers `hub.html`.
- **Design** : Le design est **inspiré de l’ancien `hub.html`** mais **repensé** pour coller à l’univers du MAD et des JDPM.
- **Accessibilité** : Les boutons ont des **attributs `aria-*`** et des **focus styles** pour le clavier.
- **Performance** : Les images (QR code, logos) sont **optimisées** pour le mobile.

---

## 🔗 Dépendances pour les prochaines stories

Cette story est **requise** pour :
- STORY-020 à STORY-025 (Jeux)
- STORY-025 (Page de réussite)

> **Note** : Sans cette story, les utilisateurs **ne pourront pas accéder aux jeux**.

---

## 📚 Ressources
- [QR Code Generator](https://www.qr-code-generator.com/) (pour générer le QR code)
- [QR Server API](https://api.qrserver.com/) (API pour générer des QR codes dynamiquement)
- [qrcode.js](https://github.com/lifthrasiir/qrcode.js) (librairie pour générer des QR codes en JS)
- [CSS Clip-Path](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path) (pour les formes personnalisées)

---

## ⚠️ Problèmes Connus et Solutions

| **Problème**                          | **Solution**                                                                                     |
|---------------------------------------|-------------------------------------------------------------------------------------------------|
| QR code non scannable                 | Vérifier que l’URL est correcte et que le QR code est **assez grand** (min 200x200px).       |
| Cartes de jeu non cliquables          | Vérifier que les boutons ont `cursor: pointer` et un événement `click`.                       |
| Barre de progression ne se met pas à jour | Vérifier que `updateProgress()` est appelé après chaque changement d’état.                  |
| Modal ne s’affiche pas                 | Vérifier que `localStorage.getItem('jdpm_visited')` est bien défini.                           |
| Design cassé sur mobile               | Vérifier les media queries et les tailles des éléments.                                       |

---

## ✅ Checklist de Validation

- [ ] `css/hub.css` est créé et fonctionnel.
- [ ] `hub.html` est **complètement fonctionnel** (design, QR code, cartes, modal).
- [ ] Le **QR code** est scannable et redirige vers `hub.html`.
- [ ] Les **5 cartes de jeu** sont affichées et cliquables.
- [ ] La **barre de progression** se met à jour dynamiquement.
- [ ] La **modal d’introduction** s’affiche au premier chargement.
- [ ] Le **bouton de réinitialisation** fonctionne.
- [ ] Le **sélecteur de langue** est intégré et fonctionnel.
- [ ] Le design est **100% responsive** (mobile-first).
- [ ] Aucun erreur dans la console.
- [ ] Le site est **testé sur mobile** (iOS/Android).

---

## 🎉 Livrable

À la fin de cette story, vous aurez :
✅ Une **page HUB complète** avec design nouveau.
✅ Un **QR code géant** pour démarrer l’aventure.
✅ Des **cartes de jeu cliquables** avec état de progression.
✅ Une **modal d’introduction** pour expliquer les règles.
✅ Une **barre de progression** dynamique.
✅ Un **bouton de réinitialisation** pour recommencer.

---

**Prochaine étape** : [STORY-020 - Jeu 1 (AR)](games/STORY-020_game-1.md)
