type ClassValue =
  | string
  | string[]
  | Record<string, boolean>
  | undefined
  | null;

/**
 * Processes different types of class values into a single string
 * Similar to the functionality of Astro's built-in class:list directive
 */
export function processClassList(classValue: ClassValue): string {
  if (!classValue) {
    return "";
  }

  if (typeof classValue === "string") {
    return classValue.trim();
  }

  if (Array.isArray(classValue)) {
    return classValue
      .map((c) => processClassList(c))
      .filter(Boolean)
      .join(" ");
  }

  if (typeof classValue === "object") {
    return Object.entries(classValue)
      .filter(([_, value]) => Boolean(value))
      .map(([key]) => key.trim())
      .filter(Boolean)
      .join(" ");
  }

  return "";
}

/**
 * Merges multiple class values into a single string
 * Useful for combining fixed classes with dynamic ones
 */
export function mergeClasses(...classes: ClassValue[]): string {
  return classes
    .map((cls) => processClassList(cls))
    .filter(Boolean)
    .join(" ")
    .trim();
}
