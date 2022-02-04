import * as React from "react";
import { useL10n } from "../../../hooks/useLocalization";
import styles from "./HelpSection.module.scss";

export const HelpSection: React.FC = () => {
  const mainBodyTitle = useL10n("navbarHelpSectionTitle");
  const mainBodyTextLeft = useL10n("navbarHelpSectionLeft");
  const mainBodyTextRight = useL10n("navbarHelpSectionRight");

  return (
    <div className={styles.mainBody}>
      <div className={styles.mainBodyContentWrapper}>
        <div className={styles.mainBodyContent}>
          <div className={styles.mainBodyTitle}>
            <p>{mainBodyTitle}</p>
          </div>
          <div className={styles.mainBodyText}>
            <div
              className={styles.mainBodyTextLeft}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: mainBodyTextLeft }}
            />
            <div
              className={styles.mainBodyTextRight}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: mainBodyTextRight }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
