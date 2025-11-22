import { act, fireEvent } from "@testing-library/react";

/**
 * Ensures React sees Ant Design click handlers as part of the current render tick.
 */
export async function clickWithAct(target: Document | Element | Window, init?: MouseEventInit) {
  await act(async () => {
    fireEvent.click(target, init);
  });
}
