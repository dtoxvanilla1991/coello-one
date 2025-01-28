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

export function SiderComponent() {
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
      {window && (
        <Sider
          className={`absolute top-14 left-0 z-50 h-full transition-transform duration-300 ${
            collapsed ? "-translate-x-full" : "translate-x-0"
          }`}
          style={{ background: colorBgContainer }}
          width={window.innerWidth}
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
      )}

      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        className="text-base w-16 h-16"
      />
    </>
  );
}
