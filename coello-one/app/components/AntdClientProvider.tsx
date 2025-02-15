"use client";

import React from "react";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";
import type { Locale } from "antd/es/locale";
import Entity from "@ant-design/cssinjs/lib/Cache";

export default function AntdClientProvider({
  children,
  cache,
  antdLocale,
}: {
  children: React.ReactNode;
  cache: Entity;
  antdLocale: Locale;
}) {
  return (
    <StyleProvider cache={cache}>
      <ConfigProvider locale={antdLocale}>{children}</ConfigProvider>
    </StyleProvider>
  );
}
