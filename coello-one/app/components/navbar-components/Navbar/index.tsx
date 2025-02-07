"use client";
import { Button, Flex, Layout, Space, Typography } from "antd";
import {
  ShoppingCartOutlined,
  SearchOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { NavbarSearch } from "../NavbarSearch";
import { useAtom } from "jotai";
import { siderCollapsedAtom } from "@/store/siderStore";

const { Header } = Layout;
const { Title } = Typography;

export function Navbar() {
  const [collapsed, setCollapsed] = useAtom(siderCollapsedAtom);

  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const [showCart, setShowCart] = useState<boolean>(false);

  const handleShowCart = () => setShowCart(!showCart);
  const handleSearch = () => setSearchVisible(!searchVisible);

  const show = searchVisible ? "!hidden" : "!block";
  return (
    <Header className="!bg-white flex items-center justify-between !px-4">
      <Button
        type="text"
        size="large"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        className="text-lg"
      />
      <Flex className={`${show}`} justify="center" align="center">
        <Title
          level={4}
          className="!m-0 uppercase w-full tracking-wider transition delay-500 duration-300 ease-in-out motion-reduce:transition-none motion-reduce:hover:transform-none">
          Coello One
        </Title>
      </Flex>
      <Space size={"middle"}>
        <ShoppingCartOutlined
          className={`text-xl ${show}`}
          onClick={handleShowCart}
        />
        <SearchOutlined className={`text-xl ${show}`} onClick={handleSearch} />
      </Space>
      <NavbarSearch searchVisible={searchVisible} handleSearch={handleSearch} />
    </Header>
  );
}
