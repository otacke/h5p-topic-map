import useResizeObserver from "@react-hook/resize-observer";
import * as React from "react";
import { AppWidthContext } from "../../contexts/AppWidthContext";
import { Params } from "../../types/H5P/Params";
import { defaultTheme } from "../../utils/semantics.utils";
import { Grid } from "../Grid/Grid";

export type AppProps = {
  params: Params;
  title: string | undefined;
};

export const App: React.FC<AppProps> = ({ params, title }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(0);

  React.useLayoutEffect(() => {
    setWidth(containerRef.current?.getBoundingClientRect().width ?? 0);
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
        <Grid
          title={title}
          items={params.topicMap?.topicMapItems ?? []}
          arrowItems={params.topicMap?.arrowItems ?? []}
          backgroundImage={params.topicMap?.gridBackgroundImage}
        />
      </div>
    </AppWidthContext.Provider>
  );
};
