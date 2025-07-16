import { Typography, Button, Flex } from "antd";

const { Title, Text } = Typography;

export function PromoSection() {
  return (
    <Flex
      className="!mt-4 text-center"
      justify="center"
      align="center"
      vertical
      data-testid="promo-section">
      <Title level={5} data-testid="promo-section-title">
        Limited Time Offer
      </Title>
      <Text data-testid="promo-section-text">Up to 20% off select items</Text>
      <Button
        className="mt-4 !px-10 uppercase !font-semibold"
        type="primary"
        size="large"
        data-testid="promo-section-button">
        Shop Now
      </Button>
    </Flex>
  );
}
