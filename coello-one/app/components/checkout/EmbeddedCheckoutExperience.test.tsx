import { afterEach, describe, expect, it, vi } from "bun:test";
import { render, screen, waitFor } from "@testing-library/react";

vi.mock("@/components/CheckoutForm", () => ({
  CheckoutForm: ({ clientSecret }: { clientSecret: string }) => (
    <div data-testid="checkout-form">{clientSecret}</div>
  ),
}));

const { EmbeddedCheckoutExperience } = await import("./EmbeddedCheckoutExperience");

describe("EmbeddedCheckoutExperience", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("requests a client secret on mount", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ clientSecret: "cs_test" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    render(<EmbeddedCheckoutExperience />);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(screen.getByTestId("checkout-form").textContent).toContain("cs_test");
  });

  it("surfaces an error when the API call fails", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ error: "Server error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }),
    );

    render(<EmbeddedCheckoutExperience />);

    await waitFor(() =>
      expect(screen.getByText(/unable to load the secure checkout experience/i)).toBeTruthy(),
    );
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(screen.getByRole("button", { name: /retry checkout/i })).toBeTruthy();
  });
});
