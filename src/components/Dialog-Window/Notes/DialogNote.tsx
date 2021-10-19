import * as React from "react";
import styles from "./DialogNote.module.scss";

export type NoteProps = {
  initialNote: string;
  maxLength: number;
  id: string;
};

export const Note: React.FC<NoteProps> = ({ initialNote, maxLength, id }) => {
  const [note, setNote] = React.useState(() => {
    const stickyVal = window.localStorage.getItem(id);
    return stickyVal !== null ? JSON.parse(stickyVal) : initialNote;
  });
  React.useEffect(() => {
    // TODO: If this becomes laggy, add a debounce-timer to avoid saving more often than, say, every 100ms.
    window.localStorage.setItem(id, JSON.stringify(note));
  }, [id, note]);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setNote(e.target.value);
  };

  // TODO: Translate
  const placeholderText = "Skriv dine notater her...";

  return (
    <form>
      <label htmlFor="note">
        <textarea
          className={styles.textArea}
          id="note"
          placeholder={placeholderText}
          maxLength={maxLength}
          onChange={event => onChange(event)}
          defaultValue={note}
        />
        <p className={styles.counter}>
          {note.length} / {maxLength}
        </p>
      </label>
    </form>
  );
};
