"use client";

import { Layout, Typography, Button, Row, Col, Menu, theme } from "antd";
import type { MenuProps } from "antd";
import {
  ShoppingCartOutlined,
  SearchOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { createElement, useState } from "react";

const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;

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

export function Home() {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="relative">
      {/* 
        Make the Sider absolutely positioned over the content.
        -transition classes ensure smooth in/out animation.
        -translate-x-full hides it off-screen to the left.
        -translate-x-0 brings it fully into view.
      */}
      <Sider
        className={`absolute top-0 left-0 z-50 h-full transition-transform duration-300 ${
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

      <Layout className="min-h-screen bg-white w-[390px] mx-auto border border-gray-300">
        {/* HEADER */}
        <Header className="bg-white flex items-center px-4 h-14 shadow-sm sticky top-0 z-50">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-base w-16 h-16"
          />
          <div className="flex-1 text-center">
            <Title level={4} className="!m-0 uppercase tracking-wider">
              Coello One
            </Title>
          </div>
          <ShoppingCartOutlined className="text-xl mr-4" />
          <SearchOutlined className="text-xl" />
        </Header>

        {/* CONTENT */}
        <Content className="px-4 mt-4">
          {/* Hero Banner Section (Placeholder) */}
          <div className="w-full h-52 bg-gray-100 mb-4 flex items-center justify-center">
            <Text className="text-lg font-bold">Hero Banner Here</Text>
          </div>

          {/* Featured Products (Placeholder) */}
          <Title level={4} className="mb-2">
            Featured
          </Title>
          <Row gutter={[8, 8]}>
            {Array.from({ length: 4 }, (_, i) => (
              <Col key={i} span={12}>
                <div className="bg-gray-100 h-36 flex items-center justify-center">
                  <Text>Product {i + 1}</Text>
                </div>
              </Col>
            ))}
          </Row>

          {/* Promo Section (Placeholder) */}
          <div className="mt-4 p-4 bg-gray-50 rounded text-center">
            <Title level={5} className="mb-1">
              Limited Time Offer
            </Title>
            <Text>Up to 50% off select items</Text>
            <div className="mt-2">
              <Button type="primary" size="large">
                Shop Now
              </Button>
            </div>
          </div>
        </Content>

        <Footer className="bg-white border-t border-gray-300 text-center py-3">
          <Text type="secondary" className="text-sm">
            © 2025 Coello One. All rights reserved.
          </Text>
        </Footer>
      </Layout>
    </Layout>
  );
}
