"use client";

import { useEffect, useMemo, useRef } from "react";
import { Button, Input, InputRef, Space } from "antd";
import type { KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { buildLocaleRoute } from "@config/routes";
import { SearchOutlined } from "@ant-design/icons";
import { useLocalePath } from "@/hooks/useLocalePath";
import { useTranslations } from "@/localization/useTranslations";

interface NavbarSearchProps {
  searchVisible: boolean;
  onClose: () => void;
}

export function NavbarSearch({ searchVisible, onClose }: NavbarSearchProps) {
  const searchRef = useRef<InputRef | null>(null);
  const router = useRouter();
  const withLocalePath = useLocalePath();
  const baseRoute = useMemo(() => withLocalePath(buildLocaleRoute("search")), [withLocalePath]);
  const navigationCopy = useTranslations("navigation");
  const navbarCopy = navigationCopy.navbar;

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
      aria-label={navbarCopy.search.regionLabel}
      role="search"
    >
      <Input
        ref={searchRef}
        placeholder={navbarCopy.search.placeholder}
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
        aria-label={navbarCopy.search.submit}
        onMouseDown={(event) => event.preventDefault()}
        onClick={handleButtonClick}
      />
    </Space.Compact>
  );
}
