# STORY-003 : Système Multilingue (fr/en/es)

## 📌 Métadonnées
- **ID** : STORY-003
- **Titre** : Système multilingue (Français, Anglais, Espagnol)
- **Priorité** : ⭐⭐⭐⭐ (High)
- **Estimation** : 3h
- **Dépendances** : STORY-001 (Initialisation du projet)
- **Fichiers impactés** :
  - `js/translations.js` (nouveau)
  - `js/utils.js` (modifié)
  - `hub.html` (modifié)
  - `game-1.html` à `game-5.html` (modifiés)
  - `success.html` (modifié)
  - `css/base.css` (modifié)

---

## 🎯 Description

Cette story consiste à **ajouter un système multilingue** pour supporter le **Français**, l'**Anglais** et l'**Espagnol**. L'objectif est de :
1. Créer des **fichiers de traduction** (JSON) pour chaque langue.
2. Implémenter un **sélecteur de langue** (bouton en haut de page).
3. **Charger dynamiquement** les traductions en fonction de la langue sélectionnée.
4. **Sauvegarder la langue** dans `localStorage` pour persister le choix.
5. **Détecter la langue du navigateur** par défaut (fallback : Français).

> **Contexte** : Le site sera utilisé par un **public international** (touristes, participants non francophones).

---

## ✅ Critères d'Acceptation

- [ ] **Fichiers de traduction** :
  - [ ] `js/translations/fr.json` (Français)
  - [ ] `js/translations/en.json` (Anglais)
  - [ ] `js/translations/es.json` (Espagnol)

- [ ] **Sélecteur de langue** :
  - [ ] Bouton de sélection **visible sur toutes les pages** (en haut à droite).
  - [ ] Affichage des drapeaux 🇫🇷 🇬🇧 🇪🇸 ou codes de langue (FR/EN/ES).
  - [ ] Changement de langue **sans rechargement** (ou avec rechargement si nécessaire).

- [ ] **Gestion de l'état** :
  - [ ] La langue sélectionnée est **sauvegardée dans `localStorage`**.
  - [ ] La langue est **chargée au démarrage** (fallback : Français).

- [ ] **Détection automatique** :
  - [ ] Détection de la langue du navigateur (`navigator.language`).
  - [ ] Si la langue du navigateur est supportée (fr/en/es), l'utiliser par défaut.

- [ ] **Traductions complètes** :
  - [ ] Toutes les **pages** (HUB, Jeux, Réussite) sont traduites.
  - [ ] Tous les **textes statiques** (titres, boutons, messages) sont traduits.
  - [ ] Les **placeholders** (ex : "Saisissez votre réponse") sont traduits.

- [ ] **Fallback** :
  - [ ] Si une traduction est manquante, afficher le **texte en Français**.

---

## 🛠️ Tâches Techniques

### 1️⃣ Créer le dossier `js/translations/` et les fichiers JSON

#### a) Structure du dossier
```bash
mkdir -p js/translations
```

#### b) Fichier `js/translations/fr.json` (Français)
```json
{
  "language": "fr",
  "name": "Français",
  "flag": "🇫🇷",
  "direction": "ltr",
  "translations": {
    // --- HUB ---
    "hub": {
      "title": "Journées du Patrimoine et Matrimoine",
      "subtitle": "Chasse aux énigmes au MAD",
      "startBtn": "Commencer l'aventure",
      "progress": "Progression",
      "of": "sur",
      "enigmasSolved": "énigmes résolues",
      "prize": "Gagnez un livre sur le design !",
      "resetBtn": "Réinitialiser le jeu"
    },
    
    // --- Boutons communs ---
    "buttons": {
      "backToHub": "Retour au HUB",
      "info": "Info",
      "validate": "Valider",
      "cancel": "Annuler",
      "hint": "Indice",
      "next": "Suivant",
      "retry": "Réessayer"
    },
    
    // --- Modales ---
    "modals": {
      "welcome": {
        "title": "Bienvenue, explorateur·ice !",
        "text": "5 énigmes t'attendent sur le chemin. Résous-les une par une pour remplir la jauge en bas de l'écran et débloquer le trésor final. Touche une carte pour démarrer une énigme.",
        "cta": "C'est parti !"
      },
      "success": {
        "title": "Félicitations !",
        "text": "Vous avez résolu cette énigme !",
        "cta": "Retour au HUB"
      },
      "error": {
        "title": "Erreur",
        "text": "Ce n'est pas la bonne réponse. Essayez encore !",
        "cta": "OK"
      }
    },
    
    // --- Jeux ---
    "games": {
      "game1": {
        "title": "Jeu 1 - Réalité Augmentée",
        "subtitle": "Décodez le message caché",
        "instructions": "Pointez la caméra vers la cible pour révéler l'indice.",
        "targetFound": "Cible détectée !",
        "targetLost": "Cible perdue"
      },
      "game2": {
        "title": "Jeu 2 - NFC/QR Code",
        "subtitle": "Scannez le code pour continuer",
        "instructions": "Approchez votre appareil du tag NFC ou scannez le QR code.",
        "qrModalTitle": "Scanner un QR Code",
        "qrModalInstructions": "Pointez la caméra vers le QR code.",
        "qrSuccess": "QR Code valide !",
        "qrError": "QR Code invalide. Essayez un autre code."
      },
      "game3": {
        "title": "Jeu 3 - Recherche d'image",
        "subtitle": "Trouvez le détail caché",
        "question": "Quel est le nom de ce meuble ?",
        "placeholder": "Saisissez le nom du meuble",
        "correct": "Bravo ! C'est la bonne réponse.",
        "incorrect": "Ce n'est pas le bon nom. Essayez encore."
      },
      "game4": {
        "title": "Jeu 4 - Énigme",
        "subtitle": "Résolvez l'énigme",
        "question": "Je suis un meuble du XVIIIème siècle, qui suis-je ?",
        "placeholder": "Saisissez votre réponse",
        "hint": "Je suis souvent en bois et j'ai des tiroirs.",
        "correct": "Exact ! Vous avez trouvé.",
        "incorrect": "Ce n'est pas la bonne réponse."
      },
      "game5": {
        "title": "Jeu 5 - QCM",
        "subtitle": "Choisissez la bonne réponse",
        "question": "Quel est le designer de ce meuble ?",
        "correct": "Bonne réponse !",
        "incorrect": "Mauvaise réponse. Essayez encore."
      }
    },
    
    // --- Page de réussite ---
    "success": {
      "title": "Bravo !",
      "subtitle": "Vous avez résolu les 5 énigmes !",
      "message": "Félicitations ! Vous avez complété toutes les énigmes de la chasse au trésor.",
      "badge": "Badge du Champion",
      "formMessage": "Vous allez être redirigé vers un formulaire pour participer au tirage au sort et gagner un livre sur le design.",
      "formBtn": "Remplir le formulaire",
      "backToHub": "Retour au HUB"
    },
    
    // --- Messages divers ---
    "misc": {
      "offline": "Mode hors ligne activé",
      "loading": "Chargement en cours...",
      "childHelp": "Les enfants peuvent être aidés par un adulte."
    }
  }
}
```

#### c) Fichier `js/translations/en.json` (Anglais)
```json
{
  "language": "en",
  "name": "English",
  "flag": "🇬🇧",
  "direction": "ltr",
  "translations": {
    "hub": {
      "title": "Heritage and Matrimony Days",
      "subtitle": "Treasure Hunt at MAD",
      "startBtn": "Start the Adventure",
      "progress": "Progress",
      "of": "of",
      "enigmasSolved": "puzzles solved",
      "prize": "Win a book on design!",
      "resetBtn": "Reset the Game"
    },
    "buttons": {
      "backToHub": "Back to HUB",
      "info": "Info",
      "validate": "Validate",
      "cancel": "Cancel",
      "hint": "Hint",
      "next": "Next",
      "retry": "Try Again"
    },
    "modals": {
      "welcome": {
        "title": "Welcome, explorer!",
        "text": "5 puzzles await you on the path. Solve them one by one to fill the gauge at the bottom of the screen and unlock the final treasure. Tap a card to start a puzzle.",
        "cta": "Let's go!"
      },
      "success": {
        "title": "Congratulations!",
        "text": "You have solved this puzzle!",
        "cta": "Back to HUB"
      },
      "error": {
        "title": "Error",
        "text": "That's not the correct answer. Try again!",
        "cta": "OK"
      }
    },
    "games": {
      "game1": {
        "title": "Game 1 - Augmented Reality",
        "subtitle": "Decode the hidden message",
        "instructions": "Point the camera at the target to reveal the clue.",
        "targetFound": "Target detected!",
        "targetLost": "Target lost"
      },
      "game2": {
        "title": "Game 2 - NFC/QR Code",
        "subtitle": "Scan the code to continue",
        "instructions": "Bring your device close to the NFC tag or scan the QR code.",
        "qrModalTitle": "Scan a QR Code",
        "qrModalInstructions": "Point the camera at the QR code.",
        "qrSuccess": "Valid QR Code!",
        "qrError": "Invalid QR Code. Try another one."
      },
      "game3": {
        "title": "Game 3 - Image Search",
        "subtitle": "Find the hidden detail",
        "question": "What is the name of this furniture?",
        "placeholder": "Enter the furniture name",
        "correct": "Well done! That's the correct answer.",
        "incorrect": "That's not the right name. Try again."
      },
      "game4": {
        "title": "Game 4 - Riddle",
        "subtitle": "Solve the riddle",
        "question": "I am an 18th century furniture, who am I?",
        "placeholder": "Enter your answer",
        "hint": "I am usually made of wood and have drawers.",
        "correct": "Correct! You found it.",
        "incorrect": "That's not the right answer."
      },
      "game5": {
        "title": "Game 5 - Multiple Choice",
        "subtitle": "Choose the correct answer",
        "question": "Who is the designer of this furniture?",
        "correct": "Correct answer!",
        "incorrect": "Wrong answer. Try again."
      }
    },
    "success": {
      "title": "Well Done!",
      "subtitle": "You have solved all 5 puzzles!",
      "message": "Congratulations! You have completed all the puzzles in the treasure hunt.",
      "badge": "Champion Badge",
      "formMessage": "You will be redirected to a form to participate in the draw and win a book on design.",
      "formBtn": "Fill in the Form",
      "backToHub": "Back to HUB"
    },
    "misc": {
      "offline": "Offline mode activated",
      "loading": "Loading...",
      "childHelp": "Children can be helped by an adult."
    }
  }
}
```

#### d) Fichier `js/translations/es.json` (Espagnol)
```json
{
  "language": "es",
  "name": "Español",
  "flag": "🇪🇸",
  "direction": "ltr",
  "translations": {
    "hub": {
      "title": "Jornadas del Patrimonio y Matrimonio",
      "subtitle": "Búsqueda del tesoro en el MAD",
      "startBtn": "Comenzar la aventura",
      "progress": "Progreso",
      "of": "de",
      "enigmasSolved": "enigmas resueltos",
      "prize": "¡Gana un libro sobre diseño!",
      "resetBtn": "Reiniciar el juego"
    },
    "buttons": {
      "backToHub": "Volver al HUB",
      "info": "Info",
      "validate": "Validar",
      "cancel": "Cancelar",
      "hint": "Pista",
      "next": "Siguiente",
      "retry": "Reintentar"
    },
    "modals": {
      "welcome": {
        "title": "¡Bienvenido, explorador!",
        "text": "5 enigmas te esperan en el camino. Resuélvelos uno por uno para llenar la barra de progreso en la parte inferior de la pantalla y desbloquear el tesoro final. Toca una tarjeta para comenzar un enigma.",
        "cta": "¡Vamos!"
      },
      "success": {
        "title": "¡Felicidades!",
        "text": "¡Has resuelto este enigma!",
        "cta": "Volver al HUB"
      },
      "error": {
        "title": "Error",
        "text": "Esa no es la respuesta correcta. ¡Inténtalo de nuevo!",
        "cta": "OK"
      }
    },
    "games": {
      "game1": {
        "title": "Juego 1 - Realidad Aumentada",
        "subtitle": "Descifra el mensaje oculto",
        "instructions": "Apunta la cámara al objetivo para revelar la pista.",
        "targetFound": "¡Objetivo detectado!",
        "targetLost": "Objetivo perdido"
      },
      "game2": {
        "title": "Juego 2 - NFC/Código QR",
        "subtitle": "Escanea el código para continuar",
        "instructions": "Acercar el dispositivo a la etiqueta NFC o escanear el código QR.",
        "qrModalTitle": "Escanear un Código QR",
        "qrModalInstructions": "Apunta la cámara al código QR.",
        "qrSuccess": "¡Código QR válido!",
        "qrError": "Código QR no válido. Prueba otro."
      },
      "game3": {
        "title": "Juego 3 - Búsqueda de imagen",
        "subtitle": "Encuentra el detalle oculto",
        "question": "¿Cuál es el nombre de este mueble?",
        "placeholder": "Ingresa el nombre del mueble",
        "correct": "¡Bien hecho! Esa es la respuesta correcta.",
        "incorrect": "Ese no es el nombre correcto. Inténtalo de nuevo."
      },
      "game4": {
        "title": "Juego 4 - Enigma",
        "subtitle": "Resuelve el enigma",
        "question": "Soy un mueble del siglo XVIII, ¿quién soy?",
        "placeholder": "Ingresa tu respuesta",
        "hint": "Generalmente soy de madera y tengo cajones.",
        "correct": "¡Correcto! Lo encontraste.",
        "incorrect": "Esa no es la respuesta correcta."
      },
      "game5": {
        "title": "Juego 5 - Opción múltiple",
        "subtitle": "Elige la respuesta correcta",
        "question": "¿Quién es el diseñador de este mueble?",
        "correct": "¡Respuesta correcta!",
        "incorrect": "Respuesta incorrecta. Inténtalo de nuevo."
      }
    },
    "success": {
      "title": "¡Excelente!",
      "subtitle": "¡Has resuelto los 5 enigmas!",
      "message": "¡Felicidades! Has completado todos los enigmas de la búsqueda del tesoro.",
      "badge": "Insignia del Campeón",
      "formMessage": "Serás redirigido a un formulario para participar en el sorteo y ganar un libro sobre diseño.",
      "formBtn": "Rellenar el formulario",
      "backToHub": "Volver al HUB"
    },
    "misc": {
      "offline": "Modo fuera de línea activado",
      "loading": "Cargando...",
      "childHelp": "Los niños pueden ser ayudados por un adulto."
    }
  }
}
```

---

### 2️⃣ Créer `js/translations.js` (Gestion des traductions)
**Fichier** : `/js/translations.js`
**Contenu** :
```javascript
// ==========================================
// TRANSLATIONS.JS
// Gestion des traductions multilingues (fr/en/es)
// JDPM - Journées du Patrimoine et Matrimoine
// ==========================================

// ------------------------------------------
// Configuration
// ------------------------------------------
const SUPPORTED_LANGUAGES = ['fr', 'en', 'es'];
const DEFAULT_LANGUAGE = 'fr';
const TRANSLATIONS_PATH = 'js/translations/';

// ------------------------------------------
// État de la langue
// ------------------------------------------
let currentLanguage = DEFAULT_LANGUAGE;
let translations = {};

// ------------------------------------------
// Charger une langue
// ------------------------------------------
async function loadLanguage(lang) {
  try {
    const response = await fetch(`${TRANSLATIONS_PATH}${lang}.json`);
    if (!response.ok) {
      throw new Error(`Fichier de traduction non trouvé: ${lang}.json`);
    }
    const data = await response.json();
    translations = data.translations;
    currentLanguage = lang;
    
    // Sauvegarder dans localStorage
    localStorage.setItem('jdpm_lang', lang);
    
    console.log(`✅ Langue chargée: ${lang}`);
    return data;
  } catch (error) {
    console.error(`❌ Erreur lors du chargement de la langue ${lang}:`, error);
    // Fallback vers le français
    return loadLanguage(DEFAULT_LANGUAGE);
  }
}

// ------------------------------------------
// Changer de langue
// ------------------------------------------
async function changeLanguage(lang) {
  if (!SUPPORTED_LANGUAGES.includes(lang)) {
    console.warn(`⚠️ Langue non supportée: ${lang}. Utilisation de ${DEFAULT_LANGUAGE}.`);
    lang = DEFAULT_LANGUAGE;
  }
  
  await loadLanguage(lang);
  
  // Mettre à jour le DOM
  updateDOMTranslations();
  
  // Déclencher un événement pour les composants qui écoutent
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

// ------------------------------------------
// Obtenir la traduction d'une clé
// ------------------------------------------
function t(key, fallback = key) {
  // Remplacer les points par des niveaux d'objet (ex: "hub.title" → translations.hub.title)
  const keys = key.split('.');
  let value = translations;
  
  for (const k of keys) {
    if (value && value.hasOwnProperty(k)) {
      value = value[k];
    } else {
      console.warn(`⚠️ Traduction manquante pour la clé: ${key} (langue: ${currentLanguage})`);
      return fallback;
    }
  }
  
  return value || fallback;
}

// ------------------------------------------
// Détecter la langue du navigateur
// ------------------------------------------
function detectBrowserLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;
  const lang = browserLang.split('-')[0].toLowerCase();
  
  // Vérifier si la langue est supportée
  if (SUPPORTED_LANGUAGES.includes(lang)) {
    return lang;
  }
  
  // Fallback vers le français
  return DEFAULT_LANGUAGE;
}

// ------------------------------------------
// Initialiser les traductions
// ------------------------------------------
async function initTranslations() {
  // Charger la langue sauvegardée ou détecter celle du navigateur
  const savedLang = localStorage.getItem('jdpm_lang');
  const lang = savedLang || detectBrowserLanguage();
  
  await loadLanguage(lang);
  
  // Mettre à jour le DOM
  updateDOMTranslations();
}

// ------------------------------------------
// Mettre à jour le DOM avec les traductions
// ------------------------------------------
function updateDOMTranslations() {
  // Sélecteur de langue
  const langSelector = document.getElementById('lang-selector');
  if (langSelector) {
    langSelector.innerHTML = SUPPORTED_LANGUAGES.map(lang => {
      const data = getLanguageData(lang);
      return `
        <button 
          class="lang-btn ${lang === currentLanguage ? 'active' : ''}" 
          data-lang="${lang}"
          title="${data.name}"
        >
          ${data.flag}
        </button>
      `;
    }).join('');
    
    // Ajouter les événements de clic
    langSelector.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        changeLanguage(btn.dataset.lang);
      });
    });
  }
  
  // Mettre à jour tous les éléments avec l'attribut data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = t(key, el.textContent);
  });
  
  // Mettre à jour les placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    el.placeholder = t(key, el.placeholder);
  });
  
  // Mettre à jour les titres
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.dataset.i18nTitle;
    el.title = t(key, el.title);
  });
}

// ------------------------------------------
// Obtenir les données d'une langue (pour le sélecteur)
// ------------------------------------------
function getLanguageData(lang) {
  try {
    // Essayer de charger les données depuis le fichier JSON
    // (En pratique, on pourrait précharger ces données ou les mettre en cache)
    const data = {
      fr: { name: 'Français', flag: '🇫🇷' },
      en: { name: 'English', flag: '🇬🇧' },
      es: { name: 'Español', flag: '🇪🇸' }
    };
    return data[lang] || { name: lang, flag: '🌐' };
  } catch (e) {
    return { name: lang, flag: '🌐' };
  }
}

// ------------------------------------------
// Obtenir la langue actuelle
// ------------------------------------------
function getCurrentLanguage() {
  return currentLanguage;
}

// ------------------------------------------
// Exporter pour les modules ES6 (si besoin)
// ------------------------------------------
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initTranslations,
    changeLanguage,
    t,
    getCurrentLanguage,
    SUPPORTED_LANGUAGES,
    DEFAULT_LANGUAGE
  };
}
```

---

### 3️⃣ Modifier `js/utils.js` (Ajouter la gestion des traductions)
**À ajouter dans `js/utils.js`** :
```javascript
// ------------------------------------------
// Traductions (intégration avec translations.js)
// ------------------------------------------
let translationsInitialized = false;

async function initUtils() {
  if (!translationsInitialized) {
    await initTranslations();
    translationsInitialized = true;
  }
}

// Appeler initUtils() au chargement de la page
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', initUtils);
}
```

---

### 4️⃣ Modifier les pages HTML (Ajouter le sélecteur de langue et les attributs `data-i18n`)

#### a) Ajouter le sélecteur de langue dans le `<header>` ou `<body>`
**Exemple pour `hub.html`** :
```html
<!-- Dans le <body>, avant le contenu principal -->
<div class="lang-selector" id="lang-selector"></div>
```

#### b) Ajouter les attributs `data-i18n` aux éléments à traduire
**Exemple pour `hub.html`** :
```html
<header class="hub-header">
  <h1 class="hub-title" data-i18n="hub.title">JDPM - Chasse aux Énigmes</h1>
  <p class="hub-subtitle" data-i18n="hub.subtitle">Chasse aux énigmes au MAD</p>
  <p class="prize-message" data-i18n="hub.prize">Gagnez un livre sur le design !</p>
</header>

<!-- Boutons -->
<button class="start-btn" data-i18n="hub.startBtn">Commencer l'aventure</button>
<button class="reset-btn" data-i18n="hub.resetBtn">Réinitialiser le jeu</button>

<!-- Barre de progression -->
<div class="progress-label">
  <span data-i18n="hub.progress">Progression</span>
  <span><b id="progressCount">0</b> <span data-i18n="hub.of">/</span>5 <span data-i18n="hub.enigmasSolved">énigmes résolues</span></span>
</div>
```

**Exemple pour `game-1.html`** :
```html
<header class="game-header">
  <a href="hub.html" class="back-btn" data-i18n="buttons.backToHub">Retour au HUB</a>
  <h1 class="game-title" data-i18n="games.game1.title">Jeu 1 - Réalité Augmentée</h1>
  <button class="info-btn" id="infoBtn" aria-label="Info" data-i18n-title="buttons.info">ⓘ</button>
</header>

<main>
  <p class="game-instructions" data-i18n="games.game1.instructions">
    Pointez la caméra vers la cible pour révéler l'indice.
  </p>
</main>

<footer class="game-footer">
  <button class="camera-btn" data-i18n="buttons.validate">Activer la caméra</button>
</footer>
```

#### c) Ajouter les scripts de traduction
**À ajouter dans le `<head>` ou avant `</body>`** :
```html
<script src="js/translations.js"></script>
<script>
  // Initialiser les traductions au chargement
  document.addEventListener('DOMContentLoaded', async () => {
    await initTranslations();
  });
</script>
```

---

### 5️⃣ Ajouter le style du sélecteur de langue dans `css/base.css`
**À ajouter dans `css/base.css`** :
```css
/* Sélecteur de langue */
.lang-selector {
  position: fixed;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  z-index: 100;
  display: flex;
  gap: var(--spacing-xs);
  background: rgba(255, 255, 255, 0.9);
  padding: var(--spacing-xs);
  border-radius: var(--border-radius-md);
  box-shadow: var(--box-shadow-sm);
  backdrop-filter: blur(4px);
}

.lang-btn {
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-xs);
  border-radius: 50%;
  transition: all var(--transition-fast);
  color: var(--blue);
}

.lang-btn:hover {
  background: rgba(13, 77, 150, 0.1);
}

.lang-btn.active {
  background: var(--teal);
  color: var(--white);
  box-shadow: 0 0 0 2px var(--teal) inset;
}

.lang-btn:focus {
  outline: 2px solid var(--orange);
  outline-offset: 2px;
}
```

---

## 🧪 Tests

### 1️⃣ **Test du sélecteur de langue**
1. Ouvrir `hub.html` dans un navigateur.
2. Vérifier que le sélecteur de langue (🇫🇷 🇬🇧 🇪🇸) est **visible en haut à droite**.
3. Cliquer sur 🇬🇧 : tous les textes doivent **passer en anglais**.
4. Cliquer sur 🇪🇸 : tous les textes doivent **passer en espagnol**.
5. Recharger la page : la langue doit **persister**.

### 2️⃣ **Test de la détection automatique**
1. Changer la langue du navigateur en **Espagnol** (ex : dans Chrome : Paramètres > Langues).
2. Ouvrir `hub.html` : la page doit **s'afficher en espagnol** par défaut.
3. Changer la langue du navigateur en **Anglais** : la page doit **s'afficher en anglais**.

### 3️⃣ **Test des traductions manquantes**
1. Ajouter une clé manquante dans le HTML (ex : `<p data-i18n="hub.missingKey">Texte par défaut</p>`).
2. Vérifier que le **texte par défaut** est affiché (fallback).
3. Vérifier qu'un **avertissement** est logged dans la console.

### 4️⃣ **Test sur mobile**
1. Ouvrir le site sur un **smartphone** (iOS/Android).
2. Vérifier que le sélecteur de langue est **accessible et fonctionnel**.
3. Vérifier que les textes sont **correctement traduits**.

---

## 📝 Notes

- **Fallback** : Si une traduction est manquante, le texte **par défaut** (en Français) est affiché.
- **Performance** : Les fichiers JSON sont **petits** (~5-10 Ko) et chargés **une seule fois**.
- **SEO** : Pour le référencement, il faudrait ajouter des balises `<html lang="fr">` dynamiques. (Non critique pour ce projet.)
- **RTL** : Le système supporte les langues **RTL** (ex : Arabe) via la propriété `direction` dans les fichiers JSON. (Non utilisé ici.)

---

## 🔗 Dépendances pour les prochaines stories

Cette story est **requise** pour :
- STORY-010 (HUB)
- STORY-020 à STORY-025 (Jeux)
- STORY-025 (Page de réussite)

> **Note** : Sans cette story, le site ne sera **pas accessible aux non-francophones**.

---

## 📚 Ressources
- [MDN - Internationalization](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Internationalization)
- [i18n with JavaScript](https://www.i18next.com/) (alternative plus avancée)
- [JSON for Translations](https://formatjs.io/docs/introduction/) (bonnes pratiques)
- [Detect Browser Language](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage/language)

---

## ⚠️ Problèmes Connus et Solutions

| **Problème**                          | **Solution**                                                                                     |
|---------------------------------------|-------------------------------------------------------------------------------------------------|
| Traductions non chargées              | Vérifier que `initTranslations()` est appelé au `DOMContentLoaded`.                          |
| Sélecteur de langue invisible         | Vérifier que le CSS pour `.lang-selector` est correctement appliqué.                          |
| Langue non persistante                 | Vérifier que `localStorage.setItem('jdpm_lang', lang)` est appelé dans `loadLanguage()`.     |
| Erreurs 404 pour les fichiers JSON    | Vérifier que les fichiers sont dans `js/translations/` et que les chemins sont corrects.    |
| Texte non traduit                      | Vérifier que l'attribut `data-i18n` est correctement défini.                                |

---

## ✅ Checklist de Validation

- [ ] Les fichiers `fr.json`, `en.json`, `es.json` existent et sont valides.
- [ ] `js/translations.js` est créé et fonctionnel.
- [ ] Le sélecteur de langue est **visible et fonctionnel** sur toutes les pages.
- [ ] Les traductions sont **chargées dynamiquement** sans rechargement.
- [ ] La langue est **sauvegardée dans `localStorage`** et persistante.
- [ ] La détection automatique de la langue du navigateur fonctionne.
- [ ] Les **fallbacks** fonctionnent pour les traductions manquantes.
- [ ] Le site est **testé sur mobile** (iOS/Android).
- [ ] Aucun erreur dans la console.

---

## 🎉 Livrable

À la fin de cette story, vous aurez :
✅ Un **système multilingue complet** (fr/en/es).
✅ Un **sélecteur de langue** accessible sur toutes les pages.
✅ Une **détection automatique** de la langue du navigateur.
✅ Des **traductions persistantes** (sauvegardées dans `localStorage`).

---

**Prochaine étape** : [STORY-010 - Page HUB](hub/STORY-010_hub.md)
