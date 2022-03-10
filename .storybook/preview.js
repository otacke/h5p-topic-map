import * as React from "react";
import { ContentIdContext } from "../src/contexts/ContentIdContext";
import { LocalizationContext } from "../src/contexts/LocalizationContext";
import { H5PContext } from "../src/contexts/H5PContext";
import { semantics } from "../src/semantics";
import "!style-loader!css-loader!sass-loader!../src/styles.scss";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: ["Atoms", "Molecules", "Organisms", "Templates", "Pages"],
    },
  },
  themes: {
    default: "Blue",
    list: [
      { name: "Blue", class: "theme-1", color: "#40586f" },
      { name: "Green", class: "theme-2", color: "#3d6060" },
      { name: "Red", class: "theme-3", color: "#981b1e" },
      { name: "Grey", class: "theme-4", color: "#373d3f" },
    ],
    target: ".h5p-topic-map .h5p-topic-map, .h5p-topic-map",
    clearable: false,
  },
};

const translations = Object.fromEntries(
  semantics[2].fields.map(field => {
    const defaultValue = field["default"] ?? field.name;
    return [field.name, defaultValue];
  }),
);

export const decorators = [
  Story => (
    <ContentIdContext.Provider value="1">
      <LocalizationContext.Provider value={translations}>
        <H5PContext.Provider value={H5P}>
          <Story />
        </H5PContext.Provider>
      </LocalizationContext.Provider>
    </ContentIdContext.Provider>
  ),
];
