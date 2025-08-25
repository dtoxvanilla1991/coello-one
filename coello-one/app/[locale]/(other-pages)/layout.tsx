"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import { routes } from "config/routes";

const ignoreBackButtonRoutes = [routes.accessDenied, routes.notFound];

export default function OtherPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { back } = useRouter();
  const pathName = usePathname();
  const notIn = !ignoreBackButtonRoutes.includes(pathName);
  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] dark:bg-gray-50">
      {/* sticky top header  */}
      <div className="sticky top-0 z-40 px-6 py-5 backdrop-blur-lg lg:backdrop-blur-none xl:px-10 xl:py-8">
        <div
          className={`mx-auto flex max-w-[1520px] items-center ${
            notIn ? "justify-between" : "justify-center"
          }`}>
          <Link href="/">
            <Image
              src="/coelloLogo.png"
              alt="Coello One logo"
              width={120}
              height={40}
              style={{ width: "auto" }}
              priority
            />
          </Link>
          {notIn && (
            <Button
              className="md:h-10 md:px-4 md:text-base"
              icon={<ArrowLeftOutlined />}
              onClick={() => back()}>
              Home Page
            </Button>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
