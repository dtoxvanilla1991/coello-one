import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const AccessibilityStatement: React.FC = () => {
  return (
    <div className="text-center p-4">
      <Title level={2} className="uppercase">
        Coello One's Commitment to accessibility
      </Title>
      <Paragraph>
        We are committed to ensuring that our website is accessible to everyone.
        If you have any questions or suggestions regarding the accessibility of
        this site, please contact us.
      </Paragraph>
    </div>
  );
};

export default AccessibilityStatement;
