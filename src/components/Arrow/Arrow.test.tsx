import { render } from "@testing-library/react";
import * as React from "react";
import { Arrow, ArrowType } from "./Arrow";

describe(Arrow.name, () => {
  it("should render", () => {
    const arrow = render(
      <Arrow
        start={{ x: 0, y: 0 }}
        end={{ x: 100, y: 0 }}
        color="#000000"
        type={ArrowType.Directional}
      />,
    ).container;

    expect(arrow.querySelector("div")).toBeTruthy();
    expect(arrow.querySelectorAll("svg").length).toBe(2);
  });

  it("should add two arrow heads if the arrow is bidirectional", () => {
    const arrow = render(
      <Arrow
        start={{ x: 0, y: 0 }}
        end={{ x: 100, y: 0 }}
        color="#000000"
        type={ArrowType.BiDirectional}
      />,
    ).container;

    expect(arrow.querySelector("div")).toBeTruthy();
    expect(arrow.querySelectorAll("svg").length).toBe(3);
  });

  it("should render", () => {
    const arrow = render(
      <Arrow
        start={{ x: 0, y: 0 }}
        end={{ x: 100, y: 0 }}
        color="#000000"
        type={ArrowType.NonDirectional}
      />,
    ).container;

    expect(arrow.querySelector("div")).toBeTruthy();
    expect(arrow.querySelectorAll("svg").length).toBe(1);
  });
});
