"use client";

import { Space, Typography } from "antd";

const { Title, Paragraph } = Typography;

const brandIdea =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non itaque odit vero voluptates, autem eligendi. Amet culpa quod nobis ipsam!";

const activewearAndLifestyle =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non itaque odit vero voluptates, autem eligendi. Amet culpa quod nobis ipsam!";

const confidenceHub =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non itaque odit vero voluptates, autem eligendi. Amet culpa quod nobis ipsam!";

const StoryBlock: React.FC = () => {
  return (
    <Space
      direction="vertical"
      size="small"
      className="flex bg-gray-200 w-full p-4">
      <BrandListing
        paragraph={brandIdea}
        title="Bold design with active performance"
      />
      <BrandListing
        paragraph={activewearAndLifestyle}
        title="Healthier Lifestyle"
      />
      <BrandListing
        paragraph={confidenceHub}
        title="Confidence to stand out hub"
      />
    </Space>
  );
};

export default StoryBlock;

interface BrandListingProps {
  paragraph: string;
  title: string;
}

const BrandListing: React.FC<BrandListingProps> = ({ paragraph, title }) => {
  return (
    <Space.Compact direction="vertical" className="w-full">
      <Title level={5} className="uppercase">
        {title}
      </Title>
      <Paragraph>{paragraph}</Paragraph>
    </Space.Compact>
  );
};
