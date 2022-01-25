import * as React from "react";
import { render } from "@testing-library/react";
import { Note } from "./DialogNote";

describe(Note.name, () => {
  it("should render", () => {
    const dialogNote = render(<Note maxLength={0} id="myID" />).container;
    expect(dialogNote.querySelector("form")).toBeTruthy();
  });
});
