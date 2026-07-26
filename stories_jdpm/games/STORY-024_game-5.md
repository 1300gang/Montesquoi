# STORY-024 : Jeu 5 - QCM (Question à Choix Multiples)

## 📌 Métadonnées
- **ID** : STORY-024
- **Titre** : Jeu 5 - QCM avec cartes et images
- **Priorité** : ⭐⭐⭐⭐ (High)
- **Estimation** : 5h
- **Dépendances** : 
  - STORY-001 (Initialisation du projet)
  - STORY-002 (Mode hors ligne)
  - STORY-003 (Multilingue)
  - STORY-010 (Page HUB)
- **Fichiers impactés** :
  - `game-5.html` (nouveau)
  - `css/game-5.css` (nouveau)
  - `image/qcm/` (dossier pour les images des cartes)

---

## 🎯 Description

Cette story consiste à **créer le Jeu 5 : QCM (Question à Choix Multiples)**. L'objectif est de :
1. Afficher une **question** (ex : "Quel est le designer de ce meuble ?").
2. Afficher **4 cartes** (chaque carte contient une **image `.webp` + un titre**).
3. Permettre à l'utilisateur de **sélectionner une carte** (clic/tap).
4. **Valider la réponse** si la carte sélectionnée est la bonne.
5. **Sauvegarder la progression** dans `localStorage`.
6. **Rediriger vers le HUB** avec un paramètre de succès (`?win=5`).

> **Contexte** : Ce jeu permet aux participants de **reconnaître visuellement** un meuble ou un designer parmi plusieurs options.

---

## ✅ Critères d'Acceptation

- [ ] **Affichage de la question** :
  - [ ] La **question** est affichée en haut de la page.
  - [ ] La question est **traduite** (fr/en/es).

- [ ] **Affichage des cartes** :
  - [ ] **4 cartes** sont affichées en grille (2x2 ou 1x4 selon l’espace).
  - [ ] Chaque carte contient :
    - Une **image** (format `.webp`).
    - Un **titre** (ex : "Designer 1").
  - [ ] Les cartes sont **cliquables** (sélection par clic/tap).
  - [ ] La carte sélectionnée est **mise en évidence** (ex : bordure colorée).

- [ ] **Validation** :
  - [ ] Un bouton **"Valider"** permet de soumettre la réponse.
  - [ ] Si la carte sélectionnée est la **bonne**, le jeu est **marqué comme terminé** (`markJdpmGameDone(5)`).
  - [ ] Si la carte sélectionnée est **mauvaise**, un message d'erreur s'affiche.

- [ ] **Éléments communs** :
  - [ ] **Header** : Bouton "Retour au HUB" + Titre "Jeu 5 - QCM" + Bouton "Info".
  - [ ] **Footer** : Bouton "Valider".
  - [ ] **Modal "Info"** : Explication des règles du jeu.

- [ ] **Sauvegarde** :
  - [ ] Le jeu est **marqué comme terminé** dans `localStorage`.
  - [ ] Redirection vers le HUB avec `?win=5`.

- [ ] **Multilingue** :
  - [ ] Tous les textes sont **traduits** (fr/en/es).

- [ ] **Hors ligne** :
  - [ ] Le jeu fonctionne **sans connexion Internet** (après le premier chargement).

- [ ] **Mobile** :
  - [ ] Le jeu est **100% compatible mobile** (tactile).
  - [ ] Les cartes sont **assez grandes** pour être cliquables.

---

## 🛠️ Tâches Techniques

### 1️⃣ Préparer les images des cartes
Placez **4 images** (format `.webp`) dans `/image/qcm/` :
- `qcm-1.webp` (ex : image d’un meuble de Designer 1)
- `qcm-2.webp` (ex : image d’un meuble de Designer 2)
- `qcm-3.webp` (ex : image d’un meuble de Designer 3)
- `qcm-4.webp` (ex : image d’un meuble de Designer 4)

> **Note** : Pour l'instant, utilisez des **placeholders** (ex : des images génériques avec le texte "Designer 1", "Designer 2", etc.). Vous pourrez les remplacer plus tard par de vraies images.

---

### 2️⃣ Créer `css/game-5.css`
**Fichier** : `/css/game-5.css`
**Contenu** :
```css
/* ============================================
   GAME-5 CSS
   Styles spécifiques au Jeu 5 (QCM)
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
  border: 3px solid var(--magenta);
}

/* Section de la question */
.question-section {
  margin: var(--spacing-lg) 0;
}

.question-text {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 18px;
  color: var(--blue);
  margin: 0;
}

/* Grille des cartes */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
  margin: var(--spacing-lg) 0;
}

/* Carte */
.qcm-card {
  background: var(--white);
  border: 2px solid var(--teal);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
}

.qcm-card:hover {
  background: rgba(35, 157, 171, 0.05);
  border-color: var(--cyan);
  transform: translateY(-2px);
}

.qcm-card.selected {
  background: rgba(35, 157, 171, 0.1);
  border-color: var(--cyan);
  box-shadow: 0 0 0 2px var(--cyan);
}

.qcm-card.error {
  border-color: var(--magenta);
  animation: shake 0.35s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
}

/* Image de la carte */
.qcm-card-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: var(--border-radius-sm);
  border: 1px solid rgba(13, 77, 150, 0.1);
}

/* Titre de la carte */
.qcm-card-title {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 14px;
  color: var(--blue);
  text-align: center;
}

/* Bouton de validation */
.validate-btn {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 15px;
  color: var(--white);
  background: var(--magenta);
  border: none;
  border-radius: var(--border-radius-md);
  padding: var(--spacing-sm) var(--spacing-xl);
  cursor: pointer;
  box-shadow: 0 4px 0 rgba(232, 60, 110, 0.3);
  transition: all var(--transition-fast);
  margin-top: var(--spacing-md);
  width: 100%;
}

.validate-btn:active {
  transform: translateY(2px);
  box-shadow: 0 2px 0 rgba(232, 60, 110, 0.3);
}

.validate-btn:disabled {
  background: rgba(232, 60, 110, 0.3);
  cursor: not-allowed;
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
  color: var(--magenta);
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
  background: var(--magenta);
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
  .cards-grid {
    grid-template-columns: 1fr;
  }
  
  .qcm-card-image {
    height: 100px;
  }
  
  .validate-btn {
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: 14px;
  }
}

/* Accessibilité */
.qcm-card:focus,
.validate-btn:focus,
#info-modal .modal-close:focus,
#btn-hub:focus {
  outline: 3px dashed var(--orange);
  outline-offset: 3px;
}
```

---

### 3️⃣ Créer `game-5.html`
**Fichier** : `/game-5.html`
**Contenu complet** :
```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title data-i18n="games.game5.title">Jeu 5 - QCM</title>
  <link rel="manifest" href="/manifest.json">
  <link rel="stylesheet" href="css/_variables.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/game-base.css">
  <link rel="stylesheet" href="css/game-5.css">
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
        <h1 class="game-title" data-i18n="games.game5.title">Jeu 5 - QCM</h1>
        <button class="info-btn" id="infoBtn" aria-label="Info" data-i18n-title="buttons.info">ⓘ</button>
      </header>

      <main>
        <section class="question-section">
          <p class="question-text" data-i18n="games.game5.question">
            Quel est le designer de ce meuble ?
          </p>
        </section>
        
        <div class="cards-grid" id="cards-grid">
          <!-- Les cartes seront générées dynamiquement en JS -->
        </div>
        
        <button id="validate-btn" class="validate-btn" data-i18n="buttons.validate" disabled>Valider</button>
        <p id="feedback" class="feedback"></p>
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
    <p class="win-sub" data-i18n="games.game5.correct">Bonne réponse !</p>
    <a href="hub.html?win=5" id="btn-hub" data-i18n="buttons.backToHub">Retour au HUB</a>
  </div>

  <!-- Modal Info -->
  <div id="info-modal">
    <div class="modal-box">
      <button class="modal-close" id="infoModalClose" aria-label="Fermer">✕</button>
      <div class="modal-emoji">💡</div>
      <h2 class="modal-title" data-i18n="games.game5.title">Jeu 5 - QCM</h2>
      <p class="modal-text" data-i18n="games.game5.instructions">
        Sélectionnez la bonne réponse parmi les 4 propositions pour valider ce jeu.
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
    const CORRECT_ANSWER_INDEX = 1; // Index de la bonne réponse (0, 1, 2 ou 3)
    
    // Données des cartes (images + titres)
    const CARDS_DATA = [
      {
        image: 'image/qcm/qcm-1.webp',
        title: 'Designer 1',
        fr: { title: 'Designer 1' },
        en: { title: 'Designer 1' },
        es: { title: 'Diseñador 1' }
      },
      {
        image: 'image/qcm/qcm-2.webp',
        title: 'Designer 2',
        fr: { title: 'Designer 2' },
        en: { title: 'Designer 2' },
        es: { title: 'Diseñador 2' }
      },
      {
        image: 'image/qcm/qcm-3.webp',
        title: 'Designer 3',
        fr: { title: 'Designer 3' },
        en: { title: 'Designer 3' },
        es: { title: 'Diseñador 3' }
      },
      {
        image: 'image/qcm/qcm-4.webp',
        title: 'Designer 4',
        fr: { title: 'Designer 4' },
        en: { title: 'Designer 4' },
        es: { title: 'Diseñador 4' }
      }
    ];
    
    let selectedCardIndex = null;
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
      if (state.game_5_done) {
        gameWon = true;
        showWinScreen();
      }
      
      // Générer les cartes
      renderCards();
    });

    // ==========================================
    // RENDU DES CARTES
    // ==========================================
    function renderCards() {
      const cardsGrid = document.getElementById('cards-grid');
      cardsGrid.innerHTML = '';
      
      CARDS_DATA.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'qcm-card';
        cardElement.dataset.index = index;
        
        // Utiliser le titre traduit
        const lang = getCurrentLanguage();
        const title = card[lang]?.title || card.title;
        
        cardElement.innerHTML = `
          <img src="${card.image}" alt="${title}" class="qcm-card-image">
          <p class="qcm-card-title">${title}</p>
        `;
        
        cardElement.addEventListener('click', () => {
          selectCard(index);
        });
        
        cardsGrid.appendChild(cardElement);
      });
    }

    // ==========================================
    // SÉLECTION D'UNE CARTE
    // ==========================================
    function selectCard(index) {
      if (gameWon) return;
      
      // Désélectionner la carte précédente
      const previousSelected = document.querySelector('.qcm-card.selected');
      if (previousSelected) {
        previousSelected.classList.remove('selected', 'error');
      }
      
      // Sélectionner la nouvelle carte
      const card = document.querySelector(`.qcm-card[data-index="${index}"]`);
      card.classList.add('selected');
      selectedCardIndex = index;
      
      // Activer le bouton Valider
      document.getElementById('validate-btn').disabled = false;
    }

    // ==========================================
    // VALIDATION
    // ==========================================
    const validateBtn = document.getElementById('validate-btn');
    const feedback = document.getElementById('feedback');

    function validateAnswer() {
      if (selectedCardIndex === null) {
        showFeedback(t('modals.error.text'), true);
        return;
      }
      
      if (selectedCardIndex === CORRECT_ANSWER_INDEX) {
        onSuccess();
      } else {
        // Mettre en évidence la carte incorrecte
        const card = document.querySelector(`.qcm-card[data-index="${selectedCardIndex}"]`);
        card.classList.add('error');
        
        showFeedback(t('games.game5.incorrect'), true);
        
        // Réinitialiser après 1 seconde
        setTimeout(() => {
          card.classList.remove('error');
        }, 1000);
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

    // ==========================================
    // VICTOIRE
    // ==========================================
    function onSuccess() {
      if (gameWon) return;
      gameWon = true;
      markJdpmGameDone(5);
      showWinScreen();
    }

    function showWinScreen() {
      document.getElementById('win-screen').classList.add('show');
    }

    // ==========================================
    // ÉVÉNEMENTS
    // ==========================================
    validateBtn.addEventListener('click', validateAnswer);

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
1. Ouvrir `game-5.html` dans un navigateur.
2. Vérifier que :
   - La **question** est affichée.
   - Les **4 cartes** (images + titres) sont affichées en grille.
   - Le **bouton "Valider"** est présent (mais désactivé au début).

### 2️⃣ **Test de la sélection des cartes**
1. Cliquer sur une **carte** :
   - La carte doit être **mise en évidence** (bordure colorée).
   - Le bouton **"Valider"** doit être **activé**.
2. Cliquer sur une **autre carte** :
   - La **précédente carte** doit être désélectionnée.
   - La **nouvelle carte** doit être sélectionnée.

### 3️⃣ **Test de la validation (réponse correcte)**
1. Sélectionner la **bonne carte** (index `CORRECT_ANSWER_INDEX`).
2. Cliquer sur "Valider" :
   - Le jeu doit être **marqué comme terminé** (`game_5_done: true`).
   - L’écran de victoire doit s’afficher.
   - Redirection vers le HUB avec `?win=5`.

### 4️⃣ **Test de la validation (réponse incorrecte)**
1. Sélectionner une **mauvaise carte**.
2. Cliquer sur "Valider" :
   - Un message d’erreur doit s’afficher.
   - La carte sélectionnée doit être **mise en évidence en rouge** (animation de shake).

### 5️⃣ **Test de la sauvegarde**
1. Valider le jeu avec la bonne réponse.
2. **Fermer le navigateur** et le rouvrir.
3. Recharger `game-5.html` : le jeu doit être **déjà marqué comme terminé**.

### 6️⃣ **Test du bouton "Retour au HUB"**
1. Cliquer sur "← HUB" : redirection vers `hub.html`.
2. Vérifier que le **Jeu 5** est marqué comme ✅ dans le HUB.

### 7️⃣ **Test de la modal "Info"**
1. Cliquer sur le bouton "ⓘ" : la modal doit s’afficher.
2. Vérifier que le texte est **traduit** (fr/en/es).
3. Fermer la modal : elle doit **disparaître**.

### 8️⃣ **Test multilingue**
1. Changer de langue via le sélecteur : tous les textes doivent être **traduits**.
2. Vérifier que les **titres des cartes** sont traduits.

### 9️⃣ **Test mobile**
1. Ouvrir `game-5.html` sur un **smartphone** (iOS/Android).
2. Vérifier que :
   - Les **cartes** sont **assez grandes** pour être cliquables.
   - Le **bouton "Valider"** est **facile à utiliser**.
   - La grille des cartes est **responsive** (1 colonne sur mobile).

---

## 📝 Notes

- **Bonne réponse** : La variable `CORRECT_ANSWER_INDEX` peut être **modifiée** pour changer la carte correcte (0, 1, 2 ou 3).
- **Données des cartes** : Le tableau `CARDS_DATA` contient les **images et titres** des cartes. Vous pouvez le modifier pour coller à votre exposition.
- **Traduction des titres** : Les titres des cartes sont **traduits** en fonction de la langue sélectionnée.
- **Accessibilité** : Les cartes sont **cliquables** et ont un **focus style** pour le clavier.

---

## 🔗 Dépendances pour les prochaines stories

Cette story est **indépendante** des autres jeux, mais elle est **requise** pour :
- STORY-025 (Page de réussite globale).

---

## 📚 Ressources
- [CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [WebP Image Format](https://developers.google.com/speed/webp)

---

## ⚠️ Problèmes Connus et Solutions

| **Problème**                          | **Solution**                                                                                     |
|---------------------------------------|-------------------------------------------------------------------------------------------------|
| Cartes non affichées                  | Vérifier que les images existent dans `/image/qcm/` et que les chemins sont corrects.       |
| Carte sélectionnée non mise en évidence | Vérifier que `selectCard()` est appelé et que `.selected` est ajouté à la classe.              |
| Bouton "Valider" toujours désactivé    | Vérifier que `selectedCardIndex` est bien défini et que le bouton est activé.                     |
| Message d’erreur ne s’affiche pas       | Vérifier que `showFeedback()` est appelé avec les bons paramètres.                              |
| Jeu marqué comme terminé mais pas de redirection | Vérifier que `markJdpmGameDone(5)` est appelé et que l’URL est `hub.html?win=5`. |

---

## ✅ Checklist de Validation

- [ ] `css/game-5.css` est créé et fonctionnel.
- [ ] `game-5.html` est **complètement fonctionnel** (question, cartes, validation).
- [ ] Les **4 cartes** (images + titres) sont affichées en grille.
- [ ] La **sélection des cartes** fonctionne (clic/tap).
- [ ] Le **bouton "Valider"** s’active/désactive correctement.
- [ ] La **validation** accepte la bonne carte et rejette les mauvaises.
- [ ] Le jeu est **marqué comme terminé** dans `localStorage`.
- [ ] La **redirection vers le HUB** fonctionne (`?win=5`).
- [ ] Le **bouton "Retour au HUB"** fonctionne.
- [ ] La **modal "Info"** s’affiche et est traduite.
- [ ] Le **sélecteur de langue** est intégré et fonctionnel.
- [ ] Le jeu fonctionne **hors ligne** (après le premier chargement).
- [ ] Le jeu est **testé sur mobile** (iOS/Android).
- [ ] Aucun erreur dans la console.

---

## 🎉 Livrable

À la fin de cette story, vous aurez :
✅ Un **jeu QCM complet** avec 4 cartes.
✅ Une **sélection de carte** intuitive (clic/tap).
✅ Une **validation de réponse** fonctionnelle.
✅ Une **intégration avec le HUB** (progression sauvegardée).
✅ Un **design responsive** (mobile-first).
✅ Un **système multilingue** (fr/en/es).

---

**Prochaine étape** : [STORY-025 - Page de Réussite Globale](../STORY-025_success.md)
