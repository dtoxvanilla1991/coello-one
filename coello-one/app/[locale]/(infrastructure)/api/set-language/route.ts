import { NextResponse } from "next/server";
import { z } from "zod";
import { SUPPORTED_LOCALES } from "@config/i18n";

const LOCALE_COOKIE = "NEXT_LOCALE" as const;
const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

const payloadSchema = z.object({
  locale: z.enum(SUPPORTED_LOCALES),
});

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const parsed = payloadSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Unsupported locale" }, { status: 400 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(LOCALE_COOKIE, parsed.data.locale, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ONE_YEAR_IN_SECONDS,
  });

  return response;
}
