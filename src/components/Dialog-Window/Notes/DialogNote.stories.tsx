import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Note } from "./DialogNote";

export default {
  title: "Molecules/Dialog Content/Dialog Notes",
  component: Note,
} as ComponentMeta<typeof Note>;

const Template: ComponentStory<typeof Note> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Note {...args} />
);

export const NoteSimple = Template.bind({});
NoteSimple.args = {
  maxLength: 100,
  id: "myId",
};
