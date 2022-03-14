import * as React from "react";
import { FullScreenHandle } from "react-full-screen";
import { useL10n } from "../../hooks/useLocalization";
import styles from "./FullscreenButton.module.scss";

export type FullscreenButtonProps = {
  fullscreenHandle: FullScreenHandle;
  toggleIPhoneFullscreen: () => void;
  isIPhoneFullscreenActive: boolean;
};

export const FullscreenButton: React.FC<FullscreenButtonProps> = ({
  fullscreenHandle,
  toggleIPhoneFullscreen,
  isIPhoneFullscreenActive,
}) => {
  const fullscreenButtonLabel = useL10n("fullscreenButtonLabel");

  const isIPhone = window.navigator.userAgent.includes("iPhone");

  const handleFullscreen = (): void => {
    if (isIPhone) {
      toggleIPhoneFullscreen();
    } else if (fullscreenHandle.active) {
      fullscreenHandle.exit();
    } else {
      fullscreenHandle.enter();
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
            fullscreenHandle.active || (isIPhone && isIPhoneFullscreenActive)
              ? "M0 11H3V14H5V9H0V11ZM3 3H0V5H5V0H3V3ZM9 14H11V11H14V9H9V14ZM11 3V0H9V5H14V3H11Z"
              : "M2 9H0V14H5V12H2V9ZM0 5H2V2H5V0H0V5ZM12 12H9V14H14V9H12V12ZM9 0V2H12V5H14V0H9Z"
          }
        />
      </svg>
    </button>
  );
};
