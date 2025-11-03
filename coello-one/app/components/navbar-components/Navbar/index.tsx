"use client";
import { Badge, Button, Flex, Layout, Space } from "antd";
import {
  SearchOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import Link from "next/link";
import { NavbarSearch } from "../NavbarSearch";
import { useAtom, useAtomValue } from "jotai";
import { siderCollapsedAtom } from "@/store/siderStore";
import NavBarBagDrawer from "../NavBarBagDrawer";
import { cartCountAtom } from "@/store/cartStore";
import Image from "next/image";
import { usePathname } from "next/navigation";

const { Header } = Layout;

export function Navbar() {
  const [collapsed, setCollapsed] = useAtom(siderCollapsedAtom);
  const cartCount = useAtomValue(cartCountAtom);

  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const [showBag, setShowBag] = useState<boolean>(false);
  const pathname = usePathname();
  const localeSegment = pathname?.split("/")[1] || "en-GB";
  const homeHref = `/${localeSegment}/home`;

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
        <Link href={homeHref} className="ml-2 pt-1 block">
          <Image
            src="/coelloLogo.png"
            width={150}
            height={50}
            alt="Coello one logo"
            className="w-auto"
            priority
          />
        </Link>
      </Flex>
      <Space size={"middle"} className="text-2xl">
        <Badge count={cartCount} size="small" offset={[0, 4]}>
          <Button
            id="navbar-bag-button"
            type="text"
            size="large"
            icon={<ShoppingOutlined className="text-2xl" />}
            className={`${show}`}
            onClick={handleShowBag}
          />
        </Badge>
        <Button
          type="text"
          size="large"
          icon={<SearchOutlined className="text-2xl" />}
          className={`${show}`}
          onClick={handleSearch}
        />
      </Space>
      <NavbarSearch searchVisible={searchVisible} handleSearch={handleSearch} />
      <NavBarBagDrawer showBag={showBag} handleShowBag={handleShowBag} />
    </Header>
  );
}
