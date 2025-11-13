"use client";

import type { FC } from "react";
import Image from "next/image";
import { Card, Button, Typography, Flex } from "antd";
import { trackEvent } from "@/utils/trackEvent";

const { Title } = Typography;

const data = [{ title: "Lifting" }, { title: "Cardio" }, { title: "Yoga" }];

const Training: FC = () => {
  return (
    <Flex
      className="p-4! pr-0! pb-8!"
      vertical
      role="region"
      aria-labelledby="training-section-title"
    >
  <Title level={4} className="mb-4! uppercase" id="training-section-title">
        Our athletes workouts
      </Title>
      <Flex
        gap={16}
        role="list"
        aria-label="Training plans"
        className="hide-scrollbar snap-x snap-mandatory overflow-x-auto scroll-smooth"
      >
        {data.map((item, index) => (
          <Card
            key={index}
            className="min-w-72 snap-start"
            role="listitem"
            cover={
              <Flex className="relative h-[400px]">
                <Image
                  alt={item.title}
                  src={`/athletes/vertical/main-secondary-${index + 9}.jpg`}
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
                className="uppercase hover:bg-black! hover:text-white!"
                data-analytics-id={`training-plan-${item.title.toLowerCase()}`}
                onClick={() => trackEvent("training_plan_click", { plan: item.title })}
              >
                View weekly plan
              </Button>,
            ]}
          >
            <Card.Meta title={item.title} className="uppercase" />
          </Card>
        ))}
      </Flex>
    </Flex>
  );
};

export default Training;
