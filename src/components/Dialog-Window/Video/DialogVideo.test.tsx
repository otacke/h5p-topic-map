import { render } from "@testing-library/react";
import * as React from "react";
import { Video } from "../../../types/H5P/Video";
import { DialogVideo } from "./DialogVideo";

describe(DialogVideo.name, () => {
  it("should have rendered", () => {
    const video: Video = {
      path: "https://player.vimeo.com/video/224857514?title=0&portrait=0&byline=0&autoplay=1&loop=1&transparent=1",
      copyright: {
        title: "Jellyfish",
        author: "lucdecleir",
        source:
          "https://pixabay.com/videos/jellyfish-tank-water-life-marine-10480/",
        license: "Pixabay License",
        version: "1",
        year: "2017",
      },
    };

    const { container } = render(<DialogVideo video={video} />);

    expect(container.querySelector("video")).toBeTruthy();
    expect(container.querySelector("p")).toBeTruthy();
  });
});
