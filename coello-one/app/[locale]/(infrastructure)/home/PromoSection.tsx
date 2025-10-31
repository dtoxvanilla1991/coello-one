import { Typography, Button, Flex } from "antd";
import { trackEvent } from "@/utils/trackEvent";

const { Title, Text } = Typography;

export function PromoSection() {
  return (
    <Flex
      className="!mt-4 text-center"
      justify="center"
      align="center"
      vertical
      role="region"
      aria-labelledby="promo-section-title">
      <Title id="promo-section-title" level={5}>
        Limited Time Offer
      </Title>
      <Text>Up to 20% off select items</Text>
      <Button
        className="mt-4 !px-10 uppercase !font-semibold hover:!bg-black hover:!text-white"
        type="primary"
        size="large"
        data-analytics-id="promo-section-shop-now"
        onClick={() => trackEvent("promo_shop_now_click")}>
        Shop Now
      </Button>
    </Flex>
  );
}
