"use client";

import { useMemo } from "react";
import { createMenuOption, createMenuTitle, MenuItem } from "@/components/Menu/helpers";
import Menu from "@components/Menu";
import { useTranslations } from "@/localization/useTranslations";
import type { TranslationNamespaces } from "@/localization/dictionary";

type MenuSection = {
  key: keyof NavigationMenuCopy;
  href: string;
  items: { key: string; href: string }[];
};

type NavigationMenuCopy = NonNullable<
  TranslationNamespaces["navigation"]["sider"]["menu"]["sections"]
>;

const MENU_SECTIONS: MenuSection[] = [
  {
    key: "products",
    href: "/products",
    items: [
      { key: "passionModel", href: "/products/passion-model" },
      { key: "powerModel", href: "/products/power-model" },
      { key: "fireModel", href: "/products/fire-model" },
    ],
  },
  // Trending section to be added in the future, DO NOT DELETE
  // createMenuTitle("Trending", "/trending", [
  //   createMenuOption("Best Sellers", "/collections/best-sellers/men"),
  // ]),
  {
    key: "accessories",
    href: "/accessories",
    items: [{ key: "resistanceBands", href: "/accessories/resistance-bands" }],
  },
  // this idea needs to be properly developed, DO NOT DELETE
  //   createMenuTitle("Coello One Hub", "/hub", <UserOutlined />, [
  //     createMenuTitle("Brandon's cut workout routine", "/hub/athlete/brandon-j-plan"),
  //     createMenuTitle(
  //       "How to scalp cannonball shoulders?",
  //       "/hub/media/how-to-scalp-cannonball-shoulders",
  //     ),
  //     createMenuTitle("Julia's lean look diet", "/hub/athlete/julia-c-plan"),
  //     createMenuTitle(
  //       "Want to see diet work fast? Fast.",
  //       "/hub/media/want-to-see-diet-work-fast",
  //     ),
  //     createMenuTitle("Laura's healthy tips for busy pros", "/hub/athlete/laura-g-plan"),
  //     createMenuTitle(
  //       "How to properly protect your tattoo",
  //       "/hub/media/how-to-properly-protect-your-tattoo",
  //     ),
  //   ]),
];

export default function SideMenu() {
  const navigationCopy = useTranslations("navigation");
  const sectionsCopy = navigationCopy.sider.menu.sections;

  const items = useMemo(() => {
    const resolvedSections = (sectionsCopy ?? {}) as NavigationMenuCopy;
    return MENU_SECTIONS.map((section) => {
      const localizedSection = resolvedSections?.[section.key];
      const sectionTitle = localizedSection?.title ?? section.key;
      const childItems = section.items.map((item) => {
        const localizedItems = localizedSection?.items as Record<string, string> | undefined;
        const label = localizedItems?.[item.key] ?? item.key;
        return createMenuOption(label, item.href);
      });

      return createMenuTitle(sectionTitle, section.href, childItems);
    });
  }, [sectionsCopy]);

  return <Menu items={items as MenuItem[]} expandIcon={<span aria-hidden="true">+</span>} />;
}
