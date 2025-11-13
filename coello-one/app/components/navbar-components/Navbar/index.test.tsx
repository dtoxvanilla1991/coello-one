import { beforeEach, describe, expect, it } from "bun:test";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider, createStore } from "jotai";
import { cartItemsAtom } from "@/store/cartStore";
import type { CartItem } from "@/store/cartStore";
import { resetNavigationMocks, routerMocks, setNavigationState } from "@test-utils/navigation";

const { Navbar } = await import("./index");

describe("Navbar", () => {
  beforeEach(() => {
    resetNavigationMocks();
    setNavigationState({ locale: "en-GB" });
  });

  const renderNavbar = (cartQuantity = 0) => {
    const store = createStore();
    if (cartQuantity > 0) {
      const items: CartItem[] = [
        {
          id: "osc-item",
          name: "One Sleeve Classic",
          image: "/athletes/vertical/main-secondary-1.jpg",
          price: 45,
          quantity: cartQuantity,
          size: "M",
          color: "Gray",
          fit: "male",
        },
      ];
      store.set(cartItemsAtom, items);
    }

    return render(
      <Provider store={store}>
        <Navbar />
      </Provider>,
    );
  };

  it("applies sticky layout classes for persistent visibility", () => {
    const { container } = renderNavbar();

    const header = container.querySelector("header");
    expect(header).toBeTruthy();
    expect(header?.className).toContain("sticky");
    expect(header?.className).toContain("top-0");
  });

  it("routes to the locale-aware bag page when the bag control is pressed", () => {
    renderNavbar(1);

    fireEvent.click(screen.getByRole("button", { name: /view bag/i }));

    expect(routerMocks.push).toHaveBeenCalledWith("/en-GB/bag");
  });
});
