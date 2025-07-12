import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import enGB from "antd/locale/en_GB";
import esES from "antd/locale/es_ES";
// Removed withTheme wrapper as html/body should be defined only in root layout
import { notFound } from "next/navigation";

type LocaleParams = {
  locale: "en-GB" | "es-ES";
};

type Props = {
  children: React.ReactNode;
  params: LocaleParams;
};

/**
 * Generate metadata for locale-specific pages, including html lang and hreflang alternates
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const languages: Record<string, string> = {
    [locale]: `/${locale}`,
    ...(locale === "en-GB" ? { "es-ES": "/es-ES" } : { "en-GB": "/en-GB" }),
  };
  return {
    alternates: {
      languages,
    },
  };
}

export default function LocaleLayout({ children, params }: Props) {
  const { locale } = params;
  if (!["en-GB", "es-ES"].includes(locale)) {
    notFound();
  }

  const antdLocale = locale === "es-ES" ? esES : enGB;

  // Only wrap children with design and theme providers; html/body tags handled by root layout
  return (
    <ConfigProvider
      locale={antdLocale}
      theme={{ token: { colorPrimary: "#52c41a" } }}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#000000",
            borderRadius: 2,
            controlItemBgActive: "#f5f5f5",
            colorBgBase: "#ffffff",
            colorBgContainer: "#ffffff",
            colorBgLayout: "#ffffff",
          },
        }}>
        <AntdRegistry>{children}</AntdRegistry>
      </ConfigProvider>
    </ConfigProvider>
  );
}
