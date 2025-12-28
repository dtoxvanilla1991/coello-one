"use client";

import { useEffect, useRef } from "react";
import { Flex, Layout, Space, Typography } from "antd";
import { siderCollapsedAtom, siderAnimatingAtom } from "@/store/siderStore";
import { useAtom, useSetAtom } from "jotai";
import LanguageSelect from "./LanguageSelect";
import { TabsComponent } from "./TabsComponent";
import Menu from "./SideMenu";
import SiderFooter from "./SiderFooter";
import { usePathname } from "next/navigation";
import { useTranslations } from "@/localization/useTranslations";

const { Sider } = Layout;
const { Text } = Typography;
const SIDER_ANIMATION_DURATION_MS = process.env.NODE_ENV === "test" ? 0 : 350;

export function NavbarSiderComponent() {
  const [collapsed, setCollapsed] = useAtom(siderCollapsedAtom);
  const setAnimating = useSetAtom(siderAnimatingAtom);
  const isFirstRenderRef = useRef(true);
  const animationTimeoutRef = useRef<number | null>(null);
  const pathname = usePathname();
  const navigationCopy = useTranslations("navigation");
  const siderCopy = navigationCopy.sider;
  // Locking main page scroll when sidebar is visible since it's an overlay
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (!collapsed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow;
    }
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [collapsed]);

  useEffect(() => {
    setCollapsed(true);
  }, [pathname, setCollapsed]);

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      setAnimating(false);
      return;
    }

    if (SIDER_ANIMATION_DURATION_MS === 0) {
      setAnimating(false);
      return () => {
        setAnimating(false);
      };
    }

    setAnimating(true);
    animationTimeoutRef.current = window.setTimeout(() => {
      setAnimating(false);
      animationTimeoutRef.current = null;
    }, SIDER_ANIMATION_DURATION_MS);

    return () => {
      if (animationTimeoutRef.current !== null) {
        window.clearTimeout(animationTimeoutRef.current);
        animationTimeoutRef.current = null;
      }
      setAnimating(false);
    };
  }, [collapsed, setAnimating]);

  return (
    <Sider
      aria-label={siderCopy.ariaLabel ?? "Navigation Sidebar"}
      role="navigation"
      className={`/* fill viewport below navbar */ /* making sure user can scroll within sidebar */ fixed! top-0 right-0 left-0 bottom-0 z-50! h-screen overflow-y-auto bg-white transition-transform! duration-300 ease-in-out ${collapsed ? "-translate-x-full!" : "translate-x-0!"}`}
      style={{ paddingTop: "calc(var(--navbar-height, 56px) + 1rem)" }}
      theme="light"
      width={"100%"}
      collapsible
      collapsed={collapsed}
      collapsedWidth={0}
      trigger={null}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Flex className="w-full px-4! pb-16!" vertical gap={15}>
        <Space size="large" align="center" className="w-full">
          <LanguageSelect />
          <Text className="uppercase" disabled>
            {siderCopy.helperPrompt ?? "How can we help you today?"}
          </Text>
        </Space>
        <TabsComponent />
        <Menu />
      </Flex>
      <SiderFooter />
    </Sider>
  );
}
