import { ArrowLeftIcon } from "@radix-ui/react-icons";
import * as React from "react";
import { useL10n } from "../../../hooks/useLocalization";
import { useSizeClassNames } from "../../../hooks/useSizeClassNames";
import styles from "./HelpSection.module.scss";

export type HelpSectionProps = {
  goToTopicMap: () => void;
};

export const HelpSection: React.FC<HelpSectionProps> = ({ goToTopicMap }) => {
  const mainBodyTitle = useL10n("navbarHelpSectionTitle");
  const mainBodyText = useL10n("navbarHelpSectionBody");
  const goToTopicMapLabel = useL10n("goToTopicMapLabel");

  const sizeClassNames = useSizeClassNames(styles);

  return (
    <div className={`${styles.mainBody} ${sizeClassNames}`}>
      <div className={styles.mainBodyContent}>
        <div className={styles.mainBodyTitle}>
          <button
            type="button"
            onClick={goToTopicMap}
            className={styles.backArrow}
            aria-label={goToTopicMapLabel}
          >
            <ArrowLeftIcon width={22} height={22} />
          </button>
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
