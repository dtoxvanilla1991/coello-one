import React from "react";
import { List, Space, Typography } from "antd";
import Link from "next/link";

const { Text } = Typography;

const data: {
  text: string;
  href: string;
}[] = [
  {
    text: "Accessibility Statement",
    href: "/en-GB/accessibility",
  },
  { text: "Help", href: "#" },
  { text: "Blog", href: "#" },
];

const SiderFooter: React.FC = () => {
  return (
    <Space
      direction="vertical"
      size="small"
      className="flex bg-gray-200 w-full p-4">
      <Text strong className="uppercase">
        More
      </Text>
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item className="py-1.5!">
            <Link href={item.href} className="text-gray-600 hover:underline">
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
