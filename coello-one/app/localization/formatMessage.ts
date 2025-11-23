export function formatMessage(template: string, tokens?: Record<string, string | number>): string {
  if (!tokens) {
    return template;
  }

  return Object.keys(tokens).reduce((compiled, key) => {
    const value = tokens[key];
    const pattern = new RegExp(`\\{${key}\\}`, "g");
    return compiled.replace(pattern, String(value));
  }, template);
}
