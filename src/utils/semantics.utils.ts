import { ColorTheme } from "../types/ColorTheme";
import { H5PField } from "../types/H5P/H5PField";
import { H5PFieldType } from "../types/H5P/H5PFieldType";
import { Params } from "../types/H5P/Params";
import { Translations } from "../types/Translations";

export const itemDialog: Array<H5PField> = [
  {
    label: "Dialog",
    name: "dialog",
    type: H5PFieldType.Group,
    fields: [
      {
        label: "Show notes textarea",
        name: "hasNote",
        type: H5PFieldType.Boolean,
        default: true,
      },
      {
        label: "Maximum number of words",
        description:
          "Specifies the maximum number of words for the note. Default is 160 words.",
        name: "maxWordCount",
        type: H5PFieldType.Number,
        optional: true,
        default: 160,
      },
      {
        label: "Text",
        name: "text",
        type: H5PFieldType.Text,
        widget: "html",
        optional: true,
        tags: ["p", "br", "strong", "em", "a"],
      },
      {
        label: "Video",
        name: "video",
        type: H5PFieldType.Video,
        optional: true,
      },
      {
        label: "Audio",
        name: "audio",
        type: H5PFieldType.Group,
        optional: true,
        importance: "low",
        fields: [
          {
            label: "Audio",
            name: "audioFile",
            type: H5PFieldType.Audio,
          },
          {
            label: "Subtext",
            name: "subtext",
            type: H5PFieldType.Text,
            widget: "html",
            optional: true,
            tags: ["p", "br", "strong", "em"],
          },
        ],
      },
      {
        label: "Links",
        name: "links",
        description:
          "These links are as auxiliary links for the user in the element's modal window",
        type: H5PFieldType.List,
        optional: true,
        entity: "linkItem",
        field: {
          label: "Link",
          name: "link",
          type: H5PFieldType.Group,
          fields: [
            {
              label: "Id",
              name: "id",
              type: H5PFieldType.Text,
              widget: "uuid",
            },
            {
              label: "Label",
              name: "label",
              type: H5PFieldType.Text,
            },
            {
              label: "Url",
              name: "url",
              type: H5PFieldType.Text,
            },
          ],
        },
      },
      {
        label: "Show add links option",
        name: "showAddLinks",
        type: H5PFieldType.Boolean,
        default: false,
      },
    ],
  },
];

export const colorThemes: Array<{ label: string; value: string }> =
  Object.entries(ColorTheme).map(([label, value]) => ({ label, value }));

export const defaultTheme = ColorTheme.Blue;

export const getEmptyParams = (): Required<Params> => {
  return {
    topicMap: {
      topicMapItems: [],
      colorTheme: defaultTheme,
    },
    behaviour: null,
    l10n: {} as Translations,
  };
};
