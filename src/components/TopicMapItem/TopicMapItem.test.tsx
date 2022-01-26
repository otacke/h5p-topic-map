import { render } from "@testing-library/react";
import * as React from "react";
import { TopicMapItemType } from "../../types/TopicMapItemType";
import { TopicMapItem } from "./TopicMapItem";

describe(TopicMapItem.name, () => {
  it("should render", () => {
    const item: TopicMapItemType = {
      label: "The Azores",
      topicImage: {
        path: "https://images.unsplash.com/photo-1621246308836-ea7d366c2795?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
        alt: "Lighthouse on the coast of the Azores",
        copyright: {
          author: "Damir Babacic",
          license: "Unsplash License",
          source: "https://unsplash.com/photos/kOO1g6HwMU0",
          title: "Welcome to Azores ✨",
          version: "1",
          year: "2021",
        },
      },
      dialogOrDirectLink: "dialog",
      id: "id-1",
      heightPercentage: 100,
      widthPercentage: 100,
      xPercentagePosition: 0,
      yPercentagePosition: 0,
      description:
        "The Autonomous Region of the Azores (Região Autónoma dos Açores) is one of the two autonomous regions of Portugal (along with Madeira) (Wikipedia)",
      dialog: {},
    };

    const topicMapItem = render(<TopicMapItem item={item} />).container;

    expect(topicMapItem.querySelector("button")).toBeTruthy();
  });
});
