import * as React from "react";
import styles from "./ExternalResources.module.scss";

export type DialogExternalResourcesProps = {
  url: string;
};

export const DialogExternalResources: React.FC<DialogExternalResourcesProps> =
  ({ url }) => {
    return (
      <div className={styles.wrapper}>
        <iframe src={url} frameBorder="0" title="External Resrouces" />
      </div>
    );
  };
