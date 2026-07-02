/**
 * THEME MANAGER
 * Handle light/dark theme toggling
 */

import { saveTheme, getSavedTheme } from './storage.js';

const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

/**
 * Initialize theme on app startup
 */
export function initializeTheme() {
  const savedTheme = getSavedTheme();
  
  if (savedTheme === DARK_THEME) {
    applyTheme(DARK_THEME);
  } else if (savedTheme === LIGHT_THEME) {
    applyTheme(LIGHT_THEME);
  } else {
    // Follow system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      applyTheme(DARK_THEME);
    } else {
      applyTheme(LIGHT_THEME);
    }
  }
}

/**
 * Apply theme to document
 * @param {string} theme - 'light' or 'dark'
 */
export function applyTheme(theme) {
  if (theme === DARK_THEME) {
    document.body.classList.add('dark-mode');
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeButtons(DARK_THEME);
  } else {
    document.body.classList.remove('dark-mode');
    document.documentElement.setAttribute('data-theme', 'light');
    updateThemeButtons(LIGHT_THEME);
  }
  
  saveTheme(theme);
}

/**
 * Toggle between light and dark themes
 */
export function toggleTheme() {
  const isDark = document.body.classList.contains('dark-mode');
  applyTheme(isDark ? LIGHT_THEME : DARK_THEME);
}

/**
 * Get current theme
 * @returns {string} Current theme
 */
export function getCurrentTheme() {
  return document.body.classList.contains('dark-mode') ? DARK_THEME : LIGHT_THEME;
}

/**
 * Update theme toggle button UI
 * @param {string} theme - Current theme
 */
function updateThemeButtons(theme) {
  const lightBtn = document.getElementById('theme-light');
  const darkBtn = document.getElementById('theme-dark');
  
  if (lightBtn && darkBtn) {
    if (theme === LIGHT_THEME) {
      lightBtn.classList.add('on');
      darkBtn.classList.remove('on');
      lightBtn.setAttribute('aria-pressed', 'true');
      darkBtn.setAttribute('aria-pressed', 'false');
    } else {
      darkBtn.classList.add('on');
      lightBtn.classList.remove('on');
      darkBtn.setAttribute('aria-pressed', 'true');
      lightBtn.setAttribute('aria-pressed', 'false');
    }
  }
}

/**
 * Watch for system theme changes
 */
export function watchSystemThemeChanges() {
  if (!window.matchMedia) return;
  
  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  darkModeQuery.addEventListener('change', (e) => {
    if (getSavedTheme() === null) {
      // Only auto-switch if user hasn't manually set a preference
      applyTheme(e.matches ? DARK_THEME : LIGHT_THEME);
    }
  });
}
