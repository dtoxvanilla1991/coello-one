"use client";
import { useEffect } from "react";

type Props = { lang: string };

export default function ClientLocaleSynchronizer({ lang }: Props) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);
  return null;
}
