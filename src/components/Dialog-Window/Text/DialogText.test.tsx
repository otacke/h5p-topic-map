import { render } from "@testing-library/react";
import * as React from "react";
import { DialogText } from "./DialogText";

describe(DialogText.name, () => {
  it("Should have rendered", () => {
    const text = render(<DialogText text={<div />} />).container;

    expect(text.querySelector("div"));
  });
});
