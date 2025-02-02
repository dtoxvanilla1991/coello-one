import Footer from "@/components/Footer";
import { Navbar } from "@/components/navbar-components/Navbar";
import { NavbarSiderComponent } from "@/components/navbar-components/NavbarSider";
import { ConfigProvider, Layout } from "antd";

export default function InfrastructureLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#000000",
          borderRadius: 2,

          // Alias Token
          colorBgContainer: "#ffffff",
        },
      }}>
      <Layout hasSider>
        <NavbarSiderComponent />
        <Layout>
          <Navbar />
          {children}
          <Footer />
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
