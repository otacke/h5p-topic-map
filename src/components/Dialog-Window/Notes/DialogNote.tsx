import * as React from "react";
import styles from "./DialogNote.module.scss";

export type NoteProps = {
  note: string;
  maxLength: number;
};

export const Note: React.FC<NoteProps> = ({ note, maxLength }) => {
  const [count, setCount] = React.useState(note.length);

  const countCharacters = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setCount(e.target.value.length);
  };

  // TODO: add support for other languages for placeholder
  return (
    <form>
      <label htmlFor="note">
        <textarea
          className={styles.textArea}
          id="note"
          name="note"
          placeholder="Skriv dine notater her..."
          rows={40}
          cols={50}
          maxLength={maxLength}
          onChange={e => countCharacters(e)}
        >
          {note}
        </textarea>
        <p className={styles.counter}>
          {count} / {maxLength}
        </p>
      </label>
    </form>
  );
};
