import { Arrow } from "./Arrow";
import { Image } from "./Image";
import { Position } from "./Position";

export type TopicMapElement = {
  backgroundImage: Image;
  connectedArrows: Array<Arrow>;
  height: number;
  position: Position;
  width: number;
};
