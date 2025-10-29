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
    <Layout hasSider>
      <NavbarSiderComponent />
      <Layout>
        <Navbar />
        <main role="main" className="min-h-screen">
          {children}
        </main>
        <Footer />
      </Layout>
    </Layout>
  );
}
