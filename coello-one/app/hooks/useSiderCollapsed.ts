import { useAtom } from "jotai";
import { siderCollapsedAtom } from "@/store/siderStore";

export function useSiderCollapsed() {
  const [collapsed, setCollapsed] = useAtom(siderCollapsedAtom);
  return { collapsed, setCollapsed };
}
