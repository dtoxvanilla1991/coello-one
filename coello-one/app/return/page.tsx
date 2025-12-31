import { Alert, Button, Card, Flex, Tag, Typography } from "antd";
import type Stripe from "stripe";
import { getCheckoutReturnState } from "./getCheckoutReturnState";
import { getStripeClient } from "@utils/stripe";
import { getRequestLocale } from "@/localization/getRequestLocale";
import { getNamespaceCopy } from "@/localization/dictionary";
import { addLocaleToPathname } from "@config/i18n";
import { buildLocaleRoute } from "@config/routes";

const { Title, Text } = Typography;

type ReturnPageProps = {
  searchParams?: {
    session_id?: string;
  };
};

type StatusKey = "success" | "processing" | "open" | "error";

const STATUS_BADGE_COLOR: Record<StatusKey, string> = {
  success: "green",
  processing: "gold",
  open: "blue",
  error: "red",
};

export default async function ReturnPage({ searchParams }: ReturnPageProps) {
  const locale = await getRequestLocale();
  const checkoutCopy = getNamespaceCopy(locale, "checkout");
  const { returnPage } = checkoutCopy;
  const sessionId = searchParams?.session_id;
  const bagHref = addLocaleToPathname(locale, buildLocaleRoute("bag"));
  const browseHref = addLocaleToPathname(locale, buildLocaleRoute("home"));

  let session: Stripe.Checkout.Session | null = null;

  if (sessionId) {
    try {
      const stripe = getStripeClient();
      session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["customer_details"],
      });
    } catch (error) {
      if (process.env.NODE_ENV !== "test") {
        console.error("Unable to load checkout session", error);
      }
    }
  }

  const statusKey: StatusKey = sessionId ? getCheckoutReturnState(session) : "error";
  const statusCopy = returnPage[statusKey];
  const showMissingSession = !sessionId;
  const amountDisplay = formatAmount(locale, session?.currency, session?.amount_total);

  return (
    <Flex vertical justify="center" align="center" className="min-h-screen bg-white px-4 py-16">
      <Card className="w-full max-w-2xl rounded-2xl! border border-gray-200! shadow-sm">
        <Flex vertical gap={16}>
          <Title level={2} className="m-0!">
            {returnPage.title}
          </Title>
          <Flex gap={12} align="center">
            <Tag color={STATUS_BADGE_COLOR[statusKey]}>{statusCopy.badge}</Tag>
            {sessionId ? (
              <Text className="text-xs text-gray-500">
                {returnPage.orderLabel}: <strong>{sessionId}</strong>
              </Text>
            ) : null}
          </Flex>
          <Text className="text-base text-gray-600">
            {showMissingSession ? returnPage.missingSession : statusCopy.body}
          </Text>
          {amountDisplay ? (
            <Alert
              type="success"
              showIcon
              title={`${returnPage.amountLabel}: ${amountDisplay}`}
              className="rounded-xl! border border-emerald-200!"
            />
          ) : null}
          {session?.customer_details?.email ? (
            <Alert
              type="info"
              showIcon
              title={`${returnPage.customerLabel}: ${session.customer_details.email}`}
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
