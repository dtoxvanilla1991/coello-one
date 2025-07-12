import fs from 'fs';
import path from 'path';
import { createCache, extractStyle } from '@ant-design/cssinjs';

// Generate Ant Design CSS for SSR
const generateAntdCss = () => {
  const cache = createCache();
  
  const cssText = extractStyle(cache, {
    plain: true,
  });

  const outputPath = path.join(process.cwd(), 'public', 'antd.min.css');
  
  // Ensure directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputPath, cssText);
  console.log('Generated Ant Design CSS for SSR');
};

generateAntdCss();