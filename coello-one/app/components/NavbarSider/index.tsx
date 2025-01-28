"use client";

import { Layout, Button, Menu, theme } from "antd";
import type { MenuProps } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { createElement, useState } from "react";

const { Sider } = Layout;

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

export function NavbarSiderComponent() {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      {/* 
        -transition classes ensure smooth in/out animation.
        -translate-x-full hides it off-screen to the left.
        -translate-x-0 brings it fully into view.
      */}
      <Sider
        className={`absolute top-14 left-0 z-20 h-full transition-transform duration-300 ${
          collapsed ? "-translate-x-full" : "translate-x-0"
        }`}
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
          items={items2}
        />
      </Sider>

      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        className="text-lg absolute top-3 left-2 z-20"
      />
    </>
  );
}
