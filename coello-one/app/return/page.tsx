import { Alert, Button, Card, Flex, Typography } from "antd";
import { getRequestLocale } from "@/localization/getRequestLocale";
import { getNamespaceCopy } from "@/localization/dictionary";
import { addLocaleToPathname } from "@config/i18n";
import { buildLocaleRoute } from "@config/routes";
import { getCheckoutOrderSnapshot } from "../api/stripe/webhook/persistStripeEvent";
import { ReturnOrderStatusClient } from "./ReturnOrderStatusClient";

const { Title, Text } = Typography;

type ReturnPageProps = {
  searchParams?: {
    session_id?: string;
  };
};

type StatusKey = "success" | "processing" | "open" | "error";

export default async function ReturnPage({ searchParams }: ReturnPageProps) {
  const locale = await getRequestLocale();
  const checkoutCopy = getNamespaceCopy(locale, "checkout");
  const { returnPage } = checkoutCopy;
  const sessionId = searchParams?.session_id;
  const bagHref = addLocaleToPathname(locale, buildLocaleRoute("bag"));
  const browseHref = addLocaleToPathname(locale, buildLocaleRoute("home"));

  const showMissingSession = !sessionId;
  const order = sessionId ? await getCheckoutOrderSnapshot(sessionId) : null;

  const initialStatusKey: StatusKey = (() => {
    if (!sessionId) return "error";
    if (!order) return "open";
    if (order.status === "complete") {
      return order.paymentStatus === "paid" ? "success" : "processing";
    }
    if (order.status === "open") return "open";
    return "error";
  })();

  const amountDisplay = formatAmount(locale, order?.currency, order?.amountTotal);

  return (
    <Flex vertical justify="center" align="center" className="min-h-screen bg-white px-4 py-16">
      <Card className="w-full max-w-2xl rounded-2xl! border border-gray-200! shadow-sm">
        <Flex vertical gap={16}>
          <Title level={2} className="m-0!">
            {returnPage.title}
          </Title>

          {showMissingSession || !sessionId ? (
            <Text className="text-base text-gray-600">{returnPage.missingSession}</Text>
          ) : (
            <ReturnOrderStatusClient
              sessionId={sessionId}
              returnCopy={returnPage}
              initialStatusKey={initialStatusKey}
            />
          )}
          {amountDisplay ? (
            <Alert
              type="success"
              showIcon
              title={`${returnPage.amountLabel}: ${amountDisplay}`}
              className="rounded-xl! border border-emerald-200!"
            />
          ) : null}
          {order?.customerEmail ? (
            <Alert
              type="info"
              showIcon
              title={`${returnPage.customerLabel}: ${order.customerEmail}`}
              className="rounded-xl! border border-blue-200!"
            />
          ) : null}
          <Flex gap={12} wrap>
            <Button type="primary" size="large" href={bagHref} className="rounded-full! px-8">
              {returnPage.ctaPrimary}
            </Button>
            <Button size="large" href={browseHref} className="rounded-full! px-8">
              {returnPage.ctaSecondary}
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}

function formatAmount(locale: string, currency?: string | null, amount?: number | null) {
  if (amount == null || currency == null) {
    return null;
  }

  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency.toUpperCase(),
  });

  return formatter.format(amount / 100);
}
