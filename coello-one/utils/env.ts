const LOCAL_HOST_FALLBACKS = ["localhost", "127.0.0.1"];

/**
 * Determines whether the current runtime is production-grade.
 */
export const isProd = (): boolean => process.env.NODE_ENV === "production";

/**
 * Detects whether the provided host (or inferred fallback) represents a localhost target.
 * Accepts partial inputs (hostname, URL string, etc.) and gracefully defaults to common env vars.
 */
export const isLocalHost = (candidate?: string): boolean => {
  const inferred = candidate ?? process.env.HOST ?? process.env.DB_HOST_DEV ?? "localhost";

  try {
    const url = new URL(inferred.includes("://") ? inferred : `http://${inferred}`);
    return isHostLocal(url.hostname);
  } catch {
    return isHostLocal(inferred);
  }
};

const isHostLocal = (host: string): boolean => {
  if (!host) {
    return true;
  }

  return (
    LOCAL_HOST_FALLBACKS.includes(host) ||
    host.endsWith(".local") ||
    host.startsWith("127.") ||
    host === "::1"
  );
};
