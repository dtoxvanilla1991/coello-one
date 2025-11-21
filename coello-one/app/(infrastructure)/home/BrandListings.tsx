"use client";

import { useCallback } from "react";
import { Space, List, Typography } from "antd";
import Link from "next/link";
import { useLocalePath } from "@/hooks/useLocalePath";
import { DEFAULT_SIZE, PRODUCT_NAME_SLUG } from "../(products)/one-sleeve-classic/constants";
import type { Gender } from "../(products)/one-sleeve-classic/types";
import { trackEvent } from "@/utils/trackEvent";

const { Title } = Typography;

const COLOR_MILD_RED = "Mild Red" as const;
const COLOR_SEA_BLUE = "Sea Blue" as const;
const COLOR_STONE_GRAY = "Stone Gray" as const;

type ProductLinkOption = {
  text: string;
  gender: Gender;
  color: string;
  analyticsId: string;
};

type BrandLine = ProductLinkOption[];

const createOption = (
  text: string,
  gender: Gender,
  color: string,
  analyticsId: string,
): ProductLinkOption => ({
  text,
  gender,
  color,
  analyticsId,
});

const womensLine: BrandLine = [
  createOption("Women's Passion", "female", COLOR_MILD_RED, "brand-link-womens-passion"),
  createOption("Women's Poise", "female", COLOR_SEA_BLUE, "brand-link-womens-poise"),
  createOption("Women's Power", "female", COLOR_STONE_GRAY, "brand-link-womens-power"),
];

const mensLine: BrandLine = [
  createOption("Men's Passion", "male", COLOR_MILD_RED, "brand-link-mens-passion"),
  createOption("Men's Poise", "male", COLOR_SEA_BLUE, "brand-link-mens-poise"),
  createOption("Men's Power", "male", COLOR_STONE_GRAY, "brand-link-mens-power"),
];

const BrandListings: React.FC = () => {
  const withLocalePath = useLocalePath();
  const productBasePath = withLocalePath(PRODUCT_NAME_SLUG);

  const resolveHref = useCallback(
    (option: ProductLinkOption) => {
      const params = new URLSearchParams({
        gender: option.gender,
        color: option.color,
        size: DEFAULT_SIZE,
      });

      return `${productBasePath}?${params.toString()}`;
    },
    [productBasePath],
  );

  return (
    <Space direction="vertical" size="small" className="flex w-full p-4">
      <BrandListing data={womensLine} title="Women's line" resolveHref={resolveHref} />
      <BrandListing data={mensLine} title="Men's line" resolveHref={resolveHref} />
    </Space>
  );
};

export default BrandListings;

type BrandListingProps = {
  data: BrandLine;
  title: string;
  resolveHref: (option: ProductLinkOption) => string;
};

const BrandListing: React.FC<BrandListingProps> = ({ data, title, resolveHref }) => {
  return (
    <Space.Compact direction="vertical" className="w-full" role="group">
      <Title level={5} className="uppercase">
        {title}
      </Title>
      <List
        aria-label={`${title} links`}
        dataSource={data}
        split={false}
        className="text-xs!"
        renderItem={(item) => (
          <List.Item className="py-1.5!">
            <Link
              href={resolveHref(item)}
              className="hover:underline"
              data-analytics-id={item.analyticsId}
              onClick={() =>
                trackEvent("brand_listing_click", {
                  analyticsId: item.analyticsId,
                  variantLabel: item.text,
                  gender: item.gender,
                  color: item.color,
                  size: DEFAULT_SIZE,
                  section: title,
                })
              }
            >
              {item.text}
            </Link>
          </List.Item>
        )}
      />
    </Space.Compact>
  );
};
