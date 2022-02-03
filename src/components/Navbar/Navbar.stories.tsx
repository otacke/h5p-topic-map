import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Navbar } from "./Navbar";
import { TranslationKey } from "../../types/TranslationKey";

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
      title: "Topic map" as TranslationKey,
      content: <h1>Temakart section (should be empty)</h1>,
      ariaLabel: "Topic map" as TranslationKey,
    },
    {
      title: "See notes" as TranslationKey,
      content: <h1>Notes section</h1>,
      ariaLabel: "See notes" as TranslationKey,
    },
    {
      title: "Help" as TranslationKey,
      content: <h1>Help section</h1>,
      ariaLabel: "Help" as TranslationKey,
    },
    {
      title: "▰▰▰▰▱▱▱▱▱▱ 40%",
      content: <h1>Progress bar section</h1>,
      ariaLabel: "Progress bar" as TranslationKey,
    },
    {
      title: "©",
      content: <h1>Copyright info</h1>,
      ariaLabel: "Copyright" as TranslationKey,
    },
  ],
};
