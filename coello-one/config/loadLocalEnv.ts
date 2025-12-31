type EnvMap = Record<string, string | undefined>;

type LoadLocalEnvOptions = {
  keys: readonly string[];
};

function parseEnvFile(contents: string): EnvMap {
  const parsed: EnvMap = {};

  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const equalsIndex = line.indexOf("=");
    if (equalsIndex <= 0) {
      continue;
    }

    const key = line.slice(0, equalsIndex).trim();
    let value = line.slice(equalsIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    parsed[key] = value;
  }

  return parsed;
}

export async function loadLocalEnv({ keys }: LoadLocalEnvOptions) {
  const candidateUrls = [
    new URL("../.env.local", import.meta.url),
    new URL("../.env", import.meta.url),
  ];

  for (const url of candidateUrls) {
    const file = Bun.file(url);
    if (!(await file.exists())) {
      continue;
    }

    const parsed = parseEnvFile(await file.text());

    for (const key of keys) {
      if (!process.env[key] && parsed[key]) {
        process.env[key] = parsed[key];
      }
      const bunEnv = Bun.env as EnvMap;
      if (!bunEnv[key] && parsed[key]) {
        bunEnv[key] = parsed[key];
      }
    }

    if (keys.every((key) => Boolean(process.env[key]))) {
      break;
    }
  }
}
