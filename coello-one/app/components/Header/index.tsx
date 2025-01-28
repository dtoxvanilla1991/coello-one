"use client";
import { Layout, Typography } from "antd";
import { ShoppingCartOutlined, SearchOutlined } from "@ant-design/icons";
import { SiderComponent } from "./Sider";

const { Header } = Layout;
const { Title } = Typography;

export function HeaderComponent() {
  return (
    <Header className="bg-white flex items-center px-4 h-14 shadow-sm sticky top-0 z-50">
      <SiderComponent />
      <div className="flex-1 text-center">
        <Title level={4} className="!m-0 uppercase tracking-wider">
          Coello One
        </Title>
      </div>
      <ShoppingCartOutlined className="text-xl mr-4" />
      <SearchOutlined className="text-xl" />
    </Header>
  );
}
