/**
 * User Preferences Manager for client-side storage
 */
export class PreferencesManager {
  /**
   * Gets a preference from localStorage
   * @param {string} key - The preference key
   * @param {any} defaultValue - Default value if preference doesn't exist
   * @returns {any} - The stored preference value or default value
   */
  static getPreference(key, defaultValue = null) {
    if (typeof window === "undefined") return defaultValue;

    try {
      const value = localStorage.getItem(key);
      return value !== null ? JSON.parse(value) : defaultValue;
    } catch (error) {
      console.error(`Error retrieving preference ${key}:`, error);
      return defaultValue;
    }
  }

  /**
   * Sets a preference in localStorage
   * @param {string} key - The preference key
   * @param {any} value - The value to store
   * @returns {boolean} - Success status
   */
  static setPreference(key, value) {
    if (typeof window === "undefined") return false;

    try {
      localStorage.setItem(key, JSON.stringify(value));
      // Dispatch custom event for components to listen for preference changes
      window.dispatchEvent(
        new CustomEvent("preference-changed", {
          detail: { key, value },
        })
      );
      return true;
    } catch (error) {
      console.error(`Error saving preference ${key}:`, error);
      return false;
    }
  }

  /**
   * Removes a preference from localStorage
   * @param {string} key - The preference key to remove
   * @returns {boolean} - Success status
   */
  static removePreference(key) {
    if (typeof window === "undefined") return false;

    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing preference ${key}:`, error);
      return false;
    }
  }

  /**
   * Clears all preferences from localStorage
   * @returns {boolean} - Success status
   */
  static clearAllPreferences() {
    if (typeof window === "undefined") return false;

    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing all preferences:", error);
      return false;
    }
  }
}
