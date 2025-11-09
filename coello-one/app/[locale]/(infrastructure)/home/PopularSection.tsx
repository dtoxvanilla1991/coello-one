"use client";

import { useCallback } from "react";
import type { FC } from "react";
import Image from "next/image";
import { Card, Button, Typography, Flex, Space } from "antd";
import { trackEvent } from "@/utils/trackEvent";

const { Title } = Typography;

const data = [
  { title: "Lifting" },
  { title: "Cardio" },
  { title: "Yoga" },
  // ...existing or additional items...
];

const PopularSection: FC = () => {
  const handleFilterClick = useCallback((filter: string) => {
    trackEvent("popular_filter_click", { filter });
  }, []);

  const handleBrowseClick = useCallback((category: string) => {
    trackEvent("popular_browse_click", { category });
  }, []);

  return (
    <Flex
      className="bg-black !p-4 !pr-0 !pb-8"
      vertical
      gap={16}
      role="region"
      aria-labelledby="popular-section-title"
    >
      <Title level={3} className="!mb-0 !text-white uppercase" id="popular-section-title">
        Popular right now
      </Title>
      <Space size={16}>
        <Button
          className="!bg-transparent !px-5 !text-white uppercase hover:!bg-white/10 hover:!text-white"
          size="large"
          data-analytics-id="popular-filter-women"
          onClick={() => handleFilterClick("Women")}
          aria-label="Show popular women's items"
        >
          Women
        </Button>
        <Button
          className="!bg-transparent !px-8 !text-white uppercase hover:!bg-white/10 hover:!text-white"
          size="large"
          data-analytics-id="popular-filter-men"
          onClick={() => handleFilterClick("Men")}
          aria-label="Show popular men's items"
        >
          Men
        </Button>
      </Space>
      <Flex
        gap={16}
        role="list"
        aria-label="Popular products"
        className="hide-scrollbar snap-x snap-mandatory overflow-x-auto scroll-smooth"
      >
        {data.map((item, index) => (
          <Card
            key={index}
            className="min-w-72 snap-start"
            variant="borderless"
            cover={
              <Flex className="relative h-[400px]">
                <Image
                  alt={item.title}
                  src={`/athletes/vertical/main-secondary-${index + 6}.jpg`}
                  sizes="(max-width: 640px) 100vw, 640px"
                  fill
                  className="object-cover object-top"
                />
              </Flex>
            }
            hoverable
            actions={[
              <Button
                key={`${item.title}-cta`}
                className="uppercase"
                data-analytics-id={`popular-browse-${item.title.toLowerCase()}`}
                onClick={() => handleBrowseClick(item.title)}
              >
                Browse options
              </Button>,
            ]}
          >
            <Card.Meta title={item.title} />
          </Card>
        ))}
      </Flex>
    </Flex>
  );
};

export default PopularSection;
