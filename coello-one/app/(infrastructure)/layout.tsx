import { FooterComponent } from "@/components/Footer";
import { HeaderComponent } from "@/components/Header";
import { NavbarSiderComponent } from "@/components/NavbarSider";
import { Layout } from "antd";

export default function InfrastructureLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout className="relative" hasSider={true}>
      <NavbarSiderComponent />
      <Layout>
        <HeaderComponent />
        {children}
        <FooterComponent />
      </Layout>
    </Layout>
  );
}
