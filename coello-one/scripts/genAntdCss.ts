import path from "node:path";
import { createCache, extractStyle } from "@ant-design/cssinjs";

const generateAntdCss = async (): Promise<void> => {
  const cache = createCache();

  const cssText = extractStyle(cache, {
    plain: true,
  });

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
