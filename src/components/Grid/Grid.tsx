import * as React from "react";
import { Image } from "../../types/H5P/Image";
import { TopicMapItemType } from "../../types/TopicMapItemType";
import { TopicMapItem } from "../TopicMapItem/TopicMapItem";
import styles from "./Grid.module.scss";

export type GridProps = {
  items: Array<TopicMapItemType>;
  backgroundImage: Image | undefined;
};

export const Grid: React.FC<GridProps> = ({ items, backgroundImage }) => {
  const children = React.useMemo(() => {
    return items.map(item => (
      <div
        key={item.id}
        className={styles.itemWrapper}
        style={{
          left: `${item.xPercentagePosition}%`,
          top: `${item.yPercentagePosition}%`,
          height: `${item.heightPercentage}%`,
          width: `${item.widthPercentage}%`,
        }}
      >
        <TopicMapItem
          dialog={item.dialog}
          backgroundImage={item.topicImage}
          title={item.label}
        />
      </div>
    ));
  }, [items]);

  const bgImageStyle: string | undefined = backgroundImage?.path
    ? `url(${backgroundImage.path})`
    : undefined;

  return (
    <div className={styles.gridWrapper}>
      <div className={styles.grid} style={{ backgroundImage: bgImageStyle }}>
        {children}
      </div>
    </div>
  );
};
