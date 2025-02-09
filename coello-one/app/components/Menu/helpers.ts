import { MenuProps } from "antd";
import { ReactNode, Key } from "react";

type MenuItem = Required<MenuProps>["items"][number];

function createMenuTitle(
  label: ReactNode,
  key: Key,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    label,
    children,
    className: "uppercase font-medium",
  } as MenuItem;
}
function createMenuOption(
  label: ReactNode,
  key: Key,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    label,
    children,
    className: "!text-gray-600 capitalize",
  } as MenuItem;
}
export { createMenuTitle, createMenuOption };
export type { MenuItem };
