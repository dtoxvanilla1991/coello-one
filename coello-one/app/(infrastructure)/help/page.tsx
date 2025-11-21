import type { Metadata } from "next";
import HelpLandingContent from "@components/help/HelpLandingContent";
import { getNamespaceCopy } from "@/localization/dictionary";
import { getRequestLocale } from "@/localization/getRequestLocale";
import { createLocalePath } from "@/utils/createLocalePath";

export function generateMetadata(): Metadata {
  const copy = getNamespaceCopy(undefined, "helpLanding");
  return {
    title: copy.metadata.title,
    description: copy.metadata.description,
  };
}

// TEST-WAIVER: Route shell composes static content plus tested widgets; duplicative render tests add minimal value.
export default async function HelpLandingPage() {
  const locale = await getRequestLocale();
  const withLocalePath = createLocalePath();
  const landingCopy = getNamespaceCopy(locale, "helpLanding");
  const toHelpPath = (path: string) => {
    const normalized = path.startsWith("/help")
      ? path
      : `/help/${path.replace(/^\/+/u, "")}`;
    return withLocalePath(normalized);
  };
  const quickLinks = landingCopy.quickLinks.map((link) => ({
    ...link,
    href: toHelpPath(link.href),
  }));

  return (
    <HelpLandingContent
      hero={landingCopy.hero}
      introCard={landingCopy.introCard}
      quickLinks={quickLinks}
      contactCard={{
        ...landingCopy.contactCard,
        buttonHref: toHelpPath(landingCopy.contactCard.buttonHref),
      }}
    />
  );
}
