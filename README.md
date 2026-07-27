# 🏛️ Montesquoi — Journées du Patrimoine et Matrimoine (JDPM)

Montesquoi est une application web interactive mobile-first sous forme de **chasse aux énigmes** au Musée des Arts Décoratifs (MAD), conçue pour les Journées du Patrimoine et de Matrimoine.

L'objectif est d'explorer l'exposition, de résoudre 5 énigmes interactives pour remplir une jauge de progression, et de débloquer la possibilité de participer à un tirage au sort final pour gagner un livre sur le design.

---

## 📱 Fonctionnalités Principales

- **📱 Mobile First & Responsive** : Conçu spécifiquement pour une expérience tactile fluide sur smartphone (iOS/Android).
- **🌍 Système Multilingue (i18n)** : Support complet du français 🇫🇷, de l'anglais 🇬🇧, et de l'espagnol 🇪🇸. Les traductions sont chargées de manière dynamique et asynchrone sans rechargement de page.
- **🔌 Fonctionnement Hors Ligne (PWA)** : Service Worker intégré pour mettre en cache l'ensemble des ressources et permettre de jouer dans l'exposition sans réseau.
- **💾 Progression Persistante** : Progression automatiquement sauvegardée localement via `localStorage`.

---

## 🎮 Les 5 Jeux et Énigmes

### 🎯 Jeu 1 — Réalité Augmentée (AR)
- **Objectif** : Scanner une cible physique imprimée dans l'exposition à l'aide de l'appareil photo du smartphone.
- **Technologie** : Détection de cible AR via la caméra.

### 📱 Jeu 2 — NFC & QR Code
- **Objectif** : Valider l'énigme en approchant le téléphone d'un tag NFC de l'exposition.
- **Fallback QR Code** : Pour les appareils incompatibles NFC ou sous iOS, un scanner de QR code rapide et robuste est disponible.
- **Technologie** : API Web NFC standard (`NDEFReader`) avec fallback visuel utilisant la bibliothèque ultra-légère `jsQR` (embarquée localement pour l'offline).

### 🖼️ Jeu 3 — Recherche d'Image
- **Objectif** : Identifier un meuble de l'exposition à partir d'un détail visuel affiché.
- **Validation** : Saisie libre par l'utilisateur. La vérification est robuste : elle tolère les majuscules/minuscules, les espaces superflus et ignore les accents (ex : `"chaïse"`, `"CHAISE "` ou `"Chaise"` valident tous la réponse `"Chaise"`).

### 🤔 Jeu 4 — Énigme avec Indice
- **Objectif** : Résoudre une devinette textuelle sur le mobilier historique du MAD.
- **Fonctionnalité d'Aide** : Un bouton "Indice" permet de révéler un indice supplémentaire traduit en temps réel, puis se désactive pour encourager la réflexion.
- **Validation** : Vérification normalisée insensible à la casse et aux accents.

### 💡 Jeu 5 — Question à Choix Multiples (QCM)
- **Objectif** : Identifier le designer d'un meuble de l'exposition.
- **Interface** : Grille adaptative de 4 cartes interactives contenant des illustrations vectorielles ou photos.
- **Validation** : Sélection tactile d'une carte avec effets visuels de sélection (surbrillance, animation de secousse "shake" rouge en cas d'erreur). Le bouton de validation s'active dynamiquement après sélection.

---

## 🛠️ Architecture Technique

```
├── index.html              # Portail de démarrage
├── hub.html                # HUB central (carte, jauge de progression, cartes d'énigmes)
├── game-1.html             # Interface Jeu 1 (AR)
├── game-2.html             # Interface Jeu 2 (NFC/QR)
├── game-3.html             # Interface Jeu 3 (Recherche d'image)
├── game-4.html             # Interface Jeu 4 (Énigme)
├── game-5.html             # Interface Jeu 5 (QCM)
├── success.html            # Écran de réussite globale et formulaire de récompense
├── css/
│   ├── _variables.css      # Charte graphique (couleurs MAD, polices Baloo 2/Nunito, ombres)
│   ├── base.css            # Styles globaux réutilisables
│   ├── game-base.css       # Styles partagés par tous les en-têtes et structures de jeu
│   └── game-[1-5].css      # Styles spécifiques à chaque gameplay
├── js/
│   ├── state.js            # Gestionnaire d'état partagé (localStorage)
│   ├── translations.js     # Moteur de chargement des langues asynchrone
│   ├── i18n-utils.js       # Injecteur de boutons de drapeaux et de traduction d'UI
│   ├── qr-scanner.js       # Contrôleur caméra & jsQR / NDEFReader
│   ├── lib/
│   │   └── jsqr.min.js     # Librairie jsQR embarquée localement
│   └── translations/       # Dictionnaires de traduction JSON (fr, en, es)
└── image/
    └── qcm/                # Illustrations et ressources graphiques des énigmes
```

---

## 🚀 Installation & Développement Local

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/1300gang/Montesquoi.git
   cd Montesquoi
   ```

2. Lancer un serveur de développement local (pour autoriser les requêtes asynchrones `fetch` des traductions JSON) :
   - Avec Python :
     ```bash
     python3 -m http.server 8000
     ```
   - Avec Node.js (via `serve`) :
     ```bash
     npx serve .
     ```

3. Ouvrir l'application dans votre navigateur :
   - [http://localhost:8000](http://localhost:8000) (ou port de votre serveur).

---

## 🧪 Tests de Vérification Frontend (Playwright)

Pour tester automatiquement le parcours utilisateur complet des énigmes et les transitions d'états visuelles (sans caméra physique) :

1. Lancer le serveur local sur le port `8000`.
2. Exécuter le script de test :
   ```bash
   python3 /home/jules/verification/verify_games.py
   ```
3. Les captures d'écran de validation de chaque écran de victoire et modals sont générées dans `/home/jules/verification/`.
