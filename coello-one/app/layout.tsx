import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Pass-through root layout; locale-specific theming in /[locale]/layout.tsx
  return <>{children}</>;
}
