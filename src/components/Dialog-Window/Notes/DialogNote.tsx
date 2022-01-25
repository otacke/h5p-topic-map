import * as React from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import styles from "./DialogNote.module.scss";

export type NoteProps = {
  maxLength: number;
  id: string;
};

export const Note: React.FC<NoteProps> = ({ maxLength, id }) => {
  const [userData, setUserData] = useLocalStorage(id);
  const [note, setNote] = React.useState(userData[id].note ?? "");

  React.useEffect(() => {
    // TODO: If this becomes laggy, add a debounce-timer to avoid saving more often than, say, every 100ms.
    userData[id].note = note;
    setUserData(userData);
  }, [userData, id, note, setUserData]);

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
