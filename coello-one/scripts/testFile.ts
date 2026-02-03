export {};

type SpawnResult = {
  exitCode: number | null;
};

function printUsage() {
  console.log(
    [
      "Usage:",
      "  bun scripts/testFile.ts <filename-or-substring>",
      "",
      "Examples:",
      "  bun scripts/testFile.ts Featured.test.tsx",
      "  bun scripts/testFile.ts OneSleeveClassic.test.tsx",
      "  bun scripts/testFile.ts home/page.integration.test.tsx",
    ].join("\n"),
  );
}

function normalizeArg(input: string) {
  return input.trim().replace(/^['\"]|['\"]$/g, "");
}

function isIgnoredPath(path: string) {
  return (
    path.includes("/node_modules/") ||
    path.includes("/.next/") ||
    path.includes("/dist/") ||
    path.includes("/build/") ||
    path.includes("/.turbo/")
  );
}

async function findSingleMatch(query: string): Promise<string> {
  const normalized = normalizeArg(query);

  // 1) Prefer exact filename suffix matches.
  const exact = new Bun.Glob(`**/${normalized}`);
  const exactMatches: string[] = [];
  for await (const match of exact.scan({ cwd: process.cwd() })) {
    if (!isIgnoredPath(match)) exactMatches.push(match);
  }
  if (exactMatches.length === 1) return exactMatches[0];
  if (exactMatches.length > 1) {
    throw new Error(
      [
        `Multiple matches for \"${normalized}\" (be more specific):`,
        ...exactMatches.map((m) => `- ${m}`),
      ].join("\n"),
    );
  }

  // 2) Fall back to substring search.
  const any = new Bun.Glob("**/*");
  const containsMatches: string[] = [];
  for await (const match of any.scan({ cwd: process.cwd() })) {
    if (isIgnoredPath(match)) continue;
    if (match.includes(normalized)) containsMatches.push(match);
  }

  if (containsMatches.length === 0) {
    throw new Error(`No matches found for \"${normalized}\".`);
  }

  if (containsMatches.length > 1) {
    throw new Error(
      [
        `Multiple matches for \"${normalized}\" (be more specific):`,
        ...containsMatches.slice(0, 20).map((m) => `- ${m}`),
        containsMatches.length > 20 ? `...and ${containsMatches.length - 20} more` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    );
  }

  return containsMatches[0];
}

async function main() {
  const rawQuery = process.argv.slice(2).join(" ").trim();
  if (!rawQuery) {
    printUsage();
    process.exit(1);
  }

  let match: string;
  try {
    match = await findSingleMatch(rawQuery);
  } catch (error) {
    console.error(String(error instanceof Error ? error.message : error));
    printUsage();
    process.exit(1);
  }

  console.log(`Running: bun test --preload ./test-setup.ts ${match}`);

  const proc = Bun.spawnSync(["bun", "test", "--preload", "./test-setup.ts", match], {
    cwd: process.cwd(),
    stdin: "inherit",
    stdout: "inherit",
    stderr: "inherit",
  }) as SpawnResult;

  process.exit(proc.exitCode ?? 1);
}

await main();
