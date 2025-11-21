export function createLocalePath(locale?: string) {
  const normalized = locale && locale.length > 0 ? locale : "en-GB";

  return (path: string) => {
    const trimmed = path.startsWith("/") ? path.slice(1) : path;
    if (!trimmed) {
      return `/${normalized}`;
    }

    if (trimmed === normalized || trimmed.startsWith(`${normalized}/`)) {
      return `/${trimmed}`;
    }

    return `/${normalized}/${trimmed}`;
  };
}
