import * as React from "react";
import { Trigger, Content, Tabs, TabsList } from "@radix-ui/react-tabs";
import styles from "./Navbar.module.scss";
import { useL10n } from "../../hooks/useLocalization";
import { HelpSection } from "./HelpSection/HelpSection";
import { NotesSection } from "./NotesSection/NotesSection";
import { NotesList } from "./NotesSection/NotesList/NotesList";
import { TopicMapItemType } from "../../types/TopicMapItemType";
import { Dialog } from "../Dialog/Dialog";
import { getUserData, setUserData } from "../../hooks/useLocalStorage";

export type NavbarProps = {
  navbarTitle: string;
  topicMapItems: TopicMapItemType[];
};

export const Navbar: React.FC<NavbarProps> = ({
  navbarTitle,
  topicMapItems,
}) => {
  const navbarAriaLabel = useL10n("navbarTabsListAriaLabel");
  const topicMapSectionLabel = useL10n("navbarTopicMapSectionLabel");
  const notesSectionLabel = useL10n("navbarNotesSectionLabel");
  const helpSectionLabel = useL10n("navbarHelpSectionLabel");
  const deleteAllNotesText = useL10n("deleteNotesConfirmationWindowLabel");
  const deleteAllNotesConfirmText = useL10n("deleteNotesConfirmLabel");
  const deleteAllNotesDenyText = useL10n("deleteNotesDenyLabel");
  const userData = getUserData();

  const [isNotesSectionShown, setIsNotesSectionIsShown] =
    React.useState<boolean>(false);

  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    React.useState<boolean>(false);

  const deleteAllNotes = (): void => {
    topicMapItems.forEach(item => {
      if (item.id in userData) {
        userData[item.id].note = undefined;
        userData[item.id].noteCompleted = undefined;
      }
    });
    setUserData(userData);
    setIsDeleteConfirmationVisible(false);
  };

  const confirmDeletion = (): void => {
    deleteAllNotes();
    setIsDeleteConfirmationVisible(false);
  };

  const denyDeletion = (): void => {
    setIsDeleteConfirmationVisible(false);
  };

  return (
    <>
      <div className={styles.mainBody}>
        <button className={styles.navbarTitle} type="button">
          {navbarTitle}
        </button>
        <Tabs defaultValue={topicMapSectionLabel}>
          <TabsList
            className={styles.sectionsMenu}
            aria-label={navbarAriaLabel}
          >
            <Trigger
              className={styles.sectionTitle}
              key={topicMapSectionLabel}
              value={topicMapSectionLabel}
              aria-label={topicMapSectionLabel}
            >
              {topicMapSectionLabel}
            </Trigger>
            <Trigger
              className={styles.sectionTitle}
              key={notesSectionLabel}
              value={notesSectionLabel}
              aria-label={notesSectionLabel}
            >
              {notesSectionLabel}
            </Trigger>
            <Trigger
              className={styles.sectionTitle}
              key={helpSectionLabel}
              value={helpSectionLabel}
              aria-label={helpSectionLabel}
            >
              {helpSectionLabel}
            </Trigger>
            {/* <Trigger
            className={styles.sectionTitle}
            key="▰▰▰▰▱▱▱▱▱▱ 40%"
            value="▰▰▰▰▱▱▱▱▱▱ 40%"
            aria-label="Progress bar"
          >
            ▰▰▰▰▱▱▱▱▱▱ 40%
          </Trigger>
          */}
          </TabsList>
          <Content
            className={styles.sectionContent}
            key={topicMapSectionLabel}
            value={topicMapSectionLabel}
          >
            <div />
          </Content>
          <Content
            className={styles.sectionContent}
            key={notesSectionLabel}
            value={notesSectionLabel}
          >
            <NotesSection
              setVisibility={setIsNotesSectionIsShown}
              setDeleteConfirmationVisibility={setIsDeleteConfirmationVisible}
            />
          </Content>
          <Content
            className={styles.sectionContent}
            key={helpSectionLabel}
            value={helpSectionLabel}
          >
            <HelpSection />
          </Content>
          {/* <Content
          className={styles.sectionContent}
          key="▰▰▰▰▱▱▱▱▱▱ 40%"
          value="▰▰▰▰▱▱▱▱▱▱ 40%"
        >
          <h3>Progress bar section</h3>
        </Content> */}
        </Tabs>
      </div>
      <div className={styles.notesList}>
        {isNotesSectionShown && <NotesList topicMapItems={topicMapItems} />}
      </div>
      <Dialog
        isOpen={isDeleteConfirmationVisible}
        title={deleteAllNotesText}
        onOpenChange={isOpen => {
          if (!isOpen) denyDeletion();
        }}
        size="medium"
      >
        <div className={styles.deleteConfirmationButtons}>
          <button
            type="button"
            className={styles.deleteConfirmationPositive}
            onClick={confirmDeletion}
          >
            {deleteAllNotesConfirmText}
          </button>
          <button
            type="button"
            className={styles.deleteConfirmationNegative}
            onClick={denyDeletion}
          >
            {deleteAllNotesDenyText}
          </button>
        </div>
      </Dialog>
    </>
  );
};
