/* eslint-disable react/jsx-props-no-spreading */
import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { ArrowDirection } from "../../types/ArrowDirection";
import { ArrowItemType } from "../../types/ArrowItemType";
import { ArrowType } from "../../types/ArrowType";
import { Arrow } from "./Arrow";

const blue = "#59A0FF";
const white = "#FFFFFF";
const black = "#3E3E3E";

const item: ArrowItemType = {
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
  description:
    "The Autonomous Region of the Azores (Região Autónoma dos Açores) is one of the two autonomous regions of Portugal (along with Madeira) (Wikipedia)",
  dialog: {},
  startElementId: "start",
  endElementId: "end",
};

export default {
  title: "Organisms/Arrow",
  component: Arrow,

  args: {
    item,
  },
} as ComponentMeta<typeof Arrow>;

const Template: ComponentStory<typeof Arrow> = args => <Arrow {...args} />;

export const RightDirectionalEmptyArrow = Template.bind({});
RightDirectionalEmptyArrow.args = {
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 100,
    y: 0,
  },
  arrowColor: blue,
  circleColor: white,
  iconColor: black,
  notes: "Test note 1",
  completed: false,
};

export const LeftDirectionalCompletedArrow = Template.bind({});
LeftDirectionalCompletedArrow.args = {
  start: {
    x: 100,
    y: 0,
  },
  end: {
    x: 0,
    y: 0,
  },
  arrowColor: blue,
  circleColor: white,
  iconColor: black,
  notes: "This note is completed",
  completed: true,
};

export const BidirectionalHorizontalEmptyArrow = Template.bind({});
BidirectionalHorizontalEmptyArrow.args = {
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 100,
    y: 0,
  },
  arrowColor: blue,
  circleColor: white,
  iconColor: black,
  notes: "Test note 2",
  completed: false,
};

export const UpDirectionalEditedArrow = Template.bind({});
UpDirectionalEditedArrow.args = {
  start: {
    x: 0,
    y: 100,
  },
  end: {
    x: 0,
    y: 0,
  },
  arrowColor: blue,
  circleColor: white,
  iconColor: black,
  notes: "This note is started, but not marked complete",
  completed: false,
};

export const NonDirectionalVerticalEmptyArrow = Template.bind({});
NonDirectionalVerticalEmptyArrow.args = {
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 0,
    y: 100,
  },
  arrowColor: blue,
  circleColor: white,
  iconColor: black,
  notes: "",
  completed: false,
};
