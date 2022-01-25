import * as React from "react";
import { useLocalStorage } from "../../../h5p/H5P.util";
import styles from "./DialogNote.module.scss";

export type NoteProps = {
  maxLength: number;
  id: string;
};

export const Note: React.FC<NoteProps> = ({ maxLength, id }) => {
  const [currentLocalStorage, setCurrentLocalStorage] = useLocalStorage(
    "h5p-topic-map-userdata",
    id,
  );
  const [note, setNote] = React.useState(currentLocalStorage[id].note ?? "");

  React.useEffect(() => {
    // TODO: If this becomes laggy, add a debounce-timer to avoid saving more often than, say, every 100ms.
    currentLocalStorage[id].note = note;
    setCurrentLocalStorage(currentLocalStorage);
  }, [currentLocalStorage, id, note, setCurrentLocalStorage]);

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
