import { describe, expect, it } from "bun:test";
import { NextRequest } from "next/server";
import { proxy } from "./coello-one/proxy";

function buildRequest(pathname: string, acceptLanguage: string) {
  const url = new URL(`https://coello.test${pathname}`);
  return new NextRequest(url, {
    headers: {
      "accept-language": acceptLanguage,
    },
  });
}

describe("proxy Accept-Language negotiation", () => {
  it("redirects to the Spanish locale when curl sends Accept-Language: es", () => {
    const request = buildRequest("/", "es");
    const response = proxy(request);

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("https://coello.test/es-ES");
    expect(response.headers.get("x-locale")).toBe("es-ES");
  });
});
