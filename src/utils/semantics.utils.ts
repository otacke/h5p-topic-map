import { ColorTheme } from "../types/ColorTheme";
import { H5PField } from "../types/H5P/H5PField";
import { H5PFieldType } from "../types/H5P/H5PFieldType";
import { H5PShowWhenRule } from "../types/H5P/H5PShowWhenRule";
import { Params } from "../types/H5P/Params";
import { Translations } from "../types/Translations";

export const itemDialog = (showWhenRule: H5PShowWhenRule): Array<H5PField> => [
  {
    label: "Dialog",
    name: "dialog",
    type: H5PFieldType.Group,
    widget: "NDLAShowWhen",
    showWhen: {
      rules: [showWhenRule],
    },
    fields: [
      {
        label: "Text",
        name: "text",
        type: H5PFieldType.Text,
        widget: "html",
        optional: true,
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
          type: H5PFieldType.Text,
        },
      },
    ],
  },
];

export const dialogOrDirectLink = (): Array<H5PField> => {
  const options = {
    dialog: {
      value: "dialog",
      label: "Dialog",
    },
    directLink: {
      value: "directLink",
      label: "Direct link",
    },
  };

  const showDialogOrDirectLinkRuleFieldName = "dialogOrDirectLink";
  const showDialogRule: H5PShowWhenRule = {
    field: showDialogOrDirectLinkRuleFieldName,
    equals: [options.dialog.value],
  };

  const showDirectLinkRule: H5PShowWhenRule = {
    field: showDialogOrDirectLinkRuleFieldName,
    equals: [options.directLink.value],
  };

  return [
    {
      label: "Dialog or direct link",
      description:
        "A click on the item might either open a dialog containing information, or open a URL in another window",
      name: showDialogOrDirectLinkRuleFieldName,
      type: H5PFieldType.Select,
      options: Object.values(options),
      default: options.dialog.value,
    },

    ...itemDialog(showDialogRule),

    {
      label: "Direct link",
      name: "directLink",
      type: H5PFieldType.Text,
      widget: "NDLAShowWhen",
      showWhen: { rules: [showDirectLinkRule] },
    },
  ];
};

export const colorThemes: Array<{ label: string; value: string }> =
  Object.entries(ColorTheme).map(([label, value]) => ({ label, value }));

export const defaultTheme = ColorTheme.Blue;

export const getEmptyParams = (): Required<Params> => {
  return {
    topicMap: {
      topicMapItems: [],
      appearance: {
        colorTheme: defaultTheme,
      },
    },
    behaviour: null,
    l10n: {} as Translations,
  };
};
