/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { NoteButton } from "./NoteButton";

export default {
  title: "Molecules/TopicMapItem/NoteButtons",
} as ComponentMeta<typeof NoteButton>;

const Template: ComponentStory<typeof NoteButton> = args => (
  <NoteButton {...args} />
);

export const CompletedButton = Template.bind({});
CompletedButton.args = {
  backgroundColor: "var(--theme-color-2)",
  borderColor: "white",
  iconColor: "white",
  buttonState: 0,
};

export const NotesButton = Template.bind({});
NotesButton.args = {
  backgroundColor: "var(--theme-color-2)",
  borderColor: "white",
  iconColor: "white",
  buttonState: 1,
};

export const DefaultButton = Template.bind({});
DefaultButton.args = {
  backgroundColor: "var(--theme-color-2)",
  borderColor: "white",
  iconColor: "white",
  buttonState: 2,
};
