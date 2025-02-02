"use client";

import React from "react";
import Image from "next/image";
import { Card, Button, Typography, Divider } from "antd";

const { Title } = Typography;

const data = [
  { title: "Lifting" },
  { title: "Cardio" },
  { title: "Yoga" },
  // ...existing or additional items...
];

const Training: React.FC = () => {
  return (
    <div className="flex flex-col p-4 pr-0 pb-8 bg-white">
      <Title level={4} className="uppercase mb-4">
        Our athletes workouts
      </Title>
      <div className="relative">
        {/* Fade/Gradient on the right side if desired */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar">
          {data.map((item, index) => (
            <Card
              key={index}
              className="min-w-[200px] snap-start"
              cover={
                <div className="relative h-72">
                  <Image
                    alt={item.title}
                    src={`/athletes/main-secondary-${index + 1}.jpg`}
                    sizes="(max-width: 640px) 100vw, 640px"
                    fill
                    className="object-cover object-top"
                  />
                </div>
              }
              hoverable
              actions={[
                <Button key={index} className="uppercase">
                  Shop Now
                </Button>,
              ]}>
              <Card.Meta title={item.title} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Training;
