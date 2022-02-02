import * as React from "react";
import { useL10n } from "../../../hooks/useLocalization";
import styles from "./HelpSection.module.scss";

export const HelpSection: React.FC = () => {
  const mainBodyTitle = useL10n("navbarHelpSectionTitle");
  const mainBodyTextLeftPartOne = useL10n("navbarHelpSectionLeftPartOne");
  const mainBodyTextLeftPartTwo = useL10n("navbarHelpSectionLeftPartTwo");
  const mainBodyTextRightPartOneTitle = useL10n(
    "navbarHelpSectionRightPartOneTitle",
  );
  const mainBodyTextRightPartOneBody = useL10n(
    "navbarHelpSectionRightPartOneBody",
  );
  const mainBodyTextRightPartTwoTitle = useL10n(
    "navbarHelpSectionRightPartTwoTitle",
  );
  const mainBodyTextRightPartTwoBody = useL10n(
    "navbarHelpSectionRightPartTwoBody",
  );
  const mainBodyTextRightPartThreeTitle = useL10n(
    "navbarHelpSectionRightPartThreeTitle",
  );
  const mainBodyTextRightPartThreeBody = useL10n(
    "navbarHelpSectionRightPartThreeBody",
  );

  return (
    <div className={styles.mainBody}>
      <div className={styles.mainBodyContentWrapper}>
        <div className={styles.mainBodyContent}>
          <div className={styles.mainBodyTitle}>
            <p>{mainBodyTitle}</p>
          </div>
          <div className={styles.mainBodyText}>
            <div className={styles.mainBodyTextLeft}>
              <p>{mainBodyTextLeftPartOne}</p>
              <br />
              <p>{mainBodyTextLeftPartTwo}</p>
            </div>
            <div className={styles.mainBodyTextRight}>
              <p>
                <b>{mainBodyTextRightPartOneTitle}</b>
                {` ${mainBodyTextRightPartOneBody}`}
              </p>
              <br />
              <p>
                <b>{mainBodyTextRightPartTwoTitle}</b>
                {` ${mainBodyTextRightPartTwoBody}`}
              </p>
              <br />
              <p>
                <b>{mainBodyTextRightPartThreeTitle}</b>
                {` ${mainBodyTextRightPartThreeBody}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
