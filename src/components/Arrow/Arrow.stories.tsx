/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Arrow, ArrowType } from "./Arrow";

const blue = "#114df3";
const red = "#df0c0c";

export default {
  title: "Arrow",
  component: Arrow,
  argTypes: {
    type: {
      // prettier-ignore
      // prettier removes the button titles.
      options: {"Directional": ArrowType.Directional, "BiDirectional": ArrowType.BiDirectional, "NonDirectional": ArrowType.NonDirectional},
      control: { type: "radio" },
    },
  },
} as ComponentMeta<typeof Arrow>;

const Template: ComponentStory<typeof Arrow> = args => <Arrow {...args} />;

export const RightDirectionalArrow = Template.bind({});
RightDirectionalArrow.args = {
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 100,
    y: 0,
  },
  color: blue,
  type: ArrowType.Directional,
};

export const BidirectionalHorizontalArrow = Template.bind({});
BidirectionalHorizontalArrow.args = {
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 100,
    y: 0,
  },
  color: red,
  type: ArrowType.BiDirectional,
};

export const UpDirectionalArrow = Template.bind({});
UpDirectionalArrow.args = {
  start: {
    x: 0,
    y: 100,
  },
  end: {
    x: 0,
    y: 0,
  },
  color: blue,
  type: ArrowType.Directional,
};

export const NonDirectionalVerticalArrow = Template.bind({});
NonDirectionalVerticalArrow.args = {
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 0,
    y: 100,
  },
  color: red,
  type: ArrowType.NonDirectional,
};
