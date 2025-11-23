import { describe, expect, it } from "bun:test";
import { POST } from "./route";

const buildRequest = (body: unknown) =>
  new Request("http://localhost/api/set-language", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

describe("POST /api/set-language", () => {
  it("sets the NEXT_LOCALE cookie when a supported locale is provided", async () => {
    const response = await POST(buildRequest({ locale: "es-ES" }));
    const payload = await response.json();
    const cookieHeader = response.headers.get("set-cookie") ?? "";

    expect(response.status).toBe(200);
    expect(payload).toEqual({ success: true });
    expect(cookieHeader).toContain("NEXT_LOCALE=es-ES");
  });

  it("rejects unsupported locales", async () => {
    const response = await POST(buildRequest({ locale: "jp-JP" }));
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload).toEqual({ error: "Unsupported locale" });
  });
});
