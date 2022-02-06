import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DialogWindow } from "./DialogWindow";

export default {
  title: "Organisms/DialogWindow",
  component: DialogWindow,
} as ComponentMeta<typeof DialogWindow>;

const Template: ComponentStory<typeof DialogWindow> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <DialogWindow {...args} />
);

const openClose = (open: boolean): void => {
  // eslint-disable-next-line no-unused-expressions
  console.info("Toggle dialog", { open });
};

const item = {
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
};

export const DialogWindowSimple = Template.bind({});
DialogWindowSimple.args = {
  item,
  open: true,
  onOpenChange: openClose,
};

export const DialogWindowLong = Template.bind({});
DialogWindowLong.args = {
  item: {
    ...item,
    dialog: {
      ...item.dialog,
      text: `You don't want to kill all your dark areas they are very important. I really recommend you use odorless thinner or your spouse is gonna run you right out into the yard and you'll be working by yourself. There we go. There's nothing wrong with having a tree as a friend.

  You can create anything that makes you happy. If we're going to have animals around we all have to be concerned about them and take care of them. Just use the old one inch brush. We spend so much of our life looking - but never seeing. Here we're limited by the time we have.`,
    },
  },
  open: true,
};

export const DialogWindowTabs = Template.bind({});
DialogWindowTabs.args = {
  item: {
    ...item,
    dialog: {
      ...item.dialog,
      links: ["www.google.com", "www.youtube.com"],
    },
  },
  open: true,
};
