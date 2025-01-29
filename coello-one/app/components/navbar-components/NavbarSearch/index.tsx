"use client";

import Search, { SearchProps } from "antd/es/input/Search";
import { JSX } from "react";

interface NavbarSearchProps {
  className: string;
  showSearch: () => void;
}

export function NavbarSearch({
  className,
  showSearch,
}: NavbarSearchProps): JSX.Element {
  const handleSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <Search
      placeholder="Let us help you find what you need"
      //   loading
      className={`ml-auto ${className}`}
      onSearch={handleSearch}
      allowClear
      onBlur={showSearch}
      id="navbar-search"
      size="large"
      // variant="borderless"
    />
  );
}
