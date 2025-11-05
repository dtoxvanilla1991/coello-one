import { beforeEach, describe, expect, it, mock } from "bun:test";
import { fireEvent, render, screen } from "@testing-library/react";

const pushMock = mock<(path: string) => void>(() => {});
const prefetchMock = mock<(path: string) => Promise<void>>(() => Promise.resolve());

mock.module("next/navigation", () => ({
  __esModule: true,
  useRouter: () => ({
    push: pushMock,
    prefetch: prefetchMock,
  }),
}));

const { NavbarSearch } = await import("./index");

describe("NavbarSearch", () => {
  beforeEach(() => {
    pushMock.mockReset();
    prefetchMock.mockReset();
  });

  it("routes to the search results page with the trimmed query", () => {
    const handleClose = mock<() => void>(() => {});

    render(
      <NavbarSearch searchVisible locale="en-GB" onClose={handleClose} />
    );

    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "  gray sleeve   " } });

    const searchButton = screen.getByRole("button", { name: /search/i });
    fireEvent.click(searchButton);

    expect(pushMock).toHaveBeenCalledWith("/en-GB/search?query=gray%20sleeve");
    expect(handleClose.mock.calls.length).toBeGreaterThan(0);
  });

  it("falls back to the locale search route when no query is provided", () => {
    const handleClose = mock<() => void>(() => {});

    render(
      <NavbarSearch searchVisible locale="es-ES" onClose={handleClose} />
    );

    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "   " } });

    const searchButton = screen.getByRole("button", { name: /search/i });
    fireEvent.click(searchButton);

    expect(pushMock).toHaveBeenCalledWith("/es-ES/search");
    expect(handleClose.mock.calls.length).toBeGreaterThan(0);
  });

  it("closes the overlay when focus leaves the input", () => {
    const handleClose = mock<() => void>(() => {});

    render(
      <NavbarSearch searchVisible locale="en-GB" onClose={handleClose} />
    );

    const input = screen.getByRole("searchbox");
    fireEvent.blur(input);

    expect(handleClose).toHaveBeenCalled();
  });
});
