import * as React from "react";
import { Trigger, Content, Tabs, TabsList } from "@radix-ui/react-tabs";
import { useReactToPrint } from "react-to-print";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import ProgressBar from "@ramonak/react-progress-bar";
import { useL10n } from "../../hooks/useLocalization";
import { HelpSection } from "./HelpSection/HelpSection";
import { NotesSection } from "./NotesSection/NotesSection";
import { NotesList } from "./NotesSection/NotesList/NotesList";
import { getUserData, setUserData } from "../../hooks/useLocalStorage";
import { DialogWindow } from "../Dialog-Window/DialogWindow";
import { HamburgerIcon, HamburgerCloseIcon } from "../Icons/Icons";
import { CommonItemType } from "../../types/CommonItemType";
import { Grid } from "../Grid/Grid";
import { Params } from "../../types/H5P/Params";
import styles from "./Navbar.module.scss";

export type NavbarProps = {
  navbarTitle: string;
  params: Params;
};

export const Navbar: React.FC<NavbarProps> = ({ navbarTitle, params }) => {
  const navbarAriaLabel = useL10n("navbarTabsListAriaLabel");
  const topicMapSectionLabel = useL10n("navbarTopicMapSectionLabel");
  const notesSectionLabel = useL10n("navbarNotesSectionLabel");
  const helpSectionLabel = useL10n("navbarHelpSectionLabel");
  const progressBarLabel = useL10n("progressBarLabel");
  const progressPercentageLabel = useL10n("progressPercentageLabel");
  const deleteAllNotesText = useL10n("deleteNotesConfirmationWindowLabel");
  const deleteAllNotesConfirmText = useL10n("deleteNotesConfirmLabel");
  const deleteAllNotesDenyText = useL10n("deleteNotesDenyLabel");
  const userData = getUserData();
  const [progressBarValue, setProgressBarValue] = React.useState<number>(0);
  const fullscreenhandle = useFullScreenHandle();
  const allItems = React.useMemo(
    () =>
      ((params.topicMap?.topicMapItems ?? []) as CommonItemType[]).concat(
        (params.topicMap?.arrowItems ?? []) as CommonItemType[],
      ),
    [params.topicMap?.arrowItems, params.topicMap?.topicMapItems],
  );

  const totalNotesToComplete = React.useMemo(
    () => allItems.filter(item => item.dialog?.hasNote).length,
    [allItems],
  );
  const [progressPercentage, setProgressPercentage] =
    React.useState<number>(progressBarValue);

  React.useEffect(() => {
    setProgressBarValue(
      allItems.filter(
        item =>
          item.dialog?.hasNote &&
          item.id in userData &&
          userData[item.id].noteCompleted,
      ).length,
    );
    setProgressPercentage(
      Math.round((progressBarValue / totalNotesToComplete) * 100),
    );
  }, [progressBarValue, allItems, totalNotesToComplete, userData]);

  let navbarTitleForPrint = "";
  const updateNavbarTitleForPrint = (): void => {
    navbarTitleForPrint = navbarTitleForPrint ? "" : navbarTitle;
  };

  const componentRef = React.useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: navbarTitle,
    onBeforeGetContent: updateNavbarTitleForPrint,
    onAfterPrint: updateNavbarTitleForPrint,
  });

  const [isNotesSectionShown, setIsNotesSectionIsShown] =
    React.useState<boolean>(false);

  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    React.useState<boolean>(false);

  const [isHamburgerOpen, setIsHamburgerOpen] = React.useState<boolean>(false);

  const deleteAllNotes = (): void => {
    allItems.forEach(item => {
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

  const fakeItem = {
    id: "id",
    label: deleteAllNotesText,
  };

  const deleteConfirmation = (
    <DialogWindow
      item={fakeItem}
      open={isDeleteConfirmationVisible}
      onOpenChange={isOpen => {
        if (!isOpen) denyDeletion();
      }}
      confirmWindow={{
        confirmAction: confirmDeletion,
        denyAction: denyDeletion,
        confirmText: deleteAllNotesConfirmText,
        denyText: deleteAllNotesDenyText,
      }}
    />
  );

  const notesSection = (
    <div
      className={styles.notesList}
      ref={componentRef}
      title={navbarTitleForPrint}
    >
      {isNotesSectionShown && (
        <div>
          <NotesList topicMapItems={allItems} navbarTitle={navbarTitle} />
        </div>
      )}
    </div>
  );

  const progressBar = (
    <>
      <div
        className={styles.progressPercentage}
        aria-label={progressPercentageLabel}
      >{`${progressPercentage}%`}</div>
      <ProgressBar
        className={styles.progressBar}
        completed={progressPercentage}
        baseBgColor="var(--theme-color-1)"
        bgColor="var(--theme-color-4)"
        isLabelVisible={false}
      />
    </>
  );

  return (
    <div className={styles.contentWrapper}>
      <FullScreen className={styles.fullscreenStyle} handle={fullscreenhandle}>
        <div className={styles.mainBody}>
          <button className={styles.navbarTitle} type="button">
            {navbarTitle}
          </button>
          <div className={styles.progressBarMobileWrapper}>{progressBar}</div>
          <button
            type="button"
            className={styles.hamburgerButton}
            onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
          >
            {isHamburgerOpen ? (
              <HamburgerCloseIcon iconColor="#fff" />
            ) : (
              <HamburgerIcon iconColor="#fff" />
            )}
          </button>
          <Tabs defaultValue={topicMapSectionLabel}>
            <TabsList
              className={`${styles.sectionsMenu} ${
                !isHamburgerOpen && styles.hidden
              }`}
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
              <Trigger
                className={styles.progressBarTitle}
                key={progressBarLabel}
                value={`${progressBarValue}`}
                aria-label={progressBarLabel}
                disabled
              >
                <div className={styles.progressBarWrapper}>{progressBar}</div>
              </Trigger>
            </TabsList>
            <Content
              className={styles.sectionContent}
              key={topicMapSectionLabel}
              value={topicMapSectionLabel}
            >
              <Grid
                items={params.topicMap?.topicMapItems ?? []}
                arrowItems={params.topicMap?.arrowItems ?? []}
                backgroundImage={params.topicMap?.gridBackgroundImage}
                fullscreenHandle={fullscreenhandle}
              />
            </Content>
            <Content
              className={styles.sectionContent}
              key={notesSectionLabel}
              value={notesSectionLabel}
            >
              <NotesSection
                setVisibility={setIsNotesSectionIsShown}
                setDeleteConfirmationVisibility={setIsDeleteConfirmationVisible}
                handlePrint={handlePrint}
              />
            </Content>
            <Content
              className={styles.sectionContent}
              key={helpSectionLabel}
              value={helpSectionLabel}
            >
              <HelpSection />
            </Content>
          </Tabs>
        </div>
        {isNotesSectionShown && notesSection}
        {deleteConfirmation}
      </FullScreen>
    </div>
  );
};
