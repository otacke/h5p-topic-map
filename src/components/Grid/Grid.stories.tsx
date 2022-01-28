/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Grid, GridProps } from "./Grid";
import { ArrowType } from "../../types/ArrowType";

export default {
  title: "Organisms/Grid",
  component: Grid,
} as ComponentMeta<typeof Grid>;

const defaultArgs: GridProps = {
  items: [],
  arrowItems: [],
  backgroundImage: undefined,
};

export const WithItems: ComponentStory<typeof Grid> = () => {
  const args: GridProps = {
    ...defaultArgs,
    items: [
      {
        id: "1",
        topicImage: {
          path: "https://images.unsplash.com/photo-1569587112025-0d460e81a126?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2370&q=80",
          alt: "",
        },
        label: "Sheep in the distance",
        description: "",
        widthPercentage: 50,
        heightPercentage: 25,
        xPercentagePosition: 3,
        yPercentagePosition: 5,
        dialog: {
          text: "Dialog text",
        },
      },
      {
        id: "2",
        topicImage: {
          path: "https://images.unsplash.com/photo-1533415648777-407b626eb0fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80",
          alt: "",
        },
        label: "Sheep close up",
        description: "",
        widthPercentage: 30,
        heightPercentage: 60,
        xPercentagePosition: 50,
        yPercentagePosition: 30,
        dialog: {
          text: "Dialog text",
        },
      },
      {
        id: "3",
        topicImage: {
          path: "",
          alt: "",
        },
        label: "",
        description: "",
        widthPercentage: 10,
        heightPercentage: 10,
        xPercentagePosition: 20,
        yPercentagePosition: 40,
        dialog: {
          text: "Dialog text",
        },
      },
    ],
    arrowItems: [
      {
        arrowType: ArrowType.BiDirectional,
        startElementId: "1",
        endElementId: "2",
        id: "arrow-1",
        label: "Sheep in the distance ⟶ Sheep close up",
        dialog: {
          text: "Dialog text",
        },
      },
    ],
  };
  return <Grid {...args} />;
};
export const WithoutItems: ComponentStory<typeof Grid> = () => {
  const args: GridProps = { ...defaultArgs };
  return <Grid {...args} />;
};
