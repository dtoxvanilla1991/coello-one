import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { lang } = await request.json();
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  return NextResponse.redirect("/", {
    headers: {
      "Set-Cookie": `lang=${lang}; Expires=${expires.toUTCString()}; Path=/, SameSite=Strict, HttpOnly`,
    },
  });
}
