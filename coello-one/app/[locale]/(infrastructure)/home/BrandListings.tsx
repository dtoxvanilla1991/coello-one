"use client";

import { Space, List, Typography } from "antd";
import type { ListProps } from "antd";
import Link from "next/link";

const { Title } = Typography;

type BrandLine = {
  text: string;
  href: string;
}[];

const womensLine: BrandLine = [
  { text: "Women's Passion", href: "#" },
  { text: "Women's Power", href: "#" },
  { text: "Women's Pride", href: "#" },
];
const mensLine: BrandLine = [
  { text: "Mens's Passion", href: "#" },
  { text: "Mens's Power", href: "#" },
  { text: "Mens's Pride", href: "#" },
];

const BrandListings: React.FC = () => {
  return (
    <Space direction="vertical" size="small" className="flex w-full p-4">
      <BrandListing data={womensLine} title="Women's line" />
      <BrandListing data={mensLine} title="Men's line" />
    </Space>
  );
};

export default BrandListings;

type BrandListingProps = {
  data: BrandLine;
  title: string;
};

const listProps: Pick<
  ListProps<BrandLine[number]>,
  "renderItem" | "split" | "className"
> = {
  renderItem: (item) => (
    <List.Item className="!py-1.5">
      <Link href={item.href} className="hover:underline">
        {item.text}
      </Link>
    </List.Item>
  ),
  split: false,
  className: "!text-xs",
};

const BrandListing: React.FC<BrandListingProps> = ({ data, title }) => {
  return (
    <Space.Compact direction="vertical" className="w-full" role="group">
      <Title level={5} className="uppercase">
        {title}
      </Title>
      <List
        aria-label={`${title} links`}
        dataSource={data}
        {...listProps}
      />
    </Space.Compact>
  );
};
