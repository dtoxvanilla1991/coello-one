"use client";

import { useEffect } from "react";
import { Flex, Layout, Space, theme, Typography } from "antd";
import { siderCollapsedAtom } from "@/store/siderStore";
import { useAtom } from "jotai";
import LanguageSelect from "./LanguageSelect";
import { TabsComponent } from "./TabsComponent";
import Menu from "./SideMenu";
import SiderFooter from "./SiderFooter";

const { Sider } = Layout;
const { Text } = Typography;

export function NavbarSiderComponent() {
  const [collapsed, setCollapsed] = useAtom(siderCollapsedAtom);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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

  return (
    <Sider
      aria-label="Navigation Sidebar"
      role="navigation"
      className={`!absolute top-14 left-0 pt-4 !transition-transform duration-300 ease-in-out !z-50
        w-full
        h-[calc(100vh-56px)]          /* fill viewport below navbar */
        overflow-y-auto              /* making sure user can scroll within sidebar */
        ${collapsed ? "!-translate-x-full" : "!translate-x-0"}`}
      style={{ background: colorBgContainer }}
      width={"100%"}
      collapsible
      collapsed={collapsed}
      collapsedWidth={0}
      trigger={null}
      onCollapse={(value) => setCollapsed(value)}>
      <Flex className="w-full !pb-16 !px-4" vertical gap={15}>
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
