"use client";

import { FC } from "react";
import { Card, Typography, Flex } from "antd";
import { MailOutlined } from "@ant-design/icons";
import Image from "next/image";

const { Title, Text } = Typography;

type DataType = {
  description: string;
  title?: string;
  text?: string;
  icon?: React.ReactNode;
  image?: string;
};

const data: DataType[] = [
  { description: "Discord", title: "Coello One", text: "Hub" },
  { description: "Email sign up", icon: <MailOutlined className="text-3xl" /> },
  { description: "Coello Cut Training", image: "/coelloOneWhite.svg" },
];

const BottomMoreAboutSection: React.FC = () => {
  return (
    <Flex className="!p-4 !pr-0 !pb-6" vertical>
      <Title level={5} className="uppercase !mb-4">
        More about Coello One
      </Title>
      <Flex
        gap={16}
        className="overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar">
        {data.map((item, index) => (
          <Card
            key={index}
            className="min-w-44 snap-start !bg-gray-200"
            classNames={{ body: "!p-2" }}
            cover={
              <Flex
                className="!flex relative h-28 bg-black !text-white uppercase"
                justify="center"
                align="center"
                vertical>
                <CardContent {...item} />
              </Flex>
            }
            hoverable>
            <Card.Meta
              className="uppercase bg-gray-200 text-sm"
              description={item.description}
            />
          </Card>
        ))}
      </Flex>
    </Flex>
  );
};

const CardContent: FC<DataType> = ({ title, text, icon, image }) => {
  if (image) {
    return <Image src={image} alt="Coello One" width={150} height={100} />;
  } else if (icon) {
    return icon;
  }
  return (
    <>
      <Title level={4} className="!text-white !m-0 font-bold">
        {title}
      </Title>
      <Text className="!text-white font-semibold">{text}</Text>
    </>
  );
};

export default BottomMoreAboutSection;
