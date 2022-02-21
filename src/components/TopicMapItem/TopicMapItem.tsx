import * as React from "react";
import { FC, MouseEventHandler } from "react";
import { useAppWidth } from "../../hooks/useAppWidth";
import { BreakpointSize } from "../../types/BreakpointSize";
import { TopicMapItemType } from "../../types/TopicMapItemType";
import styles from "./TopicMapItem.module.scss";

export type TopicMapItemProps = {
  item: TopicMapItemType;
  onClick: MouseEventHandler;
};

const sizeClassname = {
  [BreakpointSize.Large]: styles.large,
  [BreakpointSize.Medium]: styles.medium,
  [BreakpointSize.Small]: styles.small,
};

export const TopicMapItem: FC<TopicMapItemProps> = ({ item, onClick }) => {
  const appWidth = useAppWidth();

  const className = React.useMemo(
    () => [styles.topicMapItem, sizeClassname[appWidth]].join(" "),
    [appWidth],
  );

  return (
    <button type="button" className={className} onClick={onClick}>
      {item.topicImage?.path && (
        <img
          className={styles.image}
          src={item.topicImage.path}
          alt={item.topicImage.alt ?? ""}
          width={item.topicImage.width}
          height={item.topicImage.height}
        />
      )}

      <div
        className={`${styles.inner} ${
          item.topicImage?.path ? "" : styles.noImage
        }`}
      >
        <div
          className={styles.label}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: item.label }}
        />
        {item.description && (
          <div
            className={styles.description}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        )}
      </div>
    </button>
  );
};
