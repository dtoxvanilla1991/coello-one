import { join, relative } from "path";
import * as ts from "typescript";

type JsonValue = null | boolean | number | string | JsonObject | JsonValue[];
type JsonObject = { [key: string]: JsonValue };

type NamespaceUsage = {
  // dot-paths, e.g. "returnPage.success.badge".
  paths: Set<string>;
  // dot-prefixes that imply keeping the whole subtree, e.g. "returnPage".
  keepAllPrefixes: Set<string>;
};

type TrieNode = {
  keepAll: boolean;
  children: Map<string, TrieNode>;
};

const PROJECT_ROOT = process.cwd();
const MESSAGES_ROOT = join(PROJECT_ROOT, "app", "localization", "messages");

const SOURCE_ROOTS = [
  join(PROJECT_ROOT, "app"),
  join(PROJECT_ROOT, "config"),
  join(PROJECT_ROOT, "services"),
  join(PROJECT_ROOT, "scripts"),
  join(PROJECT_ROOT, "test-utils"),
];

const EXCLUDED_DIRS = new Set(["node_modules", ".next", "drizzle", "reports"]);

const writeMode = process.argv.includes("--write");

async function* walkFiles(dir: string): AsyncGenerator<string> {
  const glob = new Bun.Glob("**/*.{ts,tsx}");
  for await (const relPath of glob.scan({ cwd: dir, onlyFiles: true })) {
    // Exclude paths containing banned segments (e.g., app/localization/messages).
    const segments = relPath.split("/");
    if (segments.some((s) => EXCLUDED_DIRS.has(s))) continue;
    yield join(dir, relPath);
  }
}

function getStringLiteral(node: ts.Expression | undefined): string | null {
  if (!node) return null;
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }
  return null;
}

function ensureUsage(map: Map<string, NamespaceUsage>, namespace: string): NamespaceUsage {
  const existing = map.get(namespace);
  if (existing) return existing;
  const next: NamespaceUsage = { paths: new Set(), keepAllPrefixes: new Set() };
  map.set(namespace, next);
  return next;
}

function recordPath(usage: NamespaceUsage, parts: string[], options?: { keepAll?: boolean }) {
  if (parts.length === 0) {
    return;
  }
  const path = parts.join(".");
  if (options?.keepAll) {
    usage.keepAllPrefixes.add(path);
  } else {
    usage.paths.add(path);
  }
}

type VarBinding = {
  namespace: string;
  prefix: string[];
};

function bindDestructure(
  binding: ts.BindingName,
  source: VarBinding,
  bindings: Map<string, VarBinding>,
) {
  if (ts.isIdentifier(binding)) {
    bindings.set(binding.text, source);
    return;
  }

  if (ts.isObjectBindingPattern(binding)) {
    for (const element of binding.elements) {
      const propertyKey = element.propertyName
        ? ts.isIdentifier(element.propertyName)
          ? element.propertyName.text
          : ts.isStringLiteral(element.propertyName)
            ? element.propertyName.text
            : null
        : ts.isIdentifier(element.name)
          ? element.name.text
          : null;

      if (!propertyKey) {
        continue;
      }

      bindDestructure(
        element.name,
        {
          namespace: source.namespace,
          prefix: [...source.prefix, propertyKey],
        },
        bindings,
      );
    }
  }
}

function extractNamespaceOrRootAndPath(
  node: ts.Expression,
):
  | { kind: "root"; root: string; parts: string[]; keepAll: boolean }
  | { kind: "namespace"; namespace: string; parts: string[]; keepAll: boolean }
  | null {
  const parts: string[] = [];
  let keepAll = false;
  let current: ts.Expression = node;

  const unwrap = (expr: ts.Expression): ts.Expression => {
    if (ts.isAsExpression(expr)) return unwrap(expr.expression);
    if (ts.isTypeAssertionExpression(expr)) return unwrap(expr.expression);
    if (ts.isParenthesizedExpression(expr)) return unwrap(expr.expression);
    return expr;
  };

  while (true) {
    current = unwrap(current);

    if (ts.isPropertyAccessExpression(current)) {
      parts.unshift(current.name.text);
      current = current.expression;
      continue;
    }

    if (ts.isElementAccessExpression(current)) {
      const literal = getStringLiteral(current.argumentExpression);
      if (literal) {
        parts.unshift(literal);
        current = current.expression;
        continue;
      }

      keepAll = true;
      current = current.expression;
      continue;
    }

    current = unwrap(current);

    if (ts.isIdentifier(current)) {
      return { kind: "root", root: current.text, parts, keepAll };
    }

    if (ts.isCallExpression(current) && ts.isIdentifier(current.expression)) {
      const callee = current.expression.text;
      if (callee === "useTranslations") {
        const namespace = getStringLiteral(current.arguments[0]);
        if (namespace) return { kind: "namespace", namespace, parts, keepAll };
      }

      if (callee === "getNamespaceCopy") {
        const namespace = getStringLiteral(current.arguments[1]);
        if (namespace) return { kind: "namespace", namespace, parts, keepAll };
      }
    }

    return null;
  }
}

function buildTrie(usage: NamespaceUsage): TrieNode {
  const root: TrieNode = { keepAll: false, children: new Map() };

  const insert = (path: string, keepAll: boolean) => {
    const parts = path.split(".").filter(Boolean);
    let node = root;
    for (const part of parts) {
      const next = node.children.get(part) ?? { keepAll: false, children: new Map() };
      node.children.set(part, next);
      node = next;
    }
    if (keepAll) {
      node.keepAll = true;
    }
  };

  for (const p of usage.paths) {
    insert(p, false);
  }
  for (const p of usage.keepAllPrefixes) {
    insert(p, true);
  }

  return root;
}

function pruneJson(value: JsonValue, trie: TrieNode, options?: { isRoot?: boolean }): JsonValue {
  if (trie.keepAll) {
    return value;
  }

  // If the code references this node but we don't have any more specific paths,
  // keep the whole subtree. This is important for patterns where an object is
  // passed around (e.g. as a `copy` prop) and its nested fields are accessed
  // elsewhere.
  if (!options?.isRoot && trie.children.size === 0) {
    return value;
  }

  if (value && typeof value === "object" && !Array.isArray(value)) {
    const obj = value as JsonObject;
    const next: JsonObject = {};
    for (const [key, childTrie] of trie.children.entries()) {
      if (!(key in obj)) continue;
      next[key] = pruneJson(obj[key] as JsonValue, childTrie);
    }
    return next;
  }

  // Primitive/array: keep only if explicitly referenced (i.e., trie node exists).
  return value;
}

type DictionaryMapping = {
  locales: string[];
  namespaces: string[];
  filePathByLocaleNamespace: Map<string, Map<string, string>>;
};

function parseDictionaryMapping(dictionarySource: string): DictionaryMapping {
  const sourceFile = ts.createSourceFile(
    "dictionary.ts",
    dictionarySource,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );

  const importIdentToFile = new Map<string, { locale: string; filePath: string }>();
  const filePathByLocaleNamespace = new Map<string, Map<string, string>>();

  for (const statement of sourceFile.statements) {
    if (!ts.isImportDeclaration(statement)) continue;
    if (!statement.importClause?.name) continue;

    const importIdent = statement.importClause.name.text;
    const spec = statement.moduleSpecifier;
    if (!ts.isStringLiteral(spec)) continue;

    const match = spec.text.match(/^\.\/messages\/(en-GB|es-ES)\/(.+)\.json$/u);
    if (!match) continue;
    const [, locale, filename] = match;
    importIdentToFile.set(importIdent, {
      locale,
      filePath: join(MESSAGES_ROOT, locale, `${filename}.json`),
    });
  }

  const findTranslationsInitializer = (): ts.ObjectLiteralExpression | null => {
    for (const statement of sourceFile.statements) {
      if (!ts.isVariableStatement(statement)) continue;
      for (const decl of statement.declarationList.declarations) {
        if (!ts.isIdentifier(decl.name)) continue;
        if (decl.name.text !== "translations") continue;
        if (!decl.initializer) continue;

        const unwrap = (expr: ts.Expression): ts.Expression => {
          if (ts.isAsExpression(expr)) return unwrap(expr.expression);
          if (ts.isTypeAssertionExpression(expr)) return unwrap(expr.expression);
          if (ts.isParenthesizedExpression(expr)) return unwrap(expr.expression);
          return expr;
        };

        const unwrapped = unwrap(decl.initializer);
        if (!ts.isObjectLiteralExpression(unwrapped)) continue;
        return unwrapped;
      }
    }
    return null;
  };

  const translationsInit = findTranslationsInitializer();
  if (!translationsInit) {
    throw new Error("Could not find `translations` object in app/localization/dictionary.ts");
  }

  for (const localeProp of translationsInit.properties) {
    if (!ts.isPropertyAssignment(localeProp)) continue;
    if (!ts.isStringLiteral(localeProp.name)) continue;
    const locale = localeProp.name.text;
    if (!ts.isObjectLiteralExpression(localeProp.initializer)) continue;

    const mapForLocale = filePathByLocaleNamespace.get(locale) ?? new Map<string, string>();

    for (const nsProp of localeProp.initializer.properties) {
      if (!ts.isPropertyAssignment(nsProp)) continue;
      const nsKey = ts.isIdentifier(nsProp.name)
        ? nsProp.name.text
        : ts.isStringLiteral(nsProp.name)
          ? nsProp.name.text
          : null;
      if (!nsKey) continue;

      if (!ts.isIdentifier(nsProp.initializer)) continue;
      const importIdent = nsProp.initializer.text;
      const imported = importIdentToFile.get(importIdent);
      if (!imported) continue;
      if (imported.locale !== locale) {
        throw new Error(`Dictionary import locale mismatch for ${locale}.${nsKey}`);
      }

      mapForLocale.set(nsKey, imported.filePath);
    }

    filePathByLocaleNamespace.set(locale, mapForLocale);
  }

  const locales = Array.from(filePathByLocaleNamespace.keys()).sort();
  const namespaces = Array.from(
    new Set(locales.flatMap((l) => Array.from(filePathByLocaleNamespace.get(l)?.keys() ?? []))),
  ).sort();

  return { locales, namespaces, filePathByLocaleNamespace };
}

async function main() {
  const usages = new Map<string, NamespaceUsage>();

  for (const rootDir of SOURCE_ROOTS) {
    console.log(`Scanning ${relative(PROJECT_ROOT, rootDir)}...`);
    for await (const filePath of walkFiles(rootDir)) {
      const sourceText = await Bun.file(filePath).text();
      const sourceFile = ts.createSourceFile(
        filePath,
        sourceText,
        ts.ScriptTarget.Latest,
        true,
        filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
      );

      const bindings = new Map<string, VarBinding>();

      const visit = (node: ts.Node) => {
        // Track: const x = useTranslations("ns") / getNamespaceCopy(..., "ns")
        if (ts.isVariableDeclaration(node) && node.initializer) {
          const init = node.initializer;
          if (ts.isCallExpression(init)) {
            const callee = ts.isIdentifier(init.expression) ? init.expression.text : null;
            if (callee === "useTranslations") {
              const ns = getStringLiteral(init.arguments[0]);
              if (ns && ts.isIdentifier(node.name)) {
                bindings.set(node.name.text, { namespace: ns, prefix: [] });
              }
            }

            if (callee === "getNamespaceCopy") {
              const ns = getStringLiteral(init.arguments[1]);
              if (ns && ts.isIdentifier(node.name)) {
                bindings.set(node.name.text, { namespace: ns, prefix: [] });
              }
            }
          }

          // Track destructures: const { a } = copy
          if (ts.isObjectBindingPattern(node.name) && ts.isIdentifier(node.initializer)) {
            const source = bindings.get(node.initializer.text);
            if (source) {
              bindDestructure(node.name, source, bindings);
            }
          }

          // Track aliasing a translation sub-tree:
          //   const calculatorCopy = helpDeliveryCopy.calculator;
          //   const pageCopy = getNamespaceCopy(locale, "pages").about;
          if (
            ts.isIdentifier(node.name) &&
            (ts.isPropertyAccessExpression(init) || ts.isElementAccessExpression(init))
          ) {
            const extracted = extractNamespaceOrRootAndPath(init as ts.Expression);
            if (extracted?.kind === "namespace") {
              bindings.set(node.name.text, {
                namespace: extracted.namespace,
                prefix: [...extracted.parts],
              });
            }

            if (extracted?.kind === "root") {
              const rootBinding = bindings.get(extracted.root);
              if (rootBinding) {
                bindings.set(node.name.text, {
                  namespace: rootBinding.namespace,
                  prefix: [...rootBinding.prefix, ...extracted.parts],
                });
              }
            }
          }
        }

        // Track destructures: const { a } = copy (via VariableDeclarationList patterns handled above)
        // Track member accesses: copy.foo.bar
        if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
          const extracted = extractNamespaceOrRootAndPath(node as ts.Expression);
          if (extracted?.kind === "namespace") {
            const usage = ensureUsage(usages, extracted.namespace);
            if (extracted.keepAll) {
              recordPath(usage, extracted.parts, { keepAll: true });
            } else {
              recordPath(usage, extracted.parts);
            }
          }

          if (extracted?.kind === "root") {
            const rootBinding = bindings.get(extracted.root);
            if (rootBinding) {
              const usage = ensureUsage(usages, rootBinding.namespace);
              const full = [...rootBinding.prefix, ...extracted.parts];

              if (extracted.keepAll) {
                recordPath(usage, full, { keepAll: true });
              } else {
                recordPath(usage, full);
              }
            }
          }
        }

        ts.forEachChild(node, visit);
      };

      visit(sourceFile);
    }
  }

  const dictionarySource = await Bun.file(
    join(PROJECT_ROOT, "app", "localization", "dictionary.ts"),
  ).text();
  const { locales, namespaces, filePathByLocaleNamespace } =
    parseDictionaryMapping(dictionarySource);
  if (locales.length === 0 || namespaces.length === 0) {
    throw new Error("No translation namespaces discovered from app/localization/dictionary.ts");
  }
  console.log(`\nFound locales: ${locales.join(", ")}`);
  console.log(`Found namespaces: ${namespaces.join(", ")}`);

  const prunedCounts: Array<{ locale: string; namespace: string; before: number; after: number }> =
    [];

  for (const namespace of namespaces) {
    const usage = usages.get(namespace);

    if (!usage) {
      // Unreferenced namespace: prune it down to an empty object in all locales.
      usages.set(namespace, { paths: new Set(), keepAllPrefixes: new Set() });
    }

    const trie = buildTrie(usages.get(namespace)!);

    for (const locale of locales) {
      const filePath = filePathByLocaleNamespace.get(locale)?.get(namespace);
      if (!filePath) {
        throw new Error(`Missing dictionary mapping for locale ${locale} namespace ${namespace}`);
      }
      const json = (await Bun.file(filePath).json()) as JsonObject;
      const beforeSize = JSON.stringify(json).length;

      const pruned = pruneJson(json, trie, { isRoot: true }) as JsonObject;
      const afterSize = JSON.stringify(pruned).length;
      prunedCounts.push({ locale, namespace, before: beforeSize, after: afterSize });

      if (writeMode) {
        await Bun.write(filePath, JSON.stringify(pruned, null, 2) + "\n");
      }
    }
  }

  console.log("\nPrune summary (bytes):");
  for (const row of prunedCounts) {
    console.log(
      `- ${row.locale}/${row.namespace}: ${row.before} -> ${row.after} (${row.before - row.after})`,
    );
  }

  if (!writeMode) {
    console.log("\nDry-run only. Re-run with --write to apply changes.");
  }
}

await main();
