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

export const DialogWindowSimple = Template.bind({});
DialogWindowSimple.args = {
  notes: "",
};
