import React from "react";
import { Space, Typography } from "antd";

const { Text } = Typography;

const SiderFooter: React.FC = () => {
  return (
    <Space
      direction="vertical"
      size="small"
      className="flex bg-gray-200 w-full p-4">
      <Text strong className="uppercase">
        More
      </Text>
      <ul className="list-none p-0 text-xs">
        <li className="py-1">
          <a href="#" className="text-gray-600 hover:underline">
            Accessibility Statement
          </a>
        </li>
        <li className="py-1">
          <a href="#" className="text-gray-600 hover:underline">
            Help
          </a>
        </li>
        <li className="py-1">
          <a href="#" className="text-gray-600 hover:underline">
            Blog
          </a>
        </li>
      </ul>
    </Space>
  );
};

export default SiderFooter;
