"use client";

import { SearchProps } from "antd/es/input/Search";
import { JSX, useEffect, useRef } from "react";
import { Input, InputRef } from "antd";

interface NavbarSearchProps {
  searchVisible: boolean;
  showSearch: () => void;
}
const { Search } = Input;
export function NavbarSearch({
  searchVisible,
  showSearch,
}: NavbarSearchProps): JSX.Element {
  const searchRef = useRef<InputRef | null>(null);

  const handleSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  // useEffect(() => {
  //   if (searchVisible && searchRef.current) {
  //     searchRef.current.focus();
  //   }
  // }, [searchVisible]);

  return (
    <Search
      ref={searchRef}
      placeholder="What are you looking for?"
      //   loading
      className={`ml-auto transition duration-300 ${
        searchVisible ? "!w-11/12 block" : "!hidden"
      } overflow-hidden motion-reduce:transition-none motion-reduce:hover:transform-none`}
      onSearch={handleSearch}
      allowClear
      // onBlur={showSearch}
      id="navbar-search"
      size="large"
      // variant="borderless"
    />
  );
}
