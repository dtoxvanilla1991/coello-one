import Footer from "@/components/Footer";
import { Navbar } from "@/components/navbar-components/Navbar";
import { Layout } from "antd";

export default function InfrastructureLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout>
      <Navbar />
      {children}
      <Footer />
    </Layout>
  );
}
