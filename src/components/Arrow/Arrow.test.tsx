import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { ArrowDirection } from "../../types/ArrowDirection";
import { ArrowItemType } from "../../types/ArrowItemType";
import { ArrowType } from "../../types/ArrowType";
import { Arrow } from "./Arrow";

describe(Arrow.name, () => {
  let item: ArrowItemType;

  beforeEach(() => {
    item = {
      arrowDirection: ArrowDirection.Right,
      arrowType: ArrowType.Directional,
      topicImage: {
        path: "https://images.unsplash.com/photo-1621246308836-ea7d366c2795?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
        alt: "Lighthouse on the coast of the Azores",
        copyright: {
          author: "Damir Babacic",
          license: "Unsplash License",
          source: "https://unsplash.com/photos/kOO1g6HwMU0",
          title: "Welcome to Azores ✨",
          version: "1",
          year: "2021",
        },
      },
      dialogOrDirectLink: "dialog",
      id: "id-1",
      heightPercentage: 100,
      widthPercentage: 100,
      xPercentagePosition: 0,
      yPercentagePosition: 0,
      description:
        "The Autonomous Region of the Azores (Região Autónoma dos Açores) is one of the two autonomous regions of Portugal (along with Madeira) (Wikipedia)",
      dialog: {},
    };
  });

  it("should have a body and an arrow head if the arrow is directional.", () => {
    const arrow = render(
      <Arrow
        start={{ x: 0, y: 0 }}
        end={{ x: 100, y: 0 }}
        arrowColor="#000000"
        circleColor="#FFFFFF"
        iconColor="#FFFFFF"
        item={item}
        notes=""
        completed={false}
      />,
    ).container;

    expect(arrow.querySelector("div")).toBeTruthy();
    expect(arrow.querySelectorAll("svg").length).toBe(5);
  });

  it("should add two arrow heads if the arrow is bidirectional.", () => {
    item.arrowType = ArrowType.BiDirectional;

    const arrow = render(
      <Arrow
        start={{ x: 0, y: 0 }}
        end={{ x: 100, y: 0 }}
        arrowColor="#000000"
        circleColor="#FFFFFF"
        iconColor="#FFFFFF"
        item={item}
        notes=""
        completed={false}
      />,
    ).container;

    expect(arrow.querySelector("div")).toBeTruthy();
    expect(arrow.querySelectorAll("svg").length).toBe(6);
  });

  it("should only have one svg, the arrow body, if the arrow is nondirectional.", () => {
    item.arrowType = ArrowType.NonDirectional;

    const arrow = render(
      <Arrow
        start={{ x: 0, y: 0 }}
        end={{ x: 100, y: 0 }}
        arrowColor="#000000"
        circleColor="#FFFFFF"
        iconColor="#FFFFFF"
        item={item}
        notes=""
        completed={false}
      />,
    ).container;

    expect(arrow.querySelector("div")).toBeTruthy();
    expect(arrow.querySelectorAll("svg").length).toBe(4);
  });

  it("should show a button while hovered over when it is nondirectional.", () => {
    item.arrowType = ArrowType.NonDirectional;

    const arrow = render(
      <Arrow
        start={{ x: 0, y: 0 }}
        end={{ x: 100, y: 0 }}
        arrowColor="#000000"
        circleColor="#FFFFFF"
        iconColor="#FFFFFF"
        item={item}
        notes=""
        completed={false}
      />,
    ).container;

    fireEvent.mouseOver(screen.getByTestId("ndArrow"));
    expect(arrow.querySelectorAll("svg").length).toBe(4);
  });

  it("should show a button while hovered over when it is directional.", () => {
    const arrow = render(
      <Arrow
        start={{ x: 0, y: 0 }}
        end={{ x: 100, y: 0 }}
        arrowColor="#000000"
        circleColor="#FFFFFF"
        iconColor="#FFFFFF"
        item={item}
        notes=""
        completed={false}
      />,
    ).container;

    fireEvent.mouseOver(screen.getByTestId("dArrow"));
    expect(arrow.querySelectorAll("svg").length).toBe(5);
  });

  it("should render button when completed when it is nondirectional.", () => {
    item.arrowType = ArrowType.NonDirectional;

    const arrow = render(
      <Arrow
        start={{ x: 0, y: 0 }}
        end={{ x: 100, y: 0 }}
        arrowColor="#000000"
        circleColor="#FFFFFF"
        iconColor="#FFFFFF"
        item={item}
        notes=""
        completed
      />,
    ).container;

    expect(arrow.querySelector("div")).toBeTruthy();
    expect(arrow.querySelectorAll("svg").length).toBe(4);
  });

  it("should render button when completed when it is directional.", () => {
    const arrow = render(
      <Arrow
        start={{ x: 0, y: 0 }}
        end={{ x: 100, y: 0 }}
        arrowColor="#000000"
        circleColor="#FFFFFF"
        iconColor="#FFFFFF"
        item={item}
        notes=""
        completed
      />,
    ).container;

    expect(arrow.querySelector("div")).toBeTruthy();
    expect(arrow.querySelectorAll("svg").length).toBe(5);
  });

  it("should render button when completed when it is bidirectional.", () => {
    item.arrowType = ArrowType.BiDirectional;

    const arrow = render(
      <Arrow
        start={{ x: 0, y: 0 }}
        end={{ x: 100, y: 0 }}
        arrowColor="#000000"
        circleColor="#FFFFFF"
        iconColor="#FFFFFF"
        notes=""
        item={item}
        completed
      />,
    ).container;

    expect(arrow.querySelector("div")).toBeTruthy();
    expect(arrow.querySelectorAll("svg").length).toBe(6);
  });
});
