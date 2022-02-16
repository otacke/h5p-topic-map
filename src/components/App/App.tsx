import * as React from "react";
import { Grid } from "../Grid/Grid";
import { Params } from "../../types/H5P/Params";
import { defaultTheme } from "../../utils/semantics.utils";

export type AppProps = {
  params: Params;
};

export const App: React.FC<AppProps> = ({ params }) => {
  const themeClassName = React.useMemo(
    () => `theme-${params.topicMap?.colorTheme ?? defaultTheme}`,
    [params.topicMap?.colorTheme],
  );

  return (
    <div className={themeClassName}>
      <Grid
        items={params.topicMap?.topicMapItems ?? []}
        arrowItems={params.topicMap?.arrowItems ?? []}
        backgroundImage={params.topicMap?.gridBackgroundImage}
      />
    </div>
  );
};
