import Footer from "@/components/Footer";
import HydrationOverlay from "@/components/common/HydrationOverlay";
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
      align="center"
      justify="space-between"
      gap={12}
      className="relative flex min-h-[var(--navbar-height,56px)] w-full items-center justify-between bg-white px-4!"
    >
      <SkeletonCircle size={24} />
      <Flex aria-hidden className="absolute left-1/2 flex -translate-x-1/2 justify-center">
        <SkeletonLine width={220} height={20} />
      </Flex>
      <Flex gap={12} align="center" className="flex items-center gap-3">
        <SkeletonCircle size={24} />
        <SkeletonCircle size={24} />
      </Flex>
    </Flex>
  );

  return (
    <Layout hasSider>
      <NavbarSiderComponent />
      <Layout>
        <HydrationOverlay overlay={navbarFallback} className="min-h-(--navbar-height,56px)">
          <Navbar />
        </HydrationOverlay>
        <Flex vertical role="main" className="min-h-screen">
          {children}
        </Flex>
        <Footer />
      </Layout>
    </Layout>
  );
}
