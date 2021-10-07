import { Image } from "./Image";

export type TopicMapItemType = {
  id: string;
  backgroundImage?: Image | undefined;
  label: string;
  links: Array<string>;
  xPercentagePosition: number;
  yPercentagePosition: number;
  heightPercentage: number;
  widthPercentage: number;
};
