import { Image } from "./Image";
import { Position } from "./Position";

export type TopicMapElement = {
  start: Position;
  end: Position;
  backgroundImage: Image;
  connectedArrows: Array<Arrow>;
};
