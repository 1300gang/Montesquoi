# STORY-023 : Jeu 4 - Énigme

## 📌 Métadonnées
- **ID** : STORY-023
- **Titre** : Jeu 4 - Énigme avec indice
- **Priorité** : ⭐⭐⭐⭐ (High)
- **Estimation** : 4h
- **Dépendances** : 
  - STORY-001 (Initialisation du projet)
  - STORY-002 (Mode hors ligne)
  - STORY-003 (Multilingue)
  - STORY-010 (Page HUB)
- **Fichiers impactés** :
  - `game-4.html` (nouveau)
  - `css/game-4.css` (nouveau)

---

## 🎯 Description

Cette story consiste à **créer le Jeu 4 : Énigme**. L'objectif est de :
1. Afficher une **énigme sous forme de texte** (ex : "Je suis un meuble du XVIIIème siècle, qui suis-je ?").
2. Permettre à l'utilisateur de **saisir sa réponse** dans un champ `input`.
3. Ajouter un **bouton "Indice"** qui révèle un **indice supplémentaire** (ex : "Je suis souvent en bois et j'ai des tiroirs").
4. **Valider la réponse** et marquer le jeu comme terminé si elle est correcte.
5. **Sauvegarder la progression** dans `localStorage`.
6. **Rediriger vers le HUB** avec un paramètre de succès (`?win=4`).

> **Contexte** : Ce jeu est une **énigme textuelle** classique. Il permet aux participants de **réfléchir** et d’utiliser leur **connaissance du design** pour trouver la réponse.

---

## ✅ Critères d'Acceptation

- [ ] **Affichage de l'énigme** :
  - [ ] Le **texte de l'énigme** est affiché en grand format.
  - [ ] Le texte est **traduit** (fr/en/es).

- [ ] **Champ de réponse** :
  - [ ] Un **input** permet de saisir la réponse.
  - [ ] Le champ a un **placeholder** (ex : "Saisissez votre réponse").
  - [ ] Le placeholder est **traduit** (fr/en/es).

- [ ] **Bouton "Indice"** :
  - [ ] Un bouton **"Indice"** est présent.
  - [ ] Cliquer sur le bouton **affiche un indice** (ex : "Je suis souvent en bois et j'ai des tiroirs").
  - [ ] L'indice est **traduit** (fr/en/es).
  - [ ] Le bouton **disparaît** après avoir été cliqué (ou se désactive).

- [ ] **Validation** :
  - [ ] Un bouton **"Valider"** permet de soumettre la réponse.
  - [ ] Si la réponse est **correcte**, le jeu est **marqué comme terminé** (`markJdpmGameDone(4)`).
  - [ ] Si la réponse est **incorrecte**, un message d'erreur s'affiche.
  - [ ] La validation est **insensible à la casse** et aux **accents**.

- [ ] **Éléments communs** :
  - [ ] **Header** : Bouton "Retour au HUB" + Titre "Jeu 4 - Énigme" + Bouton "Info".
  - [ ] **Footer** : Champ `input` + Bouton "Valider" + Bouton "Indice".
  - [ ] **Modal "Info"** : Explication des règles du jeu.

- [ ] **Sauvegarde** :
  - [ ] Le jeu est **marqué comme terminé** dans `localStorage`.
  - [ ] Redirection vers le HUB avec `?win=4`.

- [ ] **Multilingue** :
  - [ ] Tous les textes sont **traduits** (fr/en/es).

- [ ] **Hors ligne** :
  - [ ] Le jeu fonctionne **sans connexion Internet** (après le premier chargement).

- [ ] **Mobile** :
  - [ ] Le jeu est **100% compatible mobile** (tactile).
  - [ ] Le champ `input` et les boutons sont **faciles à utiliser** sur mobile.

---

## 🛠️ Tâches Techniques

### 1️⃣ Créer `css/game-4.css`
**Fichier** : `/css/game-4.css`
**Contenu** :
```css
/* ============================================
   GAME-4 CSS
   Styles spécifiques au Jeu 4 (Énigme)
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
  border: 3px solid var(--blue);
}

/* Section de l'énigme */
.riddle-section {
  margin: var(--spacing-lg) 0;
}

.riddle-text {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 18px;
  color: var(--blue);
  line-height: 1.6;
  margin: 0;
}

/* Section de l'indice */
.hint-section {
  margin: var(--spacing-md) 0 var(--spacing-lg);
  display: none;
}

.hint-section.show {
  display: block;
}

.hint-text {
  font-family: var(--font-body);
  font-size: 14px;
  color: rgba(13, 77, 150, 0.7);
  font-style: italic;
  background: rgba(13, 77, 150, 0.05);
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  border-left: 3px solid var(--blue);
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
  border: 2px solid var(--blue);
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
  color: rgba(13, 77, 150, 0.4);
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

/* Boutons */
.buttons-section {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-sm);
}

.validate-btn {
  flex: 1;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 15px;
  color: var(--white);
  background: var(--blue);
  border: none;
  border-radius: var(--border-radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;
  box-shadow: 0 4px 0 rgba(13, 77, 150, 0.3);
  transition: all var(--transition-fast);
}

.validate-btn:active {
  transform: translateY(2px);
  box-shadow: 0 2px 0 rgba(13, 77, 150, 0.3);
}

.hint-btn {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 14px;
  color: var(--orange);
  background: transparent;
  border: 2px solid var(--orange);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.hint-btn:hover {
  background: rgba(244, 155, 46, 0.1);
}

.hint-btn:active {
  transform: translateY(1px);
}

.hint-btn.hidden {
  display: none;
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
  color: var(--blue);
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
  background: var(--blue);
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
  .riddle-text {
    font-size: 16px;
  }
  
  .buttons-section {
    flex-direction: column;
  }
  
  .validate-btn {
    width: 100%;
  }
}

/* Accessibilité */
.answer-input:focus,
.validate-btn:focus,
.hint-btn:focus,
#info-modal .modal-close:focus,
#btn-hub:focus {
  outline: 3px dashed var(--orange);
  outline-offset: 3px;
}
```

---

### 2️⃣ Créer `game-4.html`
**Fichier** : `/game-4.html`
**Contenu complet** :
```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title data-i18n="games.game4.title">Jeu 4 - Énigme</title>
  <link rel="manifest" href="/manifest.json">
  <link rel="stylesheet" href="css/_variables.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/game-base.css">
  <link rel="stylesheet" href="css/game-4.css">
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
        <h1 class="game-title" data-i18n="games.game4.title">Jeu 4 - Énigme</h1>
        <button class="info-btn" id="infoBtn" aria-label="Info" data-i18n-title="buttons.info">ⓘ</button>
      </header>

      <main>
        <section class="riddle-section">
          <p class="riddle-text" data-i18n="games.game4.question">
            Je suis un meuble du XVIIIème siècle, qui suis-je ?
          </p>
        </section>
        
        <section class="hint-section" id="hint-section">
          <p class="hint-text" data-i18n="games.game4.hint">
            Je suis souvent en bois et j'ai des tiroirs.
          </p>
        </section>
        
        <section class="answer-section">
          <input 
            type="text" 
            id="answer-input"
            class="answer-input"
            placeholder="Saisissez votre réponse"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="words"
            spellcheck="false"
            enterkeyhint="done"
            data-i18n-placeholder="games.game4.placeholder"
          >
          <div class="buttons-section">
            <button id="validate-btn" class="validate-btn" data-i18n="buttons.validate">Valider</button>
            <button id="hint-btn" class="hint-btn" data-i18n="buttons.hint">Indice</button>
          </div>
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
    <p class="win-sub" data-i18n="games.game4.correct">Exact ! Vous avez trouvé.</p>
    <a href="hub.html?win=4" id="btn-hub" data-i18n="buttons.backToHub">Retour au HUB</a>
  </div>

  <!-- Modal Info -->
  <div id="info-modal">
    <div class="modal-box">
      <button class="modal-close" id="infoModalClose" aria-label="Fermer">✕</button>
      <div class="modal-emoji">🤔</div>
      <h2 class="modal-title" data-i18n="games.game4.title">Jeu 4 - Énigme</h2>
      <p class="modal-text" data-i18n="games.game4.instructions">
        Résolvez l'énigme en saisissant la bonne réponse. Vous pouvez utiliser le bouton "Indice" si vous êtes bloqué.
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
    const CORRECT_ANSWER = 'Commode'; // Réponse correcte (à modifier)
    const HINT = t('games.game4.hint'); // Indice (chargé dynamiquement)
    let gameWon = false;
    let hintUsed = false;

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
      if (state.game_4_done) {
        gameWon = true;
        showWinScreen();
      }
    });

    // ==========================================
    // GESTION DE L'INDICE
    // ==========================================
    const hintSection = document.getElementById('hint-section');
    const hintBtn = document.getElementById('hint-btn');

    function showHint() {
      if (hintUsed) return;
      hintUsed = true;
      hintSection.classList.add('show');
      hintBtn.classList.add('hidden');
    }

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
        showFeedback(t('games.game4.incorrect'), true);
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
      markJdpmGameDone(4);
      showWinScreen();
    }

    function showWinScreen() {
      document.getElementById('win-screen').classList.add('show');
    }

    // ==========================================
    // ÉVÉNEMENTS
    // ==========================================
    validateBtn.addEventListener('click', validateAnswer);
    hintBtn.addEventListener('click', showHint);
    
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
1. Ouvrir `game-4.html` dans un navigateur.
2. Vérifier que :
   - Le **texte de l'énigme** est affiché.
   - Le **champ de réponse** et les **boutons** sont présents.

### 2️⃣ **Test de l'indice**
1. Cliquer sur le bouton **"Indice"** :
   - L’**indice** doit s’afficher.
   - Le bouton **"Indice"** doit **disparaître**.

### 3️⃣ **Test de la validation (réponse correcte)**
1. Saisir la **bonne réponse** (ex : "Commode").
2. Cliquer sur "Valider" :
   - Le jeu doit être **marqué comme terminé** (`game_4_done: true`).
   - L’écran de victoire doit s’afficher.
   - Redirection vers le HUB avec `?win=4`.

### 4️⃣ **Test de la validation (réponse incorrecte)**
1. Saisir une **mauvaise réponse** (ex : "Table").
2. Cliquer sur "Valider" : un message d’erreur doit s’afficher.

### 5️⃣ **Test de la normalisation**
1. Saisir la réponse avec des **majuscules** (ex : "COMMODE") : doit être **acceptée**.
2. Saisir la réponse avec des **accents** (ex : "Commòde") : doit être **acceptée** (si la réponse correcte est "Commode").
3. Saisir la réponse avec des **espaces** (ex : " Commode ") : doit être **acceptée**.

### 6️⃣ **Test de la sauvegarde**
1. Valider le jeu avec la bonne réponse.
2. **Fermer le navigateur** et le rouvrir.
3. Recharger `game-4.html` : le jeu doit être **déjà marqué comme terminé**.

### 7️⃣ **Test du bouton "Retour au HUB"**
1. Cliquer sur "← HUB" : redirection vers `hub.html`.
2. Vérifier que le **Jeu 4** est marqué comme ✅ dans le HUB.

### 8️⃣ **Test de la modal "Info"**
1. Cliquer sur le bouton "ⓘ" : la modal doit s’afficher.
2. Vérifier que le texte est **traduit** (fr/en/es).
3. Fermer la modal : elle doit **disparaître**.

### 9️⃣ **Test multilingue**
1. Changer de langue via le sélecteur : tous les textes doivent être **traduits**.
2. Vérifier que le **placeholder** du champ de réponse est traduit.
3. Vérifier que l’**indice** est traduit.

### 🔟 **Test mobile**
1. Ouvrir `game-4.html` sur un **smartphone** (iOS/Android).
2. Vérifier que :
   - Le texte de l’énigme est **lisible**.
   - Le champ `input` et les boutons sont **faciles à utiliser**.
   - Le bouton "Indice" est **assez grand** pour être cliquable.

---

## 📝 Notes

- **Énigme et réponse** : Les variables `CORRECT_ANSWER` et `HINT` peuvent être **modifiées** pour coller à votre exposition.
- **Indice** : Le bouton "Indice" **disparaît** après avoir été cliqué pour éviter que l’utilisateur ne l’utilise plusieurs fois.
- **Normalisation** : La fonction `normalizeAnswer()` permet de **comparer les réponses de manière insensible à la casse et aux accents**.
- **Accessibilité** : Le champ `input` a des attributs `autocapitalize`, `autocorrect`, et `spellcheck` pour améliorer l’expérience mobile.

---

## 🔗 Dépendances pour les prochaines stories

Cette story est **indépendante** des autres jeux, mais elle est **requise** pour :
- STORY-025 (Page de réussite globale, si vous voulez afficher un message spécial pour le Jeu 4).

---

## 📚 Ressources
- [MDN - Input Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
- [Normalization in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)
- [Mobile Input Best Practices](https://developers.google.com/web/fundamentals/design-and-ux/input/forms)

---

## ⚠️ Problèmes Connus et Solutions

| **Problème**                          | **Solution**                                                                                     |
|---------------------------------------|-------------------------------------------------------------------------------------------------|
| Indice ne s’affiche pas                | Vérifier que `showHint()` est appelé et que `hintSection.classList.add('show')` est exécuté.   |
| Bouton "Indice" ne disparaît pas        | Vérifier que `hintBtn.classList.add('hidden')` est exécuté.                                      |
| Réponse correcte non acceptée         | Vérifier que `CORRECT_ANSWER` est **bien orthographié** et que `normalizeAnswer()` est utilisé.   |
| Champ input non visible sur mobile     | Vérifier que le `width: 100%` est appliqué et que le `padding` est suffisant.                     |
| Bouton "Valider" ne fonctionne pas      | Vérifier que l’événement `click` est bien attaché à `validateBtn`.                              |
| Message d’erreur ne s’affiche pas       | Vérifier que `showFeedback()` est appelé avec les bons paramètres.                              |
| Jeu marqué comme terminé mais pas de redirection | Vérifier que `markJdpmGameDone(4)` est appelé et que l’URL est `hub.html?win=4`. |

---

## ✅ Checklist de Validation

- [ ] `css/game-4.css` est créé et fonctionnel.
- [ ] `game-4.html` est **complètement fonctionnel** (énigme, indice, validation).
- [ ] Le **texte de l'énigme** est affiché et traduit.
- [ ] Le **bouton "Indice"** fonctionne et affiche l’indice.
- [ ] Le **champ de réponse** et le **bouton "Valider"** fonctionnent.
- [ ] La **validation** accepte les réponses **insensibles à la casse et aux accents**.
- [ ] Le jeu est **marqué comme terminé** dans `localStorage`.
- [ ] La **redirection vers le HUB** fonctionne (`?win=4`).
- [ ] Le **bouton "Retour au HUB"** fonctionne.
- [ ] La **modal "Info"** s’affiche et est traduite.
- [ ] Le **sélecteur de langue** est intégré et fonctionnel.
- [ ] Le jeu fonctionne **hors ligne** (après le premier chargement).
- [ ] Le jeu est **testé sur mobile** (iOS/Android).
- [ ] Aucun erreur dans la console.

---

## 🎉 Livrable

À la fin de cette story, vous aurez :
✅ Un **jeu d'énigme complet** avec indice.
✅ Une **validation de réponse** insensible à la casse et aux accents.
✅ Une **intégration avec le HUB** (progression sauvegardée).
✅ Un **design responsive** (mobile-first).
✅ Un **système multilingue** (fr/en/es).

---

**Prochaine étape** : [STORY-024 - Jeu 5 (QCM)](STORY-024_game-5.md)
