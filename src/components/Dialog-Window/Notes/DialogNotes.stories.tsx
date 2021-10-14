import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Notes } from "./DialogNotes";

export default {
  title: "DialogContent/DialogNotes",
  component: Notes,
} as ComponentMeta<typeof Notes>;

const Template: ComponentStory<typeof Notes> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Notes {...args} />
);

export const NotesSimple = Template.bind({});
NotesSimple.args = {
  notes: "Notes",
};
