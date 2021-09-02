import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TopicMapItem, TopicMapItemProps } from "./TopicMapItem";

export default {
  title: "TopicMapItem",
  component: TopicMapItem,
} as ComponentMeta<typeof TopicMapItem>;

const Template: ComponentStory<typeof TopicMapItem> = args => (
  <TopicMapItem {...args} />
);

export const Default = Template.bind({});
Default.args = {
  backgroundImage: {
    alt: "",
    aspectRatio: 1920 / 1080,
    url: "https://source.unsplash.com/daily/",
  },
  title: "Title",
  editAction: () => {},
} as TopicMapItemProps;
