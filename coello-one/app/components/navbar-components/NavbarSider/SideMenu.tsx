import { Menu } from "antd";
import type { MenuProps } from "antd";
import { RiseOutlined, GoldOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";
import { Key, ReactNode } from "react";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: ReactNode,
  key: Key,
  icon?: ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    label,
    icon,
    children,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Trending", "/trending", <RiseOutlined />, [
    getItem("Best Sellers", "/collections/best-sellers/men"),
  ]),
  getItem("Products", "/products", <GoldOutlined />, [
    getItem("Passion model", "/products/passion-model"),
    getItem("Power model", "/products/power-model"),
    getItem("Pride model", "/products/pride-model"),
  ]),
  // this idea needs to be properly developed
  //   getItem("Coello One Hub", "/hub", <UserOutlined />, [
  //     getItem("Brandon's cut workout routine", "/hub/athlete/brandon-j-plan"),
  //     getItem(
  //       "How to scalp cannonball shoulders?",
  //       "/hub/media/how-to-scalp-cannonball-shoulders"
  //     ),
  //     getItem("Julia's lean look diet", "/hub/athlete/julia-c-plan"),
  //     getItem(
  //       "Want to see diet work fast? Fast.",
  //       "/hub/media/want-to-see-diet-work-fast"
  //     ),
  //     getItem("Laura's healthy tips for busy pros", "/hub/athlete/laura-g-plan"),
  //     getItem(
  //       "How to properly protect your tattoo",
  //       "/hub/media/how-to-properly-protect-your-tattoo"
  //     ),
  //   ]),
  getItem("Accessories", "/accessories", <PlusOutlined />, [
    getItem("Resistance Bands", "/accessories/resistance-bands"),
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
