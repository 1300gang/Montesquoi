# STORY-022 : Jeu 3 - Recherche d'Image

## 📌 Métadonnées
- **ID** : STORY-022
- **Titre** : Jeu 3 - Recherche d'image (nom du meuble)
- **Priorité** : ⭐⭐⭐⭐ (High)
- **Estimation** : 4h
- **Dépendances** : 
  - STORY-001 (Initialisation du projet)
  - STORY-002 (Mode hors ligne)
  - STORY-003 (Multilingue)
  - STORY-010 (Page HUB)
- **Fichiers impactés** :
  - `game-3.html` (nouveau)
  - `css/game-3.css` (nouveau)
  - `image/qcm/` (dossier pour les images de meubles)

---

## 🎯 Description

Cette story consiste à **créer le Jeu 3 : Recherche d'image**. L'objectif est de :
1. Afficher une **image d'un meuble** de l'exposition.
2. Poser une **question** : "Quel est le nom de ce meuble ?".
3. Permettre à l'utilisateur de **saisir sa réponse** dans un champ `input`.
4. **Valider la réponse** et marquer le jeu comme terminé si elle est correcte.
5. **Sauvegarder la progression** dans `localStorage`.
6. **Rediriger vers le HUB** avec un paramètre de succès (`?win=3`).

> **Contexte** : Ce jeu est **simple** et ne nécessite pas de technologie avancée. Il s'agit d'une **reconnaissance visuelle** de meubles exposés au MAD.

---

## ✅ Critères d'Acceptation

- [ ] **Affichage de l'image** :
  - [ ] Une **image de meuble** est affichée en grand format.
  - [ ] L'image est **responsive** (s'adapte à la taille de l'écran).

- [ ] **Question** :
  - [ ] La question **"Quel est le nom de ce meuble ?"** est affichée sous l'image.
  - [ ] La question est **traduite** (fr/en/es).

- [ ] **Champ de réponse** :
  - [ ] Un **input** permet de saisir le nom du meuble.
  - [ ] Le champ a un **placeholder** (ex : "Saisissez le nom du meuble").
  - [ ] Le placeholder est **traduit** (fr/en/es).

- [ ] **Validation** :
  - [ ] Un bouton **"Valider"** permet de soumettre la réponse.
  - [ ] Si la réponse est **correcte**, le jeu est **marqué comme terminé** (`markJdpmGameDone(3)`).
  - [ ] Si la réponse est **incorrecte**, un message d'erreur s'affiche.
  - [ ] La validation est **insensible à la casse** (ex : "Chaise" = "chaise").
  - [ ] La validation est **insensible aux accents** (ex : "Étagère" = "Etagere").

- [ ] **Éléments communs** :
  - [ ] **Header** : Bouton "Retour au HUB" + Titre "Jeu 3 - Recherche d'image" + Bouton "Info".
  - [ ] **Footer** : Champ `input` + Bouton "Valider".
  - [ ] **Modal "Info"** : Explication des règles du jeu.

- [ ] **Sauvegarde** :
  - [ ] Le jeu est **marqué comme terminé** dans `localStorage`.
  - [ ] Redirection vers le HUB avec `?win=3`.

- [ ] **Multilingue** :
  - [ ] Tous les textes sont **traduits** (fr/en/es).

- [ ] **Hors ligne** :
  - [ ] Le jeu fonctionne **sans connexion Internet** (après le premier chargement).

- [ ] **Mobile** :
  - [ ] Le jeu est **100% compatible mobile** (tactile).
  - [ ] Le champ `input` est **facile à utiliser** sur mobile.

---

## 🛠️ Tâches Techniques

### 1️⃣ Préparer l'image du meuble
Placez une **image de meuble** dans `/image/qcm/` (ex : `meuble-1.jpg` ou `meuble-1.webp`).

> **Note** : Pour l'instant, utilisez un **placeholder** (ex : une image générique de meuble). Vous pourrez la remplacer plus tard par une vraie image de l'exposition.

---

### 2️⃣ Créer `css/game-3.css`
**Fichier** : `/css/game-3.css`
**Contenu** :
```css
/* ============================================
   GAME-3 CSS
   Styles spécifiques au Jeu 3 (Recherche d'image)
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
  border: 3px solid var(--orange);
}

/* Section de l'image */
.image-section {
  margin: var(--spacing-lg) 0;
}

.furniture-image {
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: var(--border-radius-md);
  box-shadow: var(--box-shadow-sm);
  border: 2px solid var(--orange);
}

/* Question */
.question {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 18px;
  color: var(--blue);
  margin: var(--spacing-lg) 0 var(--spacing-md);
}

/* Champ de réponse */
.answer-section {
  margin: var(--spacing-lg) 0;
}

.answer-input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  font-family: var(--font-body);
  font-size: 16px;
  border: 2px solid var(--orange);
  border-radius: var(--border-radius-md);
  background: var(--white);
  color: var(--blue);
  transition: border-color var(--transition-fast);
}

.answer-input:focus {
  outline: none;
  border-color: var(--cyan);
}

.answer-input::placeholder {
  color: rgba(244, 155, 46, 0.4);
}

.answer-input.error {
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

/* Bouton de validation */
.validate-btn {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 15px;
  color: var(--white);
  background: var(--orange);
  border: none;
  border-radius: var(--border-radius-md);
  padding: var(--spacing-sm) var(--spacing-xl);
  cursor: pointer;
  box-shadow: 0 4px 0 rgba(244, 155, 46, 0.3);
  transition: all var(--transition-fast);
  margin-top: var(--spacing-sm);
  width: 100%;
}

.validate-btn:active {
  transform: translateY(2px);
  box-shadow: 0 2px 0 rgba(244, 155, 46, 0.3);
}

/* Feedback */
.feedback {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  min-height: 20px;
  margin-top: var(--spacing-sm);
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
  color: var(--orange);
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
  background: var(--orange);
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
  .furniture-image {
    max-width: 250px;
  }
  
  .validate-btn {
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: 14px;
  }
}

/* Accessibilité */
.answer-input:focus,
.validate-btn:focus,
#info-modal .modal-close:focus,
#btn-hub:focus {
  outline: 3px dashed var(--orange);
  outline-offset: 3px;
}
```

---

### 3️⃣ Créer `game-3.html`
**Fichier** : `/game-3.html`
**Contenu complet** :
```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title data-i18n="games.game3.title">Jeu 3 - Recherche d'image</title>
  <link rel="manifest" href="/manifest.json">
  <link rel="stylesheet" href="css/_variables.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/game-base.css">
  <link rel="stylesheet" href="css/game-3.css">
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
        <h1 class="game-title" data-i18n="games.game3.title">Jeu 3 - Recherche d'image</h1>
        <button class="info-btn" id="infoBtn" aria-label="Info" data-i18n-title="buttons.info">ⓘ</button>
      </header>

      <main>
        <section class="image-section">
          <!-- Image du meuble (placeholder pour l'instant) -->
          <img 
            src="image/qcm/qcm-1.webp" 
            alt="Meuble à identifier" 
            class="furniture-image"
          >
        </section>
        
        <h2 class="question" data-i18n="games.game3.question">Quel est le nom de ce meuble ?</h2>
        
        <section class="answer-section">
          <input 
            type="text" 
            id="answer-input"
            class="answer-input"
            placeholder="Saisissez le nom du meuble"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="words"
            spellcheck="false"
            enterkeyhint="done"
            data-i18n-placeholder="games.game3.placeholder"
          >
          <button id="validate-btn" class="validate-btn" data-i18n="buttons.validate">Valider</button>
          <p id="feedback" class="feedback"></p>
        </section>
      </main>

      <footer class="game-footer">
        <!-- Vide pour ce jeu -->
      </footer>
    </div>
  </div>

  <!-- Écran de victoire -->
  <div id="win-screen">
    <div class="win-icon">🎉</div>
    <h2 class="win-title" data-i18n="modals.success.title">Félicitations !</h2>
    <p class="win-sub" data-i18n="games.game3.correct">Bravo ! C'est la bonne réponse.</p>
    <a href="hub.html?win=3" id="btn-hub" data-i18n="buttons.backToHub">Retour au HUB</a>
  </div>

  <!-- Modal Info -->
  <div id="info-modal">
    <div class="modal-box">
      <button class="modal-close" id="infoModalClose" aria-label="Fermer">✕</button>
      <div class="modal-emoji">🖼️</div>
      <h2 class="modal-title" data-i18n="games.game3.title">Jeu 3 - Recherche d'image</h2>
      <p class="modal-text" data-i18n="games.game3.instructions">
        Observez attentivement l'image du meuble et saisissez son nom pour valider ce jeu.
      </p>
      <button class="modal-cta" id="infoModalCta" data-i18n="modals.welcome.cta">OK</button>
    </div>
  </div>

  <!-- Scripts -->
  <script src="js/state.js"></script>
  <script src="js/utils.js"></script>
  <script src="js/translations.js"></script>
  
  <script>
    // ==========================================
    // CONFIGURATION
    // ==========================================
    const CORRECT_ANSWER = 'Chaise'; // Réponse correcte (à modifier)
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
      if (state.game_3_done) {
        gameWon = true;
        showWinScreen();
      }
    });

    // ==========================================
    // VALIDATION
    // ==========================================
    const answerInput = document.getElementById('answer-input');
    const validateBtn = document.getElementById('validate-btn');
    const feedback = document.getElementById('feedback');

    // Normaliser la réponse (insensible à la casse et aux accents)
    function normalizeAnswer(answer) {
      return answer
        .trim()
        .toUpperCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
    }

    function validateAnswer() {
      const userAnswer = normalizeAnswer(answerInput.value);
      const correctAnswer = normalizeAnswer(CORRECT_ANSWER);

      if (!userAnswer) {
        showFeedback(t('modals.error.text'), true);
        triggerShake();
        return;
      }

      if (userAnswer === correctAnswer) {
        onSuccess();
      } else {
        showFeedback(t('games.game3.incorrect'), true);
        triggerShake();
      }
    }

    function showFeedback(msg, isError) {
      feedback.textContent = msg;
      feedback.className = 'feedback show ' + (isError ? 'error' : 'success');
      
      // Réinitialiser le feedback après 3 secondes
      setTimeout(() => {
        feedback.className = 'feedback';
      }, 3000);
    }

    function triggerShake() {
      answerInput.classList.remove('error');
      void answerInput.offsetWidth; // Force le reflow
      answerInput.classList.add('error');
      setTimeout(() => {
        answerInput.classList.remove('error');
      }, 400);
    }

    // ==========================================
    // VICTOIRE
    // ==========================================
    function onSuccess() {
      if (gameWon) return;
      gameWon = true;
      markJdpmGameDone(3);
      showWinScreen();
    }

    function showWinScreen() {
      document.getElementById('win-screen').classList.add('show');
    }

    // ==========================================
    // ÉVÉNEMENTS
    // ==========================================
    validateBtn.addEventListener('click', validateAnswer);
    
    answerInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        validateAnswer();
      }
    });

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
  </script>
</body>
</html>
```

---

## 🧪 Tests

### 1️⃣ **Test de l'affichage**
1. Ouvrir `game-3.html` dans un navigateur.
2. Vérifier que :
   - L’**image du meuble** est affichée.
   - La **question** "Quel est le nom de ce meuble ?" est visible.
   - Le **champ de réponse** et le **bouton "Valider"** sont présents.

### 2️⃣ **Test de la validation (réponse correcte)**
1. Saisir la **bonne réponse** (ex : "Chaise").
2. Cliquer sur "Valider" :
   - Le jeu doit être **marqué comme terminé** (`game_3_done: true`).
   - L’écran de victoire doit s’afficher.
   - Redirection vers le HUB avec `?win=3`.

### 3️⃣ **Test de la validation (réponse incorrecte)**
1. Saisir une **mauvaise réponse** (ex : "Table").
2. Cliquer sur "Valider" : un message d’erreur doit s’afficher.

### 4️⃣ **Test de la normalisation**
1. Saisir la réponse avec des **majuscules** (ex : "CHAISE") : doit être **acceptée**.
2. Saisir la réponse avec des **accents** (ex : "Chaîse") : doit être **acceptée** (si la réponse correcte est "Chaise").
3. Saisir la réponse avec des **espaces** (ex : " Chaise ") : doit être **acceptée**.

### 5️⃣ **Test de la sauvegarde**
1. Valider le jeu avec la bonne réponse.
2. **Fermer le navigateur** et le rouvrir.
3. Recharger `game-3.html` : le jeu doit être **déjà marqué comme terminé**.

### 6️⃣ **Test du bouton "Retour au HUB"**
1. Cliquer sur "← HUB" : redirection vers `hub.html`.
2. Vérifier que le **Jeu 3** est marqué comme ✅ dans le HUB.

### 7️⃣ **Test de la modal "Info"**
1. Cliquer sur le bouton "ⓘ" : la modal doit s’afficher.
2. Vérifier que le texte est **traduit** (fr/en/es).
3. Fermer la modal : elle doit **disparaître**.

### 8️⃣ **Test multilingue**
1. Changer de langue via le sélecteur : tous les textes doivent être **traduits**.
2. Vérifier que le **placeholder** du champ de réponse est traduit.

### 9️⃣ **Test mobile**
1. Ouvrir `game-3.html` sur un **smartphone** (iOS/Android).
2. Vérifier que :
   - L’image est **bien visible**.
   - Le champ `input` est **facile à utiliser** (clavier tactile).
   - Le bouton "Valider" est **assez grand** pour être cliquable.

---

## 📝 Notes

- **Réponse correcte** : La variable `CORRECT_ANSWER` peut être **modifiée** pour coller à votre exposition (ex : "Étagère", "Table", "Fauteuil").
- **Image du meuble** : L’image `image/qcm/qcm-1.webp` est un **placeholder**. Vous pourrez la remplacer plus tard par une vraie image de l’exposition.
- **Normalisation** : La fonction `normalizeAnswer()` permet de **comparer les réponses de manière insensible à la casse et aux accents**.
- **Accessibilité** : Le champ `input` a des attributs `autocapitalize`, `autocorrect`, et `spellcheck` pour améliorer l’expérience mobile.

---

## 🔗 Dépendances pour les prochaines stories

Cette story est **indépendante** des autres jeux, mais elle est **requise** pour :
- STORY-025 (Page de réussite globale, si vous voulez afficher un message spécial pour le Jeu 3).

---

## 📚 Ressources
- [MDN - Input Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
- [Normalization in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)
- [Mobile Input Best Practices](https://developers.google.com/web/fundamentals/design-and-ux/input/forms)

---

## ⚠️ Problèmes Connus et Solutions

| **Problème**                          | **Solution**                                                                                     |
|---------------------------------------|-------------------------------------------------------------------------------------------------|
| Réponse correcte non acceptée         | Vérifier que `CORRECT_ANSWER` est **bien orthographié** et que `normalizeAnswer()` est utilisé.   |
| Champ input non visible sur mobile     | Vérifier que le `width: 100%` est appliqué et que le `padding` est suffisant.                     |
| Bouton "Valider" ne fonctionne pas      | Vérifier que l’événement `click` est bien attaché à `validateBtn`.                              |
| Message d’erreur ne s’affiche pas       | Vérifier que `showFeedback()` est appelé avec les bons paramètres.                              |
| Jeu marqué comme terminé mais pas de redirection | Vérifier que `markJdpmGameDone(3)` est appelé et que l’URL est `hub.html?win=3`. |

---

## ✅ Checklist de Validation

- [ ] `css/game-3.css` est créé et fonctionnel.
- [ ] `game-3.html` est **complètement fonctionnel** (image, question, validation).
- [ ] L’**image du meuble** est affichée et responsive.
- [ ] La **question** est traduite (fr/en/es).
- [ ] Le **champ de réponse** et le **bouton "Valider"** fonctionnent.
- [ ] La **validation** accepte les réponses **insensibles à la casse et aux accents**.
- [ ] Le jeu est **marqué comme terminé** dans `localStorage`.
- [ ] La **redirection vers le HUB** fonctionne (`?win=3`).
- [ ] Le **bouton "Retour au HUB"** fonctionne.
- [ ] La **modal "Info"** s’affiche et est traduite.
- [ ] Le **sélecteur de langue** est intégré et fonctionnel.
- [ ] Le jeu fonctionne **hors ligne** (après le premier chargement).
- [ ] Le jeu est **testé sur mobile** (iOS/Android).
- [ ] Aucun erreur dans la console.

---

## 🎉 Livrable

À la fin de cette story, vous aurez :
✅ Un **jeu de recherche d'image complet**.
✅ Une **validation de réponse** insensible à la casse et aux accents.
✅ Une **intégration avec le HUB** (progression sauvegardée).
✅ Un **design responsive** (mobile-first).
✅ Un **système multilingue** (fr/en/es).

---

**Prochaine étape** : [STORY-023 - Jeu 4 (Énigme)](STORY-023_game-4.md)
