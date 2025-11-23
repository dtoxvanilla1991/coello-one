"use client";

/**
 * Returns a helper that ensures paths are normalized with a single leading slash.
 * Domain routing now determines the active locale, so we no longer prefix segments manually.
 */
export function useLocalePath() {
  return (path: string) => {
    if (!path) {
      return "/";
    }

    return path.startsWith("/") ? path : `/${path}`;
  };
}
