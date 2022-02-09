import * as React from "react";
import { useL10n } from "../../../hooks/useLocalization";
import styles from "./NotesSection.module.scss";

export const NotesSection: React.FC = () => {
  const mainBodyTitle = useL10n("navbarNotesSectionTitle");
  const mainBodyText = useL10n("navbarNotesSectionBody");
  const printText = useL10n("navbarNotesSectionPrintLabel");
  const deleteText = useL10n("navbarNotesSectionDeleteLabel");

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
            <button type="button" className={styles.mainBodyButton}>
              {printText}
            </button>
            <button type="button" className={styles.mainBodyButton}>
              {deleteText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
