"use server";

import { z } from "zod";

const stockResponseSchema = z.object({
  slug: z.string(),
  sizes: z.record(z.string(), z.number().int().nonnegative()),
});

export type LiveStockResponse = z.infer<typeof stockResponseSchema>;

export async function getLiveStock(slug: string): Promise<LiveStockResponse | null> {
  const baseUrl = process.env.FLASK_API_BASE_URL ?? "http://localhost:3500";
  const url = new URL("/api/stock", baseUrl);
  url.searchParams.set("slug", slug);

  try {
    const response = await fetch(url.toString(), {
      cache: "no-store",
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) {
      return null;
    }

    const json = await response.json();
    const parsed = stockResponseSchema.safeParse(json);
    if (!parsed.success) {
      return null;
    }

    return parsed.data;
  } catch {
    return null;
  }
}
