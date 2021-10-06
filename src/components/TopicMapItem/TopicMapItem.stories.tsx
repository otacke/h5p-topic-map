/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TopicMapItem, TopicMapItemProps } from "./TopicMapItem";

export default {
  title: "Organisms/TopicMapItem",
  component: TopicMapItem,
} as ComponentMeta<typeof TopicMapItem>;

const defaultArgs: TopicMapItemProps = {
  backgroundImage: {
    alt: "",
    path: "https://source.unsplash.com/daily/",
  },
  title: "Title",
  editAction: console.info,
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
