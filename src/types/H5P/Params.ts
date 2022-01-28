import { ArrowItemType } from "../ArrowItemType";
import { ColorTheme } from "../ColorTheme";
import { TopicMapItemType } from "../TopicMapItemType";
import { Translations } from "../Translations";
import { Image } from "./Image";

export type Params = Readonly<{
  behaviour?: unknown;

  topicMap?: {
    topicMapItems?: Array<TopicMapItemType>;
    arrowItems?: Array<ArrowItemType>;

    appearance?: {
      backgroundImage?: Image;
      colorTheme?: ColorTheme;
    };
  };

  l10n?: Translations;
}>;
