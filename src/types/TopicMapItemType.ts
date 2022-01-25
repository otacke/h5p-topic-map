import type { CommonItemType } from "./CommonItemType";
import type { Image } from "./H5P/Image";

export type TopicMapItemType = CommonItemType & {
  label: string;
  description: string | undefined;
  backgroundImage?: Image | undefined;
};
