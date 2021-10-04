import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { Arrow } from "./Arrow";
import { ArrowType } from "./Utils";

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

  it("nondirectional arrow should have icon when hovered over", () => {
    const arrow = render(
      <div data-testid="arrowTest">
        <Arrow
          start={{ x: 0, y: 0 }}
          end={{ x: 100, y: 0 }}
          arrowColor="#000000"
          circleColor="#FFFFFF"
          iconColor="#FFFFFF"
          type={ArrowType.NonDirectional}
          notes=""
          completed={false}
        />
      </div>,
    ).container;

    fireEvent.mouseOver(screen.getByTestId("ndArrow"));
    expect(arrow.querySelectorAll("svg").length).toBe(4);
  });

  it("bidirectional arrow should have icon when hovered over", () => {
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

    fireEvent.mouseOver(screen.getByTestId("bdArrow"));
    expect(arrow.querySelectorAll("svg").length).toBe(6);
  });

  it("directional arrow should have icon when hovered over", () => {
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

    fireEvent.mouseOver(screen.getByTestId("dArrow"));
    expect(arrow.querySelectorAll("svg").length).toBe(5);
  });

  it("NoneDirectional should have rendered button when the arrow is completed. ", () => {
    const arrow = render(
      <Arrow
        start={{ x: 0, y: 0 }}
        end={{ x: 100, y: 0 }}
        arrowColor="#000000"
        circleColor="#FFFFFF"
        iconColor="#FFFFFF"
        type={ArrowType.NonDirectional}
        notes=""
        // eslint-disable-next-line react/jsx-boolean-value
        completed={true}
      />,
    ).container;

    expect(arrow.querySelector("div")).toBeTruthy();
    expect(arrow.querySelectorAll("svg").length).toBe(4);
  });

  it("Directional should have rendered button when the arrow is completed. ", () => {
    const arrow = render(
      <Arrow
        start={{ x: 0, y: 0 }}
        end={{ x: 100, y: 0 }}
        arrowColor="#000000"
        circleColor="#FFFFFF"
        iconColor="#FFFFFF"
        type={ArrowType.Directional}
        notes=""
        // eslint-disable-next-line react/jsx-boolean-value
        completed={true}
      />,
    ).container;

    expect(arrow.querySelector("div")).toBeTruthy();
    expect(arrow.querySelectorAll("svg").length).toBe(5);
  });

  it("Bidirectional should have rendered button when the arrow is completed. ", () => {
    const arrow = render(
      <Arrow
        start={{ x: 0, y: 0 }}
        end={{ x: 100, y: 0 }}
        arrowColor="#000000"
        circleColor="#FFFFFF"
        iconColor="#FFFFFF"
        type={ArrowType.BiDirectional}
        notes=""
        // eslint-disable-next-line react/jsx-boolean-value
        completed={true}
      />,
    ).container;

    expect(arrow.querySelector("div")).toBeTruthy();
    expect(arrow.querySelectorAll("svg").length).toBe(6);
  });
});
