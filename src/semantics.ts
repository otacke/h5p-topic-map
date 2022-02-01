import { ColorTheme } from "./types/ColorTheme";
import { H5PBehaviour } from "./types/H5P/H5PBehaviour";
import { H5PFieldGroup } from "./types/H5P/H5PField";
import { H5PFieldType } from "./types/H5P/H5PFieldType";
import { H5PL10n } from "./types/H5P/H5PL10n";
import { colorThemes, itemDialog } from "./utils/semantics.utils";

export const semantics: Readonly<[H5PFieldGroup, H5PBehaviour, H5PL10n]> = [
  {
    label: "Topic map editor",
    name: "topicMap",
    type: H5PFieldType.Group,
    widget: "topicMap",
    importance: "high",
    fields: [
      {
        label: "Topic map items",
        name: "topicMapItems",
        type: H5PFieldType.List,
        entity: "Topic map item",
        importance: "low",
        field: {
          label: "Item",
          name: "topicMapItem",
          importance: "low",
          type: H5PFieldType.Group,
          fields: [
            {
              name: "id",
              label: "Id",
              type: H5PFieldType.Text,
              widget: "none",
            },
            {
              name: "xPercentagePosition",
              label: "X-position as a percentage of the container width",
              type: H5PFieldType.Number,
              widget: "none",
            },
            {
              name: "yPercentagePosition",
              label: "Y-position as a percentage of the container height",
              type: H5PFieldType.Number,
              widget: "none",
            },
            {
              name: "widthPercentage",
              label: "Width as a percentage of the container width",
              type: H5PFieldType.Number,
              widget: "none",
            },
            {
              name: "heightPercentage",
              label: "Height as a percentage of the container height",
              type: H5PFieldType.Number,
              widget: "none",
            },
            {
              label: "Label",
              description: "The label is shown on top of the background image",
              name: "label",
              type: H5PFieldType.Text,
            },
            {
              label: "Description",
              description:
                "The description is shown on top of the background image, below the label",
              name: "description",
              type: H5PFieldType.Text,
              optional: true,
            },
            {
              label: "Topic image",
              description:
                "Background image for card and image above text in dialog",
              name: "topicImage",
              type: H5PFieldType.Image,
            },

            ...itemDialog,

            {
              label: "Index",
              description:
                "⚠️ Advanced feature: Used for manually setting tab order.",
              name: "label",
              type: H5PFieldType.Number,
              optional: true,
            },
          ],
        },
      },
      {
        label: "Arrows",
        name: "arrowItems",
        type: H5PFieldType.List,
        entity: "arrowItem",
        field: {
          label: "Arrow",
          name: "arrow",
          type: H5PFieldType.Group,
          fields: [
            {
              name: "id",
              label: "Id",
              type: H5PFieldType.Text,
              widget: "none",
            },
            {
              name: "startElementId",
              label: "Id of start element",
              type: H5PFieldType.Text,
              widget: "none",
            },
            {
              name: "endElementId",
              label: "Id of end element",

              type: H5PFieldType.Text,
              widget: "none",
            },
            {
              label: "Label",
              description:
                "The label is used by screen readers and on the summary page",
              name: "label",
              type: H5PFieldType.Text,
              widget: "none",
            },
            {
              label: "Description",
              description:
                "The description is shown on top of the background image, below the label",
              name: "description",
              type: H5PFieldType.Text,
              optional: true,
            },
            {
              label: "Topic image",
              description: "Image above text in dialog",
              name: "topicImage",
              type: H5PFieldType.Image,
            },

            {
              label: "Show start arrow-head",
              name: "showStartHead",
              type: H5PFieldType.Boolean,
              widget: "none",
              default: false,
            },
            {
              label: "Show end arrow-head",
              name: "showEndHead",
              type: H5PFieldType.Boolean,
              widget: "none",
              default: true,
            },

            ...itemDialog,

            {
              label: "Index",
              name: "label",
              type: H5PFieldType.Number,
              optional: true,
              widget: "none",
            },
          ],
        },
      },
      {
        label: "Appearance",
        name: "appearance",
        type: H5PFieldType.Group,
        importance: "low",
        widget: "none",
        fields: [
          {
            label: "Background image",
            name: "gridBackgroundImage",
            type: H5PFieldType.Image,
            optional: true,
          },
          {
            label: "Color theme",
            name: "colorTheme",
            type: H5PFieldType.Select,
            default: ColorTheme.Blue,
            options: [...colorThemes],
          },
        ],
      },
    ],
  },

  {
    label: "Behavioral settings",
    name: "behaviour",
    type: H5PFieldType.Group,
    importance: "low",
    fields: [],
  },

  {
    name: "l10n",
    type: H5PFieldType.Group,
    common: true,
    label: "Localize",
    fields: [
      {
        label: "Close dialog",
        description: "Used by screen readers",
        name: "closeDialog",
        default: "Close dialog",
        type: H5PFieldType.Text,
      },
      {
        label: "Audio",
        description: "Shown in front of copyright statements",
        name: "copyrightAudio",
        default: "Audio",
        type: H5PFieldType.Text,
      },
      {
        label: "Photo",
        description: "Shown in front of copyright statements",
        name: "copyrightPhoto",
        default: "Photo",
        type: H5PFieldType.Text,
      },
      {
        label: "Video",
        description: "Shown in front of copyright statements",
        name: "copyrightVideo",
        default: "Video",
        type: H5PFieldType.Text,
      },
      {
        label: "Saving note label",
        name: "dialogNoteSaving",
        default: "Saving…",
        type: H5PFieldType.Text,
      },
      {
        label: "Saved note label",
        name: "dialogNoteSaved",
        default: "Saved",
        type: H5PFieldType.Text,
      },
      {
        label: "Note placeholder",
        name: "dialogNotePlaceholder",
        default: "Write your notes here…",
        type: H5PFieldType.Text,
      },
      {
        label: "Mark note as completed",
        name: "dialogNoteMarkAsCompleted",
        default: "Mark as completed",
        type: H5PFieldType.Text,
      },
      {
        label: "Dialog resources labels: Relevant links",
        name: "dialogResourcesRelevantLinks",
        default: "Relevant links",
        type: H5PFieldType.Text,
      },
      {
        label: "Dialog resources labels: Custom links",
        name: "dialogResourcesCustomLinks",
        default: "Your links",
        type: H5PFieldType.Text,
      },
      {
        label: "Dialog resources labels: Add",
        name: "dialogResourcesAdd",
        default: "Add",
        type: H5PFieldType.Text,
      },
      {
        label: "Dialog words text label",
        name: "dialogWordsLabel",
        default: "Words",
        type: H5PFieldType.Text,
      },
      {
        label: "Fullscreen button label",
        name: "fullscreenButtonLabel",
        default: "Toggle fullscreen mode",
        type: H5PFieldType.Text,
      },
      {
        label: "Navbar tabs list aria label",
        name: "navbarTabsListAriaLabel",
        default: "Navigation bar",
        type: H5PFieldType.Text,
      },
      {
        label: "Navbar topic map section label",
        name: "navbarTopicMapSectionLabel",
        default: "Topic map",
        type: H5PFieldType.Text,
      },
      {
        label: "Navbar notes section label",
        name: "navbarNotesSectionLabel",
        default: "See notes",
        type: H5PFieldType.Text,
      },
      {
        label: "Navbar help section label",
        name: "navbarHelpSectionLabel",
        default: "Help",
        type: H5PFieldType.Text,
      },
      {
        label: "Navbar help section title",
        name: "navbarHelpSectionTitle",
        default: "Hjelp",
        type: H5PFieldType.Text,
      },
      {
        label: "Navbar help section left part one",
        name: "navbarHelpSectionLeftPartOne",
        default:
          "Formålet med denne oppgaven er å forbedre læringen din ved å knytte dine egne notater opp mot et tankekart. Tankekartet består av hendelser (bokser) og sammenhenger (piler). Du skal legge inn notater til både hendelser og sammenhenger.",
        type: H5PFieldType.Text,
      },
      {
        label: "Navbar help section left part two",
        name: "navbarHelpSectionLeftPartTwo",
        default:
          "Trykk på boksene og pilene for å legge til et notat til en hendelse eller en sammenheng. Notatene du skriver inn, blir automatisk lagret lokalt i nettleseren på datamaskinen du bruker, slik at du kan fortsette på eller lese notatene på et senere tidspunkt.",
        type: H5PFieldType.Text,
      },
      {
        label: "Navbar help section right part one title",
        name: "navbarHelpSectionRightPartOneTitle",
        default: "Progresjonsmåleren",
        type: H5PFieldType.Text,
      },
      {
        label: "Navbar help section right part one body",
        name: "navbarHelpSectionRightPartOneBody",
        default:
          "viser hvor mange prosent av hendelsene og sammenhengene som har fått notater. 100% betyr at du har lagt inn notater på alle tilgjengelige stader.",
        type: H5PFieldType.Text,
      },
      {
        label: "Navbar help section right part two title",
        name: "navbarHelpSectionRightPartTwoTitle",
        default: "Eksporter notater",
        type: H5PFieldType.Text,
      },
      {
        label: "Navbar help section right part two body",
        name: "navbarHelpSectionRightPartTwoBody",
        default:
          "gir deg en oversikt over alle notatene du har skrevet. Der kan du skrive ut eller kopiere notatene for å f.eks. å lime dem inn i et dokument eller en e-post.",
        type: H5PFieldType.Text,
      },
      {
        label: "Navbar help section right part three title",
        name: "navbarHelpSectionRightPartThreeTitle",
        default: "Slett alle notater",
        type: H5PFieldType.Text,
      },
      {
        label: "Navbar help section right part three body",
        name: "navbarHelpSectionRightPartThreeBody",
        default:
          "sletter alle notatene fra nettleseren på datamaskinen du bruker.",
        type: H5PFieldType.Text,
      },
    ],
  },
];
