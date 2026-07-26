# STORY-031 : Gestion de l'État Global

## 📌 Métadonnées
- **ID** : STORY-031
- **Titre** : Gestion de l'état global (localStorage, progression)
- **Priorité** : ⭐⭐⭐⭐ (High)
- **Estimation** : 2h
- **Dépendances** : 
  - STORY-001 (Initialisation du projet)
- **Fichiers impactés** :
  - `js/state.js` (modifié)
  - Toutes les pages HTML (hub.html, game-1.html, etc.)

---

## 🎯 Description

Cette story consiste à **finaliser et optimiser la gestion de l'état global** du projet. L'objectif est de :
1. **Fusionner** les fichiers `state.js` et `state_jdpm.js` existants en un seul fichier cohérent.
2. **Ajouter des fonctions utilitaires** pour gérer la progression (ex : réinitialisation, vérification).
3. **Assurer la persistance** des données dans `localStorage`.
4. **Gérer les conflits** (ex : si un utilisateur modifie manuellement `localStorage`).
5. **Optimiser les performances** (ex : éviter les lectures/écritures inutiles).

> **Contexte** : Actuellement, le projet utilise `state_jdpm.js` pour gérer l'état des 5 jeux. Cette story permet de **centraliser** cette gestion et d’ajouter des **fonctions utilitaires** pour faciliter le développement.

---

## ✅ Critères d'Acceptation

- [ ] **Fusion des fichiers** :
  - [ ] `state.js` et `state_jdpm.js` sont **fusionnés** en un seul fichier.
  - [ ] Le nouveau fichier gère **tous les jeux** (1 à 5).

- [ ] **Fonctions de base** :
  - [ ] `loadJdpmState()` : Charge l’état depuis `localStorage`.
  - [ ] `saveJdpmState(state)` : Sauvegarde l’état dans `localStorage`.
  - [ ] `markJdpmGameDone(gameId)` : Marque un jeu comme terminé.
  - [ ] `resetJdpmState()` : Réinitialise toute la progression.
  - [ ] `isAllJdpmGamesDone()` : Vérifie si tous les jeux sont terminés.

- [ ] **Fonctions utilitaires** :
  - [ ] `getJdpmProgress()` : Retourne le nombre de jeux terminés.
  - [ ] `isJdpmGameDone(gameId)` : Vérifie si un jeu spécifique est terminé.
  - [ ] `getJdpmGamesDone()` : Retourne la liste des jeux terminés.

- [ ] **Gestion des erreurs** :
  - [ ] Les fonctions gèrent les **erreurs de `localStorage`** (ex : quota dépassé, désactivé).
  - [ ] Les fonctions retournent des **valeurs par défaut** en cas d’erreur.

- [ ] **Intégration** :
  - [ ] Toutes les pages HTML utilisent le **nouveau fichier `state.js`**.
  - [ ] Les **anciens fichiers** (`state_jdpm.js`) sont **supprimés** ou mis à jour.

- [ ] **Tests** :
  - [ ] Les fonctions sont **testées** et fonctionnent correctement.
  - [ ] La progression est **persistante** après un rechargement de page.

---

## 🛠️ Tâches Techniques

### 1️⃣ Fusionner `state.js` et `state_jdpm.js`
**Fichier** : `/js/state.js`
**Contenu complet** :
```javascript
// ==========================================
// STATE.JS – État global partagé
// JDPM - Journées du Patrimoine et Matrimoine
// Gère la progression des 5 jeux via localStorage
// ==========================================

const JDPM_STATE_KEY = 'jdpm_madd_state';

// État par défaut (tous les jeux non terminés)
const DEFAULT_JDPM_STATE = {
  game_1_done: false,  // Jeu 1 : AR
  game_2_done: false,  // Jeu 2 : NFC/QR
  game_3_done: false,  // Jeu 3 : Recherche d'image
  game_4_done: false,  // Jeu 4 : Énigme
  game_5_done: false,  // Jeu 5 : QCM
};

// ------------------------------------------
// Charger l'état depuis localStorage
// ------------------------------------------
function loadJdpmState() {
  try {
    const raw = localStorage.getItem(JDPM_STATE_KEY);
    if (!raw) {
      // Premier chargement : initialiser avec l'état par défaut
      const defaultState = { ...DEFAULT_JDPM_STATE };
      saveJdpmState(defaultState);
      return defaultState;
    }
    
    // Fusionner avec l'état par défaut pour gérer les nouvelles propriétés
    const savedState = JSON.parse(raw);
    return { ...DEFAULT_JDPM_STATE, ...savedState };
  } catch (e) {
    console.warn('⚠️ state.js – Impossible de lire localStorage:', e);
    // Retourner l'état par défaut en cas d'erreur
    return { ...DEFAULT_JDPM_STATE };
  }
}

// ------------------------------------------
// Sauvegarder l'état dans localStorage
// ------------------------------------------
function saveJdpmState(state) {
  try {
    localStorage.setItem(JDPM_STATE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('⚠️ state.js – Impossible d’écrire localStorage:', e);
    // En cas d'erreur, on ne peut pas faire grand-chose
  }
}

// ------------------------------------------
// Marquer un jeu comme terminé
// ------------------------------------------
function markJdpmGameDone(gameId) {
  if (gameId < 1 || gameId > 5) {
    console.warn(`⚠️ state.js – gameId invalide: ${gameId}`);
    return loadJdpmState();
  }
  
  const state = loadJdpmState();
  const key = `game_${gameId}_done`;
  
  if (state.hasOwnProperty(key) && !state[key]) {
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
// Vérifier si un jeu spécifique est terminé
// ------------------------------------------
function isJdpmGameDone(gameId) {
  if (gameId < 1 || gameId > 5) {
    console.warn(`⚠️ state.js – gameId invalide: ${gameId}`);
    return false;
  }
  
  const state = loadJdpmState();
  return state[`game_${gameId}_done`] || false;
}

// ------------------------------------------
// Obtenir le nombre de jeux terminés
// ------------------------------------------
function getJdpmProgress() {
  const state = loadJdpmState();
  return Object.values(state).filter(Boolean).length;
}

// ------------------------------------------
// Obtenir la liste des jeux terminés
// ------------------------------------------
function getJdpmGamesDone() {
  const state = loadJdpmState();
  const gamesDone = [];
  
  for (let i = 1; i <= 5; i++) {
    if (state[`game_${i}_done`]) {
      gamesDone.push(i);
    }
  }
  
  return gamesDone;
}

// ------------------------------------------
// Obtenir le pourcentage de progression
// ------------------------------------------
function getJdpmProgressPercentage() {
  return (getJdpmProgress() / 5) * 100;
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
    isJdpmGameDone,
    getJdpmProgress,
    getJdpmGamesDone,
    getJdpmProgressPercentage,
    DEFAULT_JDPM_STATE,
    JDPM_STATE_KEY,
  };
}
```

---

### 2️⃣ Mettre à jour les pages HTML pour utiliser le nouveau `state.js`

#### a) **Supprimer l'ancien `state_jdpm.js`**
Supprimez le fichier `/state_jdpm.js` (s'il existe encore).

#### b) **Mettre à jour les imports**
Dans toutes les pages HTML (`hub.html`, `game-1.html`, etc.), **remplacez** :
```html
<script src="state_jdpm.js"></script>
```
par :
```html
<script src="js/state.js"></script>
```

#### c) **Mettre à jour les appels de fonctions**
Remplacez tous les appels aux anciennes fonctions par les nouvelles :

| **Ancienne fonction**       | **Nouvelle fonction**       |
|-----------------------------|-----------------------------|
| `loadJdpmState()`           | `loadJdpmState()`           |
| `saveJdpmState(state)`      | `saveJdpmState(state)`      |
| `markJdpmGameDone(gameId)`  | `markJdpmGameDone(gameId)`  |
| `resetJdpmState()`         | `resetJdpmState()`         |

> **Note** : Les noms de fonctions **n’ont pas changé**, donc cette étape peut être **optionnelle** si vous avez déjà utilisé `state_jdpm.js`.

---

### 3️⃣ Ajouter des fonctions utilitaires dans `js/utils.js`
**À ajouter dans `js/utils.js`** :
```javascript
// ==========================================
// STATE UTILITIES
// Fonctions utilitaires pour la gestion de l'état
// ==========================================

// ------------------------------------------
// Vérifier si un jeu est terminé et rediriger si nécessaire
// ------------------------------------------
function checkGameStatusAndRedirect(gameId, redirectUrl) {
  const state = loadJdpmState();
  const key = `game_${gameId}_done`;
  
  if (state[key]) {
    // Le jeu est déjà terminé : rediriger
    window.location.href = redirectUrl;
    return true;
  }
  
  return false;
}

// ------------------------------------------
// Marquer un jeu comme terminé et rediriger
// ------------------------------------------
function markGameDoneAndRedirect(gameId, redirectUrl) {
  markJdpmGameDone(gameId);
  window.location.href = redirectUrl;
}

// ------------------------------------------
// Vérifier la progression et mettre à jour l'UI
// ------------------------------------------
function updateProgressUI() {
  const progress = getJdpmProgress();
  const percentage = getJdpmProgressPercentage();
  
  // Mettre à jour le compteur (ex : "3/5 énigmes résolues")
  const progressCountEl = document.getElementById('progressCount');
  if (progressCountEl) {
    progressCountEl.textContent = progress;
  }
  
  // Mettre à jour la barre de progression
  const progressFillEl = document.getElementById('progressFill');
  if (progressFillEl) {
    progressFillEl.style.width = `${percentage}%`;
  }
  
  return { progress, percentage };
}

// ------------------------------------------
// Réinitialiser la progression avec confirmation
// ------------------------------------------
function resetProgressWithConfirmation() {
  if (confirm(t('hub.resetBtn') + ' ? ' + t('modals.welcome.text').split('.')[0] + '.')) {
    resetJdpmState();
    window.location.reload();
    return true;
  }
  return false;
}
```

---

### 4️⃣ Mettre à jour `hub.html` pour utiliser les nouvelles fonctions
**Exemple de mise à jour dans `hub.html`** :
```html
<script>
  // ---- Rendu des cartes ----
  function render() {
    const state = loadJdpmState();
    container.innerHTML = '';
    games.forEach(g => {
      const isDone = isJdpmGameDone(g.id); // Utilisation de la nouvelle fonction
      const card = document.createElement('button');
      card.className = 'game-card' + (isDone ? ' done' : '');
      // ... reste du code
    });
  }

  // ---- Mise à jour de la progression ----
  function updateProgress() {
    const { progress, percentage } = updateProgressUI(); // Utilisation de la nouvelle fonction
    document.getElementById('progressCount').textContent = progress;
    document.getElementById('progressFill').style.width = `${percentage}%`;
  }

  // ---- Réinitialisation ----
  document.getElementById('resetBtn').addEventListener('click', () => {
    resetProgressWithConfirmation(); // Utilisation de la nouvelle fonction
  });
</script>
```

---

## 🧪 Tests

### 1️⃣ **Test du chargement de l'état**
1. **Premier chargement** (pas de `localStorage`) :
   - `loadJdpmState()` doit retourner l’**état par défaut** (tous les jeux non terminés).
2. **Chargement avec état existant** :
   - Définir manuellement un état dans `localStorage` :
     ```javascript
     localStorage.setItem('jdpm_madd_state', JSON.stringify({ game_1_done: true, game_2_done: false, game_3_done: false, game_4_done: false, game_5_done: false }));
     ```
   - `loadJdpmState()` doit retourner cet état.

### 2️⃣ **Test de la sauvegarde de l'état**
1. Appeler `markJdpmGameDone(1)`.
2. Vérifier que `localStorage.getItem('jdpm_madd_state')` contient `game_1_done: true`.

### 3️⃣ **Test de la réinitialisation**
1. Marquer quelques jeux comme terminés.
2. Appeler `resetJdpmState()`.
3. Vérifier que `localStorage.getItem('jdpm_madd_state')` est **null**.

### 4️⃣ **Test des fonctions utilitaires**
1. `isAllJdpmGamesDone()` :
   - Si tous les jeux sont terminés, doit retourner `true`.
   - Sinon, doit retourner `false`.
2. `isJdpmGameDone(1)` :
   - Si le Jeu 1 est terminé, doit retourner `true`.
   - Sinon, doit retourner `false`.
3. `getJdpmProgress()` :
   - Doit retourner le **nombre de jeux terminés**.
4. `getJdpmGamesDone()` :
   - Doit retourner un **tableau des IDs des jeux terminés** (ex : `[1, 2, 3]`).

### 5️⃣ **Test de la persistance**
1. Marquer le Jeu 1 comme terminé.
2. **Recharger la page** : le Jeu 1 doit **toujours être marqué comme terminé**.
3. **Fermer et rouvrir le navigateur** : le Jeu 1 doit **toujours être marqué comme terminé**.

### 6️⃣ **Test des erreurs**
1. **Désactiver `localStorage`** (via DevTools ou en mode privé avec quota dépassé) :
   - `loadJdpmState()` doit retourner l’**état par défaut**.
   - `saveJdpmState(state)` ne doit pas **planter**.

---

## 📝 Notes

- **Fusion des fichiers** : Le nouveau `state.js` **remplace** à la fois l’ancien `state.js` (pour l’AR) et `state_jdpm.js` (pour les JDPM).
- **Compatibilité** : Les fonctions sont **rétrocompatibles** avec le code existant.
- **Performance** : Les fonctions évitent les **lectures/écritures inutiles** dans `localStorage`.
- **Gestion des erreurs** : Les fonctions gèrent les **cas d’erreur** (ex : `localStorage` plein ou désactivé).

---

## 🔗 Dépendances pour les prochaines stories

Cette story est **requise** pour :
- Aucune (c’est la dernière story technique).

---

## 📚 Ressources
- [localStorage - MDN](https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage)
- [JSON.parse() - MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
- [JSON.stringify() - MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

---

## ⚠️ Problèmes Connus et Solutions

| **Problème**                          | **Solution**                                                                                     |
|---------------------------------------|-------------------------------------------------------------------------------------------------|
| `localStorage` est plein               | Vérifier que le site ne stocke pas trop de données. Limiter la taille de `JDPM_STATE_KEY`.     |
| `localStorage` est désactivé           | Utiliser un **try/catch** et retourner l’état par défaut.                                       |
| État corrompu dans `localStorage`      | Utiliser `JSON.parse()` avec un **try/catch** et retourner l’état par défaut.                   |
| Jeu marqué comme terminé mais pas dans l'UI | Vérifier que `updateProgressUI()` est appelé après chaque modification de l’état.              |

---

## ✅ Checklist de Validation

- [ ] `js/state.js` est **créé** et contient toutes les fonctions nécessaires.
- [ ] Les **anciens fichiers** (`state_jdpm.js`) sont **supprimés** ou mis à jour.
- [ ] Toutes les pages HTML utilisent le **nouveau `state.js`**.
- [ ] `loadJdpmState()` fonctionne et retourne l’état correct.
- [ ] `saveJdpmState(state)` fonctionne et sauvegarde l’état.
- [ ] `markJdpmGameDone(gameId)` fonctionne et marque un jeu comme terminé.
- [ ] `resetJdpmState()` fonctionne et réinitialise l’état.
- [ ] `isAllJdpmGamesDone()` fonctionne et vérifie si tous les jeux sont terminés.
- [ ] `isJdpmGameDone(gameId)` fonctionne et vérifie si un jeu est terminé.
- [ ] `getJdpmProgress()` fonctionne et retourne le nombre de jeux terminés.
- [ ] `getJdpmGamesDone()` fonctionne et retourne la liste des jeux terminés.
- [ ] La **persistance** fonctionne après un rechargement de page.
- [ ] Les **erreurs** sont gérées correctement (ex : `localStorage` désactivé).
- [ ] Aucun erreur dans la console.

---

## 🎉 Livrable

À la fin de cette story, vous aurez :
✅ Un **fichier `state.js` unifié** pour gérer l’état global.
✅ Des **fonctions utilitaires** pour faciliter le développement.
✅ Une **gestion des erreurs** robuste.
✅ Une **persistance** fiable de la progression.
✅ Un **code plus maintenable** et plus propre.

---

**Fin de la story STORY-031** ✅

---

> **Note** : Cette story est **importante** pour assurer la **fiabilité** de la gestion de l’état. Elle doit être **prioritaire** avant la livraison finale.

---

## 📌 Annexe : Exemple d'Utilisation

### Exemple dans `game-1.html`
```javascript
// Marquer le jeu comme terminé et rediriger vers le HUB
function onSuccess(word) {
  if (gameWon) return;
  gameWon = true;
  markJdpmGameDone(1); // Utilisation de la fonction centralisée
  
  // Rediriger vers le HUB avec un paramètre de succès
  window.location.href = 'hub.html?win=1';
}

// Vérifier si le jeu est déjà terminé au chargement
document.addEventListener('DOMContentLoaded', () => {
  const state = loadJdpmState();
  if (state.game_1_done) {
    gameWon = true;
    showWinScreen();
  }
});
```

### Exemple dans `hub.html`
```javascript
// Mettre à jour la progression
function updateProgress() {
  const progress = getJdpmProgress(); // Utilisation de la fonction utilitaire
  const percentage = getJdpmProgressPercentage();
  
  document.getElementById('progressCount').textContent = progress;
  document.getElementById('progressFill').style.width = `${percentage}%`;
}

// Vérifier si tous les jeux sont terminés
document.addEventListener('DOMContentLoaded', () => {
  if (isAllJdpmGamesDone()) {
    // Rediriger vers la page de réussite
    window.location.href = 'success.html';
  }
});
```

---

**Fin du fichier STORY-031** 🎉
