import { FooterComponent } from "@/components/Footer";
import { HeaderComponent } from "@/components/Header";
import { Layout } from "antd";

export default function InfrastructureLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("does this even run?");
  return (
    <Layout className="relative">
      <Layout className="min-h-screen bg-white w-[390px] mx-auto border border-gray-300">
        <HeaderComponent />
        {children}
        <FooterComponent />
      </Layout>
    </Layout>
  );
}
