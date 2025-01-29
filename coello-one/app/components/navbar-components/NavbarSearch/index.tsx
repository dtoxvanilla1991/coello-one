"use client";

import Search from "antd/es/input/Search";
import { ChangeEvent, MouseEvent, KeyboardEvent, JSX } from "react";

interface NavbarSearchProps {
  className: string;
  showSearch: () => void;
}

type HandleSearchTypes = {
  value: string;
  event?:
    | ChangeEvent<HTMLInputElement>
    | MouseEvent<HTMLElement>
    | KeyboardEvent<HTMLInputElement>
    | undefined;
  info?: { source?: "input" | "clear" | undefined } | undefined;
};

export function NavbarSearch({
  className,
  showSearch,
}: NavbarSearchProps): JSX.Element {
  const handleSearch = (
    value: string,
    event?: HandleSearchTypes["event"],
    info?: HandleSearchTypes["info"]
  ): void => {
    console.log("info:", info?.source);
    console.log("event:", event);
    console.log(value);
    if (info?.source === "clear") {
      console.log("clear");
    }
  };
  return (
    <Search
      placeholder="Let us help you find what you need"
      //   loading
      className={`${className} w-4/5 ml-auto`}
      onSearch={handleSearch}
      allowClear
      onBlur={showSearch}
      id="navbar-search"
    />
  );
}
