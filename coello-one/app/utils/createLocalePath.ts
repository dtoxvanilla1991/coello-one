export function createLocalePath() {
  return (path: string) => {
    if (!path) {
      return "/";
    }

    return path.startsWith("/") ? path : `/${path}`;
  };
}
