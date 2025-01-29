"use client";
import { Layout, Typography } from "antd";
import { ShoppingCartOutlined, SearchOutlined } from "@ant-design/icons";
import { NavbarSearch } from "../NavbarSearch";
import { useState } from "react";

const { Header } = Layout;
const { Title } = Typography;

export function Navbar() {
  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const showSearch = () => setSearchVisible(!searchVisible);
  const show = searchVisible ? "hidden" : "block";
  return (
    <Header className="bg-white flex items-center px-4 h-14 shadow-sm sticky top-0 z-10">
      <div className={`flex-1 text-center ml-4 ${show}`}>
        <Title
          level={4}
          className="!m-0 uppercase tracking-wider transition delay-500 duration-300 ease-in-out motion-reduce:transition-none motion-reduce:hover:transform-none">
          Coello One
        </Title>
      </div>
      <ShoppingCartOutlined className={`text-xl mr-4 ${show}`} />
      <SearchOutlined className={`text-xl ${show}`} onClick={showSearch} />
      <NavbarSearch
        className={`transition-shadow duration-300 ${
          searchVisible ? "opacity-100" : "opacity-0"
        } overflow-hidden motion-reduce:transition-none motion-reduce:hover:transform-none`}
        showSearch={showSearch}
      />
    </Header>
  );
}
