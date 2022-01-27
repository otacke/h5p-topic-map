import * as React from "react";
import { render } from "@testing-library/react";
import { Note } from "./DialogNote";

describe(Note.name, () => {
  it("should render", () => {
    const dialogNote = render(<Note maxLength={0} id="myID" />).container;
    expect(dialogNote.querySelector("form")).toBeTruthy();
  });

  it("Should have correct word and character counts", () => {
    const { getByTestId } = render(<Note maxLength={10} id="testId" />);
    expect(getByTestId("maxLength").textContent).toBe("0 / 10");
    expect(getByTestId("wordCount").textContent).toBe("0 Words");
  });
});
