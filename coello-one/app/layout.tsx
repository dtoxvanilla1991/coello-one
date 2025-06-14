import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import enGB from "antd/locale/en_GB";
import esES from "antd/locale/es_ES";
import { cookies } from "next/headers";
import { Locale } from "antd/lib/locale";
import withTheme from "./theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coello One",
  description:
    "Coello One combines your passion for fitness and art. Stand out with our unique and stylish activewear.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Picking up language selection from the 'lang' cookie
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("lang")?.value || "en-GB";

  let antdLocale: Locale;
  switch (langCookie) {
    case "es-ES":
      antdLocale = esES;
      break;
    default:
      // fallback to American English
      antdLocale = enGB;
      break;
  }

  return withTheme(
    <html lang={langCookie}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ConfigProvider locale={antdLocale}>
          <AntdRegistry>{children}</AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  );
}
