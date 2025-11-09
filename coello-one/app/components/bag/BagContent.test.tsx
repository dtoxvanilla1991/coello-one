import { beforeEach, describe, expect, it, mock } from "bun:test";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { Provider, createStore } from "jotai";
import type { CartItem } from "@/store/cartStore";
import { cartItemsAtom } from "@/store/cartStore";
import { resetNavigationMocks, routerMocks, setNavigationState } from "@test-utils/navigation";

const trackEventMock = mock<(event: string, payload?: unknown) => void>(() => {});

mock.module("@/utils/trackEvent", () => ({
  trackEvent: trackEventMock,
}));

const { BagContent } = await import("./BagContent");

const renderWithCart = (items: CartItem[] = []) => {
  const store = createStore();
  store.set(cartItemsAtom, items);

  return render(
    <Provider store={store}>
      <BagContent />
    </Provider>
  );
};

describe("BagContent", () => {
  beforeEach(() => {
    resetNavigationMocks();
    setNavigationState({
      locale: "en-GB",
      params: { locale: "en-GB" },
    });
    trackEventMock.mockReset();
  });

  it("shows an empty state when the cart has no items", () => {
    renderWithCart();

    const bagHeadings = screen.getAllByRole("heading", { name: /your bag/i });
    expect(bagHeadings.length).toBeGreaterThan(0);
    expect(screen.getByText(/your bag is empty/i)).toBeTruthy();
    expect(
      screen.getByRole("button", { name: /continue shopping/i })
    ).toBeTruthy();
    expect(screen.queryByRole("progressbar")).toBeNull();
    expect(screen.queryByText(/free express shipping/i)).toBeNull();
  });

  it("renders order details with correct totals for active items", () => {
    const items: CartItem[] = [
      {
        id: "osc-men-gray-m",
        name: "One Sleeve Classic",
        image: "/athletes/vertical/main-secondary-1.jpg",
        price: 45,
        quantity: 2,
        size: "M",
        color: "Gray",
        fit: "male",
      },
      {
        id: "osc-women-sea-l",
        name: "One Sleeve Classic",
        image: "/athletes/vertical/main-secondary-2.jpg",
        price: 45,
        quantity: 1,
        size: "L",
        color: "Sea Blue",
        fit: "female",
      },
    ];

    renderWithCart(items);

    const summaryLabel = screen.getByText(/order summary/i);
    const summaryCard = summaryLabel.closest(".ant-card");
    expect(summaryCard).toBeTruthy();
    const summaryRegion = summaryCard
      ? within(summaryCard as HTMLElement)
      : screen;

    expect(summaryRegion.getByText("£135.00")).toBeTruthy();
    expect(summaryRegion.getByText("£8.50")).toBeTruthy();
    expect(summaryRegion.getByText("£143.50")).toBeTruthy();
  });

  it("navigates back to the locale home when Continue shopping is pressed", () => {
    renderWithCart();

    fireEvent.click(screen.getByRole("button", { name: /continue shopping/i }));

    expect(routerMocks.push).toHaveBeenCalledWith("/en-GB/home");
  });

  it("tracks checkout attempts with the aggregated totals", () => {
    const items: CartItem[] = [
      {
        id: "osc-men-gray-m",
        name: "One Sleeve Classic",
        image: "/athletes/vertical/main-secondary-1.jpg",
        price: 45,
        quantity: 2,
        size: "M",
        color: "Gray",
        fit: "male",
      },
    ];

    renderWithCart(items);

    fireEvent.click(screen.getByRole("button", { name: /checkout securely/i }));

    expect(trackEventMock).toHaveBeenCalledTimes(1);
    const [, payload] = trackEventMock.mock.calls[0];

    expect(payload).toMatchObject({
      subtotal: 90,
      shipping: 8.5,
      total: 98.5,
      itemCount: 2,
    });
    expect(routerMocks.push).toHaveBeenCalledWith("/en-GB/checkout");
  });
});
