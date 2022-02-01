import * as React from "react";
import { useL10n } from "../../../hooks/useLocalization";
import styles from "./HelpSection.module.scss";

// export type HelpSectionProps = {
// }

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
            <div className={styles.mainBodyTextLeft}>
              <p>{mainBodyTextLeft}</p>
            </div>
            <div>
              <p>{mainBodyTextRight}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
