import { H5PField } from "./H5PField";
import { H5PFieldType } from "./H5PFieldType";


export type TopicMapData = H5PField | {

  type: H5PFieldType.Group;
};
