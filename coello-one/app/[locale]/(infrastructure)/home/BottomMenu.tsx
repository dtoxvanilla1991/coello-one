"use client";

import { useMemo } from "react";
import { createMenuOption, createMenuTitle, MenuItem } from "@/components/Menu/helpers";
import Menu from "@components/Menu";
import { PlusOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { footerLinkGroups, routes } from "@config/routes";
import { useTranslations } from "@/localization/useTranslations";

export default function BottomMenu() {
  const navigationCopy = useTranslations("navigation");
  const footerCopy = navigationCopy.footerMenu;
  const items = useMemo(() => {
    const groupDictionary = footerCopy.groups as
      | Record<string, { title?: string; links?: Record<string, string> }>
      | undefined;
    return footerLinkGroups
      .map((group) => {
        const groupCopy = groupDictionary?.[group.key];
        const title = groupCopy?.title ?? group.key;
        const localizedLinks = groupCopy?.links as Record<string, string> | undefined;
        const childItems = group.links
          .map((link) => {
            const href = routes[link.route];
            if (!href) {
              return null;
            }

            const label = localizedLinks?.[link.key] ?? link.key;
            return createMenuOption(label, href);
          })
          .filter((link): link is MenuItem => Boolean(link));

        if (!childItems.length) {
          return null;
        }

        return createMenuTitle(title, group.key, childItems);
      })
      .filter((group): group is MenuItem => Boolean(group));
  }, [footerCopy]);

  return (
    <Row
      className="px-4 py-2"
      role="navigation"
      aria-label={footerCopy.ariaLabel ?? "Footer quick links"}
    >
      <Col span={24}>
        <Menu items={items} expandIcon={<PlusOutlined />} />
      </Col>
    </Row>
  );
}
