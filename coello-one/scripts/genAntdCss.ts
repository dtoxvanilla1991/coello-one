import path from "node:path";
import React from "react";
import { extractStyle } from "@ant-design/static-style-extract";
import { ConfigProvider } from "antd";

import { COELLO_ANTD_THEME } from "../config/antdTheme";

const generateAntdCss = async (): Promise<void> => {
  // Extract all antd component styles as static CSS (antd v6 compatible)
  const cssText = extractStyle((node) =>
    React.createElement(ConfigProvider, { theme: COELLO_ANTD_THEME }, node),
  );

  const outputPath = path.join(process.cwd(), "public", "antd.min.css");
  const outputFile = Bun.file(outputPath);
  await Bun.write(outputFile, cssText, { createPath: true });

  if (Bun.env.NODE_ENV !== "production") {
    console.log("Generated Ant Design CSS for SSR");
  }
};

await generateAntdCss().catch((error) => {
  console.error("Failed to generate Ant Design CSS:", error);
  process.exitCode = 1;
});
