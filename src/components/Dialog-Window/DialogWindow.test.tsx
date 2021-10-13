import * as React from "react";
import { getByText, render } from "@testing-library/react";
import { DialogWindow } from "./DialogWindow";

const onOpenChange = console.info;

describe(DialogWindow.name, () => {
  it("should render", () => {
    const dialogWindow = render(
      <DialogWindow
        notes="test"
        title="dialog-window-test"
        open={false}
        onOpenChange={onOpenChange}
      />,
    ).container;

    setTimeout(() => {
      expect(dialogWindow.querySelector("div")).toBeTruthy();
    }, 100);
  });

  it("should render the correct title", () => {
    const dialogWindow = render(
      <DialogWindow
        notes="test"
        title="dialog-window-test"
        open={false}
        onOpenChange={onOpenChange}
      />,
    ).container;

    setTimeout(() => {
      expect(getByText(dialogWindow, "dialog-window-test")).toBeTruthy();
    }, 100);
  });
});
