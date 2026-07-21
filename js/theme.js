import { getTranslations } from './invitation-i18n.js';

const storageKey = 'invitation_theme';
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

function readPreference() {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch {
    return null;
  }
}

function applyTheme(theme) {
  const selectedTheme = theme || (systemTheme.matches ? 'dark' : 'light');
  document.documentElement.dataset.theme = selectedTheme;
  document.documentElement.style.colorScheme = selectedTheme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    'content', selectedTheme === 'dark' ? '#111826' : '#f7f2ec',
  );

  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    const text = getTranslations();
    toggle.setAttribute('aria-label', selectedTheme === 'dark' ? text.theme_to_light : text.theme_to_dark);
    toggle.setAttribute('aria-pressed', String(selectedTheme === 'dark'));
  }
}

export function initializeTheme() {
  const toggle = document.getElementById('theme-toggle');
  applyTheme(readPreference());

  toggle?.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(storageKey, nextTheme);
    } catch {
      // The chosen theme still applies when storage is unavailable.
    }
    applyTheme(nextTheme);
  });

  systemTheme.addEventListener?.('change', () => {
    if (!readPreference()) applyTheme(null);
  });

  document.addEventListener('invitation:languagechange', () => {
    applyTheme(document.documentElement.dataset.theme);
  });
}
