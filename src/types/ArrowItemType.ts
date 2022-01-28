import { ArrowType } from "./ArrowType";
import { CommonItemType } from "./CommonItemType";

export type ArrowItemType = CommonItemType & {
  /** The arrow type */
  arrowType: ArrowType;

  startElementId: string;
  endElementId: string;
};
