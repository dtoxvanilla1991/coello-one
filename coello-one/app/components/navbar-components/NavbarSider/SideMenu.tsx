import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useRouter, usePathname } from "next/navigation";
import { Key, ReactNode } from "react";

type MenuItem = Required<MenuProps>["items"][number];

function createMenuTitle(
  label: ReactNode,
  key: Key,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    label,
    children,
    className: "uppercase font-medium",
  } as MenuItem;
}
function createMenuOption(
  label: ReactNode,
  key: Key,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    label,
    children,
    className: "!text-gray-600 capitalize",
  } as MenuItem;
}

const items: MenuItem[] = [
  createMenuTitle("Trending", "/trending", [
    createMenuOption("Best Sellers", "/collections/best-sellers/men"),
  ]),
  createMenuTitle("Products", "/products", [
    createMenuOption("Passion model", "/products/passion-model"),
    createMenuOption("Power model", "/products/power-model"),
    createMenuOption("Pride model", "/products/pride-model"),
  ]),
  // this idea needs to be properly developed
  //   createMenuTitle("Coello One Hub", "/hub", <UserOutlined />, [
  //     createMenuTitle("Brandon's cut workout routine", "/hub/athlete/brandon-j-plan"),
  //     createMenuTitle(
  //       "How to scalp cannonball shoulders?",
  //       "/hub/media/how-to-scalp-cannonball-shoulders"
  //     ),
  //     createMenuTitle("Julia's lean look diet", "/hub/athlete/julia-c-plan"),
  //     createMenuTitle(
  //       "Want to see diet work fast? Fast.",
  //       "/hub/media/want-to-see-diet-work-fast"
  //     ),
  //     createMenuTitle("Laura's healthy tips for busy pros", "/hub/athlete/laura-g-plan"),
  //     createMenuTitle(
  //       "How to properly protect your tattoo",
  //       "/hub/media/how-to-properly-protect-your-tattoo"
  //     ),
  //   ]),
  createMenuTitle("Accessories", "/accessories", [
    createMenuOption("Resistance Bands", "/accessories/resistance-bands"),
  ]),
];

export default function SideMenu() {
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
      className="!border-r-0"
      mode="inline"
    />
  );
}
