import * as React from "react";
import { render } from "@testing-library/react";
import { DialogWindow } from "./DialogWindow";

describe(DialogWindow.name, () => {
  it("should render", () => {
    const dialogWindow = render(
      <DialogWindow notes="test" title="dialog-window-test" />,
    ).container;

    setTimeout(() => {
      expect(dialogWindow.querySelector("div")).toBeTruthy();
    }, 5000);
  });
});
