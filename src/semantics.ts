import { Behaviour } from "./types/Behaviour";
import { H5PFieldType } from "./types/H5PFieldType";
import { L10n } from "./types/L10n";
import { TopicMapData } from "./types/TopicMapData";

const semantics: Readonly<[TopicMapData, Behaviour, L10n]> = [
  {
    name: "topicMap",
    type: H5PFieldType.Group,
    widget: "topicMap",
    label: "Topic map editor",
    importance: "high",
    fields: [],
  },
  {},
  {},
];

export default semantics;
