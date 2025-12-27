import path from "node:path";
import { extractStyle } from "@ant-design/static-style-extract";

const generateAntdCss = async (): Promise<void> => {
  // Extract all antd component styles as static CSS (antd v6 compatible)
  const cssText = extractStyle();

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
