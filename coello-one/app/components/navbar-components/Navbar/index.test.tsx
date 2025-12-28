import { beforeEach, describe, expect, it } from "bun:test";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider, createStore } from "jotai";
import { cartItemsAtom } from "@/store/cartStore";
import { siderAnimatingAtom } from "@/store/siderStore";
import type { CartItem } from "@/store/cartStore";
import { resetNavigationMocks, routerMocks } from "@test-utils/navigation";
import { DEFAULT_LOCALE } from "@config/i18n";

const { Navbar } = await import("./index");

describe("Navbar", () => {
  beforeEach(() => {
    resetNavigationMocks();
  });

  const renderNavbar = (cartQuantity = 0, options?: { animating?: boolean }) => {
    const store = createStore();
    if (options?.animating) {
      store.set(siderAnimatingAtom, true);
    }
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

  it("routes to the bag page when the bag control is pressed", () => {
    renderNavbar(1);

    fireEvent.click(screen.getByRole("button", { name: /view bag/i }));

    expect(routerMocks.push).toHaveBeenCalledWith(`/${DEFAULT_LOCALE}/bag`);
  });

  it("disables the menu toggle while the Sider animates", () => {
    renderNavbar(0, { animating: true });

    const toggleButton = screen.getByRole("button", { name: /toggle navigation menu/i });
    expect(toggleButton).toHaveAttribute("disabled");
  });
});
