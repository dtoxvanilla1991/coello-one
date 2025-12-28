"use client";

import { Flex, Space, Typography } from "antd";
import Link from "next/link";
import { useCallback, useMemo, type FC } from "react";
import { routes } from "@config/routes";
import { useLocalePath } from "@/hooks/useLocalePath";
import { useSetAtom } from "jotai";
import { siderCollapsedAtom } from "@/store/siderStore";
import { useTranslations } from "@/localization/useTranslations";

const { Text } = Typography;

const linkConfig = [
  { key: "accessibility", route: routes.accessibility },
  { key: "blueprint", route: routes.blueprint },
  { key: "help", route: routes.help },
] as const;

const SiderFooter: FC = () => {
  const localePath = useLocalePath();
  const setCollapsed = useSetAtom(siderCollapsedAtom);
  const navigationCopy = useTranslations("navigation");
  const footerCopy = navigationCopy.sider.footer;
  const collapseSider = useCallback(() => setCollapsed(true), [setCollapsed]);
  const data = useMemo(
    () =>
      linkConfig.map((link) => ({
        label: footerCopy.links?.[link.key] ?? link.key,
        key: link.key,
        href: localePath(link.route),
      })),
    [footerCopy.links, localePath],
  );

  return (
    <Space orientation="vertical" size="small" className="flex w-full bg-gray-200 p-4">
      <Text strong className="uppercase">
        {footerCopy.title ?? "More"}
      </Text>
      <Flex vertical gap={6} className="text-xs!" role="list">
        {data.map((item) => (
          <div key={item.key} className="py-1.5" role="listitem">
            <Link
              href={item.href}
              className="text-gray-600 hover:underline"
              onClick={collapseSider}
            >
              {item.label}
            </Link>
          </div>
        ))}
      </Flex>
    </Space>
  );
};

export default SiderFooter;
