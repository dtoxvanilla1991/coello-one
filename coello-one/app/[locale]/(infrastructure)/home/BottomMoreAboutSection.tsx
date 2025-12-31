"use client";

import {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { Card, Typography, Flex } from "antd";
import { MailOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { routes, type RouteKey } from "@config/routes";
import PromoSignupModal from "@/components/common/PromoSignupModal";
import { useLocalePath } from "@/hooks/useLocalePath";
import { useTranslations } from "@/localization/useTranslations";

const { Title, Text } = Typography;

type CardAction = "email-signup";

type CardCopy = {
  id: string;
  description: string;
  title?: string;
  text?: string;
  action?: CardAction;
  routeKey?: RouteKey;
  imageAlt?: string;
};

type CardData = CardCopy & {
  icon?: ReactNode;
  image?: string;
};

const CARD_VISUALS: Record<string, Pick<CardData, "icon" | "image">> = {
  email: { icon: <MailOutlined className="text-3xl" /> },
  training: { image: "/coelloOneWhite.svg" },
};

const isRouteKey = (value: string): value is RouteKey =>
  Object.prototype.hasOwnProperty.call(routes, value);

const isCardAction = (value: string): value is CardAction => value === "email-signup";

const BottomMoreAboutSection: React.FC = () => {
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const copy = useTranslations("home").bottomMoreAbout;
  const localePath = useLocalePath();
  const router = useRouter();
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const cards = useMemo<CardData[]>(() => {
    return copy.cards.map((card) => ({
      ...card,
      action: card.action && isCardAction(card.action) ? card.action : undefined,
      routeKey: card.routeKey && isRouteKey(card.routeKey) ? card.routeKey : undefined,
      ...(CARD_VISUALS[card.id] ?? {}),
    }));
  }, [copy.cards]);
  const interactiveRouteKeys = useMemo(
    () =>
      cards
        .filter((item): item is CardData & { routeKey: RouteKey } => Boolean(item.routeKey))
        .map((item) => item.routeKey),
    [cards],
  );

  const handleCloseSignup = useCallback(() => {
    setIsPromoModalOpen(false);
  }, []);

  const handleCardAction = useCallback(
    (item: CardData) => {
      if (item.action === "email-signup") {
        setIsPromoModalOpen(true);
        return;
      }

      if (item.routeKey) {
        const targetRoute = localePath(routes[item.routeKey]);
        router.push(targetRoute);
      }
    },
    [localePath, router],
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    interactiveRouteKeys.forEach((routeKey) => {
      const node = cardRefs.current[routeKey];
      if (!node) {
        return;
      }

      const targetRoute = localePath(routes[routeKey]);
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              void router.prefetch(targetRoute);
              obs.disconnect();
            }
          });
        },
        { rootMargin: "200px 0px" },
      );

      observer.observe(node);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [interactiveRouteKeys, localePath, router]);

  const handleCardKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>, item: CardData) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      event.preventDefault();
      handleCardAction(item);
    },
    [handleCardAction],
  );

  return (
    <section aria-labelledby="bottom-more-about-title" className="flex flex-col p-4 pr-0 pb-6">
      <Title id="bottom-more-about-title" level={5} className="mb-4 uppercase">
        {copy.title}
      </Title>
      <Flex
        gap={16}
        role="list"
        aria-label={copy.ariaLabel}
        className="hide-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
      >
        {cards.map((item, index) => {
          const isInteractive = Boolean(item.action || item.routeKey);
          const routeKey = item.routeKey;
          return (
            <Card
              key={index}
              ref={
                isInteractive && routeKey
                  ? (node) => {
                      cardRefs.current[routeKey] = node;
                    }
                  : undefined
              }
              role="listitem"
              className={`min-w-44 snap-start bg-gray-200! ${isInteractive ? "cursor-pointer" : ""}`}
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
              hoverable={isInteractive}
              onClick={isInteractive ? () => handleCardAction(item) : undefined}
              onKeyDown={isInteractive ? (event) => handleCardKeyDown(event, item) : undefined}
              tabIndex={isInteractive ? 0 : undefined}
            >
              <Card.Meta className="bg-gray-200 text-sm uppercase" description={item.description} />
            </Card>
          );
        })}
      </Flex>
      <PromoSignupModal
        open={isPromoModalOpen}
        onClose={handleCloseSignup}
        source="home-bottom-more-about"
      />
    </section>
  );
};

const CardContent: FC<CardData> = ({ title, text, icon, image, imageAlt }) => {
  if (image) {
    return <Image src={image} alt={imageAlt ?? title ?? ""} fill className="object-contain" />;
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
