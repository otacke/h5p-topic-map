import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { Audio } from "./DialogAudio";

export default {
  title: "Molecules/Dialog Content/Dialog Audio",
  component: Audio,
} as ComponentMeta<typeof Audio>;

const Template: ComponentStory<typeof Audio> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Audio {...args} />
);

export const NoteSimple = Template.bind({});

NoteSimple.args = {
  audioTrack: { path: "https://bigsoundbank.com/UPLOAD/mp3/0001.mp3" },
  description: "Lyd: Opplesning av en tale fra den franske revolusjonen 1789",
  subText: (
    <>
      <h4>
        Den franske revolusjon var en periode med store sosiale og politiske
        omveltningene i Frankrike i perioden 1789-1799. Året 1789 markerer det
        første viktige vendepunktet under revolusjonen. 14. juli dette året brøt
        det ut masseopprør i Paris og fengselet Bastillen ble stormet.
      </h4>
      <br />
      <p>
        Perioden 1787-1789 kalles gjerne førrevolusjonen, men langsiktige
        årsaker til revolusjonen strekker seg naturligvis mye lenger tilbake i
        tid. De viktigste politiske, sosiale og administrative omveltninger
        skjedde i perioden 1789-1794.
      </p>
    </>
  ),
};
