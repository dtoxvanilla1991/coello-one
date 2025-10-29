"use client";
import { Button, Flex, Layout, Space } from "antd";
import {
  SearchOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { NavbarSearch } from "../NavbarSearch";
import { useAtom } from "jotai";
import { siderCollapsedAtom } from "@/store/siderStore";
import NavBarBagDrawer from "../NavBarBagDrawer";
import Image from "next/image";

const { Header } = Layout;

export function Navbar() {
  const [collapsed, setCollapsed] = useAtom(siderCollapsedAtom);

  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const [showBag, setShowBag] = useState<boolean>(false);

  const handleShowBag = () => setShowBag((prev) => !prev);
  const handleSearch = () => setSearchVisible((prev) => !prev);

  const show = searchVisible ? "!hidden" : "!block";
  return (
    <Header className="!bg-white flex items-center justify-between !px-4">
      <Button
        type="text"
        size="large"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed((prev) => !prev)}
        className="text-lg"
      />
      <Flex className={`${show}`} justify="center" align="center">
        <Image
          src="/coelloLogo.png"
          width={150}
          height={50}
          alt="Coello one logo"
          className="ml-2 pt-1 w-auto"
          priority
        />
      </Flex>
      <Space size={"middle"} className="text-xl">
        <ShoppingOutlined className={`${show}`} onClick={handleShowBag} />
        <SearchOutlined className={`${show}`} onClick={handleSearch} />
      </Space>
      <NavbarSearch searchVisible={searchVisible} handleSearch={handleSearch} />
      <NavBarBagDrawer showBag={showBag} handleShowBag={handleShowBag} />
    </Header>
  );
}
