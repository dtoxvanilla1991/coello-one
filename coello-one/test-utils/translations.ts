import type { SupportedLocale } from "@/localization/config";
import type { TranslationNamespace, TranslationNamespaces } from "@/localization/dictionary";
import { getNamespaceCopy } from "@/localization/dictionary";

export const ENGLISH_TEST_LOCALE: SupportedLocale = "en-GB";

export function getTestTranslations<N extends TranslationNamespace>(
  namespace: N,
  locale: SupportedLocale = ENGLISH_TEST_LOCALE,
): TranslationNamespaces[N] {
  return getNamespaceCopy(locale, namespace);
}
