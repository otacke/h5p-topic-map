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
  const [dynamicSavingText, setDynamicSavingText] = React.useState("");
  const [savingTextTimeout, setSavingTextTimeout] =
    React.useState<NodeJS.Timeout>();

  // TODO: Translate
  const savingTextLabel = "lagring...";
  const savedTextLabel = "lagret";

  const setSavingText = (): void => {
    setDynamicSavingText(savingTextLabel);
    setSavingTextTimeout(
      setTimeout(() => {
        const timestamp = new Date();
        const hours = String(timestamp.getHours()).padStart(2, "0");
        const minutes = String(timestamp.getMinutes()).padStart(2, "0");
        setDynamicSavingText(`${savedTextLabel} ${hours}:${minutes}`);
      }, 650),
    );
  };

  React.useEffect(() => {
    // TODO: If this becomes laggy, add a debounce-timer to avoid saving more often than, say, every 100ms.
    userData[id].note = note;
    setUserData(userData);
    // ensure there's no memory leak on component unmount during timeout
    return () => {
      if (savingTextTimeout) clearTimeout(savingTextTimeout);
    };
  }, [userData, id, note, setUserData, savingTextTimeout]);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setSavingText();
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
        <p className={styles.dynamicSavingText}>{dynamicSavingText}</p>
        <p className={styles.counter}>
          {note.length} / {maxLength}
        </p>
      </label>
    </form>
  );
};
