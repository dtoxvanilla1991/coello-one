import { describe, expect, it } from "bun:test";

const { getCheckoutReturnState } = await import("./getCheckoutReturnState");

describe("getCheckoutReturnState", () => {
  it("flags paid sessions as success", () => {
    const state = getCheckoutReturnState({
      status: "complete",
      payment_status: "paid",
    } as never);

    expect(state).toBe("success");
  });

  it("treats complete but unpaid sessions as processing", () => {
    const state = getCheckoutReturnState({
      status: "complete",
      payment_status: "unpaid",
    } as never);

    expect(state).toBe("processing");
  });

  it("marks open sessions as open", () => {
    const state = getCheckoutReturnState({
      status: "open",
    } as never);

    expect(state).toBe("open");
  });

  it("defaults to error when status is missing", () => {
    expect(getCheckoutReturnState(undefined)).toBe("error");
    expect(getCheckoutReturnState({ status: "expired" } as never)).toBe("error");
  });
});
