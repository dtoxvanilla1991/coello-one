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
import { siderCollapsedAtom, siderAnimatingAtom } from "@/store/siderStore";
import { cartCountAtom } from "@/store/cartStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { buildLocaleRoute } from "@config/routes";
import { useLocalePath } from "@/hooks/useLocalePath";
import { useTranslations } from "@/localization/useTranslations";

const { Header } = Layout;

export function Navbar() {
  const [collapsed, setCollapsed] = useAtom(siderCollapsedAtom);
  const cartCount = useAtomValue(cartCountAtom);
  const isSiderAnimating = useAtomValue(siderAnimatingAtom);

  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const router = useRouter();
  const withLocalePath = useLocalePath();
  const homeHref = withLocalePath(buildLocaleRoute("home"));
  const bagHref = withLocalePath(buildLocaleRoute("bag"));
  const navigationCopy = useTranslations("navigation");
  const navbarCopy = navigationCopy.navbar;

  const toggleSearch = () => setSearchVisible((prev) => !prev);
  const navigateToBag = () => router.push(bagHref);
  const handleToggleSider = () => {
    if (isSiderAnimating) {
      return;
    }
    setCollapsed((prev) => !prev);
  };

  const visibilityClass = searchVisible ? "hidden!" : "block!";

  return (
    <Header
      className="sticky top-0 z-50 flex items-center justify-between bg-white! px-4! shadow-sm"
      style={{ minHeight: "var(--navbar-height, 56px)" }}
    >
      <Button
        type="text"
        size="large"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={handleToggleSider}
        className="text-lg"
        aria-label={navbarCopy.buttons.toggleMenu}
        disabled={isSiderAnimating}
        aria-disabled={isSiderAnimating}
      />
      <Flex className={visibilityClass} justify="center" align="center">
        <Link href={homeHref} className="ml-2 block pt-1">
          <Image
            src="/coelloLogo.png"
            width={135}
            height={45}
            alt={navbarCopy.logoAlt}
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
            aria-label={navbarCopy.buttons.viewBag}
          />
        </Badge>
        <Button
          type="text"
          size="large"
          icon={<SearchOutlined className="text-2xl" />}
          className={visibilityClass}
          onClick={toggleSearch}
          aria-label={navbarCopy.buttons.openSearch}
        />
      </Space>
      <NavbarSearch searchVisible={searchVisible} onClose={toggleSearch} />
    </Header>
  );
}
