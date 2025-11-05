import { beforeEach, describe, expect, it, mock } from "bun:test";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { Provider, createStore } from "jotai";
import type { CartItem } from "@/store/cartStore";
import { cartItemsAtom } from "@/store/cartStore";

const pushMock = mock<(path: string) => void>(() => {});
const trackEventMock = mock<(event: string, payload?: unknown) => void>(() => {});

mock.module("next/navigation", () => ({
  __esModule: true,
  useRouter: () => ({
    push: pushMock,
  }),
  useParams: () => ({ locale: "en-GB" }),
}));

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
    pushMock.mockReset();
    trackEventMock.mockReset();
  });

  it("shows an empty state when the cart has no items", () => {
    renderWithCart();

  expect(screen.getByText(/your bag is empty/i)).toBeTruthy();
  expect(screen.getByRole("button", { name: /continue shopping/i })).toBeTruthy();
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

    const summary = screen.getByText(/order summary/i).closest("section") ?? screen.getByText(/order summary/i).parentElement;
    expect(summary).toBeTruthy();
    const summaryRegion = summary ? within(summary) : screen;

  expect(summaryRegion.getByText("$135.00")).toBeTruthy();
  expect(summaryRegion.getByText("$8.50")).toBeTruthy();
  expect(summaryRegion.getByText("$143.50")).toBeTruthy();
  });

  it("navigates back to the locale home when Continue shopping is pressed", () => {
    renderWithCart();

    fireEvent.click(screen.getByRole("button", { name: /continue shopping/i }));

    expect(pushMock).toHaveBeenCalledWith("/en-GB/home");
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

    fireEvent.click(screen.getByRole("button", { name: /checkout/i }));

    expect(trackEventMock).toHaveBeenCalledTimes(1);
    const [, payload] = trackEventMock.mock.calls[0];

    expect(payload).toMatchObject({
      subtotal: 90,
      shipping: 8.5,
      total: 98.5,
      itemCount: 2,
    });
  });
});
