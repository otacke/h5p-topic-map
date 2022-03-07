import * as React from "react";
import { useAppWidth } from "../../../hooks/useAppWidth";
import { useL10n } from "../../../hooks/useLocalization";
import { BreakpointSize } from "../../../types/BreakpointSize";
import styles from "./NotesSection.module.scss";

export type NotesSectionProps = {
  setDeleteConfirmationVisibility: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  handlePrint: () => void;
};

const sizeClassname = {
  [BreakpointSize.Large]: styles.large,
  [BreakpointSize.Medium]: styles.medium,
  [BreakpointSize.Small]: styles.small,
  [BreakpointSize.XSmall]: styles.xSmall,
};

export const NotesSection: React.FC<NotesSectionProps> = ({
  setDeleteConfirmationVisibility,
  handlePrint,
}) => {
  const mainBodyTitle = useL10n("navbarNotesSectionTitle");
  const mainBodyText = useL10n("navbarNotesSectionBody");
  const printText = useL10n("navbarNotesSectionPrintLabel");
  const deleteText = useL10n("navbarNotesSectionDeleteLabel");

  const appWidth = useAppWidth();

  const sizeClassName = React.useMemo(
    () => sizeClassname[appWidth],
    [appWidth],
  );

  return (
    <div className={`${styles.mainBody} ${sizeClassName}`}>
      <div className={styles.mainBodyContent}>
        <div className={styles.mainBodyTitle}>
          <p>{mainBodyTitle}</p>
        </div>
        <div className={styles.mainBodyTextWrapper}>
          <div className={styles.mainBodyText}>{mainBodyText}</div>
          <br />
          <div className={styles.mainBodyButtons}>
            <button
              className={styles.mainBodyButton}
              type="button"
              aria-label={printText}
              onClick={handlePrint}
            >
              {printText}
            </button>
            <button
              className={styles.mainBodyButton}
              type="button"
              aria-label={deleteText}
              onClick={() => setDeleteConfirmationVisibility(true)}
            >
              {deleteText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
