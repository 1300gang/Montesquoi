# STORY-020 : Jeu 1 - Réalité Augmentée (AR)

## 📌 Métadonnées
- **ID** : STORY-020
- **Titre** : Jeu 1 - Réalité Augmentée avec MindAR.js
- **Priorité** : ⭐⭐⭐⭐ (High)
- **Estimation** : 6h
- **Dépendances** : 
  - STORY-001 (Initialisation du projet)
  - STORY-002 (Mode hors ligne)
  - STORY-003 (Multilingue)
  - STORY-010 (Page HUB)
- **Fichiers impactés** :
  - `game-1.html` (nouveau)
  - `css/game-1.css` (nouveau)
  - `js/lib/aframe.min.js` (téléchargé)
  - `js/lib/mindar-image-aframe.prod.js` (téléchargé)
  - `image/targets.mind` (à créer)

---

## 🎯 Description

Cette story consiste à **créer le Jeu 1 : Réalité Augmentée (AR)**. L'objectif est de :
1. Utiliser **MindAR.js** pour détecter des **cibles imprimées** (images) via la caméra.
2. Afficher un **contenu 3D ou 2D** (ex : une lettre, un indice) lorsque la cible est détectée.
3. **Valider le jeu** une fois que l'utilisateur a trouvé toutes les cibles.
4. **Sauvegarder la progression** dans `localStorage`.
5. **Rediriger vers le HUB** avec un paramètre de succès (`?win=1`).

> **Contexte** : Ce jeu utilise la **caméra du smartphone** pour scanner des images physiques (ex : des cartes imprimées dans l’exposition). Lorsque l’image est reconnue, un **indice** (ex : une lettre) est affiché à l’écran.

---

## ✅ Critères d'Acceptation

- [ ] **Intégration de MindAR.js** :
  - [ ] Les librairies **A-Frame** et **MindAR** sont **téléchargées localement** (pour le hors ligne).
  - [ ] La scène AR est **correctement initialisée**.

- [ ] **Détection des cibles** :
  - [ ] Un fichier `.mind` (ex : `image/targets.mind`) contient les **images cibles** à détecter.
  - [ ] La caméra détecte les cibles et affiche un **contenu superposé** (ex : une lettre).

- [ ] **Affichage du contenu** :
  - [ ] Lorsque une cible est détectée, un **élément visuel** (ex : une lettre) apparaît.
  - [ ] Les lettres détectées sont **affichées dans un mot à trous** (ex : "_ _ _ _" → "C _ _ _" → "C A _ _").

- [ ] **Validation du jeu** :
  - [ ] Une fois toutes les lettres trouvées, un **formulaire de validation** apparaît.
  - [ ] L’utilisateur peut **saisir le mot secret** et le valider.
  - [ ] Si le mot est correct, le jeu est **marqué comme terminé** (`markJdpmGameDone(1)`).
  - [ ] Redirection vers le HUB avec `?win=1`.

- [ ] **Éléments communs** :
  - [ ] **Header** : Bouton "Retour au HUB" + Titre "Jeu 1 - Réalité Augmentée" + Bouton "Info".
  - [ ] **Footer** : Bouton "Activer la caméra" (si la caméra n’est pas déjà active).
  - [ ] **Modal "Info"** : Explication des règles du jeu (via STORY-030).

- [ ] **Sauvegarde** :
  - [ ] La progression (lettres trouvées) est **sauvegardée dans `localStorage`**.
  - [ ] Si l’utilisateur quitte et revient, les lettres déjà trouvées sont **toujours là**.

- [ ] **Multilingue** :
  - [ ] Tous les textes sont **traduits** (fr/en/es).

- [ ] **Hors ligne** :
  - [ ] Le jeu fonctionne **sans connexion Internet** (après le premier chargement).

- [ ] **Mobile** :
  - [ ] Le jeu est **100% compatible mobile** (iOS/Android).
  - [ ] La caméra est **accessible** et **fonctionnelle**.

---

## 🛠️ Tâches Techniques

### 1️⃣ Télécharger les librairies locales
Téléchargez les fichiers suivants et placez-les dans `/js/lib/` :

```bash
# A-Frame (1.4.2)
wget https://cdn.jsdelivr.net/npm/aframe@1.4.2/dist/aframe.min.js -O js/lib/aframe.min.js

# MindAR (1.2.5) - Image Tracking
wget https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js -O js/lib/mindar-image-aframe.prod.js
```

> **Note** : Pour le **mode hors ligne**, il est **obligatoire** de télécharger ces fichiers localement. Les CDN ne fonctionneront pas sans Internet.

---

### 2️⃣ Créer le fichier `.mind` pour les cibles
Le fichier `.mind` contient les **images cibles** que MindAR doit détecter. Pour le créer :

1. **Préparer les images cibles** :
   - Créez **4 images** (ex : `letter-O.png`, `letter-L.png`, `letter-A.png`, `letter-C.png`) dans `/image/letters/`.
   - Ces images doivent être **haute résolution** (min 500x500px) et **contrastées** pour une bonne détection.
   - Exemple : Des lettres sur fond blanc avec une bordure noire.

2. **Compiler les images en `.mind`** :
   - Utilisez l’outil officiel de MindAR : [MindAR Compiler](https://hiukim.github.io/mind-ar-js-doc/tools/compile).
   - Sélectionnez vos images et téléchargez le fichier `.mind` généré.
   - Placez-le dans `/image/targets.mind`.

> **Alternative** : Si vous ne pouvez pas utiliser l’outil en ligne, vous pouvez utiliser le fichier `targets.mind` **déjà présent** dans le projet Montesquoi existant (`/workspace/1300gang__Montesquoi/image/targets.mind`).

---

### 3️⃣ Créer `css/game-1.css`
**Fichier** : `/css/game-1.css`
**Contenu** :
```css
/* ============================================
   GAME-1 CSS
   Styles spécifiques au Jeu 1 (AR)
   ============================================ */

@import url('_variables.css');

/* Réinitialisation pour la scène AR */
html, body {
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  background: #000;
  font-family: var(--font-body);
  color: var(--white);
}

/* Conteneur de la scène AR */
#ar-container {
  position: fixed;
  inset: 0;
  z-index: 0;
}

#ar-container a-scene {
  width: 100%;
  height: 100%;
}

/* Couche UI par-dessus la scène */
#ui-layer {
  position: fixed;
  inset: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: none;
}

/* Header */
#header {
  padding: var(--spacing-sm) var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: all;
  background: rgba(10, 8, 4, 0.7);
  backdrop-filter: blur(6px);
}

#btn-back {
  font-family: var(--font-display);
  font-size: 12px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(201, 168, 76, 0.9);
  text-decoration: none;
  border: 1px solid rgba(201, 168, 76, 0.3);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  background: rgba(10, 8, 4, 0.8);
  cursor: pointer;
  transition: all var(--transition-fast);
}

#btn-back:hover {
  color: var(--orange);
  border-color: var(--orange);
}

#btn-back:active {
  transform: scale(0.95);
}

.header-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 16px;
  color: var(--white);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

/* Mot à trous */
#word-display-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  pointer-events: none;
  margin-top: 20vh;
}

.word-label {
  font-family: var(--font-display);
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(201, 168, 76, 0.7);
  background: rgba(10, 8, 4, 0.7);
  backdrop-filter: blur(6px);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
}

#word-display {
  font-family: var(--font-display);
  font-size: clamp(24px, 8vw, 36px);
  font-weight: 700;
  letter-spacing: 0.3em;
  color: var(--orange);
  background: rgba(10, 8, 4, 0.8);
  backdrop-filter: blur(8px);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--border-radius-md);
  border: 1px solid rgba(201, 168, 76, 0.3);
  min-width: 200px;
  text-align: center;
}

/* Compteur de lettres */
#letter-count {
  font-family: var(--font-display);
  font-size: 12px;
  letter-spacing: 0.15em;
  color: rgba(39, 174, 96, 0.9);
  background: rgba(10, 8, 4, 0.7);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
}

/* Panneau bas */
#bottom-panel {
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  pointer-events: all;
  background: rgba(10, 8, 4, 0.7);
  backdrop-filter: blur(10px);
}

/* Carte d'instruction */
.instr-card {
  background: rgba(10, 8, 4, 0.8);
  border: 1px solid rgba(201, 168, 76, 0.2);
  border-radius: var(--border-radius-sm);
  padding: var(--spacing-sm);
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
}

.instr-icon {
  font-size: 18px;
  flex-shrink: 0;
}

.instr-text {
  font-size: 13px;
  line-height: 1.6;
  color: rgba(245, 240, 232, 0.9);
  font-style: italic;
}

.instr-text strong {
  color: var(--orange);
  font-weight: 400;
  font-style: normal;
}

/* Formulaire de validation */
#validation-wrap {
  display: none;
  flex-direction: column;
  gap: var(--spacing-sm);
}

#validation-wrap.show {
  display: flex;
}

.input-row {
  display: flex;
  gap: var(--spacing-sm);
}

#word-input {
  flex: 1;
  padding: var(--spacing-sm);
  background: rgba(10, 8, 4, 0.9);
  border: 1px solid rgba(201, 168, 76, 0.3);
  border-radius: var(--border-radius-sm);
  color: var(--white);
  font-family: var(--font-display);
  font-size: 16px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  outline: none;
  transition: border-color var(--transition-fast);
}

#word-input::placeholder {
  color: rgba(245, 240, 232, 0.3);
  font-size: 12px;
  letter-spacing: 0.1em;
}

#word-input:focus {
  border-color: rgba(201, 168, 76, 0.6);
}

#word-input.error {
  border-color: var(--magenta) !important;
  animation: shake 0.35s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
}

#btn-validate {
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--teal);
  border: 1px solid rgba(39, 174, 96, 0.4);
  border-radius: var(--border-radius-sm);
  color: var(--white);
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all var(--transition-fast);
}

#btn-validate:active {
  background: var(--cyan);
}

#feedback {
  font-family: var(--font-display);
  font-size: 12px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-align: center;
  min-height: 16px;
  opacity: 0;
  transition: opacity var(--transition-fast);
}

#feedback.show {
  opacity: 1;
}

#feedback.is-error {
  color: var(--magenta);
}

#feedback.is-success {
  color: var(--teal);
}

/* Toast "lettre trouvée" */
#letter-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  z-index: 20;
  background: rgba(10, 8, 4, 0.9);
  border: 1px solid var(--teal);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  pointer-events: none;
  transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.25s ease;
  opacity: 0;
}

#letter-toast.show {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
}

.toast-letter {
  font-family: var(--font-display);
  font-size: 48px;
  font-weight: 700;
  color: var(--teal);
  line-height: 1;
}

.toast-label {
  font-family: var(--font-display);
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(201, 168, 76, 0.8);
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

.win-orn {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  animation: fadeUp 0.5s ease 0.1s both;
}

.win-line {
  width: 44px;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--orange));
}

.win-line.r {
  background: linear-gradient(to left, transparent, var(--orange));
}

.win-diamond {
  width: 6px;
  height: 6px;
  background: var(--orange);
  transform: rotate(45deg);
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
  color: var(--orange);
  letter-spacing: 0.12em;
  text-align: center;
  animation: fadeUp 0.5s ease 0.35s both;
}

.win-word {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 700;
  color: var(--teal);
  letter-spacing: 0.35em;
  text-transform: uppercase;
  animation: fadeUp 0.5s ease 0.45s both;
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
  background: var(--orange);
  border: none;
  border-radius: var(--border-radius-sm);
  color: var(--black);
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

/* Particules de célébration */
.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  animation: pfall linear forwards;
}

@keyframes pfall {
  0% {
    transform: translateY(-10px) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(110vh) rotate(540deg);
    opacity: 0;
  }
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

/* Loader MindAR */
#ar-loader {
  position: fixed;
  inset: 0;
  z-index: 5;
  background: var(--black);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  transition: opacity 0.6s ease;
}

#ar-loader.hide {
  opacity: 0;
  pointer-events: none;
}

.loader-ring {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 2px solid var(--orange);
  border-top-color: transparent;
  animation: spin 1.1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loader-text {
  font-family: var(--font-display);
  font-size: 12px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(201, 168, 76, 0.8);
}

/* Modal Info (réutilisée depuis le HUB) */
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
  #word-display {
    font-size: 24px;
    padding: var(--spacing-sm) var(--spacing-md);
  }
  
  .toast-letter {
    font-size: 36px;
  }
}
```

---

### 4️⃣ Créer `game-1.html`
**Fichier** : `/game-1.html`
**Contenu complet** :
```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title data-i18n="games.game1.title">Jeu 1 - Réalité Augmentée</title>
  <link rel="manifest" href="/manifest.json">
  <link rel="stylesheet" href="css/_variables.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/game-base.css">
  <link rel="stylesheet" href="css/game-1.css">
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

  <!-- Loader -->
  <div id="ar-loader">
    <div class="loader-ring"></div>
    <p class="loader-text" data-i18n="misc.loading">Initialisation du scanner...</p>
  </div>

  <!-- Scène A-Frame -->
  <div id="ar-container"></div>

  <!-- Toast "lettre trouvée" -->
  <div id="letter-toast">
    <div class="toast-letter" id="toast-letter">A</div>
    <div class="toast-label" id="toast-label" data-i18n="games.game1.targetFound">Lettre trouvée !</div>
  </div>

  <!-- UI layer -->
  <div id="ui-layer">
    <div id="header">
      <a href="hub.html" id="btn-back" onclick="stopAR()" data-i18n="buttons.backToHub">← HUB</a>
      <span class="header-title" data-i18n="games.game1.title">Jeu 1 - Réalité Augmentée</span>
      <button class="info-btn" id="infoBtn" aria-label="Info" data-i18n-title="buttons.info">ⓘ</button>
    </div>

    <!-- Mot à trous -->
    <div id="word-display-wrap">
      <span class="word-label" data-i18n="games.game1.subtitle">Mot secret</span>
      <div id="word-display">· · · ·</div>
      <span id="letter-count" data-i18n="misc.loading">0 / 0 lettres</span>
    </div>

    <div id="bottom-panel">
      <div class="instr-card" id="instr-card">
        <span class="instr-icon">🔍</span>
        <p class="instr-text" data-i18n="games.game1.instructions">
          Pointez la caméra vers les <strong>cartes imprimées</strong> pour révéler les lettres cachées.
        </p>
      </div>

      <!-- Formulaire de validation -->
      <div id="validation-wrap">
        <div class="input-row">
          <input
            id="word-input"
            type="text"
            placeholder="Mot secret…"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="characters"
            spellcheck="false"
            enterkeyhint="done"
            data-i18n-placeholder="games.game3.placeholder"
          >
          <button id="btn-validate" data-i18n="buttons.validate">OK</button>
        </div>
        <div id="feedback">·</div>
      </div>
    </div>
  </div>

  <!-- Écran de victoire -->
  <div id="win-screen">
    <div class="particles" id="particles"></div>
    <div class="win-orn">
      <div class="win-line"></div>
      <div class="win-diamond"></div>
      <div class="win-line r"></div>
    </div>
    <div class="win-icon">🏆</div>
    <div class="win-title" data-i18n="modals.success.title">Mot déchiffré !</div>
    <div class="win-word" id="win-word-display"></div>
    <p class="win-sub" data-i18n="games.game1.instructions">La couche verte du masque se dissipe dans l'ombre…</p>
    <a href="hub.html?win=1" id="btn-hub" data-i18n="buttons.backToHub">← Retour au HUB</a>
  </div>

  <!-- Modal Info -->
  <div id="info-modal">
    <div class="modal-box">
      <button class="modal-close" id="infoModalClose" aria-label="Fermer">✕</button>
      <div class="modal-emoji">🔍</div>
      <h2 class="modal-title" data-i18n="games.game1.title">Jeu 1 - Réalité Augmentée</h2>
      <p class="modal-text" data-i18n="games.game1.instructions">
        Pointez la caméra vers les cartes imprimées dans l'exposition pour révéler les lettres cachées. Reconstituez le mot secret pour valider ce jeu.
      </p>
      <button class="modal-cta" id="infoModalCta" data-i18n="modals.welcome.cta">OK</button>
    </div>
  </div>

  <!-- Scripts -->
  <script src="js/state.js"></script>
  <script src="js/utils.js"></script>
  <script src="js/translations.js"></script>
  <script src="js/lib/aframe.min.js"></script>
  <script src="js/lib/mindar-image-aframe.prod.js"></script>
  
  <script>
    // ==========================================
    // CONFIGURATION
    // ==========================================
    const TARGET_FILE = 'image/targets.mind';
    
    // Une entrée par target imprimée, dans le même ordre que lors de la compilation du .mind
    const TARGETS = [
      { letter: 'O', label: 'Première lettre' },
      { letter: 'L', label: 'Deuxième lettre' },
      { letter: 'A', label: 'Troisième lettre' },
      { letter: 'C', label: 'Quatrième lettre' }
    ];
    
    // Mot secret (lettres des targets dans l'ordre du mot)
    const SECRET_WORD = 'OLAC';

    // ==========================================
    // ÉTAT LOCAL
    // ==========================================
    let collectedLetters = [];
    let arScene = null;
    let gameWon = false;

    // Restaurer les lettres déjà collectées depuis state.js
    function initCollectedLetters() {
      const state = loadJdpmState();
      // Si le jeu est déjà terminé, on ne fait rien
      if (state.game_1_done) {
        gameWon = true;
      }
      // Sinon, on charge les lettres sauvegardées (à implémenter si besoin)
      // Pour l'instant, on part de zéro
      collectedLetters = [];
    }

    // ==========================================
    // CONSTRUCTION DE LA SCÈNE A-FRAME
    // ==========================================
    function buildScene() {
      let entities = '';

      TARGETS.forEach((t, index) => {
        const alreadyFound = collectedLetters.includes(t.letter.toUpperCase());
        const letterPng = `image/letters/letter-${t.letter.toUpperCase()}.png`;

        if (alreadyFound) {
          // Déjà trouvée : afficher la lettre directement
          entities += `
            <a-entity mindar-image-target="targetIndex: ${index}">
              <a-image
                src="${letterPng}"
                width="1" height="1"
                position="0 0 0.001"
                animation="property: scale; from: 0 0 0; to: 1 1 1; dur: 400; easing: easeOutBack">
              </a-image>
            </a-entity>
          `;
        } else {
          // Pas encore trouvée : entité vide
          entities += `
            <a-entity mindar-image-target="targetIndex: ${index}" id="target-entity-${index}">
            </a-entity>
          `;
        }
      });

      const sceneHTML = `
        <a-scene
          id="ar-scene"
          mindar-image="imageTargetSrc: ${TARGET_FILE}; uiScanning: no; maxTrack: ${TARGETS.length}"
          color-space="sRGB"
          renderer="colorManagement: true"
          vr-mode-ui="enabled: false"
          device-orientation-permission-ui="enabled: false"
          embedded>

          <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
          ${entities}
          <a-light type="ambient" intensity="1.2"></a-light>
          <a-light type="directional" position="1 2 1" intensity="1"></a-light>
        </a-scene>
      `;

      document.getElementById('ar-container').innerHTML = sceneHTML;
      arScene = document.getElementById('ar-scene');

      if (arScene.hasLoaded) {
        onSceneLoaded();
      } else {
        arScene.addEventListener('loaded', onSceneLoaded, { once: true });
      }
    }

    function onSceneLoaded() {
      document.getElementById('ar-loader').classList.add('hide');
      attachTargetListeners();
      refreshWordDisplay();
      console.log('✅ Scène AR chargée');
    }

    // ==========================================
    // LISTENERS SUR LES TARGETS
    // ==========================================
    function attachTargetListeners() {
      const targetEntities = document.querySelectorAll('[mindar-image-target]');

      targetEntities.forEach((entity) => {
        const attr = entity.getAttribute('mindar-image-target');
        let targetIndex;
        if (typeof attr === 'object' && attr !== null) {
          targetIndex = parseInt(attr.targetIndex);
        } else {
          const parts = String(attr).split(':');
          targetIndex = parseInt(parts[parts.length - 1].trim());
        }

        if (isNaN(targetIndex) || targetIndex >= TARGETS.length) return;

        const target = TARGETS[targetIndex];

        entity.addEventListener('targetFound', () => {
          console.log(`🎯 Target ${targetIndex} trouvée → lettre "${target.letter}"`);
          collectLetter(targetIndex, target);
        });

        entity.addEventListener('targetLost', () => {
          console.log(`Target ${targetIndex} perdue`);
        });
      });
    }

    // ==========================================
    // COLLECTE D'UNE LETTRE
    // ==========================================
    function collectLetter(targetIndex, target) {
      const letter = target.letter.toUpperCase();

      // Déjà collectée → rappel visuel
      if (collectedLetters.includes(letter)) {
        showToast(letter, t('games.game1.targetFound'));
        return;
      }

      // Sauvegarder la lettre
      collectedLetters.push(letter);

      // Mettre à jour le plan AR
      const entity = document.getElementById(`target-entity-${targetIndex}`);
      if (entity) {
        const letterPng = `image/letters/letter-${letter}.png`;
        entity.innerHTML = `
          <a-image
            src="${letterPng}"
            width="1" height="1"
            position="0 0 0.001"
            scale="0 0 0"
            animation="property: scale; from: 0 0 0; to: 1 1 1; dur: 500; easing: easeOutBack">
          </a-image>
        `;
      }

      // Toast
      showToast(letter, target.label || t('games.game1.targetFound'));

      // Refresh affichage
      refreshWordDisplay();

      // Vérifier si toutes les lettres sont collectées
      checkAllCollected();
    }

    // ==========================================
    // AFFICHAGE MOT À TROUS
    // ==========================================
    function refreshWordDisplay() {
      const wordEl = document.getElementById('word-display');
      const countEl = document.getElementById('letter-count');

      const needed = [...new Set(SECRET_WORD.toUpperCase().split(''))];
      const found = needed.filter(l => collectedLetters.includes(l));

      let display = '';
      for (const char of SECRET_WORD.toUpperCase()) {
        if (collectedLetters.includes(char)) {
          display += `<span style="color:var(--teal)">${char}</span> `;
        } else {
          display += `<span style="color:rgba(245,240,232,0.25)">_</span> `;
        }
      }

      wordEl.innerHTML = display.trim();
      countEl.textContent = `${found.length} / ${needed.length} ${t('games.game3.placeholder').toLowerCase()}`;
    }

    // ==========================================
    // VÉRIFICATION TOUTES LES LETTRES COLLECTÉES
    // ==========================================
    function checkAllCollected() {
      const needed = [...new Set(SECRET_WORD.toUpperCase().split(''))];
      const allFound = needed.every(l => collectedLetters.includes(l));

      if (allFound) {
        console.log('✅ Toutes les lettres collectées !');
        document.getElementById('validation-wrap').classList.add('show');
        document.getElementById('instr-card').querySelector('.instr-text').innerHTML = t('games.game1.instructions').replace('cartes imprimées', '<strong>' + t('games.game1.instructions').split('cartes imprimées')[1].split('pour')[0] + '</strong>');
        setTimeout(() => {
          document.getElementById('word-input').focus();
        }, 400);
      }
    }

    // ==========================================
    // TOAST LETTRE
    // ==========================================
    let toastTimeout = null;

    function showToast(letter, label) {
      const toast = document.getElementById('letter-toast');
      document.getElementById('toast-letter').textContent = letter;
      document.getElementById('toast-label').textContent = label;

      if (toastTimeout) clearTimeout(toastTimeout);

      toast.classList.add('show');
      toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
      }, 1800);
    }

    // ==========================================
    // VALIDATION DU MOT
    // ==========================================
    function normalize(str) {
      return str.trim().toUpperCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    function validateWord() {
      const input = document.getElementById('word-input');
      const raw = normalize(input.value);
      const secret = normalize(SECRET_WORD);

      if (!raw) {
        showFeedback(t('modals.error.text'), true);
        triggerShake();
        return;
      }

      if (raw === secret) {
        onSuccess(raw);
      } else {
        showFeedback(t('modals.error.text'), true);
        triggerShake();
      }
    }

    function triggerShake() {
      const inp = document.getElementById('word-input');
      inp.classList.remove('error');
      void inp.offsetWidth;
      inp.classList.add('error');
      setTimeout(() => inp.classList.remove('error'), 400);
    }

    function showFeedback(msg, isError) {
      const fb = document.getElementById('feedback');
      fb.textContent = msg;
      fb.className = 'show ' + (isError ? 'is-error' : 'is-success');
    }

    // ==========================================
    // VICTOIRE
    // ==========================================
    function onSuccess(word) {
      if (gameWon) return;
      gameWon = true;
      stopAR();
      markJdpmGameDone(1);

      document.getElementById('win-word-display').textContent = word;
      spawnParticles();
      setTimeout(() => document.getElementById('win-screen').classList.add('show'), 300);
    }

    function spawnParticles() {
      const c = document.getElementById('particles');
      c.innerHTML = '';
      const cols = ['#c9a84c', '#e8d49a', '#27ae60', '#1a4a2e', '#a8e6cf', '#2ecc71'];
      for (let i = 0; i < 44; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const sz = 4 + Math.random() * 6;
        Object.assign(p.style, {
          left: Math.random() * 100 + '%',
          background: cols[Math.floor(Math.random() * cols.length)],
          width: sz + 'px',
          height: sz + 'px',
          borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          animationDuration: (1.4 + Math.random() * 2) + 's',
          animationDelay: (Math.random() * 0.8) + 's',
        });
        c.appendChild(p);
      }
    }

    // ==========================================
    // ARRÊT AR
    // ==========================================
    function stopAR() {
      try {
        const scene = document.getElementById('ar-scene');
        if (scene && scene.systems && scene.systems['mindar-image-system']) {
          scene.systems['mindar-image-system'].stop();
        }
      } catch (e) {
        console.warn('stopAR:', e);
      }
      document.getElementById('ar-container').innerHTML = '';
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
    // EVENTS
    // ==========================================
    document.getElementById('btn-validate').addEventListener('click', validateWord);
    document.getElementById('word-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); validateWord(); }
    });

    // ==========================================
    // INIT
    // ==========================================
    window.addEventListener('load', async () => {
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
      
      initCollectedLetters();
      buildScene();

      // Si toutes les lettres étaient déjà sauvegardées
      const needed = [...new Set(SECRET_WORD.toUpperCase().split(''))];
      const allFound = needed.every(l => collectedLetters.includes(l));
      if (allFound) {
        checkAllCollected();
      }
    });

    window.addEventListener('beforeunload', stopAR);
  </script>
</body>
</html>
```

---

## 🧪 Tests

### 1️⃣ **Test de la scène AR**
1. Ouvrir `game-1.html` sur un **smartphone** (iOS/Android).
2. Autoriser l’accès à la **caméra**.
3. Vérifier que la scène AR se charge **sans erreur**.
4. Pointer la caméra vers une **image cible** (ex : une des lettres imprimées) :
   - La lettre doit **apparaître à l’écran**.
   - Un **toast** doit s’afficher : "Lettre trouvée !".
   - La lettre doit **s’ajouter au mot à trous**.

### 2️⃣ **Test du mot à trous**
1. Trouver **2 lettres** (ex : O et L).
2. Vérifier que le mot à trous affiche : **"O L _ _"**.
3. Trouver les **2 lettres restantes** : le mot doit être **complet** ("O L A C").

### 3️⃣ **Test de la validation**
1. Une fois toutes les lettres trouvées, le **formulaire de validation** doit apparaître.
2. Saisir le **bon mot** ("OLAC") :
   - Le jeu doit être **marqué comme terminé** (`game_1_done: true`).
   - L’écran de victoire doit s’afficher.
   - Redirection vers le HUB avec `?win=1`.
3. Saisir un **mauvais mot** : un message d’erreur doit s’afficher.

### 4️⃣ **Test de la sauvegarde**
1. Trouver **2 lettres** (ex : O et L).
2. **Fermer le navigateur** et le rouvrir.
3. Recharger `game-1.html` : les **2 lettres** doivent être **toujours là**.

### 5️⃣ **Test du bouton "Retour au HUB"**
1. Cliquer sur "← HUB" : redirection vers `hub.html`.
2. Vérifier que la **progression est sauvegardée** (le Jeu 1 doit être marqué comme ✅ dans le HUB).

### 6️⃣ **Test de la modal "Info"**
1. Cliquer sur le bouton "ⓘ" : la modal doit s’afficher.
2. Vérifier que le texte est **traduit** (fr/en/es).
3. Fermer la modal : elle doit **disparaître**.

### 7️⃣ **Test multilingue**
1. Changer de langue via le sélecteur : tous les textes doivent être **traduits**.
2. Vérifier que le **mot à trous** et les **toasts** sont traduits.

### 8️⃣ **Test hors ligne**
1. Charger `game-1.html` **une première fois** (avec Internet).
2. **Désactiver le réseau**.
3. Recharger la page : elle doit fonctionner **sans erreur**.
4. Scanner une cible : la détection doit **toujours fonctionner**.

### 9️⃣ **Test mobile (iOS/Android)**
1. Ouvrir `game-1.html` sur un **iPhone** et un **Android**.
2. Vérifier que :
   - La caméra est **accessible**.
   - Les cibles sont **détectées**.
   - Le jeu est **jouable** de bout en bout.

---

## 📝 Notes

- **MindAR.js** : Cette librairie utilise **WebAR** (pas besoin d’app dédiée). Elle fonctionne sur **Chrome (Android)** et **Safari (iOS 13+)**.
- **Images cibles** : Les images doivent être **haute résolution** et **contrastées** pour une bonne détection. Évitez les images trop sombres ou floues.
- **Mot secret** : Le mot `SECRET_WORD` peut être **modifié** pour coller à votre exposition (ex : "MAD", "DESIGN").
- **Fichier `.mind`** : Si vous utilisez un autre fichier `.mind`, mettez à jour `TARGET_FILE` et `TARGETS`.
- **Performance** : MindAR.js peut être **gourmand en batterie**. Optimisez le nombre de cibles (max 10-20).

---

## 🔗 Dépendances pour les prochaines stories

Cette story est **indépendante** des autres jeux, mais elle est **requise** pour :
- STORY-025 (Page de réussite globale, si vous voulez afficher un message spécial pour le Jeu 1).

---

## 📚 Ressources
- [MindAR.js - Documentation](https://hiukim.github.io/mind-ar-js-doc/)
- [MindAR.js - GitHub](https://github.com/hiukim/mind-ar-js)
- [A-Frame - Documentation](https://aframe.io/docs/)
- [MindAR Compiler](https://hiukim.github.io/mind-ar-js-doc/tools/compile) (pour créer le `.mind`)
- [WebAR Test](https://webar-test.glitch.me/) (pour tester la compatibilité)

---

## ⚠️ Problèmes Connus et Solutions

| **Problème**                          | **Solution**                                                                                     |
|---------------------------------------|-------------------------------------------------------------------------------------------------|
| Caméra non accessible                  | Vérifier que le site est servi via **HTTPS** ou `localhost`. Sur iOS, autoriser l’accès à la caméra. |
| Cibles non détectées                   | Vérifier que les images sont **nettes** et **bien éclairées**. Utiliser des images avec un **fond uni**. |
| Scène AR ne se charge pas               | Vérifier que les fichiers `aframe.min.js` et `mindar-image-aframe.prod.js` sont **bien chargés**. |
| Toast ne s’affiche pas                 | Vérifier que `showToast()` est appelé avec les bons paramètres.                                |
| Mot à trous ne se met pas à jour        | Vérifier que `refreshWordDisplay()` est appelé après chaque collecte de lettre.              |
| Validation ne fonctionne pas            | Vérifier que `SECRET_WORD` est en **majuscules** et que `normalize()` est utilisé.              |
| Jeu marqué comme terminé mais pas de redirection | Vérifier que `markJdpmGameDone(1)` est appelé et que l’URL est `hub.html?win=1`. |

---

## ✅ Checklist de Validation

- [ ] Les librairies **A-Frame** et **MindAR** sont téléchargées localement.
- [ ] Le fichier `image/targets.mind` existe et contient les **bonnes cibles**.
- [ ] `css/game-1.css` est créé et fonctionnel.
- [ ] `game-1.html` est **complètement fonctionnel** (scène AR, mot à trous, validation).
- [ ] La **caméra détecte les cibles** et affiche les lettres.
- [ ] Le **mot à trous** se met à jour dynamiquement.
- [ ] La **validation** fonctionne (bon/mauvais mot).
- [ ] Le jeu est **marqué comme terminé** dans `localStorage`.
- [ ] La **redirection vers le HUB** fonctionne (`?win=1`).
- [ ] Le **bouton "Retour au HUB"** fonctionne.
- [ ] La **modal "Info"** s’affiche et est traduite.
- [ ] Le **sélecteur de langue** est intégré et fonctionnel.
- [ ] Le jeu fonctionne **hors ligne** (après le premier chargement).
- [ ] Le jeu est **testé sur mobile** (iOS/Android).
- [ ] Aucun erreur dans la console.

---

## 🎉 Livrable

À la fin de cette story, vous aurez :
✅ Un **jeu AR complet** avec MindAR.js.
✅ Une **détection de cibles** fonctionnelle.
✅ Un **mot à trous** dynamique.
✅ Une **validation du mot secret**.
✅ Une **intégration avec le HUB** (progression sauvegardée).
✅ Un **design responsive** (mobile-first).
✅ Un **système multilingue** (fr/en/es).

---

**Prochaine étape** : [STORY-021 - Jeu 2 (NFC/QR Code)](STORY-021_game-2.md)
