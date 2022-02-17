import * as React from "react";
import { Grid } from "../Grid/Grid";
import { Params } from "../../types/H5P/Params";
import { defaultTheme } from "../../utils/semantics.utils";

export type AppProps = {
  params: Params;
  title: string | undefined;
};

export const App: React.FC<AppProps> = ({ params, title }) => {
  const themeClassName = React.useMemo(
    () => `theme-${params.topicMap?.colorTheme ?? defaultTheme}`,
    [params.topicMap?.colorTheme],
  );

  return (
    <div className={themeClassName}>
      <Grid
        title={title}
        items={params.topicMap?.topicMapItems ?? []}
        arrowItems={params.topicMap?.arrowItems ?? []}
        backgroundImage={params.topicMap?.gridBackgroundImage}
      />
    </div>
  );
};
