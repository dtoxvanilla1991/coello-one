import { beforeEach, describe, expect, it, mock } from "bun:test";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider, createStore } from "jotai";
import type { CartItem } from "@/store/cartStore";
import { cartItemsAtom } from "@/store/cartStore";
import { resetNavigationMocks, routerMocks, setNavigationState } from "@test-utils/navigation";

const trackEventMock = mock<(event: string, payload?: unknown, meta?: unknown) => void>(() => {});

mock.module("@/utils/trackEvent", () => ({
  trackEvent: trackEventMock,
}));

const { CheckoutContent } = await import("./CheckoutContent");

const renderCheckout = (items: CartItem[] = []) => {
  const store = createStore();
  store.set(cartItemsAtom, items);

  return render(
    <Provider store={store}>
      <CheckoutContent />
    </Provider>,
  );
};

describe("CheckoutContent", () => {
  beforeEach(() => {
    resetNavigationMocks();
    setNavigationState({
      locale: "en-GB",
      params: { locale: "en-GB" },
    });
    trackEventMock.mockReset();
  });

  it("disables submission when the bag is empty", () => {
    renderCheckout();

    expect(screen.getByText(/add at least one item to complete your order/i)).toBeTruthy();
    const submitButton = screen.getByRole("button", {
      name: /place order securely/i,
    });
    expect(submitButton.getAttribute("disabled")).toBeDefined();
  });

  it("shows order summary totals when items are present", () => {
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

    renderCheckout(items);

    expect(screen.getByRole("heading", { name: /order summary/i })).toBeTruthy();
    expect(screen.getByText("£135.00")).toBeTruthy();
    expect(screen.getByText("£8.50")).toBeTruthy();
    expect(screen.getByText("£143.50")).toBeTruthy();
    const submitButton = screen.getByRole("button", {
      name: /place order securely/i,
    });
    expect(submitButton.getAttribute("disabled")).toBeNull();
  });

  it("submits the checkout form and navigates back to the bag when requested", async () => {
    const items: CartItem[] = [
      {
        id: "osc-men-gray-m",
        name: "One Sleeve Classic",
        image: "/athletes/vertical/main-secondary-1.jpg",
        price: 45,
        quantity: 1,
        size: "M",
        color: "Gray",
        fit: "male",
      },
    ];

    renderCheckout(items);

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/^email$/i), {
        target: { value: "coello@example.com" },
      });
      fireEvent.change(screen.getByLabelText(/first name/i), {
        target: { value: "Ava" },
      });
      fireEvent.change(screen.getByLabelText(/last name/i), {
        target: { value: "Gray" },
      });
      fireEvent.change(screen.getByLabelText(/address line 1/i), {
        target: { value: "1 Coello Street" },
      });
      fireEvent.change(screen.getByLabelText(/^city$/i), {
        target: { value: "London" },
      });
      fireEvent.change(screen.getByLabelText(/postcode/i), {
        target: { value: "SW1A 1AA" },
      });
    });

    const form = document.querySelector("form");
    await act(async () => {
      if (form) {
        fireEvent.submit(form);
      }
    });

    fireEvent.click(screen.getByRole("button", { name: /back to bag/i }));

    expect(routerMocks.push).toHaveBeenCalledWith("/bag");
  });
});
