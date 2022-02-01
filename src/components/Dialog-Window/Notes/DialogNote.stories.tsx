/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DialogNote } from "./DialogNote";

export default {
  title: "Molecules/Dialog Content/Dialog Notes",
  component: DialogNote,
} as ComponentMeta<typeof DialogNote>;

const Template: ComponentStory<typeof DialogNote> = args => (
  <div style={{ height: "40%", width: "60%" }}>
    <DialogNote {...args} />
  </div>
);

export const DialogNoteSimple = Template.bind({});
DialogNoteSimple.args = {
  maxLength: 160,
  id: "myId",
};
