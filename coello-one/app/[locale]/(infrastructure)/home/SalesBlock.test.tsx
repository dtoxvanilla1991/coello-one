import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "bun:test";
import { resetNavigationMocks, routerMocks } from "@test-utils/navigation";
import { trackEventMock } from "@test-utils/trackEventMock";
import { DEFAULT_LOCALE } from "@config/i18n";

const SalesBlock = (await import("./SalesBlock")).default;

const REGION_LABEL = "GET AN EXTRA 10% OFF WHEN BAGGING 2+ ITEMS";

const renderSalesBlock = () => {
  trackEventMock.mockReset();
  return render(<SalesBlock />);
};

beforeEach(() => {
  resetNavigationMocks();
});

describe("SalesBlock", () => {
  it("should render the sales block", () => {
    renderSalesBlock();
    expect(screen.getByRole("region", { name: REGION_LABEL })).toBeTruthy();
  });

  it("should render the title", () => {
    renderSalesBlock();
    const heading = screen.getByRole("heading", {
      level: 3,
      name: REGION_LABEL,
    });
    expect(heading.textContent).toBe(REGION_LABEL);
  });

  it("should render the text", () => {
    renderSalesBlock();
    expect(
      screen.getByText(/Drop code extra10 and thank us with a tagged photo in the gym/i),
    ).toBeTruthy();
  });

  it("should render the women and men buttons", () => {
    renderSalesBlock();
    expect(screen.getByRole("button", { name: /Shop women/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /Shop men/i })).toBeTruthy();
  });

  it("navigates women CTA with normalized query", () => {
    renderSalesBlock();

    fireEvent.click(screen.getByRole("button", { name: /Shop women/i }));

    expect(trackEventMock).toHaveBeenCalledWith("sales_block_cta_click", { audience: "women" });
    expect(routerMocks.push).toHaveBeenCalledWith(
      `/${DEFAULT_LOCALE}/one-sleeve-classic?gender=female&size=M&color=mild+red`,
    );
  });

  it("navigates men CTA with normalized query", () => {
    renderSalesBlock();

    fireEvent.click(screen.getByRole("button", { name: /Shop men/i }));

    expect(trackEventMock).toHaveBeenCalledWith("sales_block_cta_click", { audience: "men" });
    expect(routerMocks.push).toHaveBeenCalledWith(
      `/${DEFAULT_LOCALE}/one-sleeve-classic?gender=male&size=M&color=sea+blue`,
    );
  });
});
