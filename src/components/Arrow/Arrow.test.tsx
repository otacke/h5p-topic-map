import { render } from "@testing-library/react";
import * as React from "react";
import { Arrow, ArrowType } from "./Arrow";

describe(Arrow.name, () => {
  it("should have a body and an arrow head if the arrow is directional.", () => {
    const arrow = render(
      <Arrow
        start={{ x: 0, y: 0 }}
        end={{ x: 100, y: 0 }}
        arrowColor="#000000"
        circleColor="#FFFFFF"
        iconColor="#FFFFFF"
        type={ArrowType.Directional}
        notes=""
        completed={false}
      />,
    ).container;

    expect(arrow.querySelector("div")).toBeTruthy();
    expect(arrow.querySelectorAll("svg").length).toBe(2);
  });

  it("should add two arrow heads if the arrow is bidirectional.", () => {
    const arrow = render(
      <Arrow
        start={{ x: 0, y: 0 }}
        end={{ x: 100, y: 0 }}
        arrowColor="#000000"
        circleColor="#FFFFFF"
        iconColor="#FFFFFF"
        type={ArrowType.BiDirectional}
        notes=""
        completed={false}
      />,
    ).container;

    expect(arrow.querySelector("div")).toBeTruthy();
    expect(arrow.querySelectorAll("svg").length).toBe(3);
  });

  it("should only have one svg, the arrow body, if the arrow is nondirectional.", () => {
    const arrow = render(
      <Arrow
        start={{ x: 0, y: 0 }}
        end={{ x: 100, y: 0 }}
        arrowColor="#000000"
        circleColor="#FFFFFF"
        iconColor="#FFFFFF"
        type={ArrowType.NonDirectional}
        notes=""
        completed={false}
      />,
    ).container;

    expect(arrow.querySelector("div")).toBeTruthy();
    expect(arrow.querySelectorAll("svg").length).toBe(1);
  });
});
