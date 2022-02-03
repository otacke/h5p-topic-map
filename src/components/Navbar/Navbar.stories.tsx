import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Navbar } from "./Navbar";

export default {
  title: "Molecules/Navbar/Navbar",
  component: Navbar,
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Navbar {...args} />
);

export const NavBar = Template.bind({});
NavBar.args = {
  navbarTitle: "Nasjonalromantikken",
};
