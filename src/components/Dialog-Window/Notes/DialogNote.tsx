import * as React from "react";

export type NoteProps = {
  note: string;
};

export const Note: React.FC<NoteProps> = ({ note }) => {
  return (
    <form>
      <label htmlFor="note">
        <textarea id="note" name="note" rows={4} cols={5}>
          {note}
        </textarea>
      </label>
    </form>
  );
};
