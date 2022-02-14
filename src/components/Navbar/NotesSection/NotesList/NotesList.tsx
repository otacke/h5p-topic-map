import * as React from "react";
import { getUserData } from "../../../../hooks/useLocalStorage";
import { useL10n } from "../../../../hooks/useLocalization";
import { ArrowButton } from "../../../ArrowButton/ArrowButton";
import { ArrowButtonIconState } from "../../../../types/ArrowButtonIconState";
import { TopicMapItemType } from "../../../../types/TopicMapItemType";
import styles from "./NotesList.module.scss";

export type NotesListProps = {
  topicMapItems: TopicMapItemType[];
};

export const NotesList: React.FC<NotesListProps> = ({ topicMapItems }) => {
  const userData = getUserData();
  const noItemsInListText = useL10n("navbarNotesEmptyListLabel");
  const missingNoteText = useL10n("navbarNotesMissingNoteLabel");

  const userDataEntries = topicMapItems.map(item => {
    const doesNoteExist = item.id in userData && userData[item.id].note;
    const isNoteCompleted = doesNoteExist && userData[item.id].noteCompleted;

    return (
      item.dialog && ( // TODO add check if notes section is enabled for this dialogue
        <>
          <div className="page-break" />
          <div key={item.id} className={styles.mainBodyListElementWrapper}>
            <ArrowButton
              backgroundColor="var(--theme-color-2)"
              borderColor="var(--theme-color-3)"
              iconColor="var(--theme-color-4)"
              buttonState={
                doesNoteExist && isNoteCompleted
                  ? ArrowButtonIconState.Completed
                  : ArrowButtonIconState.Default
              }
            />
            <div className={styles.mainBodyList}>
              <p
                aria-label={item.label}
                className={styles.mainBodyListElementHeader}
              >
                {item.label}
              </p>
              <p
                aria-label={
                  doesNoteExist ? userData[item.id].note : missingNoteText
                }
              >
                {doesNoteExist ? userData[item.id].note : missingNoteText}
              </p>
            </div>
          </div>
        </>
      )
    );
  });

  return (
    <div className={styles.mainBody}>
      <div className={styles.mainBodyContent}>
        {userDataEntries || noItemsInListText}
      </div>
    </div>
  );
};
