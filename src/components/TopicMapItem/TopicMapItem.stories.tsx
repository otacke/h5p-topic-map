/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TopicMapItem, TopicMapItemProps } from "./TopicMapItem";
import { TopicMapItemType } from "../../types/TopicMapItemType";

export default {
  title: "Molecules/TopicMapItem",
  component: TopicMapItem,
} as ComponentMeta<typeof TopicMapItem>;

const item: TopicMapItemType = {
  label: "The Azores",
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

const defaultArgs: TopicMapItemProps = {
  item,
};

export const NoContainer: ComponentStory<typeof TopicMapItem> = () => {
  const args: TopicMapItemProps = { ...defaultArgs };
  return <TopicMapItem {...args} />;
};

export const Square: ComponentStory<typeof TopicMapItem> = () => {
  const args: TopicMapItemProps = { ...defaultArgs };
  return (
    <div
      style={{
        height: "min(95vw, 95vh)",
        width: "min(95vw, 95vh)",
      }}
    >
      <TopicMapItem {...args} />
    </div>
  );
};

export const Wide: ComponentStory<typeof TopicMapItem> = () => {
  const args: TopicMapItemProps = { ...defaultArgs };
  return (
    <div
      style={{
        height: "min(40vw, 40vh)",
        width: "min(95vw, 95vh)",
      }}
    >
      <TopicMapItem {...args} />
    </div>
  );
};

export const Tall: ComponentStory<typeof TopicMapItem> = () => {
  const args: TopicMapItemProps = { ...defaultArgs };
  return (
    <div
      style={{
        height: "min(95vw, 95vh)",
        width: "min(40vw, 40vh)",
      }}
    >
      <TopicMapItem {...args} />
    </div>
  );
};

export const WithLink: ComponentStory<typeof TopicMapItem> = () => {
  const args: TopicMapItemProps = {
    ...defaultArgs,
    ...{
      item: {
        ...item,
        dialogOrDirectLink: "directLink",
        directLink: "https://unsplash.com/photos/kOO1g6HwMU0",
      },
    },
  };
  return (
    <div
      style={{
        height: "min(95vw, 95vh)",
        width: "min(95vw, 95vh)",
      }}
    >
      <TopicMapItem {...args} />
    </div>
  );
};
