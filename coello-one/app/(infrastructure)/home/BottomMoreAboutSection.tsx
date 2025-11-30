"use client";

import { FC, useCallback, useState, type KeyboardEvent, type ReactNode } from "react";
import { Card, Typography, Flex } from "antd";
import { MailOutlined } from "@ant-design/icons";
import Image from "next/image";
import PromoSignupModal from "@/components/common/PromoSignupModal";

const { Title, Text } = Typography;

type CardAction = "email-signup";

type DataType = {
  description: string;
  title?: string;
  text?: string;
  icon?: ReactNode;
  image?: string;
  action?: CardAction;
};

const data: DataType[] = [
  { description: "Discord", title: "Coello One", text: "Hub" },
  {
    description: "Email sign up",
    icon: <MailOutlined className="text-3xl" />,
    action: "email-signup",
  },
  { description: "Coello Cut Training", image: "/coelloOneWhite.svg" },
];

const BottomMoreAboutSection: React.FC = () => {
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);

  const handleOpenSignup = useCallback(() => {
    setIsPromoModalOpen(true);
  }, []);

  const handleCloseSignup = useCallback(() => {
    setIsPromoModalOpen(false);
  }, []);

  const handleCardKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>, action?: CardAction) => {
      if (!action) {
        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (action === "email-signup") {
          handleOpenSignup();
        }
      }
    },
    [handleOpenSignup],
  );

  return (
    <section aria-labelledby="bottom-more-about-title" className="flex flex-col p-4 pr-0 pb-6">
      <Title id="bottom-more-about-title" level={5} className="mb-4 uppercase">
        More about Coello One
      </Title>
      <Flex
        gap={16}
        role="list"
        aria-label="Coello One highlights"
        className="hide-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
      >
        {data.map((item, index) => (
          <Card
            key={index}
            role="listitem"
            className={`min-w-44 snap-start bg-gray-200! ${item.action ? "cursor-pointer" : ""}`}
            classNames={{ body: "p-2!" }}
            cover={
              <Flex
                className="relative flex! h-28 bg-black text-white! uppercase"
                justify="center"
                align="center"
                vertical
              >
                <CardContent {...item} />
              </Flex>
            }
            hoverable
            onClick={item.action === "email-signup" ? handleOpenSignup : undefined}
            onKeyDown={(event) => handleCardKeyDown(event, item.action)}
            tabIndex={item.action ? 0 : undefined}
          >
            <Card.Meta className="bg-gray-200 text-sm uppercase" description={item.description} />
          </Card>
        ))}
      </Flex>
      <PromoSignupModal
        open={isPromoModalOpen}
        onClose={handleCloseSignup}
        source="home-bottom-more-about"
      />
    </section>
  );
};

const CardContent: FC<DataType> = ({ title, text, icon, image }) => {
  if (image) {
    return <Image src={image} alt="Coello One" fill className="object-contain" />;
  } else if (icon) {
    return icon;
  }
  return (
    <>
      <Title level={4} className="m-0! font-bold text-white!">
        {title}
      </Title>
      <Text className="font-semibold text-white!">{text}</Text>
    </>
  );
};

export default BottomMoreAboutSection;
