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
  const openAndSelect = async (label: "EN" | "ES") => {
    const selectCombobox = screen.getByRole("combobox", { name: /language selector/i });

    await act(async () => {
      fireEvent.mouseDown(selectCombobox);
    });

    const option = await screen.findByTitle(label);
    const clickable = option.classList.contains("ant-select-item-option")
      ? option
      : option.closest(".ant-select-item-option");
    if (!clickable) {
      throw new Error(`Unable to find Ant Design option for ${label}`);
    }

    await act(async () => {
      fireEvent.click(clickable);
    });
  };

  it("posts the locale change and navigates to the selected locale path", async () => {
    render(<LanguageSelect />);

    expect(screen.getByRole("combobox", { name: "Language selector" })).toBeTruthy();

    await openAndSelect("ES");

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

    expect(screen.getByRole("combobox", { name: "Language selector" })).toBeTruthy();

    await openAndSelect("ES");

    await waitFor(() => {
      expect(
        screen.getByText((_, node) => {
          if (!(node instanceof HTMLElement)) return false;
          if (node.tagName !== "SPAN") return false;
          return node.textContent?.toLowerCase().includes("unable to switch language") ?? false;
        }),
      ).toBeTruthy();
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
    expect(selectCombobox).toBeTruthy();

    await openAndSelect("ES");

    await waitFor(() => {
      expect(routerMocks.replace).toHaveBeenCalledWith("/es-ES");
    });

    await waitFor(() => {
      expect(screen.getByRole("combobox")).toHaveAttribute("aria-label", "Selector de idioma");
    });
  });
});
