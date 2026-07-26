# Installation des librairies pour le Jeu 1 (AR)

Pour que le **Jeu 1 (Réalité Augmentée)** fonctionne **hors ligne**, vous devez télécharger les librairies suivantes et les placer dans le dossier `/js/lib/`.

## 📥 Librairies à télécharger

### 1. A-Frame (1.4.2)
**URL** : [https://cdn.jsdelivr.net/npm/aframe@1.4.2/dist/aframe.min.js](https://cdn.jsdelivr.net/npm/aframe@1.4.2/dist/aframe.min.js)
**Destination** : `/js/lib/aframe.min.js`

**Commande** (si vous avez `wget` ou `curl`) :
```bash
wget https://cdn.jsdelivr.net/npm/aframe@1.4.2/dist/aframe.min.js -O js/lib/aframe.min.js
```

---

### 2. MindAR (1.2.5) - Image Tracking
**URL** : [https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js](https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js)
**Destination** : `/js/lib/mindar-image-aframe.prod.js`

**Commande** :
```bash
wget https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js -O js/lib/mindar-image-aframe.prod.js
```

---

## 🖼️ Images des lettres

Le jeu utilise des **images cibles** pour la détection AR. Ces images doivent être **haute résolution** (min 500x500px) et **contrastées** pour une bonne détection.

### Images existantes :
- `/image/letters/letter-O.png` (déjà présente)
- `/image/letters/letter-L.svg` (placeholder SVG)
- `/image/letters/letter-A.svg` (placeholder SVG)
- `/image/letters/letter-C.svg` (placeholder SVG)

### Fichier `.mind` :
Le fichier `/image/targets.mind` est **déjà présent** dans le projet. Il contient les cibles pour MindAR.

> **⚠️ Important** : Si vous souhaitez utiliser des **images réelles** (PNG/JPG) au lieu des SVG, vous devez :
> 1. Créer des images haute résolution (ex: `letter-L.png`, `letter-A.png`, `letter-C.png`).
> 2. Utiliser l'outil [MindAR Compiler](https://hiukim.github.io/mind-ar-js-doc/tools/compile) pour compiler ces images en un fichier `.mind`.
> 3. Remplacer `/image/targets.mind` par le nouveau fichier.

---

## 🔧 Configuration

### Mot secret
Le mot secret est défini dans `game-1.html` :
```javascript
const SECRET_WORD = 'OLAC';
```

Vous pouvez le modifier pour correspondre à votre exposition (ex: `'MAD'`, `'DESIGN'`).

### Cibles AR
Les cibles sont définies dans `game-1.html` :
```javascript
const TARGETS = [
  { letter: 'O', label: 'Première lettre' },
  { letter: 'L', label: 'Deuxième lettre' },
  { letter: 'A', label: 'Troisième lettre' },
  { letter: 'C', label: 'Quatrième lettre' }
];
```

Assurez-vous que l'ordre des cibles correspond à celui du fichier `.mind`.

---

## 🌍 Mode hors ligne

Une fois les librairies téléchargées et placées dans `/js/lib/`, le jeu fonctionnera **hors ligne** après le premier chargement.

### Vérification :
1. Ouvrez `game-1.html` dans un navigateur (avec Internet).
2. Désactivez le réseau (DevTools > Network > Offline).
3. Rechargez la page : le jeu doit fonctionner sans erreur.

---

## 📌 Notes

- **MindAR.js** utilise **WebAR** (pas besoin d'application dédiée).
- Fonctionne sur **Chrome (Android)** et **Safari (iOS 13+)**.
- Pour tester sur mobile, utilisez un serveur local (ex: `python -m http.server`) ou déployez sur un serveur HTTPS.

---

## 🔗 Ressources utiles

- [MindAR.js - Documentation](https://hiukim.github.io/mind-ar-js-doc/)
- [MindAR.js - GitHub](https://github.com/hiukim/mind-ar-js)
- [A-Frame - Documentation](https://aframe.io/docs/)
- [MindAR Compiler](https://hiukim.github.io/mind-ar-js-doc/tools/compile)
