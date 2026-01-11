import Footer from "@/components/Footer";
import HydrationGate from "@/components/common/HydrationGate";
import { SkeletonCircle, SkeletonLine } from "@/components/common/BareSkeleton";
import { Navbar } from "@/components/navbar-components/Navbar";
import { NavbarSiderComponent } from "@/components/navbar-components/NavbarSider";
import { Flex, Layout } from "antd";

export default function InfrastructureLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navbarFallback = (
    <Flex
      style={{
        minHeight: "var(--navbar-height, 56px)",
        background: "#fff",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      align="center"
      justify="space-between"
      gap={12}
      className="w-full px-4!"
    >
      <SkeletonCircle size={24} />
      <Flex
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <SkeletonLine width={220} height={20} />
      </Flex>
      <Flex gap={12} align="center" style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <SkeletonCircle size={24} />
        <SkeletonCircle size={24} />
      </Flex>
    </Flex>
  );

  return (
    <Layout hasSider>
      <NavbarSiderComponent />
      <Layout>
        <HydrationGate fallback={navbarFallback}>
          <Navbar />
        </HydrationGate>
        <Flex vertical role="main" className="min-h-screen">
          {children}
        </Flex>
        <Footer />
      </Layout>
    </Layout>
  );
}
