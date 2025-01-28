import { Typography, Button } from "antd";

const { Title, Text } = Typography;

export function PromoSection() {
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded text-center">
      <Title level={5} className="mb-1">
        Limited Time Offer
      </Title>
      <Text>Up to 50% off select items</Text>
      <div className="mt-2">
        <Button type="primary" size="large">
          Shop Now
        </Button>
      </div>
    </div>
  );
}
