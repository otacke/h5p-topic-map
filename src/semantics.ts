import type { H5PFieldGroup, H5PBehaviour, H5PL10n } from "h5p-types";
import { ColorTheme } from "./types/ColorTheme";
import { colorThemes, itemDialog } from "./utils/semantics.utils";

export const semantics: Readonly<[H5PFieldGroup, H5PBehaviour, H5PL10n]> = [
  {
    label: "Topic map editor",
    name: "topicMap",
    type: "group",
    widget: "topicMap",
    importance: "high",
    fields: [
      {
        label: "Topic map items",
        name: "topicMapItems",
        type: "list",
        entity: "Topic map item",
        importance: "low",
        field: {
          label: "Item",
          name: "topicMapItem",
          importance: "low",
          type: "group",
          fields: [
            {
              name: "id",
              label: "Id",
              type: "text",
              widget: "none",
            },
            {
              name: "xPercentagePosition",
              label: "X-position as a percentage of the container width",
              type: "number",
              widget: "none",
            },
            {
              name: "yPercentagePosition",
              label: "Y-position as a percentage of the container height",
              type: "number",
              widget: "none",
            },
            {
              name: "widthPercentage",
              label: "Width as a percentage of the container width",
              type: "number",
              widget: "none",
            },
            {
              name: "heightPercentage",
              label: "Height as a percentage of the container height",
              type: "number",
              widget: "none",
            },
            {
              label: "Label",
              name: "label",
              type: "text",
            },
            {
              label: "Description",
              name: "description",
              type: "text",
              optional: true,
            },
            {
              label: "Topic image",
              description:
                "Background image for card and image above text in dialog",
              name: "topicImage",
              type: "image",
            },
            {
              label: "Topic image alt text",
              description:
                "Alternative text for the image that is used by screen readers",
              name: "topicImageAltText",
              type: "text",
              optional: true,
            },

            ...itemDialog,

            {
              label: "Index",
              description:
                "⚠️ Advanced feature: Used for manually setting tab order.",
              name: "index",
              type: "number",
              optional: true,
            },
          ],
        },
      },
      {
        label: "Arrows",
        name: "arrowItems",
        type: "list",
        entity: "arrowItem",
        importance: "low",
        field: {
          label: "Arrow",
          name: "arrow",
          type: "group",
          fields: [
            {
              name: "id",
              label: "Id",
              type: "text",
              widget: "none",
            },
            {
              name: "startPosition",
              label: "Percentage position of start element",
              type: "group",
              widget: "none",
              fields: [
                {
                  name: "x",
                  label: "X-position as a percentage of the container width",
                  type: "number",
                  widget: "none",
                },
                {
                  name: "y",
                  label: "Y-position as a percentage of the container height",
                  type: "number",
                  widget: "none",
                },
              ],
            },
            {
              name: "endPosition",
              label: "Percentage position of start element",
              type: "group",
              widget: "none",
              fields: [
                {
                  name: "x",
                  label: "X-position as a percentage of the container width",
                  type: "number",
                  widget: "none",
                },
                {
                  name: "y",
                  label: "Y-position as a percentage of the container height",
                  type: "number",
                  widget: "none",
                },
              ],
            },
            {
              name: "startGridPosition",
              label: "Grid position of start element",
              type: "group",
              widget: "none",
              fields: [
                {
                  name: "x",
                  label: "X-position as a grid coordinate",
                  type: "number",
                  widget: "none",
                },
                {
                  name: "y",
                  label: "Y-position as a grid coordinate",
                  type: "number",
                  widget: "none",
                },
              ],
            },
            {
              name: "endGridPosition",
              label: "Grid position of start element",
              type: "group",
              widget: "none",
              fields: [
                {
                  name: "x",
                  label: "X-position as a grid coordinate",
                  type: "number",
                  widget: "none",
                },
                {
                  name: "y",
                  label: "Y-position as a grid coordinate",
                  type: "number",
                  widget: "none",
                },
              ],
            },
            {
              name: "startElementId",
              label: "Id of start element",
              type: "text",
              widget: "none",
            },
            {
              name: "endElementId",
              label: "Id of end element",
              type: "text",
              widget: "none",
            },
            {
              label: "Label",
              description:
                "The label is used by screen readers and on the summary page",
              name: "label",
              type: "text",
              widget: "none",
            },
            {
              label: "Description",
              description:
                "The description is shown on top of the background image, below the label",
              name: "description",
              type: "text",
              optional: true,
            },
            {
              label: "Topic image",
              description: "Image above text in dialog",
              name: "topicImage",
              type: "image",
            },
            {
              label: "Topic image alt text",
              description:
                "Alternative text for the image that is used by screen readers",
              name: "topicImageAltText",
              type: "text",
              optional: true,
            },
            {
              label: "Arrow type",
              name: "arrowType",
              type: "select",
              widget: "none",
              default: "0",
              options: [
                {
                  label: "Directional",
                  value: "0",
                },
                {
                  label: "Bi-directional",
                  value: "1",
                },
                {
                  label: "Non-directional",
                  value: "2",
                },
              ],
            },
            {
              label: "Show end arrow-head",
              name: "showEndHead",
              type: "boolean",
              widget: "none",
              default: true,
            },

            ...itemDialog,

            {
              label: "Index",
              name: "index",
              type: "number",
              optional: true,
              widget: "none",
            },
            {
              label: "Arrow breakpoints",
              name: "breakpoints",
              type: "list",
              entity: "breakpoint",
              widget: "none",
              field: {
                name: "breakpoint",
                label: "Breakpoint",
                type: "group",
                widget: "none",
                fields: [
                  {
                    name: "x",
                    label: "X-position as grid index",
                    type: "number",
                    widget: "none",
                  },
                  {
                    name: "y",
                    label: "Y-position as grid index",
                    type: "number",
                    widget: "none",
                  },
                ],
              },
            },
            {
              label: "Arrow Relative breakpoints",
              name: "relativeBreakpoints",
              type: "list",
              entity: "breakpoint",
              widget: "none",
              field: {
                name: "breakpoint",
                label: "Breakpoint",
                type: "group",
                widget: "none",
                fields: [
                  {
                    name: "x",
                    label: "X-position as a percentage of the container width",
                    type: "number",
                    widget: "none",
                  },
                  {
                    name: "y",
                    label: "Y-position as a percentage of the container height",
                    type: "number",
                    widget: "none",
                  },
                ],
              },
            },
          ],
        },
      },
      {
        label: "Background image",
        name: "gridBackgroundImage",
        type: "image",
        optional: true,
      },
      {
        label: "Color theme",
        name: "colorTheme",
        type: "select",
        default: ColorTheme.Blue,
        options: [...colorThemes],
        widget: "none",
      },
      {
        label: "Grid",
        name: "grid",
        type: "group",
        fields: [
          {
            name: "numberOfColumns",
            label: "Number of columns",
            type: "number",
            widget: "none",
          },
          {
            name: "numberOfRows",
            label: "Number of rows",
            type: "number",
            widget: "none",
          },
        ],
      },
    ],
  },

  {
    label: "Behavioral settings",
    name: "behaviour",
    type: "group",
    importance: "low",
    fields: [],
  },

  {
    name: "l10n",
    type: "group",
    common: true,
    label: "Localize",
    fields: [
      {
        label: "Close dialog",
        description: "Used by screen readers",
        name: "closeDialog",
        default: "Close dialog",
        type: "text",
      },
      {
        label: "Audio",
        description: "Shown in front of copyright statements",
        name: "copyrightAudio",
        default: "Audio",
        type: "text",
      },
      {
        label: "Photo",
        description: "Shown in front of copyright statements",
        name: "copyrightPhoto",
        default: "Photo",
        type: "text",
      },
      {
        label: "Video",
        description: "Shown in front of copyright statements",
        name: "copyrightVideo",
        default: "Video",
        type: "text",
      },
      {
        label: "Saving note label",
        name: "dialogNoteSaving",
        default: "Saving…",
        type: "text",
      },
      {
        label: "Saved note label",
        name: "dialogNoteSaved",
        default: "Saved",
        type: "text",
      },
      {
        label: "Word limit exceeded label",
        name: "dialogNoteLimitExceeded",
        default: "Too many words",
        type: "text",
      },
      {
        label: "Note placeholder",
        name: "dialogNotePlaceholder",
        default: "Write your notes here…",
        type: "text",
      },
      {
        label: "Mark note as done",
        name: "dialogNoteMarkAsDone",
        default: "Mark as done",
        type: "text",
      },
      {
        label: "Dialog resources labels: Relevant links",
        name: "dialogResourcesRelevantLinks",
        default: "Relevant links",
        type: "text",
      },
      {
        label: "Dialog resources labels: Custom links",
        name: "dialogResourcesCustomLinks",
        default: "Your links",
        type: "text",
      },
      {
        label: "Dialog resources labels: Add",
        name: "dialogResourcesAdd",
        default: "Add",
        type: "text",
      },
      {
        label: "Dialog words text label",
        name: "dialogWordsLabel",
        default: "Words",
        type: "text",
      },
      {
        label: "Fullscreen button label",
        name: "fullscreenButtonLabel",
        default: "Toggle fullscreen mode",
        type: "text",
      },
      {
        label: "Navbar tabs list label",
        description: "Used by screen readers",
        name: "navbarTabsListAriaLabel",
        default: "Navigation bar",
        type: "text",
      },
      {
        label: "Navbar topic map section label",
        name: "navbarTopicMapSectionLabel",
        default: "Topic map",
        type: "text",
      },
      {
        label: "Navbar notes section label",
        name: "navbarNotesSectionLabel",
        default: "My notes",
        type: "text",
      },
      {
        label: "Navbar help section label",
        name: "navbarHelpSectionLabel",
        default: "Help",
        type: "text",
      },
      {
        label: "Navbar help section title",
        name: "navbarHelpSectionTitle",
        default: "Help",
        type: "text",
      },
      {
        label: "Navbar help section body",
        name: "navbarHelpSectionBody",
        widget: "html",
        default:
          "<p>The purpose of this exercise is to enhance your learning by linking your own notes to a topic map. The topic map consists of events (boxes) and connections (arrows). You must enter notes for both events and connections.</p><p>Click or tap the boxes and arrows to add a note to an event or connection. The notes you enter are automatically saved locally in the browser of the device you are using, so you can continue on or read the notes at a later time.</p><p><strong>Progress bar</strong> shows what percentage of the events and connections have received notes. 100% means you have posted notes in all available places.</p><p><strong>My notes</strong> gives you an overview of all the notes you have written. There you can print out or delete all the notes. These notes are stored locally in your internet browser, therefore it's recommended to export them using printing functionality in order to save your answers over time.</p>",
        type: "text",
        tags: ["h2", "h3", "h4", "p", "br", "strong", "em", "a"],
      },
      {
        label: "Dialog resources labels",
        name: "dialogResourcesLabel",
        default: "Resources",
        type: "text",
      },
      {
        label: "Text",
        name: "dialogTextLabel",
        default: "Text",
        type: "text",
      },
      {
        label: "Note",
        name: "dialogNoteLabel",
        default: "Note",
        type: "text",
      },
      {
        label: "Tabs list",
        name: "dialogTabListAriaLabel",
        default: "Tabs list",
        type: "text",
      },
      {
        label: "Navbar notes section title",
        name: "navbarNotesSectionTitle",
        default: "My notes",
        type: "text",
      },
      {
        label: "Navbar notes section body",
        name: "navbarNotesSectionBody",
        default:
          "Here you have an overview of all the notes you have written. The notes are saved locally in this browser. To save the notes elsewhere, you can print or copy the notes into a document.",
        type: "text",
      },
      {
        label: "Navbar notes print button label",
        name: "navbarNotesSectionPrintLabel",
        default: "Print",
        type: "text",
      },
      {
        label: "Navbar notes delete all notes button label",
        name: "navbarNotesSectionDeleteLabel",
        default: "Delete all notes",
        type: "text",
      },
      {
        label: "Navbar notes empty list label",
        name: "navbarNotesEmptyListLabel",
        default: "No dialogue notes available in this topic map.",
        type: "text",
      },
      {
        label: "Navbar notes missing note label",
        name: "navbarNotesMissingNoteLabel",
        default: "━ No notes have been added yet",
        type: "text",
      },
      {
        label: "Delete all notes confirmation window label",
        name: "deleteNotesConfirmationWindowLabel",
        default: "Are you sure you want to delete all your notes?",
        type: "text",
      },
      {
        label: "Delete all notes confirm deletion label",
        name: "deleteNotesConfirmLabel",
        default: "Delete",
        type: "text",
      },
      {
        label: "Delete all notes deny deletion label",
        name: "deleteNotesDenyLabel",
        default: "Cancel",
        type: "text",
      },
      {
        label: "Navbar progress percentage label",
        name: "progressPercentageLabel",
        default: "Current progress",
        type: "text",
      },
      {
        label: "Navbar notes submit all data button label",
        name: "navbarNotesSectionSubmitAllLabel",
        default: "Submit all data",
        type: "text",
      },
      {
        label: "Submit all notes confirmation window label",
        name: "submitDataConfirmationWindowLabel",
        default: "Are you sure you want to submit all your data?",
        type: "text",
      },
      {
        label: "Submit all data confirm label",
        name: "submitDataConfirmLabel",
        default: "Submit",
        type: "text",
      },
      {
        label: "Submit all data deny label",
        name: "submitDataDenyLabel",
        default: "Cancel",
        type: "text",
      },
      {
        label: "Go back to topic map label",
        name: "goToTopicMapLabel",
        default: "Back",
        type: "text",
      },
    ],
  },
];
