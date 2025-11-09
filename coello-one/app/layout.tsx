import "@ant-design/v5-patch-for-react-19";
import "./globals.css";
import { Geist, Geist_Mono } from "./fonts";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // In tests, rendering <html>/<body> inside a div container breaks the DOM in JSDOM/Happy DOM
  // Provide a test-friendly wrapper that carries the same classes without custom data attributes
  if (process.env.NODE_ENV === "test") {
    return (
      <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</div>
    );
  }

  return (
    <html>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
