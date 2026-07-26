// ==========================================
// I18N-UTILS.JS – Utilitaires pour l'internationalisation
// JDPM - Journées du Patrimoine et Matrimoine
// ==========================================

// ------------------------------------------
// Initialiser le sélecteur de langue et les traductions
// ------------------------------------------
function initI18n() {
  // Créer le sélecteur de langue s'il n'existe pas
  if (!document.getElementById('langSelector')) {
    const langSelector = document.createElement('div');
    langSelector.id = 'langSelector';
    langSelector.className = 'lang-selector';
    langSelector.innerHTML = `
      <button class="lang-btn" data-lang="fr" title="Français">🇫🇷</button>
      <button class="lang-btn" data-lang="en" title="English">🇬🇧</button>
      <button class="lang-btn" data-lang="es" title="Español">🇪🇸</button>
    `;
    langSelector.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      z-index: 1000;
      display: flex;
      gap: 5px;
      background: rgba(255, 255, 255, 0.9);
      padding: 5px;
      border-radius: var(--border-radius-md, 8px);
      box-shadow: var(--box-shadow-sm, 0 2px 4px rgba(0,0,0,0.1));
    `;
    document.body.appendChild(langSelector);

    // Ajouter les styles pour les boutons
    const style = document.createElement('style');
    style.textContent = `
      .lang-btn {
        font-size: 20px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 5px;
        border-radius: 50%;
        transition: background 0.2s ease;
      }
      .lang-btn:hover {
        background: rgba(13, 77, 150, 0.1);
      }
      .lang-btn.active {
        background: rgba(13, 77, 150, 0.2);
      }
    `;
    document.head.appendChild(style);
  }

  // Initialiser la langue
  async function initTranslations() {
    await initializeLanguage();
    updateLanguageUI();
  }

  // Mettre à jour l'UI avec les traductions
  function updateLanguageUI() {
    const lang = getCurrentLanguage();
    const metadata = getLanguageMetadata(lang);
    
    // Mettre à jour les boutons de langue
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Mettre à jour le message hors ligne
    const offlineMessage = document.getElementById('offline-message');
    if (offlineMessage) {
      offlineMessage.textContent = `⚠️ ${translate('misc.offline')}`;
    }
  }

  // Changer de langue
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      await setLanguage(btn.dataset.lang);
      updateLanguageUI();
    });
  });

  // Écouter les changements de langue
  window.addEventListener('languageChanged', () => {
    updateLanguageUI();
  });

  // Initialiser au chargement
  document.addEventListener('DOMContentLoaded', initTranslations);
}

// ------------------------------------------
// Appeler l'initialisation
// ------------------------------------------
if (typeof initializeLanguage !== 'undefined') {
  initI18n();
}
