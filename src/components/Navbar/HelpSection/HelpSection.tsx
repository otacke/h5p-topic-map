import * as React from "react";
import { useAppWidth } from "../../../hooks/useAppWidth";
import { useL10n } from "../../../hooks/useLocalization";
import { BreakpointSize } from "../../../types/BreakpointSize";
import styles from "./HelpSection.module.scss";

const sizeClassname = {
  [BreakpointSize.Large]: styles.large,
  [BreakpointSize.Medium]: styles.medium,
  [BreakpointSize.Small]: styles.small,
  [BreakpointSize.XSmall]: styles.xSmall,
};

export const HelpSection: React.FC = () => {
  const mainBodyTitle = useL10n("navbarHelpSectionTitle");
  const mainBodyText = useL10n("navbarHelpSectionBody");

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
        <div
          className={styles.mainBodyText}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: mainBodyText }}
        />
      </div>
    </div>
  );
};
