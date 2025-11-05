"use client";

import { useEffect, useRef } from "react";
import { Button, Input, InputRef } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import type { KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { buildLocaleRoute } from "@config/routes";
import { SearchOutlined } from "@ant-design/icons";

interface NavbarSearchProps {
  searchVisible: boolean;
  onClose: () => void;
  locale: string;
}

const { Search } = Input;

export function NavbarSearch({
  searchVisible,
  onClose,
  locale,
}: NavbarSearchProps) {
  const searchRef = useRef<InputRef | null>(null);
  const router = useRouter();
  const baseRoute = buildLocaleRoute(locale, "search");

  useEffect(() => {
    if (!searchVisible) {
      return;
    }

    searchRef.current?.focus({ cursor: "all" });
  }, [searchVisible]);

  useEffect(() => {
    Promise.resolve(router.prefetch(baseRoute)).catch(() => undefined);
  }, [router, baseRoute]);

  const handleOnSearch: SearchProps["onSearch"] = (rawValue) => {
    const trimmedValue = rawValue.trim();
    const destination =
      trimmedValue.length > 0
        ? `${baseRoute}?query=${encodeURIComponent(trimmedValue)}`
        : baseRoute;

    router.push(destination);
    searchRef.current?.blur();
    onClose();
  };

  const handleBlur = () => {
    if (searchVisible) {
      onClose();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  return (
    <Search
      ref={searchRef}
      placeholder="Search Coello"
      className={`${
        searchVisible ? "!block" : "!hidden"
      } mx-auto w-11/12 max-w-xl !rounded-full !shadow-none`}
      classNames={{
        input:
          "!bg-transparent !shadow-none !border-0 focus:!border-0 focus:!ring-0",
        suffix: "!text-black",
      }}
      onSearch={handleOnSearch}
      allowClear
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      id="navbar-search"
      size="large"
      enterButton={
        <Button
          type="text"
          icon={<SearchOutlined className="text-xl" />}
          className="!h-full !rounded-full !bg-transparent"
          aria-label="Submit search"
        />
      }
      variant="borderless"
      aria-label="Search catalog"
    />
  );
}
