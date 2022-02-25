import { Content, Tabs, TabsList, Trigger } from "@radix-ui/react-tabs";
import ProgressBar from "@ramonak/react-progress-bar";
/* eslint-disable no-param-reassign */
import * as React from "react";
import type { FullScreenHandle } from "react-full-screen";
import { useReactToPrint } from "react-to-print";
import { useL10n } from "../../hooks/useLocalization";
import { CommonItemType } from "../../types/CommonItemType";
import { Params } from "../../types/H5P/Params";
import { UserData } from "../../types/UserData";
import { DialogWindow } from "../Dialog-Window/DialogWindow";
import { FullscreenButton } from "../FullscreenButton/FullscreenButton";
import { Grid } from "../Grid/Grid";
import { HamburgerCloseIcon, HamburgerIcon } from "../Icons/Icons";
import { HelpSection } from "./HelpSection/HelpSection";
import styles from "./Navbar.module.scss";
import { NotesList } from "./NotesSection/NotesList/NotesList";
import { NotesSection } from "./NotesSection/NotesSection";

export type NavbarProps = {
  navbarTitle: string;
  params: Params;
  setUserDataCopy: React.Dispatch<React.SetStateAction<UserData>>;
  fullscreenHandle: FullScreenHandle;
  userDataCopy: UserData;
};

export const Navbar: React.FC<NavbarProps> = ({
  navbarTitle,
  params,
  setUserDataCopy,
  userDataCopy,
  fullscreenHandle,
}) => {
  const navbarAriaLabel = useL10n("navbarTabsListAriaLabel");
  const topicMapSectionLabel = useL10n("navbarTopicMapSectionLabel");
  const notesSectionLabel = useL10n("navbarNotesSectionLabel");
  const helpSectionLabel = useL10n("navbarHelpSectionLabel");
  const progressBarLabel = useL10n("progressBarLabel");
  const progressPercentageLabel = useL10n("progressPercentageLabel");
  const deleteAllNotesText = useL10n("deleteNotesConfirmationWindowLabel");
  const deleteAllNotesConfirmText = useL10n("deleteNotesConfirmLabel");
  const deleteAllNotesDenyText = useL10n("deleteNotesDenyLabel");
  const [progressBarValue, setProgressBarValue] = React.useState<number>(0);
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
          item.id in userDataCopy &&
          userDataCopy[item.id].noteCompleted,
      ).length,
    );
    setProgressPercentage(
      Math.round((progressBarValue / totalNotesToComplete) * 100),
    );
  }, [progressBarValue, allItems, totalNotesToComplete, userDataCopy]);

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
      if (item.id in userDataCopy) {
        userDataCopy[item.id].note = undefined;
        userDataCopy[item.id].noteCompleted = undefined;
      }
    });
    setUserDataCopy(userDataCopy);
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
      setUserDataCopy={setUserDataCopy}
      userDataCopy={userDataCopy}
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

  const hasNotes = totalNotesToComplete > 0;

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.mainBody}>
        <button className={styles.navbarTitle} type="button">
          {navbarTitle}
        </button>
        <div className={styles.progressBarMobileWrapper}>{progressBar}</div>
        <div className={styles.navButtonsMobileWrapper}>
          <div className={styles.navButtonsMobile}>
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
            <div className={styles.fullscreenButtonMobile}>
              <FullscreenButton fullscreenHandle={fullscreenHandle} />
            </div>
          </div>
        </div>
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
            {hasNotes && (
              <Trigger
                className={styles.sectionTitle}
                key={notesSectionLabel}
                value={notesSectionLabel}
                aria-label={notesSectionLabel}
              >
                {notesSectionLabel}
              </Trigger>
            )}
            <Trigger
              className={styles.sectionTitle}
              key={helpSectionLabel}
              value={helpSectionLabel}
              aria-label={helpSectionLabel}
            >
              {helpSectionLabel}
            </Trigger>
            {hasNotes && (
              <Trigger
                className={styles.progressBarTitle}
                key={progressBarLabel}
                value={`${progressBarValue}`}
                aria-label={progressBarLabel}
                disabled
              >
                <div className={styles.progressBarWrapper}>{progressBar}</div>
              </Trigger>
            )}
            <div className={styles.fullscreenButton}>
              <FullscreenButton fullscreenHandle={fullscreenHandle} />
            </div>
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
              setUserDataCopy={setUserDataCopy}
              userDataCopy={userDataCopy}
            />
          </Content>
          {hasNotes && (
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
          )}
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
    </div>
  );
};
