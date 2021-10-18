import * as React from "react";

export type NoteProps = {
  note: string;
  maxLength: number;
};

export const Note: React.FC<NoteProps> = ({ note, maxLength }) => {
  const [count, setCount] = React.useState(note.length);

  const countCharacters = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setCount(e.target.value.length);
  };

  return (
    <form>
      <label htmlFor="note">
        <textarea
          id="note"
          name="note"
          rows={4}
          cols={5}
          maxLength={maxLength}
          onChange={e => countCharacters(e)}
        >
          {note}
        </textarea>
        <p>
          {count} / {maxLength}
        </p>
      </label>
    </form>
  );
};
