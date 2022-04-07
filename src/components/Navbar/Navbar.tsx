import ProgressBar from "@ramonak/react-progress-bar";
import useResizeObserver from "@react-hook/resize-observer";
import * as React from "react";
import type { FullScreenHandle } from "react-full-screen";
import { useReactToPrint } from "react-to-print";
import { useAppWidth } from "../../hooks/useAppWidth";
import { useContentId } from "../../hooks/useContentId";
import { useL10n } from "../../hooks/useLocalization";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { BreakpointSize } from "../../types/BreakpointSize";
import { CommonItemType } from "../../types/CommonItemType";
import { NavbarSections } from "../../types/NavbarSections";
import { Params } from "../../types/Params";
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

  fullscreenHandle: FullScreenHandle;

  toggleIPhoneFullscreen: () => void;
  isIPhoneFullscreenActive: boolean;
};

const sizeClassname = {
  [BreakpointSize.Large]: styles.large,
  [BreakpointSize.Medium]: styles.medium,
  [BreakpointSize.Small]: styles.small,
  [BreakpointSize.XSmall]: styles.xSmall,
  [BreakpointSize.XXSmall]: styles.xxSmall,
};

export const Navbar: React.FC<NavbarProps> = ({
  navbarTitle,
  params,
  fullscreenHandle,
  toggleIPhoneFullscreen,
  isIPhoneFullscreenActive,
}) => {
  const contentId = useContentId();
  const [userData, setUserData] = useLocalStorage(contentId);

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

  const [sectionMaxHeight, setSectionMaxHeight] = React.useState(0);
  const [notesListMaxHeight, setNotesListMaxHeight] = React.useState(0);
  const gridRef = React.useRef<HTMLDivElement>(null);
  const navbarRef = React.useRef<HTMLDivElement>(null);
  const notesSectionRef = React.useRef<HTMLDivElement>(null);
  const navbarHeight = navbarRef.current?.getBoundingClientRect().height ?? 0;
  const notesSectionHeight =
    notesSectionRef.current?.getBoundingClientRect().height ?? 0;

  useResizeObserver(gridRef, ({ contentRect }) => {
    if (currentSection === NavbarSections.TopicMap) {
      setSectionMaxHeight(0);
    } else if (contentRect.height > 0) {
      if (fullscreenHandle.active && contentRect.height <= window.innerHeight) {
        setSectionMaxHeight(window.innerHeight - navbarHeight);
      } else {
        setSectionMaxHeight(contentRect.height);
      }
    }
  });

  React.useLayoutEffect(() => {
    if (currentSection === NavbarSections.TopicMap) {
      setSectionMaxHeight(0);
    } else {
      const initialHeight =
        gridRef.current?.getBoundingClientRect().height ?? 0;
      if (initialHeight > 0) {
        if (fullscreenHandle.active && initialHeight <= window.innerHeight) {
          setSectionMaxHeight(window.innerHeight - navbarHeight);
        } else {
          setSectionMaxHeight(initialHeight);
        }
      }
    }
  }, [currentSection, fullscreenHandle.active, navbarHeight]);

  React.useLayoutEffect(() => {
    if (currentSection === NavbarSections.Notes) {
      if (fullscreenHandle.active) {
        setNotesListMaxHeight(
          window.innerHeight - navbarHeight - notesSectionHeight,
        );
      } else {
        setNotesListMaxHeight(sectionMaxHeight - notesSectionHeight);
      }
    }
  }, [
    currentSection,
    fullscreenHandle.active,
    navbarHeight,
    notesSectionHeight,
    sectionMaxHeight,
  ]);

  React.useEffect(() => {
    setProgressBarValue(
      allItems.filter(
        item =>
          item.dialog?.hasNote &&
          item.id in userData &&
          userData.dialogs[item.id].noteDone,
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
  const notesListRef = React.useRef(null);
  const handlePrint = useReactToPrint({
    content: () => notesListRef.current,
    documentTitle: navbarTitle,
    onBeforeGetContent: updateNavbarTitleForPrint,
    onAfterPrint: updateNavbarTitleForPrint,
  });

  const [isHamburgerOpen, setIsHamburgerOpen] = React.useState<boolean>(false);

  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    React.useState<boolean>(false);
  const deleteAllNotes = (): void => {
    allItems.forEach(item => {
      if (item.id in userData.dialogs) {
        userData.dialogs[item.id].note = undefined;
        userData.dialogs[item.id].noteDone = undefined;
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
    <>
      <div ref={notesSectionRef}>
        <NotesSection
          setDeleteConfirmationVisibility={setIsDeleteConfirmationVisible}
          handlePrint={handlePrint}
        />
      </div>
      <div
        className={styles.notesList}
        ref={notesListRef}
        title={navbarTitleForPrint}
        style={{
          minHeight: notesListMaxHeight,
          maxHeight: notesListMaxHeight,
        }}
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
        <FullscreenButton
          fullscreenHandle={fullscreenHandle}
          toggleIPhoneFullscreen={toggleIPhoneFullscreen}
          isIPhoneFullscreenActive={isIPhoneFullscreenActive}
        />
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
          <HamburgerCloseIcon
            iconColor="#fff"
            width={undefined}
            height={undefined}
          />
        ) : (
          <HamburgerIcon
            iconColor="#fff"
            width={undefined}
            height={undefined}
          />
        )}
      </button>
      <div className={styles.fullscreenButtonMobile}>
        <FullscreenButton
          fullscreenHandle={fullscreenHandle}
          toggleIPhoneFullscreen={toggleIPhoneFullscreen}
          isIPhoneFullscreenActive={isIPhoneFullscreenActive}
        />
      </div>
    </div>
  );

  return (
    <>
      <div
        aria-label={navbarAriaLabel}
        className={sizeClassName}
        style={{
          // @ts-expect-error Custom properties are allowed
          "--h5p-tm-navbar-height": `${navbarHeight}px`,
        }}
      >
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
              grid={params.topicMap?.grid}
              fullscreenHandle={fullscreenHandle}
            />
          </div>
          {isHamburgerOpen && (
            <div className={styles.sectionsMenuMobile}>{sectionsMenu}</div>
          )}
          <div className={styles.sectionContentWrapper}>
            {currentSection === NavbarSections.Notes && notesSection}
            {currentSection === NavbarSections.Help && (
              <div
                style={{
                  maxHeight: sectionMaxHeight,
                  minHeight: sectionMaxHeight,
                  overflowY: "auto",
                }}
              >
                <HelpSection />
              </div>
            )}
          </div>
        </div>
      </div>
      {deleteConfirmation}
    </>
  );
};
