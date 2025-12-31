import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { getCheckoutOrderSnapshot } from "../../stripe/webhook/persistStripeEvent";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  const snapshot = await getCheckoutOrderSnapshot(sessionId);

  // Avoid leaking PII by default. The return page can render customer email from server render.
  if (!snapshot) {
    return NextResponse.json({ order: null });
  }

  const safe = { ...snapshot };
  delete (safe as { customerEmail?: unknown }).customerEmail;
  return NextResponse.json({ order: safe });
}
