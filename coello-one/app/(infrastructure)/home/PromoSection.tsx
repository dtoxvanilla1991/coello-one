import { Typography, Button, Flex } from "antd";

const { Title, Text } = Typography;

export function PromoSection() {
  return (
    <Flex
      className="!my-4 text-center"
      justify="center"
      align="center"
      vertical>
      <Title level={5}>Limited Time Offer</Title>
      <Text>Up to 50% off select items</Text>
      <Button className="mt-4 !px-10 uppercase" type="primary" size="large">
        Shop Now
      </Button>
    </Flex>
  );
}
