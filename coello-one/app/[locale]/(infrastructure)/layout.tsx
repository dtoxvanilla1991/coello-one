import Footer from "@/components/Footer";
import { Navbar } from "@/components/navbar-components/Navbar";
import { NavbarSiderComponent } from "@/components/navbar-components/NavbarSider";
import { Layout } from "antd";

export default function InfrastructureLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout hasSider data-testid="infrastructure-layout">
      <NavbarSiderComponent data-testid="navbar-sider-component" />
      <Layout>
        <Navbar data-testid="navbar-component" />
        {children}
        <Footer data-testid="footer-component" />
      </Layout>
    </Layout>
  );
}
