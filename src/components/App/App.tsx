import useResizeObserver from "@react-hook/resize-observer";
import * as React from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { AppWidthContext } from "../../contexts/AppWidthContext";
import { getUserData, setUserData } from "../../hooks/useLocalStorage";
import { Params } from "../../types/H5P/Params";
import { UserData } from "../../types/UserData";
import { defaultTheme } from "../../utils/semantics.utils";
import { Navbar } from "../Navbar/Navbar";
import styles from "./App.module.scss";

export type AppProps = {
  params: Params;
  title: string | undefined;
};

export const App: React.FC<AppProps> = ({ params, title }) => {
  const fullscreenHandle = useFullScreenHandle();
  const [isIPhoneFullscreenActive, setIsIPhoneFullscreenActive] =
    React.useState(false);
  const isIPhone = window.navigator.userAgent.includes("iPhone");

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(0);
  const [storageData, setStorageData] = React.useState<UserData>(getUserData());

  // if (isIPhone && isIPhoneFullscreenActive) {
  // }

  // if (isIPhoneFullscreenActive) {
  //   document.documentElement.style.setProperty(
  //     "--screen-width",
  //     `${window.screen.availWidth}px`,
  //   );
  //   document.documentElement.style.setProperty(
  //     "--screen-height",
  //     `${window.screen.availHeight}px`,
  //   );
  // }

  React.useEffect(() => {
    setUserData(storageData);
  }, [storageData]);

  React.useLayoutEffect(() => {
    const initialWidth =
      containerRef.current?.getBoundingClientRect().width ?? 0;
    setWidth(initialWidth);
  }, []);

  useResizeObserver(containerRef, ({ contentRect }) => {
    setWidth(contentRect.width);
  });

  const themeClassName = React.useMemo(
    () => `theme-${params.topicMap?.colorTheme ?? defaultTheme}`,
    [params.topicMap?.colorTheme],
  );

  return (
    <AppWidthContext.Provider value={width}>
      <div
        className={`${themeClassName} ${
          isIPhoneFullscreenActive && styles.iPhoneFullscreenStyle
        }`}
      >
        <FullScreen
          className={styles.fullscreenStyle}
          handle={fullscreenHandle}
        >
          <div className={styles.navbarWrapper} ref={containerRef}>
            <Navbar
              navbarTitle={title ?? ""}
              params={params}
              setStorageData={setStorageData}
              fullscreenHandle={fullscreenHandle}
              setIsIPhoneFullscreenActive={setIsIPhoneFullscreenActive}
              isIPhoneFullscreenActive={isIPhoneFullscreenActive}
              storageData={{ ...storageData }}
            />
          </div>
        </FullScreen>
      </div>
    </AppWidthContext.Provider>
  );
};
