import { beforeEach, describe, expect, it } from "bun:test";
import { act, render, screen } from "@testing-library/react";
import { Provider, createStore } from "jotai";
import { siderCollapsedAtom } from "@/store/siderStore";
import { LocaleProvider } from "@/localization/LocaleProvider";
import { resetNavigationMocks } from "@test-utils/navigation";

const { NavbarSiderComponent } = await import("./index");

function renderSider(collapsed: boolean) {
  const store = createStore();
  store.set(siderCollapsedAtom, collapsed);

  const renderResult = render(
    <Provider store={store}>
      <LocaleProvider value="en-GB">
        <NavbarSiderComponent />
      </LocaleProvider>
    </Provider>,
  );

  return { store, renderResult };
}

describe("NavbarSiderComponent", () => {
  beforeEach(() => {
    resetNavigationMocks();
  });

  it("anchors the overlay to the viewport so it remains visible after scrolling", () => {
    const { store } = renderSider(true);

    act(() => {
      store.set(siderCollapsedAtom, false);
    });

    const navigation = screen.getByRole("navigation", { name: /navigation sidebar/i });
    expect(navigation.className).toContain("fixed!");
    expect(navigation.className).toContain("translate-x-0!");
  });
});
