/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Arrow, ArrowProps } from "./Arrow";

const blue = "#114df3";
const red = "#df0c0c";

export default {
  title: "Arrow",
  component: Arrow,
  argTypes: {
    color: {
      default: "#000000",
      control: "color",
    },
  },
} as ComponentMeta<typeof Arrow>;

const Template: ComponentStory<typeof Arrow> = args => <Arrow {...args} />;

export const RightPointingArrow = Template.bind({});
RightPointingArrow.args = {
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 100,
    y: 0,
  },
  color: blue,
};

export const LeftPointingArrow = Template.bind({});
LeftPointingArrow.args = {
  start: {
    x: 100,
    y: 0,
  },
  end: {
    x: 0,
    y: 0,
  },
  color: red,
};

export const UpPointingArrow = Template.bind({});
UpPointingArrow.args = {
  start: {
    x: 0,
    y: 100,
  },
  end: {
    x: 0,
    y: 0,
  },
  color: red,
};

export const DownPointingArrow = Template.bind({});
DownPointingArrow.args = {
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 0,
    y: 100,
  },
  color: red,
};
