import { PreferencesManager } from "./preferences.js";

/**
 * ListManager - Handle blog list view preferences and state
 */
export class ListManager {
  static VIEW_TYPES = {
    WIDE: "wide",
    THUMBNAIL: "thumbnail",
    TEXT_ONLY: "text-only",
  };

  static DEFAULT_VIEW = this.VIEW_TYPES.WIDE;
  static events = new EventTarget();

  /**
   * Get the currently preferred view type
   * @param {string} listType - Optional identifier for different list contexts (e.g., 'blog', 'projects')
   * @returns {string} The view type to use
   */
  static getViewPreference(listType = "blog") {
    // Check URL parameters first
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlView = params.get("view");
      if (urlView && Object.values(this.VIEW_TYPES).includes(urlView)) {
        return urlView;
      }
    }

    // Then check localStorage
    const key = `${listType}ViewPreference`;
    const savedView = PreferencesManager.getPreference(key);

    // Fall back to default if not found
    return savedView || this.DEFAULT_VIEW;
  }

  /**
   * Save view preference to localStorage
   * @param {string} viewType - The view type to save
   * @param {string} listType - Optional identifier for different list contexts
   */
  static saveViewPreference(viewType, listType = "blog") {
    if (Object.values(this.VIEW_TYPES).includes(viewType)) {
      const key = `${listType}ViewPreference`;
      PreferencesManager.setPreference(key, viewType);

      // Dispatch event
      this.events.dispatchEvent(
        new CustomEvent("viewChanged", {
          detail: { viewType, listType },
        })
      );
    }
  }

  /**
   * Get container classes based on view type
   * @param {string} viewType - The view type
   * @returns {string} CSS classes for container
   */
  static getContainerClasses(viewType) {
    const classes = {
      [this.VIEW_TYPES.WIDE]: "blog-posts-grid mt-6 space-y-6",
      [this.VIEW_TYPES.THUMBNAIL]:
        "blog-posts-grid mt-6 grid grid-cols-2 md:grid-cols-3 gap-4",
      [this.VIEW_TYPES.TEXT_ONLY]: "blog-posts-grid mt-6 space-y-3",
    };

    return classes[viewType] || classes[this.DEFAULT_VIEW];
  }

  /**
   * Subscribe to view changes
   * @param {function} callback - Function to call when view changes
   */
  static onViewChange(callback) {
    this.events.addEventListener("viewChanged", (e) => callback(e.detail));
    return () => {
      this.events.removeEventListener("viewChanged", callback);
    };
  }

  /**
   * Navigate to new view type
   * @param {string} viewType - The view type to navigate to
   */
  static navigateToView(viewType) {
    if (
      typeof window !== "undefined" &&
      Object.values(this.VIEW_TYPES).includes(viewType)
    ) {
      window.location.href = `?view=${viewType}`;
    }
  }
}
