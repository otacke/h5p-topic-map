import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DialogWindow } from "./DialogWindow";

export default {
  title: "Organisms/DialogWindow",
  component: DialogWindow,
} as ComponentMeta<typeof DialogWindow>;

const Template: ComponentStory<typeof DialogWindow> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <DialogWindow {...args} />
);

export const DialogWindowSimple = Template.bind({});
DialogWindowSimple.args = {
  title: "Title",
  notes: "Notes",
};

export const DialogWindowLong = Template.bind({});
DialogWindowLong.args = {
  title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  notes:
    " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper mollis dolor." +
    "Ut laoreet massa eu ex egestas porta. Proin eget laoreet ligula. Nullam ultrices neque at" +
    " mi interdum sollicitudin. Morbi ut ipsum at sem dictum finibus vitae nec erat. Ut lacus " +
    "nibh, convallis ut viverra a, feugiat tincidunt velit. Aenean quis orci ut neque suscipit" +
    " mattis ut a ante. Cras et metus mattis, porta neque at, tempus lectus.\n\nMaecenas fauci" +
    "bus nisl felis, ac dapibus magna elementum porttitor. Curabitur molestie, mi id accumsan " +
    "euismod, neque lorem tristique orci, quis bibendum nunc quam sit amet turpis. In hac habi" +
    "tasse platea dictumst. Integer ut ullamcorper tellus, quis sagittis enim. Maecenas in ris" +
    "us at quam commodo pretium. Morbi molestie congue eros, ut auctor velit tristique id. Cur" +
    "abitur eu pharetra mi. Curabitur ex felis, bibendum at quam mollis, sollicitudin laoreet " +
    "nibh. Nam aliquam efficitur elit in tempus. Duis sed ipsum vel nisl interdum porttitor. N" +
    "unc finibus euismod sollicitudin. ",
};
