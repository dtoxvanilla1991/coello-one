"use client";

import { Flex, Layout, Space, theme, Typography } from "antd";
import { siderCollapsedAtom } from "@/store/siderStore";
import { useAtom } from "jotai";
import LanguageSelect from "./LanguageSelect";
import { TabsComponent } from "./TabsComponent";
import Menu from "./SideMenu";

const { Sider } = Layout;
const { Text } = Typography;

export function NavbarSiderComponent() {
  const [collapsed, setCollapsed] = useAtom(siderCollapsedAtom);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Sider
      aria-label="Navigation Sidebar"
      role="navigation"
      className={`!absolute top-14 left-0 h-full !transition-transform duration-300 ease-in-out !z-50 p-4 ${
        collapsed ? "!-translate-x-full" : "!translate-x-0"
      }`}
      style={{ background: colorBgContainer }}
      width={"100%"}
      collapsible
      collapsed={collapsed}
      collapsedWidth={0}
      trigger={null}
      onCollapse={(value) => setCollapsed(value)}>
      <Flex className="w-full" vertical gap={15}>
        <Space size="large" align="center" className="w-full">
          <LanguageSelect />
          <Text className="uppercase" disabled>
            How can we help you today?
          </Text>
        </Space>
        <TabsComponent />
        <Menu />
      </Flex>
    </Sider>
  );
}
