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
import { cartCountAtom } from "@/store/cartStore";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { buildLocaleRoute } from "@config/routes";

const { Header } = Layout;

export function Navbar() {
  const [collapsed, setCollapsed] = useAtom(siderCollapsedAtom);
  const cartCount = useAtomValue(cartCountAtom);

  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const params = useParams();
  const router = useRouter();
  const locale = typeof params?.locale === "string" ? params.locale : "en-GB";
  const homeHref = buildLocaleRoute(locale, "home");

  const toggleSearch = () => setSearchVisible((prev) => !prev);
  const navigateToBag = () => router.push(buildLocaleRoute(locale, "bag"));

  const visibilityClass = searchVisible ? "hidden!" : "block!";

  return (
    <Header className="sticky top-0 z-50 flex items-center justify-between bg-white! px-4! shadow-sm">
      <Button
        type="text"
        size="large"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed((prev) => !prev)}
        className="text-lg"
        aria-label="Toggle navigation menu"
      />
      <Flex className={visibilityClass} justify="center" align="center">
        <Link href={homeHref} className="ml-2 block pt-1">
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
      <Space size="middle" className="text-2xl">
        <Badge
          count={cartCount}
          size="small"
          offset={[-6, 4]}
          className={`flex items-center ${visibilityClass}`}
        >
          <Button
            id="navbar-bag-button"
            type="text"
            size="large"
            icon={<ShoppingOutlined className="text-2xl" />}
            className={visibilityClass}
            onClick={navigateToBag}
            aria-label="View bag"
          />
        </Badge>
        <Button
          type="text"
          size="large"
          icon={<SearchOutlined className="text-2xl" />}
          className={visibilityClass}
          onClick={toggleSearch}
          aria-label="Open search"
        />
      </Space>
      <NavbarSearch searchVisible={searchVisible} onClose={toggleSearch} locale={locale} />
    </Header>
  );
}
