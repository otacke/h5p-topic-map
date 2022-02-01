import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { HelpSection } from "./HelpSection";

export default {
  title: "Molecules/Top Navbar/Help Section",
  component: HelpSection,
} as ComponentMeta<typeof HelpSection>;

const Template: ComponentStory<typeof HelpSection> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <HelpSection {...args} />
);

export const Help = Template.bind({});
Help.args = {};
