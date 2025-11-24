import { Typography } from "antd";
import { getRequestLocale } from "@/localization/getRequestLocale";
import { getNamespaceCopy } from "@/localization/dictionary";

const { Title, Paragraph } = Typography;

export default async function AccessibilityStatement() {
  const locale = await getRequestLocale();
  const copy = getNamespaceCopy(locale, "systemPages").accessibility;

  return (
    <div className="p-4 text-center">
      <Title level={4} className="font-bold! uppercase">
        {copy.title}
      </Title>
      {copy.paragraphs.map((content, index) => (
        <Paragraph key={index}>{content}</Paragraph>
      ))}
    </div>
  );
}
