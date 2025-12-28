"use client";

import { useMemo } from "react";
import { Space, Typography } from "antd";
import { useTranslations } from "@/localization/useTranslations";

const { Title, Paragraph } = Typography;

const StoryBlock: React.FC = () => {
  const copy = useTranslations("home").storyBlock;
  const listings = useMemo(
    () => [
      { title: copy.ideaTitle, paragraph: copy.ideaBody },
      { title: copy.spiritTitle, paragraph: copy.spiritBody },
      { title: copy.focusTitle, paragraph: copy.focusBody },
    ],
    [copy],
  );
  return (
    <Space
      orientation="vertical"
      size="small"
      className="flex w-full bg-gray-200 p-4"
      role="list"
      aria-label={copy.ariaLabel}
    >
      {listings.map((listing) => (
        <BrandListing key={listing.title} paragraph={listing.paragraph} title={listing.title} />
      ))}
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
    <Space.Compact orientation="vertical" className="w-full" role="listitem">
      <Title level={5} className="uppercase">
        {title}
      </Title>
      <Paragraph>{paragraph}</Paragraph>
    </Space.Compact>
  );
};
