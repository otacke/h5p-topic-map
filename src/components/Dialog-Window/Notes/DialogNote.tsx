/* eslint-disable no-param-reassign */
import * as React from "react";
import type { XAPIEvent } from "../../../../H5P";
import { useContentId } from "../../../hooks/useContentId";
import { useH5PInstance } from "../../../hooks/useH5PInstance";
import { useL10n } from "../../../hooks/useLocalization";
import { UserData } from "../../../types/UserData";
import styles from "./DialogNote.module.scss";

export type NoteProps = {
  maxLength: number;
  id: string;
  smallScreen?: boolean;
  setStorageData: React.Dispatch<React.SetStateAction<UserData>>;
  storageData: UserData;
};

export const DialogNote: React.FC<NoteProps> = ({
  maxLength,
  id,
  setStorageData,
  smallScreen,
  storageData,
}) => {
  const [note, setNote] = React.useState(storageData[id]?.note ?? "");
  const [dynamicSavingText, setDynamicSavingText] = React.useState("");
  const [savingTextTimeout, setSavingTextTimeout] = React.useState<number>();
  const [noteDone, setMarkedAsDone] = React.useState<boolean>(
    storageData[id]?.noteDone ?? false,
  );
  const [wordCount, setWordCount] = React.useState(0);
  const [maxWordCount, setMaxWordCount] = React.useState<number | undefined>();

  const savingTextLabel = useL10n("dialogNoteSaving");
  const savedTextLabel = useL10n("dialogNoteSaved");
  const wordLimitExceededTextLabel = useL10n("dialogNoteLimitExceeded");
  const doneTextLabel = useL10n("dialogNoteMarkAsDone");
  const placeholderText = useL10n("dialogNotePlaceholder");
  const wordTextLabel = useL10n("dialogWordsLabel");
  const wordNoteLabel = useL10n("dialogNoteLabel");

  const h5pWrapper = useH5PInstance();
  const contentId = useContentId();

  const sendXAPIEvent = (event: XAPIEvent): void => {
    h5pWrapper?.trigger(event);
  };

  const handleNoteDone = (): void => {
    if (storageData[id] === undefined) {
      storageData[id] = {};
    }
    storageData[id].noteDone = !noteDone;
    setMarkedAsDone(!noteDone);
    setStorageData(storageData);

    if (!h5pWrapper) {
      return;
    }

    const xAPIEvent = h5pWrapper.createXAPIEventTemplate("completed", {
      itemId: id,
      contentId,
      note,
      completed: storageData[id].noteDone ?? false,
    });

    xAPIEvent.setActor();
    sendXAPIEvent(xAPIEvent);
  };

  /**
   * Get the xAPI definition for the xAPI object.
   *
   * @return XAPI definition.
   */
  const getxAPIDefinition = (): object => {
    const definition: {
      name: Record<string, string>;
      description: Record<string, string>;
      type: string;
      interactionType: string;
      correctResponsesPattern: string;
    } = {
      name: {
        "en-US": "POTET",
      },
      description: {
        "en-US": "BESKRIVELSEN VÅR",
      },
      type: "http://adlnet.gov/expapi/activities/cmi.interaction",
      interactionType: "fill-in",
      correctResponsesPattern: ".*",
    };

    return definition;
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

        if (!h5pWrapper) {
          return;
        }

        const xAPIEvent = h5pWrapper.createXAPIEventTemplate("answered", {
          itemId: id,
          contentId,
          note,
        });
        xAPIEvent.getVerifiedStatementValue(["object", "definition"]);
        if (xAPIEvent.data) {
          xAPIEvent.data.statement.object.definition = {
            ...xAPIEvent.data.statement.object.definition,
            ...getxAPIDefinition(),
          };
        }

        sendXAPIEvent(xAPIEvent);
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
    if (storageData[id] === undefined) storageData[id] = {};
    storageData[id].note = note;
    countWords();
    // ensure there's no memory leak on component unmount during timeout
    return () => {
      if (savingTextTimeout != null) clearTimeout(savingTextTimeout);
    };
  }, [storageData, id, note, setStorageData, savingTextTimeout, countWords]);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setSavingText();
    setNote(e.target.value);
    setStorageData(storageData);
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
            <div className={styles.markAsDoneCheckbox}>
              <label htmlFor="note-done-checkbox">
                <input
                  id="note-done-checkbox"
                  type="checkbox"
                  checked={noteDone}
                  onChange={handleNoteDone}
                />
                {doneTextLabel}
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
