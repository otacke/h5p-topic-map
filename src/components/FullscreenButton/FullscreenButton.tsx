import * as React from "react";
import isIOS from "is-ios";
import { useL10n } from "../../hooks/useLocalization";
import styles from "./FullscreenButton.module.scss";
import { useH5PInstance } from "../../hooks/useH5PInstance";

export type FullscreenButtonProps = {
  toggleIOSFullscreen: () => void;
  isIOSFullscreenActive: boolean;
};

export const FullscreenButton: React.FC<FullscreenButtonProps> = ({
  toggleIOSFullscreen,
  isIOSFullscreenActive,
}) => {
  const h5pInstance = useH5PInstance();
  const fullscreenButtonLabel = useL10n("fullscreenButtonLabel");
  const handleFullscreen = (): void => {
    if (isIOS) {
      toggleIOSFullscreen();
    }
    else {
      setTimeout(() => {
        h5pInstance.handleToggleFullscreen();
      }, 300); // Some devices don't register user gesture before call to to requestFullscreen
    }
  };

  return (
    <button
      className={styles.fullscreenButton}
      type="button"
      title={fullscreenButtonLabel}
      aria-label={fullscreenButtonLabel}
      onClick={handleFullscreen}
    >
      <svg
        className={styles.fullscreenButtonSvg}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 14 14"
      >
        <path
          fill="#333333"
          d={
            H5P.isFullscreen || (isIOS && isIOSFullscreenActive)
              ? "M0 11H3V14H5V9H0V11ZM3 3H0V5H5V0H3V3ZM9 14H11V11H14V9H9V14ZM11 3V0H9V5H14V3H11Z"
              : "M2 9H0V14H5V12H2V9ZM0 5H2V2H5V0H0V5ZM12 12H9V14H14V9H12V12ZM9 0V2H12V5H14V0H9Z"
          }
        />
      </svg>
    </button>
  );
};
