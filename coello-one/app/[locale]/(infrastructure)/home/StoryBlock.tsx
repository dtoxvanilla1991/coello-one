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
      className="flex bg-gray-200 w-full p-4"
      data-testid="story-block">
      <BrandListing
        paragraph={brandIdea}
        title="Bold design with active performance"
        data-testid="story-block-listing-0"
      />
      <BrandListing
        paragraph={activewearAndLifestyle}
        title="Healthier Lifestyle"
        data-testid="story-block-listing-1"
      />
      <BrandListing
        paragraph={confidenceHub}
        title="Confidence to stand out hub"
        data-testid="story-block-listing-2"
      />
    </Space>
  );
};

export default StoryBlock;

interface BrandListingProps {
  paragraph: string;
  title: string;
  "data-testid"?: string;
}

const BrandListing: React.FC<BrandListingProps> = ({
  paragraph,
  title,
  "data-testid": dataTestId,
}) => {
  return (
    <Space.Compact
      direction="vertical"
      className="w-full"
      data-testid={dataTestId}>
      <Title level={5} className="uppercase">
        {title}
      </Title>
      <Paragraph>{paragraph}</Paragraph>
    </Space.Compact>
  );
};
