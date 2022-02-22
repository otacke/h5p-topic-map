import * as React from "react";
import useResizeObserver from "@react-hook/resize-observer";
import { AppWidthContext } from "../../contexts/AppWidthContext";
import { Params } from "../../types/H5P/Params";
import { defaultTheme } from "../../utils/semantics.utils";
import { Navbar } from "../Navbar/Navbar";
import { getUserData, setUserData } from "../../hooks/useLocalStorage";
import { UserData } from "../../types/UserData";
import styles from "./App.module.scss";

export type AppProps = {
  params: Params;
  title: string | undefined;
};

export const App: React.FC<AppProps> = ({ params, title }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(0);
  const [userDataCopy, setUserDataCopy] = React.useState<UserData>(
    getUserData(),
  );

  React.useMemo(() => setUserData(userDataCopy), [userDataCopy]);

  React.useLayoutEffect(() => {
    const initialWidth =
      containerRef.current?.getBoundingClientRect().width ?? 0;
    setWidth(initialWidth);
  }, []);

  useResizeObserver(containerRef.current, ({ contentRect }) => {
    setWidth(contentRect.width);
  });

  const themeClassName = React.useMemo(
    () => `theme-${params.topicMap?.colorTheme ?? defaultTheme}`,
    [params.topicMap?.colorTheme],
  );

  return (
    <AppWidthContext.Provider value={width}>
      <div className={themeClassName} ref={containerRef}>
        <div className={styles.navbarWrapper}>
          <Navbar
            navbarTitle={title ?? ""}
            params={params}
            setUserDataCopy={setUserDataCopy}
          />
        </div>
      </div>
    </AppWidthContext.Provider>
  );
};
