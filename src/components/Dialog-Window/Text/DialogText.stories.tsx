import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { DialogText } from "./DialogText";

export default {
  title: "molecules/Dialog Content/Dialog Text",
  component: DialogText,
} as ComponentMeta<typeof DialogText>;

const Template: ComponentStory<typeof DialogText> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <DialogText {...args} />
);

export const SimpleText = Template.bind({});

SimpleText.args = {
  text: (
    <>
      <b>
        Den franske revolusjon var en periode med store sosiale og politiske
        omveltningene i Frankrike i perioden 1789-1799. Året 1789 markerer det
        første viktige vendepunktet under revolusjonen. 14. juli dette året brøt
        det ut masseopprør i Paris og fengselet Bastillen ble stormet.
      </b>
      <br />
      <p>
        Perioden 1787-1789 kalles gjerne førrevolusjonen, men langsiktige
        årsaker til revolusjonen strekker seg naturligvis mye lenger tilbake i
        tid. De viktigste politiske, sosiale og administrative omveltninger
        skjedde i perioden 1789-1794.
      </p>
      <br />
      <img
        alt="test-img"
        style={{ width: "100%" }}
        src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Norwegian_digital_learning_arena.jpg"
      />
    </>
  ),
};
