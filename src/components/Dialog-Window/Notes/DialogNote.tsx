/* eslint-disable no-param-reassign */
import * as React from "react";
import { useL10n } from "../../../hooks/useLocalization";
import { UserData } from "../../../types/UserData";
import styles from "./DialogNote.module.scss";

export type NoteProps = {
  maxLength: number;
  id: string;
  smallScreen?: boolean;
  setUserDataCopy: React.Dispatch<React.SetStateAction<UserData>>;
  userDataCopy: UserData;
};

export const DialogNote: React.FC<NoteProps> = ({
  maxLength,
  id,
  setUserDataCopy,
  smallScreen,
  userDataCopy,
}) => {
  const [note, setNote] = React.useState(userDataCopy[id]?.note ?? "");
  const [dynamicSavingText, setDynamicSavingText] = React.useState("");
  const [savingTextTimeout, setSavingTextTimeout] = React.useState<number>();
  const [noteCompleted, setMarkedAsCompleted] = React.useState<boolean>(
    userDataCopy[id]?.noteCompleted ?? false,
  );
  const [wordCount, setWordCount] = React.useState(0);
  const [maxWordCount, setMaxWordCount] = React.useState<number | undefined>();

  const savingTextLabel = useL10n("dialogNoteSaving");
  const savedTextLabel = useL10n("dialogNoteSaved");
  const wordLimitExceededTextLabel = useL10n("dialogNoteLimitExceeded");
  const completedTextLabel = useL10n("dialogNoteMarkAsCompleted");
  const placeholderText = useL10n("dialogNotePlaceholder");
  const wordTextLabel = useL10n("dialogWordsLabel");
  const wordNoteLabel = useL10n("dialogNoteLabel");

  const handleNoteCompleted = (): void => {
    if (userDataCopy[id].noteCompleted !== undefined) userDataCopy[id].noteCompleted = false;
    userDataCopy[id].noteCompleted = !noteCompleted;
    setMarkedAsCompleted(!noteCompleted);
    setUserDataCopy(userDataCopy);
  };

  const setSavingText = (): void => {
    setDynamicSavingText(savingTextLabel);
    setSavingTextTimeout(
      window.setTimeout(() => {
        const timestamp = new Date();
        const localTime = timestamp.toLocaleTimeString(
          window.navigator.language,
          {
            hour: "2-digit",
            minute: "2-digit",
          },
        );
        setDynamicSavingText(
          `${
            maxWordCount ? `${wordLimitExceededTextLabel} - ` : ""
          } ${savedTextLabel} ${localTime}`,
        );
      }, 650),
    );
  };

  const countWords = React.useCallback((): void => {
    const count = note.split(/\s/).filter(word => word.length > 0).length;
    setWordCount(count);

    // TODO: Enforce max length when pasting in text,
    // perhaps by removing all words past the max length mark.
    const tooManyWords = count > maxLength;
    if (tooManyWords) {
      setMaxWordCount(count);
    } else {
      setMaxWordCount(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxLength, note, savingTextTimeout]);

  React.useEffect(() => {
    // TODO: If this becomes laggy, add a debounce-timer to avoid saving more often than, say, every 100ms.
    if (userDataCopy[id]) userDataCopy[id].note = note;
    countWords();
    // ensure there's no memory leak on component unmount during timeout
    return () => {
      if (savingTextTimeout != null) clearTimeout(savingTextTimeout);
    };
  }, [userDataCopy, id, note, setUserDataCopy, savingTextTimeout, countWords]);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setSavingText();
    setNote(e.target.value);
    setUserDataCopy(userDataCopy);
  };

  return (
    <form>
      <label htmlFor="note">
        <div className={styles.topGroup}>
          {!smallScreen && <p className={styles.noteLabel}>{wordNoteLabel}</p>}
          <p className={styles.dynamicSavingText}>{dynamicSavingText}</p>
        </div>
        <div
          className={`${styles.textAreaWrapper} ${
            maxWordCount ? styles.maxWords : ""
          }`}
        >
          <textarea
            className={styles.textArea}
            id="note"
            placeholder={placeholderText}
            onChange={event => onChange(event)}
            defaultValue={note}
          />
          <div className={styles.bottomGroup}>
            <div className={styles.markAsCompletedCheckbox}>
              <label htmlFor="note-completed-checkbox">
                <input
                  id="note-completed-checkbox"
                  type="checkbox"
                  checked={noteCompleted}
                  onChange={handleNoteCompleted}
                />
                {completedTextLabel}
              </label>
            </div>
            <div
              data-testid="wordCount"
              className={`${styles.wordCounter} ${
                maxWordCount ? styles.redText : ""
              }`}
            >
              {wordCount} / {maxLength} {wordTextLabel}
            </div>
          </div>
        </div>
      </label>
    </form>
  );
};
