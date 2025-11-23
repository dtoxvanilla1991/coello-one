"use client";

import { Breadcrumb, Flex, Typography } from "antd";
import type { ReactNode } from "react";

const { Title, Paragraph } = Typography;

type BreadcrumbItem = {
  title: string;
  href?: string;
};

type HelpPageShellProps = {
  title: string;
  description?: string;
  breadcrumb?: BreadcrumbItem[];
  actions?: ReactNode;
  children: ReactNode;
};

export default function HelpPageShell({
  title,
  description,
  breadcrumb,
  actions,
  children,
}: HelpPageShellProps) {
  return (
    <Flex vertical gap={24} className="mx-auto w-full max-w-5xl px-4 py-12 md:px-6 lg:px-0">
      <Flex vertical gap={12}>
        {breadcrumb && breadcrumb.length > 0 ? (
          <Breadcrumb
            className="text-xs tracking-[0.2em] text-gray-500 uppercase"
            items={breadcrumb.map((crumb) => ({
              title: crumb.href ? (
                <Typography.Link href={crumb.href}>{crumb.title}</Typography.Link>
              ) : (
                crumb.title
              ),
            }))}
          />
        ) : null}
        <Flex align="center" justify="space-between" wrap>
          <Flex vertical gap={4} className="max-w-3xl">
            <Title level={1} className="mb-0! text-3xl font-semibold md:text-4xl!">
              {title}
            </Title>
            {description ? (
              <Paragraph className="mb-0! text-base text-gray-600 md:text-lg">
                {description}
              </Paragraph>
            ) : null}
          </Flex>
          {actions}
        </Flex>
      </Flex>
      <Flex vertical gap={24}>
        {children}
      </Flex>
    </Flex>
  );
}
