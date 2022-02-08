import * as React from "react";
import { useL10n } from "../../../hooks/useLocalization";
import styles from "./HelpSection.module.scss";

export const HelpSection: React.FC = () => {
  const mainBodyTitle = useL10n("navbarHelpSectionTitle");
  const mainBodyText = useL10n("navbarHelpSectionBody");

  return (
    <div className={styles.mainBody}>
      <div className={styles.mainBodyContent}>
        <div className={styles.mainBodyTitle}>
          <p>{mainBodyTitle}</p>
        </div>
        <div
          className={styles.mainBodyText}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: mainBodyText }}
        />
      </div>
    </div>
  );
};
