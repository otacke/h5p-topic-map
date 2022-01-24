import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { DialogExternalResources } from "./ExternalResources";

export default {
  title: "molecules/Dialog Content/Dialog External Resources",
  component: DialogExternalResources,
} as ComponentMeta<typeof DialogExternalResources>;

const Template: ComponentStory<typeof DialogExternalResources> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <DialogExternalResources {...args} />
);

export const ExternalResource = Template.bind({});

ExternalResource.args = {
  url: "https://www.ndla.no",
  label: "External example",
};
