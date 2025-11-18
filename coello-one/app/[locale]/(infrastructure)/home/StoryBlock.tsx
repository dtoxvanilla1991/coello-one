"use client";

import { Space, Typography } from "antd";

const { Title, Paragraph } = Typography;

const brandIdea =
  "Your story is the blueprint. Your commitment is the inspiration. You're the reason they'll start their journey tomorrow.";

const brandSpirit =
  "You earned this. That pain was real. It will forever be a part of you. It is an extension of you; it was forged in persistence, patience, and sweat.";

const brandFocus =
  "You know the wall, and you know how to break it. This is for the warrior who never quits—on the pavement, at the gym, or in the chair.";

const StoryBlock: React.FC = () => {
  return (
    <Space
      direction="vertical"
      size="small"
      className="flex w-full bg-gray-200 p-4"
      role="list"
      aria-label="Coello story highlights"
    >
      <BrandListing paragraph={brandIdea} title="For those who come after" />
      <BrandListing paragraph={brandSpirit} title="For those who felt the pain" />
      <BrandListing paragraph={brandFocus} title="For those who kept going" />
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
    <Space.Compact direction="vertical" className="w-full" role="listitem">
      <Title level={5} className="uppercase">
        {title}
      </Title>
      <Paragraph>{paragraph}</Paragraph>
    </Space.Compact>
  );
};
