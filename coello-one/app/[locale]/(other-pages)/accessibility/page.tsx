import { getRequestLocale } from "@/localization/getRequestLocale";
import { getNamespaceCopy } from "@/localization/dictionary";
import AccessibilityContent from "./AccessibilityContent";

export default async function AccessibilityStatement() {
  const locale = await getRequestLocale();
  const copy = getNamespaceCopy(locale, "systemPages").accessibility;

  return (
    <AccessibilityContent
      title={copy.title}
      paragraphs={copy.paragraphs}
      ariaLabel={copy.ariaLabel}
    />
  );
}
