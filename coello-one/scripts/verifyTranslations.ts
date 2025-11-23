#!/usr/bin/env bun

import { getAllDictionaries } from "@/localization/dictionary";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/localization/config";

function collectKeys(node: unknown, prefix = "", target = new Set<string>()): Set<string> {
  if (node && typeof node === "object" && !Array.isArray(node)) {
    Object.entries(node as Record<string, unknown>).forEach(([key, value]) => {
      const nextKey = prefix ? `${prefix}.${key}` : key;
      collectKeys(value, nextKey, target);
    });
    return target;
  }

  target.add(prefix);
  return target;
}

const dictionaries = getAllDictionaries();
const referenceKeys = collectKeys(dictionaries[DEFAULT_LOCALE]);
const failures: string[] = [];

SUPPORTED_LOCALES.forEach((locale) => {
  const localeKeys = collectKeys(dictionaries[locale]);
  const missing = [...referenceKeys].filter((key) => !localeKeys.has(key));
  const extra = [...localeKeys].filter((key) => !referenceKeys.has(key));

  if (missing.length > 0 || extra.length > 0) {
    failures.push(
      `Locale ${locale} mismatch:\n  missing: ${missing.join(", ") || "none"}\n  extra: ${extra.join(", ") || "none"}`,
    );
  }
});

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("All locale dictionaries share the same keys.");
