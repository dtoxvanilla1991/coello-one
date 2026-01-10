import { beforeAll, beforeEach, afterAll, describe, expect, it, mock } from "bun:test";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { routerMocks, resetNavigationMocks, setNavigationState } from "@test-utils/navigation";
import { trackEventMock } from "@test-utils/trackEventMock";
import { LocaleProvider } from "@/localization/LocaleProvider";

const { default: LanguageSelect } = await import("./LanguageSelect");

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
  routerMocks.replace.mockClear();
  trackEventMock.mockClear();
});

describe("LanguageSelect", () => {
  it("posts the locale change and navigates to the selected locale path", async () => {
    render(<LanguageSelect />);

    // In antd v6, use combobox role to interact with Select
    const selectCombobox = screen.getByRole("combobox", { name: "Language selector" });
    expect(selectCombobox).toBeTruthy();

    fireEvent.mouseDown(selectCombobox);

    const spanishOption = await screen.findByTitle("ES");
    fireEvent.click(spanishOption);

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith(
        "/es-ES/api/set-language",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ locale: "es-ES" }),
        }),
      );
    });

    await waitFor(() => {
      expect(routerMocks.replace).toHaveBeenCalledWith("/es-ES");
    });
  });

  it("notifies the shopper when the locale update fails", async () => {
    fetchSpy.mockImplementationOnce(async () => {
      return new Response(JSON.stringify({ success: false }), { status: 503 });
    });

    render(<LanguageSelect />);

    // In antd v6, use combobox role to interact with Select
    const selectCombobox = screen.getByRole("combobox", { name: "Language selector" });
    expect(selectCombobox).toBeTruthy();

    fireEvent.mouseDown(selectCombobox);

    const spanishOption = await screen.findByTitle("ES");
    fireEvent.click(spanishOption);

    await waitFor(() => {
      expect(screen.getByText(/Unable to switch language/i)).toBeTruthy();
    });

    expect(routerMocks.replace).not.toHaveBeenCalled();
    expect(trackEventMock).toHaveBeenCalledWith("locale_switch_failed", {
      locale: "es-ES",
      reason: "Locale update failed with status 503",
    });
  });

  it("updates the rendered locale copy once navigation completes", async () => {
    setNavigationState({ pathname: "/en-GB" });
    routerMocks.replace.mockImplementation((href) => {
      act(() => {
        setNavigationState({ pathname: href });
      });
    });

    render(
      <LocaleProvider value="en-GB">
        <LanguageSelect />
      </LocaleProvider>,
    );

    const selectCombobox = screen.getByRole("combobox", { name: "Language selector" });
    fireEvent.mouseDown(selectCombobox);

    const spanishOption = await screen.findByTitle("ES");
    fireEvent.click(spanishOption);

    await waitFor(() => {
      expect(routerMocks.replace).toHaveBeenCalledWith("/es-ES");
    });

    await waitFor(() => {
      expect(screen.getByRole("combobox")).toHaveAttribute("aria-label", "Selector de idioma");
    });
  });
});
