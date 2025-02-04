"use client";

import { useTransition } from "react";
import { Select } from "antd";

export default function LanguageSelect() {
  const [isPending, startTransition] = useTransition();

  const handleChange = async (value: string) => {
    // call an endpoint that sets the "lang" cookie
    await fetch("/api/set-language", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lang: value }),
    });

    // then refresh the page so server can re-render with correct locale
    startTransition(() => {
      window.location.reload();
    });
  };

  return (
    <Select
      defaultValue="en-GB"
      className="w-[4.5em]"
      onChange={handleChange}
      options={[
        { label: "GB", value: "en-GB" },
        { label: "US", value: "en-US" },
        { label: "ES", value: "es-ES" },
      ]}
    />
  );
}
