import { Image } from "./Image";

export type TopicMapItemType = {
  id: string;
  backgroundImage?: Image | undefined;
  label: string;
  xPercentagePosition: number;
  yPercentagePosition: number;
  heightPercentage: number;
  widthPercentage: number;
  dialog: {
    links: Array<string>;
    video: unknown;
    text: string;
  };
};
