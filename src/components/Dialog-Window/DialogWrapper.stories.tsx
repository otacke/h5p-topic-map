import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DialogWindow } from "./DialogWindow";
import { DialogTestWrapper } from "./DialogWrapper";

export default {
  title: "Organisms/DialogWindowWrapper",
  component: DialogWindow,
} as ComponentMeta<typeof DialogWindow>;

const Template: ComponentStory<typeof DialogTestWrapper> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <DialogTestWrapper {...args} />
);

export const DialogWrapperSimple = Template.bind({});
DialogWrapperSimple.args = {
  modal: <DialogWindow notes="" />,
};
