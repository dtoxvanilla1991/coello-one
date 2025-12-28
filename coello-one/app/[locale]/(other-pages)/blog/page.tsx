import { Card, Button } from "antd";
import Image from "next/image";
import { getRequestLocale } from "@/localization/getRequestLocale";
import { getNamespaceCopy } from "@/localization/dictionary";

const { Meta } = Card;

export default async function BlogPage() {
  const locale = await getRequestLocale();
  const copy = getNamespaceCopy(locale, "systemPages").blog;

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {copy.cards.map((blog) => (
        <Card
          key={blog.id}
          cover={<Image src={blog.cover} alt={blog.title} width={300} height={200} />}
          actions={[
            <Button key="view" type="default">
              {copy.actions.view}
            </Button>,
          ]}
        >
          <Meta title={blog.title} description={blog.description} />
        </Card>
      ))}
    </div>
  );
}
