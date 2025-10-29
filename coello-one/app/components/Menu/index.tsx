"use client";

import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useRouter, usePathname } from "next/navigation";
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

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    router.push(e.key as string);
  };

  return (
    <Menu
      selectedKeys={[pathname]}
      items={items}
      onClick={handleMenuClick}
      className="!border-r-0 !px-0"
      mode="inline"
      inlineIndent={0}
      expandIcon={expandIcon}
    />
  );
}
