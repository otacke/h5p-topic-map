import * as React from "react";
import { Grid } from "./components/Grid/Grid";
import { Params } from "./types/H5P/Params";
import { defaultTheme } from "./utils/semantics.utils";

export type AppProps = {
  params: Params;
};

export const App: React.FC<AppProps> = ({ params }) => {
  const themeClassName = React.useMemo(
    () => `theme-${params.topicMap?.appearance?.colorTheme ?? defaultTheme}`,
    [params.topicMap?.appearance?.colorTheme],
  );

  return (
    <div className={themeClassName}>
      <Grid
        items={params.topicMap?.topicMapItems ?? []}
        arrowItems={params.topicMap?.arrowItems ?? []}
        backgroundImage={params.topicMap?.appearance?.backgroundImage}
      />
    </div>
  );
};
