"use client";

import { useEffect } from "react";
import { Flex, Layout, Space, Typography } from "antd";
import { siderCollapsedAtom } from "@/store/siderStore";
import { useAtom } from "jotai";
import LanguageSelect from "./LanguageSelect";
import { TabsComponent } from "./TabsComponent";
import Menu from "./SideMenu";
import SiderFooter from "./SiderFooter";
import { usePathname } from "next/navigation";

const { Sider } = Layout;
const { Text } = Typography;

export function NavbarSiderComponent() {
  const [collapsed, setCollapsed] = useAtom(siderCollapsedAtom);
  const pathname = usePathname();
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

  return (
    <Sider
      aria-label="Navigation Sidebar"
      role="navigation"
      className={`/* fill viewport below navbar */ /* making sure user can scroll within sidebar */ absolute! top-14 left-0 z-50! h-[calc(100vh-56px)] w-full overflow-y-auto bg-white pt-4! transition-transform! duration-300 ease-in-out ${collapsed ? "-translate-x-full!" : "translate-x-0!"}`}
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
            How can we help you today?
          </Text>
        </Space>
        <TabsComponent />
        <Menu />
      </Flex>
      <SiderFooter />
    </Sider>
  );
}
