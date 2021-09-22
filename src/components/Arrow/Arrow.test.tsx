import { render } from "@testing-library/react";
import * as React from "react";
import { Arrow } from "./Arrow";

describe(Arrow.name, () => {
  it("should render", () => {
    const arrow = render(
      <Arrow start={{ x: 0, y: 0 }} end={{ x: 100, y: 0 }} color="#000000" />,
    ).container;

    expect(arrow.querySelector("div")).toBeTruthy();
  });
});
