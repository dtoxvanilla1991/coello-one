import "./globals.css";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ConfigProvider } from "antd";
import enGB from "antd/locale/en_GB";
import esES from "antd/locale/es_ES";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Geist, Geist_Mono } from "./fonts";
import { LocaleProvider } from "@/localization/LocaleProvider";
import { getRequestLocale } from "@/localization/getRequestLocale";
import type { SupportedLocale } from "@config/i18n";
import { LANGUAGE_ALTERNATES } from "@config/i18n";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ANTD_LOCALES: Record<SupportedLocale, typeof enGB> = {
  "en-GB": enGB,
  "es-ES": esES,
};

export const metadata: Metadata = {
  alternates: {
    languages: LANGUAGE_ALTERNATES,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LocaleLoadingShell />}>
      <LocaleAwareRootLayout>{children}</LocaleAwareRootLayout>
    </Suspense>
  );
}

async function LocaleAwareRootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getRequestLocale();
  const antdLocale = ANTD_LOCALES[locale] ?? enGB;

  if (process.env.NODE_ENV === "test") {
    return (
      <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LocaleProvider value={locale}>{children}</LocaleProvider>
      </div>
    );
  }

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LocaleProvider value={locale}>
          <AntdRegistry layer>
            <ConfigProvider
              locale={antdLocale}
              theme={{
                token: {
                  colorPrimary: "#000000",
                  borderRadius: 2,
                  controlItemBgActive: "#f5f5f5",
                  colorBgBase: "#ffffff",
                  colorBgContainer: "#ffffff",
                  colorBgLayout: "#ffffff",
                  colorLink: "#000000",
                },
              }}
            >
              {children}
            </ConfigProvider>
          </AntdRegistry>
        </LocaleProvider>
      </body>
    </html>
  );
}

function LocaleLoadingShell() {
  return (
    <html lang="en-GB">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div />
      </body>
    </html>
  );
}

export const __TEST_LOCALE_LAYOUT__ = LocaleAwareRootLayout;
