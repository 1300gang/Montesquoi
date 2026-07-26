# 📖 Stories JDPM - Guide d'Utilisation

Ce dossier contient les **user stories** pour le développement de la version **Journées du Patrimoine et Matrimoine (JDPM)** du site Montesquoi. Chaque story décrit une fonctionnalité à implémenter, avec ses critères d'acceptation, ses tâches techniques, et ses dépendances.

---

## 📌 Structure du Dossier
```
stories_jdpm/
├── architecture.md          # Architecture technique globale
├── README.md               # Ce fichier
├── core/                   # Fonctionnalités transverses
│   ├── STORY-001_setup.md    # Initialisation du projet
│   ├── STORY-002_offline.md  # Mode hors ligne (PWA)
│   └── STORY-003_i18n.md     # Multilingue (fr/en/es)
├── hub/                    # Page centrale
│   └── STORY-010_hub.md      # HUB avec QR code et lot
├── games/                  # Pages de jeu
│   ├── STORY-020_game-1.md   # Jeu 1 : Réalité Augmentée (AR)
│   ├── STORY-021_game-2.md   # Jeu 2 : NFC/QR Code
│   ├── STORY-022_game-3.md   # Jeu 3 : Recherche d'image
│   ├── STORY-023_game-4.md   # Jeu 4 : Énigme + indice
│   ├── STORY-024_game-5.md   # Jeu 5 : QCM (cartes)
│   └── STORY-025_success.md  # Page de réussite globale
└── shared/                 # Éléments partagés
    ├── STORY-030_modals.md   # Modales (Info, Réussite)
    └── STORY-031_state.md     # Gestion de l'état (localStorage)
```

---

## 🎯 Comment Utiliser les Stories ?

### 1️⃣ **Pour les Développeurs**
- **Priorité** : Les stories sont numérotées par ordre de dépendance (ex : `STORY-001` doit être faite avant `STORY-002`).
- **Tâches** : Chaque story contient une liste de **tâches techniques** à réaliser.
- **Validation** : Vérifiez les **critères d'acceptation** avant de marquer une story comme terminée.
- **Fichiers** : Les fichiers impactés sont listés pour éviter les conflits.

### 2️⃣ **Pour le Suivi**
- **État** : Utilisez des labels pour suivre l'avancement :
  - `⏳ Todo` (À faire)
  - `🚧 In Progress` (En cours)
  - `✅ Done` (Terminé)
  - `🛑 Blocked` (Bloqué)
- **Dépendances** : Une story peut dépendre d'une autre (ex : `STORY-002` dépend de `STORY-001`).

### 3️⃣ **Pour les Tests**
- Chaque story inclut une section **"Test"** avec des scénarios à valider.
- Exemple : Pour `STORY-021_game-2.md`, testez le scanner QR sur mobile (iOS/Android).

---

## 📊 Légende des Métadonnées

| **Champ**               | **Description**                                                                 | **Exemple**                          |
|-------------------------|---------------------------------------------------------------------------------|--------------------------------------|
| **ID**                  | Identifiant unique de la story.                                                | `STORY-001`                          |
| **Titre**               | Nom court de la story.                                                          | "Initialisation du projet"           |
| **Priorité**            | Niveau de priorité (`High`, `Medium`, `Low`).                                   | `High`                               |
| **Estimation**          | Temps estimé (en heures ou jours).                                              | `4h` ou `1j`                         |
| **Dépendances**         | Stories à terminer avant celle-ci.                                               | `STORY-001`                          |
| **Fichiers impactés**   | Liste des fichiers à créer/modifier.                                            | `css/base.css`, `js/service-worker.js`|
| **Technologies**        | Outils/librairies utilisés.                                                    | `MindAR.js`, `jsQR`, `PWA`            |

---

## 🔗 Liens Utiles
- **Repository** : [1300gang/Montesquoi](https://github.com/1300gang/Montesquoi)
- **MindAR.js** : [Documentation officielle](https://hiukim.github.io/mind-ar-js-doc/)
- **jsQR** : [Dépôt GitHub](https://github.com/cozmo/jsQR)
- **PWA** : [MDN - Service Workers](https://developer.mozilla.org/fr/docs/Web/API/Service_Worker_API)

---

## 📝 Conventions de Nommage
- **Stories** : `STORY-XXX_nom-en-minuscules.md` (ex : `STORY-001_setup.md`).
- **Fichiers CSS** : `nom-du-fichier.css` (ex : `game-1.css`).
- **Fichiers JS** : `nom-du-fichier.js` (ex : `qr-scanner.js`).
- **Images** : `dossier/nom-de-l-image.ext` (ex : `image/placeholders/mad-logo.png`).

---

## 🚀 Workflow Recommandé
1. **Lire `architecture.md`** pour comprendre la structure globale.
2. **Commencer par les stories `core/`** (ex : `STORY-001_setup.md`).
3. **Passer aux stories `hub/` et `shared/`** (ex : `STORY-010_hub.md`).
4. **Implémenter les stories `games/`** une par une.
5. **Valider chaque story** avec les critères d'acceptation.
6. **Tester en mode hors ligne** avant la livraison.

---

## 💡 Conseils
- **Modularité** : Le CSS et le JS doivent être **modulaires** (un fichier par composant).
- **Mobile First** : Toutes les pages doivent être **100% compatibles mobile** (tactile).
- **Hors Ligne** : Le site doit fonctionner **une fois chargé** (pas de dépendance réseau).
- **Accessibilité** : Utiliser des attributs `aria-*` et des contrastes de couleurs valides.

---

## 📞 Contact
Pour toute question ou clarification, contactez l'équipe de développement.
