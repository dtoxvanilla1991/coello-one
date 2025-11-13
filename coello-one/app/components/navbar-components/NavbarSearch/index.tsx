"use client";

import { useEffect, useRef } from "react";
import { Button, Input, InputRef, Space } from "antd";
import type { KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { buildLocaleRoute } from "@config/routes";
import { SearchOutlined } from "@ant-design/icons";

interface NavbarSearchProps {
  searchVisible: boolean;
  onClose: () => void;
  locale: string;
}

export function NavbarSearch({ searchVisible, onClose, locale }: NavbarSearchProps) {
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

  const handleOnSearch = (rawValue: string) => {
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
    if (event.key === "Enter") {
      handleOnSearch(event.currentTarget.value);
      return;
    }

    if (event.key === "Escape") {
      onClose();
    }
  };

  const handleButtonClick = () => {
    const value = searchRef.current?.input?.value ?? "";

    handleOnSearch(value);
  };

  return (
    <Space.Compact
      className={`${
        searchVisible ? "flex!" : "hidden!"
      } mx-auto w-11/12 max-w-xl overflow-hidden rounded-full! shadow-none!`}
      size="large"
      aria-label="Search catalog"
      role="search"
    >
      <Input
        ref={searchRef}
        placeholder="Search Coello"
        className="border-0! bg-transparent! shadow-none! focus:border-0! focus:ring-0!"
        allowClear
        type="search"
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        id="navbar-search"
        variant="borderless"
      />
      <Button
        type="text"
        icon={<SearchOutlined className="text-xl" />}
        className="h-full! rounded-full! bg-transparent!"
        aria-label="Submit search"
        onMouseDown={(event) => event.preventDefault()}
        onClick={handleButtonClick}
      />
    </Space.Compact>
  );
}
