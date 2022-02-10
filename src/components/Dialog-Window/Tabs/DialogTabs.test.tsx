import { render } from "@testing-library/react";
import * as React from "react";
import { DialogTabs } from "./DialogTabs";

describe(DialogTabs.name, () => {
  it("should have rendered.", () => {
    const tabs = render(
      <DialogTabs tabContents={{ text: "" }} id="test" />,
    ).container;

    expect(tabs.querySelector("div")).toBeTruthy();
  });
});
