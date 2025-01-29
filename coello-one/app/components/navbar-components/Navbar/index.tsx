"use client";
import { Button, Flex, Layout, Typography } from "antd";
import {
  ShoppingCartOutlined,
  SearchOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { NavbarSearch } from "../NavbarSearch";
import { useState } from "react";
import { NavbarSiderComponent } from "../NavbarSider";

const { Header } = Layout;
const { Title } = Typography;

export function Navbar() {
  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const showSearch = () => setSearchVisible(!searchVisible);
  const show = searchVisible ? "hidden" : "block";
  return (
    <Layout>
      <NavbarSiderComponent collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <Header className="bg-white flex items-center px-4 h-14 shadow-sm sticky top-0 z-10">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-lg"
          />
          <Flex className={`w-full ${show} text-center`}>
            <Title
              level={4}
              className="!m-0 uppercase tracking-wider transition delay-500 duration-300 ease-in-out motion-reduce:transition-none motion-reduce:hover:transform-none">
              Coello One
            </Title>
          </Flex>
          <ShoppingCartOutlined className={`text-xl mr-4 ${show}`} />
          <SearchOutlined className={`text-xl ${show}`} onClick={showSearch} />
          <NavbarSearch
            className={`transition duration-300 ${
              searchVisible ? "w-11/12 opacity-100 " : "w-0 opacity-0"
            } overflow-hidden motion-reduce:transition-none motion-reduce:hover:transform-none`}
            showSearch={showSearch}
          />
        </Header>
      </Layout>
    </Layout>
  );
}
