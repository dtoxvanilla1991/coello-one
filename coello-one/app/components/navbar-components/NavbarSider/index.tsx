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
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

export function NavbarSiderComponent() {
  const { collapsed, setCollapsed } = useSiderCollapsed();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // -transition classes ensure smooth in/out animation.
  // -translate-x-full hides it off-screen to the left.
  // -translate-x-0 brings it fully into view.

  return (
    <Sider
      // className={`absolute top-14 left-0 h-full transition-transform duration-300 z-0 ${
      //   collapsed ? "translate-x-full" : "translate-x-0"
      // }`}
      style={{ background: colorBgContainer }}
      width="100%"
      collapsible
      collapsed={collapsed}
      collapsedWidth={0}
      trigger={null}
      onCollapse={(value) => setCollapsed(value)}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "100%" }}
        items={items}
      />
    </Sider>
  );
}
