/* eslint-disable no-param-reassign */
import * as React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import type { FullScreenHandle } from "react-full-screen";
import useResizeObserver from "@react-hook/resize-observer";
import { useReactToPrint } from "react-to-print";
import { useAppWidth } from "../../hooks/useAppWidth";
import { useL10n } from "../../hooks/useLocalization";
import { BreakpointSize } from "../../types/BreakpointSize";
import { CommonItemType } from "../../types/CommonItemType";
import { Params } from "../../types/H5P/Params";
import { UserData } from "../../types/UserData";
import { DialogWindow } from "../Dialog-Window/DialogWindow";
import { FullscreenButton } from "../FullscreenButton/FullscreenButton";
import { Grid } from "../Grid/Grid";
import { HamburgerCloseIcon, HamburgerIcon } from "../Icons/Icons";
import { HelpSection } from "./HelpSection/HelpSection";
import { NotesList } from "./NotesSection/NotesList/NotesList";
import { NotesSection } from "./NotesSection/NotesSection";
import { NavbarSections } from "../../types/NavbarSections";
import styles from "./Navbar.module.scss";

export type NavbarProps = {
  navbarTitle: string;
  params: Params;
  setStorageData: React.Dispatch<React.SetStateAction<UserData>>;
  fullscreenHandle: FullScreenHandle;
  storageData: UserData;
};

const sizeClassname = {
  [BreakpointSize.Large]: styles.large,
  [BreakpointSize.Medium]: styles.medium,
  [BreakpointSize.Small]: styles.small,
  [BreakpointSize.XSmall]: styles.xSmall,
};

export const Navbar: React.FC<NavbarProps> = ({
  navbarTitle,
  params,
  setStorageData,
  storageData,
  fullscreenHandle,
}) => {
  const navbarAriaLabel = useL10n("navbarTabsListAriaLabel");
  const topicMapSectionLabel = useL10n("navbarTopicMapSectionLabel");
  const notesSectionLabel = useL10n("navbarNotesSectionLabel");
  const helpSectionLabel = useL10n("navbarHelpSectionLabel");
  const progressPercentageLabel = useL10n("progressPercentageLabel");
  const deleteAllNotesText = useL10n("deleteNotesConfirmationWindowLabel");
  const deleteAllNotesConfirmText = useL10n("deleteNotesConfirmLabel");
  const deleteAllNotesDenyText = useL10n("deleteNotesDenyLabel");

  const [currentSection, setCurrentSection] = React.useState(
    NavbarSections.TopicMap,
  );

  const [progressBarValue, setProgressBarValue] = React.useState<number>(0);
  const [progressPercentage, setProgressPercentage] =
    React.useState<number>(progressBarValue);

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
  const hasNotes = totalNotesToComplete > 0;

  const appWidth = useAppWidth();
  const sizeClassName = React.useMemo(
    () => sizeClassname[appWidth],
    [appWidth],
  );

  const [maxHeight, setMaxHeight] = React.useState(0);
  const gridRef = React.useRef<HTMLDivElement>(null);
  const navbarRef = React.useRef<HTMLDivElement>(null);

  useResizeObserver(gridRef, ({ contentRect }) => {
    if (currentSection === NavbarSections.TopicMap) {
      setMaxHeight(0);
    } else if (contentRect.height > 0) {
      if (fullscreenHandle.active && contentRect.height <= window.innerHeight) {
        setMaxHeight(
          window.innerHeight -
            (navbarRef.current?.getBoundingClientRect().height ?? 0),
        );
      } else {
        setMaxHeight(contentRect.height);
      }
    }
  });

  React.useLayoutEffect(() => {
    if (currentSection === NavbarSections.TopicMap) {
      setMaxHeight(0);
    } else {
      const initialHeight =
        gridRef.current?.getBoundingClientRect().height ?? 0;
      if (initialHeight > 0) {
        if (fullscreenHandle.active && initialHeight <= window.innerHeight) {
          setMaxHeight(
            window.innerHeight -
              (navbarRef.current?.getBoundingClientRect().height ?? 0),
          );
        } else {
          setMaxHeight(initialHeight);
        }
      }
    }
  }, [currentSection, fullscreenHandle.active]);

  React.useEffect(() => {
    setProgressBarValue(
      allItems.filter(
        item =>
          item.dialog?.hasNote &&
          item.id in storageData &&
          storageData[item.id].noteDone,
      ).length,
    );
    setProgressPercentage(
      Math.round((progressBarValue / totalNotesToComplete) * 100),
    );
  }, [progressBarValue, allItems, totalNotesToComplete, storageData]);

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

  const [isHamburgerOpen, setIsHamburgerOpen] = React.useState<boolean>(false);

  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    React.useState<boolean>(false);
  const deleteAllNotes = (): void => {
    allItems.forEach(item => {
      if (item.id in storageData) {
        storageData[item.id].note = undefined;
        storageData[item.id].noteDone = undefined;
      }
    });
    setStorageData(storageData);
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
      setStorageData={setStorageData}
      storageData={storageData}
    />
  );

  const notesSection = (
    <>
      <NotesSection
        setDeleteConfirmationVisibility={setIsDeleteConfirmationVisible}
        handlePrint={handlePrint}
      />
      <div
        className={styles.notesList}
        ref={componentRef}
        title={navbarTitleForPrint}
      >
        <NotesList topicMapItems={allItems} navbarTitle={navbarTitle} />
      </div>
    </>
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

  const sectionsMenu = (
    <>
      <button
        className={`${styles.sectionTitle} ${
          currentSection === NavbarSections.TopicMap && styles.active
        }`}
        type="button"
        onClick={() => setCurrentSection(NavbarSections.TopicMap)}
      >
        {topicMapSectionLabel}
      </button>

      {hasNotes && (
        <button
          className={`${styles.sectionTitle} ${
            currentSection === NavbarSections.Notes && styles.active
          }`}
          type="button"
          onClick={() => setCurrentSection(NavbarSections.Notes)}
        >
          {notesSectionLabel}
        </button>
      )}

      <button
        className={`${styles.sectionTitle} ${
          currentSection === NavbarSections.Help && styles.active
        }`}
        type="button"
        onClick={() => setCurrentSection(NavbarSections.Help)}
      >
        {helpSectionLabel}
      </button>

      {hasNotes && (
        <div className={styles.progressBarWrapper}>{progressBar}</div>
      )}

      <div className={styles.fullscreenButtonNotMobile}>
        <FullscreenButton fullscreenHandle={fullscreenHandle} />
      </div>
    </>
  );

  const navButtonsMobile = (
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
  );

  return (
    <>
      <div aria-label={navbarAriaLabel} className={sizeClassName}>
        <div ref={navbarRef}>
          <div className={styles.navbarWrapper}>
            <div className={styles.navbarTitle}>{navbarTitle}</div>
            <div className={styles.sectionsMenuNotMobile}>{sectionsMenu}</div>
            {navButtonsMobile}
          </div>
        </div>

        <div className={styles.sectionsWrapper}>
          <div ref={gridRef}>
            <Grid
              items={params.topicMap?.topicMapItems ?? []}
              arrowItems={params.topicMap?.arrowItems ?? []}
              backgroundImage={params.topicMap?.gridBackgroundImage}
              setStorageData={setStorageData}
              storageData={storageData}
              grid={params.topicMap?.grid}
            />
          </div>
          {isHamburgerOpen && (
            <div className={styles.sectionsMenuMobile}>{sectionsMenu}</div>
          )}
          <div
            className={styles.sectionContentWrapper}
            style={{ maxHeight, minHeight: maxHeight }}
          >
            {currentSection === NavbarSections.Notes && notesSection}
            {currentSection === NavbarSections.Help && <HelpSection />}
          </div>
        </div>
      </div>
      {deleteConfirmation}
    </>
  );
};
