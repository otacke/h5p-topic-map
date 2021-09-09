import * as React from "react";
import type { Image } from "../../types/Image";
import styles from "./TopicMapItem.module.scss";

export type TopicMapItemProps = {
  backgroundImage: Image;
  title: string;
  editAction: React.MouseEventHandler;
};

export const TopicMapItem = ({
  backgroundImage,
  title,
  editAction,
}: TopicMapItemProps): JSX.Element => {
  return (
    <button type="button" className={styles.topicMapItem} onClick={editAction}>
      <img
        className={styles.bgImage}
        src={backgroundImage.url}
        alt={backgroundImage.alt}
        style={{ aspectRatio: backgroundImage.aspectRatio.toString() }}
      />
      <div className={styles.title}>{title}</div>
    </button>
  );
};
