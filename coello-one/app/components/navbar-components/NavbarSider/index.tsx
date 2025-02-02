"use client";

import { Layout, Menu, theme } from "antd";
import type { MenuProps } from "antd";
import {
  UserOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useSiderCollapsed } from "@/hooks/useSiderCollapsed";
import { useRouter, usePathname } from "next/navigation";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "/", <PieChartOutlined />),
  getItem("Analytics", "/analytics", <DesktopOutlined />),
  getItem("User", "/home", <UserOutlined />, [
    getItem("Tom", "/user/tom"),
    getItem("Bill", "/user/bill"),
    getItem("Alex", "/user/alex"),
  ]),
  getItem("Team", "/team", <TeamOutlined />, [
    getItem("Team 1", "/team/team1"),
    getItem("Team 2", "/team/team2"),
  ]),
  getItem("Files", "/files", <FileOutlined />),
];

export function NavbarSiderComponent() {
  const { collapsed, setCollapsed } = useSiderCollapsed();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const router = useRouter();
  const pathname = usePathname();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    router.push(e.key as string);
  };

  return (
    <Sider
      aria-label="Navigation Sidebar"
      role="navigation"
      className={`!absolute top-14 left-0 h-full !transition-transform duration-300 ease-in-out !z-50 ${
        collapsed ? "!-translate-x-full" : "!translate-x-0"
      }`}
      style={{ background: colorBgContainer }}
      width={"100%"}
      collapsible
      collapsed={collapsed}
      collapsedWidth={0}
      trigger={null}
      onCollapse={(value) => setCollapsed(value)}>
      <Menu
        selectedKeys={[pathname]}
        style={{ height: "100%", borderRight: 0 }}
        items={items}
        onClick={handleMenuClick}
      />
    </Sider>
  );
}
