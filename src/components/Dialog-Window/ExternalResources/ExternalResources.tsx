import * as React from "react";
import styles from "./ExternalResources.module.scss";

export type DialogExternalResourcesProps = {
  url: string;
  label: string;
};

export const DialogExternalResources: React.FC<
  DialogExternalResourcesProps
> = ({ url, label }) => {
  return (
    <div className={styles.wrapper}>
      <iframe src={url} frameBorder="0" title={label} />
    </div>
  );
};
