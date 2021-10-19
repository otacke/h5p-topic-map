import * as React from "react";
import { render } from "@testing-library/react";
import { Note } from "./DialogNote";

describe(Note.name, () => {
  it("should render", () => {
    const dialogNote = render(<Note note="" maxLength={0} />).container;
    expect(dialogNote.querySelector("form")).toBeTruthy();
  });
});
