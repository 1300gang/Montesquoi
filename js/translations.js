// ==========================================
// TRANSLATIONS.JS – Système multilingue (i18n)
// JDPM - Journées du Patrimoine et Matrimoine
// ==========================================

const SUPPORTED_LANGUAGES = ['fr', 'en', 'es'];
const DEFAULT_LANGUAGE = 'fr';
const TRANSLATIONS_STORAGE_KEY = 'jdpm_language';

// Cache des traductions chargées
let translationsCache = {};
let currentLanguage = DEFAULT_LANGUAGE;

// ------------------------------------------
// Charger une langue
// ------------------------------------------
async function loadLanguage(lang) {
  if (translationsCache[lang]) {
    return translationsCache[lang];
  }

  try {
    const response = await fetch(`/js/translations/${lang}.json`);
    if (!response.ok) {
      throw new Error(`Fichier de traduction non trouvé: ${lang}.json`);
    }
    const translations = await response.json();
    translationsCache[lang] = translations;
    return translations;
  } catch (error) {
    console.warn(`⚠️ Impossible de charger ${lang}.json, fallback vers ${DEFAULT_LANGUAGE}:`, error);
    // Fallback vers la langue par défaut
    if (lang !== DEFAULT_LANGUAGE) {
      return loadLanguage(DEFAULT_LANGUAGE);
    }
    // Si même la langue par défaut échoue, retourner un objet vide
    return { translations: {} };
  }
}

// ------------------------------------------
// Obtenir la langue actuelle
// ------------------------------------------
function getCurrentLanguage() {
  return currentLanguage;
}

// ------------------------------------------
// Détecter la langue du navigateur
// ------------------------------------------
function detectBrowserLanguage() {
  const browserLang = navigator.language || navigator.userLanguage || DEFAULT_LANGUAGE;
  const langCode = browserLang.split('-')[0].toLowerCase();
  return SUPPORTED_LANGUAGES.includes(langCode) ? langCode : DEFAULT_LANGUAGE;
}

// ------------------------------------------
// Charger la langue sauvegardée ou détectée
// ------------------------------------------
async function initializeLanguage() {
  // 1. Vérifier localStorage
  const savedLang = localStorage.getItem(TRANSLATIONS_STORAGE_KEY);
  if (savedLang && SUPPORTED_LANGUAGES.includes(savedLang)) {
    currentLanguage = savedLang;
    return loadLanguage(currentLanguage);
  }

  // 2. Détecter la langue du navigateur
  const browserLang = detectBrowserLanguage();
  currentLanguage = browserLang;
  return loadLanguage(currentLanguage);
}

// ------------------------------------------
// Changer de langue
// ------------------------------------------
async function setLanguage(lang) {
  if (!SUPPORTED_LANGUAGES.includes(lang)) {
    console.warn(`⚠️ Langue non supportée: ${lang}`);
    return false;
  }

  currentLanguage = lang;
  localStorage.setItem(TRANSLATIONS_STORAGE_KEY, lang);
  await loadLanguage(lang);
  
  // Déclencher un événement pour notifier les composants
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
  
  return true;
}

// ------------------------------------------
// Obtenir une traduction
// ------------------------------------------
function translate(key, params = {}) {
  const translations = translationsCache[currentLanguage]?.translations;
  if (!translations) {
    console.warn(`⚠️ Aucune traduction chargée pour ${currentLanguage}`);
    return key; // Fallback: retourner la clé
  }

  // Naviguer dans l'objet de traduction (ex: "hub.title" -> translations.hub.title)
  const keys = key.split('.');
  let value = translations;
  for (const k of keys) {
    if (value && value.hasOwnProperty(k)) {
      value = value[k];
    } else {
      console.warn(`⚠️ Traduction manquante pour la clé: ${key}`);
      return key; // Fallback: retourner la clé
    }
  }

  // Remplacer les paramètres (ex: "Bienvenue, {name} !" -> "Bienvenue, Jean !")
  if (typeof value === 'string' && Object.keys(params).length > 0) {
    return value.replace(/\{(\w+)\}/g, (match, param) => params[param] || match);
  }

  return value;
}

// ------------------------------------------
// Obtenir les métadonnées de la langue (nom, drapeau, etc.)
// ------------------------------------------
function getLanguageMetadata(lang = currentLanguage) {
  const metadata = translationsCache[lang];
  if (!metadata) {
    return {
      language: lang,
      name: lang.toUpperCase(),
      flag: '',
      direction: 'ltr',
    };
  }
  return metadata;
}

// ------------------------------------------
// Exporter pour les modules ES6 (si besoin)
// ------------------------------------------
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    loadLanguage,
    getCurrentLanguage,
    detectBrowserLanguage,
    initializeLanguage,
    setLanguage,
    translate,
    getLanguageMetadata,
    SUPPORTED_LANGUAGES,
    DEFAULT_LANGUAGE,
  };
}
