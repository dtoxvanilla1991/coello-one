"use client";

import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useRouter, usePathname } from "next/navigation";
import { useMemo } from "react";
import { useLocalePath } from "@/hooks/useLocalePath";
import type { MenuItem } from "./helpers";
import type { ReactNode } from "react";

export default function MenuComponent({
  items,
  expandIcon = undefined,
}: {
  items: MenuItem[];
  expandIcon?: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const withLocalePath = useLocalePath();

  const localizedItems = useMemo(() => {
    const mapItems = (item?: MenuItem | null): MenuItem | null => {
      if (!item) {
        return null;
      }

      const localizedKey = typeof item.key === "string" ? withLocalePath(item.key) : item.key;
      const typedItem = item as MenuItem & { children?: MenuItem[] };
      const childItems = Array.isArray(typedItem.children)
        ? typedItem.children
            .map((child) => mapItems(child))
            .filter((childItem): childItem is MenuItem => Boolean(childItem))
        : undefined;

      return {
        ...typedItem,
        ...(typeof localizedKey === "undefined" ? {} : { key: localizedKey }),
        ...(childItems ? { children: childItems } : {}),
      } as MenuItem;
    };

    return items.map((item) => mapItems(item)).filter((item): item is MenuItem => Boolean(item));
  }, [items, withLocalePath]);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    router.push(e.key as string);
  };

  return (
    <Menu
      selectedKeys={[pathname]}
      items={localizedItems}
      onClick={handleMenuClick}
      className="border-r-0! px-0!"
      mode="inline"
      inlineIndent={0}
      expandIcon={expandIcon}
    />
  );
}
