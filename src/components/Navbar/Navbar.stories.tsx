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
  navbarContent: [
    {
      title: "Temakart",
      content: <h1>Temakart section (should be empty)</h1>,
      ariaLabel: "Temakart",
    },
    {
      title: "Se notater",
      content: <h1>Notes section</h1>,
      ariaLabel: "Se notater",
    },
    { title: "Hjelp", content: <h1>Help section</h1>, ariaLabel: "Hjelp" },
    {
      title: "▰▰▰▰▱▱▱▱▱▱ 40%",
      content: <h1>Progress bar section</h1>,
      ariaLabel: "Progress bar",
    },
    { title: "©", content: <h1>Copyright info</h1>, ariaLabel: "Copyright" },
  ],
};
