import { beforeAll, beforeEach, afterAll, describe, expect, it, mock } from "bun:test";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LanguageSelect from "./LanguageSelect";
import { routerMocks, resetNavigationMocks } from "@test-utils/navigation";

const originalFetch = globalThis.fetch;
const fetchSpy = mock(
  async (input: Parameters<typeof fetch>[0], init?: Parameters<typeof fetch>[1]) => {
    void input;
    void init;
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  },
);

const mockedFetch = ((...args: Parameters<typeof fetch>) => fetchSpy(...args)) as typeof fetch;
mockedFetch.preconnect =
  typeof originalFetch.preconnect === "function"
    ? originalFetch.preconnect.bind(originalFetch)
    : () => Promise.resolve(false);

beforeAll(() => {
  globalThis.fetch = mockedFetch;
});

afterAll(() => {
  globalThis.fetch = originalFetch;
});

beforeEach(() => {
  resetNavigationMocks();
  fetchSpy.mockClear();
  routerMocks.refresh.mockClear();
});

describe("LanguageSelect", () => {
  it("posts the locale change and refreshes the router", async () => {
    render(<LanguageSelect />);

    const [selector] = screen.getAllByLabelText("Language selector");
    const dropdownTrigger = selector.querySelector(".ant-select-selector");
    expect(dropdownTrigger).toBeTruthy();

    fireEvent.mouseDown(dropdownTrigger as Element);

    const spanishOption = await screen.findByTitle("ES");
    fireEvent.click(spanishOption);

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith(
        "/api/set-language",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ locale: "es-ES" }),
        }),
      );
    });

    expect(routerMocks.refresh).toHaveBeenCalled();
  });
});
