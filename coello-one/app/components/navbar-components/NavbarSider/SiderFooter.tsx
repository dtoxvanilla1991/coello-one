import { List, Space, Typography } from "antd";
import Link from "next/link";
import { useCallback, useMemo, type FC } from "react";
import { routes } from "@config/routes";
import { useLocalePath } from "@/hooks/useLocalePath";
import { useSetAtom } from "jotai";
import { siderCollapsedAtom } from "@/store/siderStore";

const { Text } = Typography;

const linkConfig = [
  { text: "Accessibility Statement", route: routes.accessibility },
  { text: "Coello One Blueprint", route: routes.blueprint },
  { text: "Help", route: routes.help },
] as const;

const SiderFooter: FC = () => {
  const localePath = useLocalePath();
  const setCollapsed = useSetAtom(siderCollapsedAtom);
  const collapseSider = useCallback(() => setCollapsed(true), [setCollapsed]);
  const data = useMemo(
    () => linkConfig.map((link) => ({ ...link, href: localePath(link.route) })),
    [localePath],
  );

  return (
    <Space direction="vertical" size="small" className="flex w-full bg-gray-200 p-4">
      <Text strong className="uppercase">
        More
      </Text>
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item className="py-1.5!">
            <Link
              href={item.href}
              className="text-gray-600 hover:underline"
              onClick={collapseSider}
            >
              {item.text}
            </Link>
          </List.Item>
        )}
        split={false}
        className="text-xs!"
      />
    </Space>
  );
};

export default SiderFooter;
