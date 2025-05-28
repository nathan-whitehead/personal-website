import { PreferencesManager } from "./preferences.js";

/**
 * Theme Manager - Centralized theme handling
 */
export class ThemeManager {
  static THEMES = {
    LIGHT: "light",
    DARK: "dark",
  };

  static events = new EventTarget();

  /**
   * Initialize theme system
   * @param {Object} options - Configuration options
   */
  static initialize(options = {}) {
    // Apply theme from preferences or system
    const savedTheme = PreferencesManager.getPreference("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialTheme =
      savedTheme || (prefersDark ? this.THEMES.DARK : this.THEMES.LIGHT);

    this.applyTheme(initialTheme);

    // Set up listeners for system preference changes
    if (options.listenToSystemChanges !== false) {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
          if (!PreferencesManager.getPreference("theme")) {
            this.applyTheme(e.matches ? this.THEMES.DARK : this.THEMES.LIGHT);
          }
        });
    }

    // Set up listeners for Astro page transitions
    if (options.handleAstroTransitions !== false) {
      this.setupAstroTransitionHandlers();
    }

    return initialTheme;
  }

  /**
   * Apply a theme
   * @param {string} theme - Theme name (light/dark)
   */
  static applyTheme(theme) {
    // Update DOM
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle(
      "dark",
      theme === this.THEMES.DARK
    );

    // Update icons if they exist
    const themeToggleIcon = document.getElementById("theme-toggle-icon");
    if (themeToggleIcon) {
      themeToggleIcon.textContent =
        theme === this.THEMES.DARK ? "dark_mode" : "light_mode";
    }

    // Dispatch event for components to react
    this.events.dispatchEvent(
      new CustomEvent("themeChanged", { detail: { theme } })
    );
  }

  /**
   * Toggle between light and dark themes
   */
  static toggleTheme() {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || this.THEMES.LIGHT;
    const newTheme =
      currentTheme === this.THEMES.LIGHT ? this.THEMES.DARK : this.THEMES.LIGHT;

    this.applyTheme(newTheme);
    PreferencesManager.setPreference("theme", newTheme);

    return newTheme;
  }

  /**
   * Set up handlers for Astro view transitions
   */
  static setupAstroTransitionHandlers() {
    document.addEventListener("astro:before-swap", () => {
      // Save current theme before page swap
      const currentTheme = document.documentElement.getAttribute("data-theme");
      if (currentTheme) {
        sessionStorage.setItem("currentPageTheme", currentTheme);
      }
    });

    document.addEventListener("astro:after-swap", () => {
      // Apply theme immediately after swap
      const savedTheme =
        sessionStorage.getItem("currentPageTheme") ||
        PreferencesManager.getPreference("theme") ||
        this.THEMES.LIGHT;
      this.applyTheme(savedTheme);
    });

    // Re-initialize after full page load
    document.addEventListener("astro:page-load", () => {
      this.setupEventListeners();
    });
  }

  /**
   * Set up event listeners for theme toggle buttons
   */
  static setupEventListeners() {
    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {
      // Remove existing listeners by cloning
      const newToggle = themeToggle.cloneNode(true);
      if (themeToggle.parentNode) {
        themeToggle.parentNode.replaceChild(newToggle, themeToggle);
      }

      // Add fresh event listener
      newToggle.addEventListener("click", () => this.toggleTheme());
    }
  }

  /**
   * Subscribe to theme changes
   * @param {function} callback - Function to call when theme changes
   */
  static onThemeChange(callback) {
    this.events.addEventListener("themeChanged", (e) =>
      callback(e.detail.theme)
    );
    return () => {
      this.events.removeEventListener("themeChanged", callback);
    };
  }
}

/**
 * Run this immediately to prevent flash of wrong theme
 */
if (typeof window !== "undefined") {
  const savedTheme = (() => {
    try {
      const value = localStorage.getItem("theme");
      return value ? JSON.parse(value) : null;
    } catch (e) {
      return null;
    }
  })();

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = savedTheme || (prefersDark ? "dark" : "light");

  // Apply theme immediately
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.classList.toggle("dark", theme === "dark");
}
