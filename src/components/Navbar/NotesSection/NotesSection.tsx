import * as React from "react";
import { useL10n } from "../../../hooks/useLocalization";
import { useSizeClassNames } from "../../../hooks/useSizeClassNames";
import styles from "./NotesSection.module.scss";

export type NotesSectionProps = {
  setDeleteConfirmationVisibility: (isVisible: boolean) => void;
  setSubmitAllConfirmationVisibility: (isVisible: boolean) => void;
  handlePrint: () => void;
};

export const NotesSection: React.FC<NotesSectionProps> = ({
  setDeleteConfirmationVisibility,
  setSubmitAllConfirmationVisibility,
  handlePrint,
}) => {
  const mainBodyTitle = useL10n("navbarNotesSectionTitle");
  const mainBodyText = useL10n("navbarNotesSectionBody");
  const printText = useL10n("navbarNotesSectionPrintLabel");
  const exportAllUserDataText = useL10n("navbarNotesSectionSubmitAllLabel");
  const deleteText = useL10n("navbarNotesSectionDeleteLabel");

  const sizeClassNames = useSizeClassNames(styles);

  return (
    <div className={`${styles.mainBody} ${sizeClassNames}`}>
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
              aria-label={exportAllUserDataText}
              onClick={() => setSubmitAllConfirmationVisibility(true)}
            >
              {exportAllUserDataText}
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
