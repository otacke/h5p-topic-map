import * as React from "react";
import { useL10n } from "../../../hooks/useLocalization";
import styles from "./NotesSection.module.scss";

export type NotesSectionProps = {
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteConfirmationVisibility: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export const NotesSection: React.FC<NotesSectionProps> = ({
  setVisibility,
  setDeleteConfirmationVisibility,
}) => {
  const mainBodyTitle = useL10n("navbarNotesSectionTitle");
  const mainBodyText = useL10n("navbarNotesSectionBody");
  const printText = useL10n("navbarNotesSectionPrintLabel");
  const deleteText = useL10n("navbarNotesSectionDeleteLabel");

  React.useEffect(() => {
    setVisibility(true);
    return () => setVisibility(false);
  });

  return (
    <div className={styles.mainBody}>
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
