# STORY-030 : Modales Partagées

## 📌 Métadonnées
- **ID** : STORY-030
- **Titre** : Modales partagées (Info, Réussite par jeu)
- **Priorité** : ⭐⭐⭐ (Medium)
- **Estimation** : 3h
- **Dépendances** : 
  - STORY-001 (Initialisation du projet)
  - STORY-003 (Multilingue)
- **Fichiers impactés** :
  - `css/base.css` (modifié)
  - `js/utils.js` (modifié)
  - Toutes les pages HTML (hub.html, game-1.html, etc.)

---

## 🎯 Description

Cette story consiste à **standardiser et améliorer les modales** utilisées dans toutes les pages du projet. L'objectif est de :
1. **Créer un style CSS commun** pour toutes les modales (Info, Réussite par jeu, Confirmation).
2. **Centraliser la logique JavaScript** pour ouvrir/fermer les modales.
3. **Rendre les modales accessibles** (focus trap, gestion du clavier).
4. **Assurer la cohérence** entre toutes les modales (design, animations).

> **Contexte** : Actuellement, chaque page a sa propre modal avec des styles et une logique différents. Cette story permet de **factoriser** ce code pour une meilleure maintenance.

---

## ✅ Critères d'Acceptation

- [ ] **Style CSS commun** :
  - [ ] Un **style de base** pour les modales est défini dans `css/base.css`.
  - [ ] Toutes les modales utilisent ce **style commun**.
  - [ ] Les modales ont un **design cohérent** (couleurs, bordures, ombres).

- [ ] **Animations** :
  - [ ] Les modales ont une **animation d'ouverture** (ex : fade + slide up).
  - [ ] Les modales ont une **animation de fermeture** (ex : fade + slide down).

- [ ] **Accessibilité** :
  - [ ] Les modales ont un **focus trap** (le focus reste à l'intérieur de la modal).
  - [ ] Les modales peuvent être **fermées avec la touche Échap**.
  - [ ] Les modales ont des **attributs `aria-*`** (ex : `aria-hidden`, `aria-modal`).

- [ ] **Fonctionnalités communes** :
  - [ ] Toutes les modales peuvent être **fermées en cliquant à l'extérieur**.
  - [ ] Toutes les modales ont un **bouton de fermeture (✕)**.
  - [ ] Les modales sont **traduites** (fr/en/es).

- [ ] **Intégration** :
  - [ ] Les modales sont **intégrées dans toutes les pages** (HUB, Jeux 1-5, Réussite).
  - [ ] Le code JavaScript pour gérer les modales est **centralisé** dans `js/utils.js`.

---

## 🛠️ Tâches Techniques

### 1️⃣ Ajouter le style CSS commun dans `css/base.css`
**À ajouter dans `css/base.css`** :
```css
/* ============================================
   MODAL CSS (Partagé)
   Styles communs à toutes les modales
   ============================================ */

/* Overlay de la modal */
.modal-overlay {
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

.modal-overlay.open {
  display: flex;
  opacity: 1;
  pointer-events: auto;
}

/* Boîte de la modal */
.modal-box {
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
  clip-path: polygon(
    0% 6px, 4% 0%, 9% 5px, 14% 0%, 19% 5px, 24% 0%, 29% 5px, 34% 0%, 39% 5px, 44% 0%,
    49% 5px, 54% 0%, 59% 5px, 64% 0%, 69% 5px, 74% 0%, 79% 5px, 84% 0%, 89% 5px, 94% 0%, 100% 6px,
    100% 100%, 0% 100%
  );
}

.modal-overlay.open .modal-box {
  transform: translateY(0) scale(1);
}

/* Bouton de fermeture */
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

.modal-close:focus {
  outline: 3px dashed var(--orange);
  outline-offset: 3px;
}

/* Titre de la modal */
.modal-title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 22px;
  color: var(--blue);
  margin: 0 0 var(--spacing-sm);
}

/* Texte de la modal */
.modal-text {
  font-size: 14.5px;
  line-height: 1.55;
  color: rgba(13, 77, 150, 0.85);
  margin: 0 0 var(--spacing-lg);
}

/* Bouton CTA de la modal */
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

.modal-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 0 rgba(232, 60, 110, 0.4);
}

.modal-cta:active {
  transform: translateY(0);
  box-shadow: 0 2px 0 rgba(232, 60, 110, 0.35);
}

.modal-cta:focus {
  outline: 3px dashed var(--orange);
  outline-offset: 3px;
}

/* Emoji de la modal */
.modal-emoji {
  font-size: 38px;
  margin-bottom: var(--spacing-xs);
}

/* Focus trap (pour l'accessibilité) */
.modal-overlay.open {
  overflow: hidden;
}

.modal-box:focus {
  outline: none;
}

/* Animation pour les modales */
@keyframes modalFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes modalSlideUp {
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
  .modal-box {
    transition: none !important;
    transform: none !important;
  }
  
  .modal-overlay {
    transition: none !important;
  }
}
```

---

### 2️⃣ Ajouter les fonctions JavaScript dans `js/utils.js`
**À ajouter dans `js/utils.js`** :
```javascript
// ==========================================
// MODAL UTILITIES
// Fonctions pour gérer les modales
// ==========================================

// ------------------------------------------
// Ouvrir une modal
// ------------------------------------------
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) {
    console.warn(`⚠️ Modal non trouvée: ${modalId}`);
    return;
  }
  
  modal.classList.add('open');
  document.body.style.overflow = 'hidden'; // Empêche le scroll en arrière-plan
  
  // Focus trap : focus sur le premier élément focusable de la modal
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (focusableElements.length > 0) {
    focusableElements[0].focus();
  }
  
  // Ajouter un attribut aria-modal
  modal.setAttribute('aria-hidden', 'false');
  modal.setAttribute('aria-modal', 'true');
}

// ------------------------------------------
// Fermer une modal
// ------------------------------------------
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) {
    console.warn(`⚠️ Modal non trouvée: ${modalId}`);
    return;
  }
  
  modal.classList.remove('open');
  document.body.style.overflow = ''; // Réactive le scroll
  
  // Focus trap : retourner le focus à l'élément qui a ouvert la modal
  const trigger = document.querySelector(`[data-modal-trigger="${modalId}"]`);
  if (trigger) {
    trigger.focus();
  }
  
  // Réinitialiser les attributs aria
  modal.setAttribute('aria-hidden', 'true');
  modal.removeAttribute('aria-modal');
}

// ------------------------------------------
// Initialiser une modal (ajouter les événements)
// ------------------------------------------
function initModal(modalId, closeButtonId = null) {
  const modal = document.getElementById(modalId);
  if (!modal) {
    console.warn(`⚠️ Modal non trouvée: ${modalId}`);
    return;
  }
  
  // Fermer en cliquant sur le bouton de fermeture
  if (closeButtonId) {
    const closeBtn = document.getElementById(closeButtonId);
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeModal(modalId));
    }
  }
  
  // Fermer en cliquant à l'extérieur de la modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal(modalId);
    }
  });
  
  // Fermer avec la touche Échap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal(modalId);
    }
  });
  
  // Focus trap : gérer le tabulation à l'intérieur de la modal
  modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || !modal.classList.contains('open')) return;
    
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey && document.activeElement === firstElement) {
      // Shift + Tab sur le premier élément : aller au dernier
      lastElement.focus();
      e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      // Tab sur le dernier élément : aller au premier
      firstElement.focus();
      e.preventDefault();
    }
  });
}

// ------------------------------------------
// Initialiser toutes les modales de la page
// ------------------------------------------
function initAllModals() {
  // Trouver toutes les modales dans la page
  const modals = document.querySelectorAll('.modal-overlay');
  modals.forEach(modal => {
    const modalId = modal.id;
    const closeButtonId = `${modalId}Close`; // Convention : modalId + 'Close'
    initModal(modalId, closeButtonId);
  });
}

// Appeler initAllModals() au chargement de la page
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', initAllModals);
}
```

---

### 3️⃣ Mettre à jour les pages HTML pour utiliser les fonctions partagées

#### a) **Supprimer les styles CSS redondants**
Dans chaque page HTML (`hub.html`, `game-1.html`, etc.), **supprimez les styles CSS spécifiques aux modales** (ex : `.modal-overlay`, `.modal-box`, etc.) et **utilisez uniquement le style commun** depuis `css/base.css`.

#### b) **Mettre à jour les IDs des modales**
Assurez-vous que chaque modal a un **ID unique** et que le bouton de fermeture suit la convention `modalId + 'Close'`.

**Exemple pour `hub.html`** :
```html
<!-- Avant -->
<div class="modal-overlay" id="modalOverlay">
  <div class="modal-box">
    <button class="modal-close" id="modalClose">✕</button>
    ...
  </div>
</div>

<!-- Après -->
<div class="modal-overlay" id="info-modal">
  <div class="modal-box">
    <button class="modal-close" id="info-modalClose">✕</button>
    ...
  </div>
</div>
```

#### c) **Mettre à jour le JavaScript**
Remplacez le code JavaScript spécifique aux modales par les **fonctions partagées** depuis `js/utils.js`.

**Exemple pour `hub.html`** :
```html
<!-- Avant -->
<script>
  const overlay = document.getElementById('modalOverlay');
  function openModal() { overlay.classList.add('open'); }
  function closeModal() { overlay.classList.remove('open'); }
  
  document.getElementById('modalClose').addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
</script>

<!-- Après -->
<script>
  // Initialiser la modal au chargement
  document.addEventListener('DOMContentLoaded', () => {
    initModal('info-modal', 'info-modalClose');
  });
  
  // Ouvrir la modal
  function openInfoModal() { openModal('info-modal'); }
</script>
```

#### d) **Ajouter les attributs `data-modal-trigger`**
Pour les boutons qui ouvrent une modal, ajoutez un attribut `data-modal-trigger` pour le **focus trap**.

**Exemple** :
```html
<button class="info-btn" id="infoBtn" data-modal-trigger="info-modal">ⓘ</button>
```

---

### 4️⃣ Mettre à jour les fichiers CSS spécifiques
Dans les fichiers CSS spécifiques (`css/hub.css`, `css/game-1.css`, etc.), **supprimez les styles redondants** pour les modales. Conservez uniquement les styles **spécifiques à la page** (ex : `.modal-emoji` pour le HUB).

---

## 🧪 Tests

### 1️⃣ **Test de l'ouverture/fermeture des modales**
1. Ouvrir une modal (ex : cliquer sur "ⓘ" dans le HUB).
2. Vérifier que la modal **s’ouvre correctement** (animation, overlay).
3. Fermer la modal en cliquant sur "✕" : elle doit **se fermer**.
4. Fermer la modal en cliquant à l’extérieur : elle doit **se fermer**.
5. Fermer la modal avec la touche **Échap** : elle doit **se fermer**.

### 2️⃣ **Test du focus trap**
1. Ouvrir une modal.
2. Appuyer sur **Tab** : le focus doit **rester à l’intérieur de la modal**.
3. Appuyer sur **Shift + Tab** : le focus doit **rester à l’intérieur de la modal**.
4. Fermer la modal : le focus doit **revenir au bouton qui a ouvert la modal**.

### 3️⃣ **Test de l'accessibilité**
1. Ouvrir une modal.
2. Vérifier que la modal a les attributs `aria-hidden=