import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import enGB from "antd/locale/en_GB";
import esES from "antd/locale/es_ES";
import withTheme from "../theme";
import { notFound } from "next/navigation";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

type LocaleParams = {
  locale: "en-GB" | "es-ES";
};

type Props = {
  children: React.ReactNode;
  params: LocaleParams;
};

export default function LocaleLayout({ children, params }: Props) {
  const { locale } = params;
  if (!["en-GB", "es-ES"].includes(locale)) {
    notFound();
  }

  const antdLocale = locale === "es-ES" ? esES : enGB;

  return withTheme(
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ConfigProvider locale={antdLocale}>
          <AntdRegistry>{children}</AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  );
}
