"use client";

import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const AccessibilityStatement: React.FC = () => {
  return (
    <div className="p-4 text-center">
      <Title level={4} className="font-bold! uppercase">
        Coello One&apos;s Commitment to accessibility
      </Title>
      <Paragraph>
        Coello One is committed to making this website accessible to the widest possible audience.
        We regularly test and update the site and aim to conform to WCAG 2.1 Level AA where
        feasible.
      </Paragraph>
      <Paragraph>
        If you encounter an accessibility barrier, please contact us at coello.one@gmail.com with
        the page URL and a brief description of the issue. We will respond and provide information
        or an alternative means of access as soon as possible. Highly likely if possible, we will
        implement the fix to our website to enable even better experience for all users.
      </Paragraph>
      <Paragraph>
        This statement describes our accessibility efforts and is for informational purposes only;
        it does not create legal rights or obligations.
      </Paragraph>
    </div>
  );
};

export default AccessibilityStatement;
