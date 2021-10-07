import * as React from "react";
import { TopicMapItemType } from "../../types/TopicMapItemType";
import { TopicMapItem } from "../TopicMapItem/TopicMapItem";
import styles from "./Grid.module.scss";

export type GridProps = {
  items: Array<TopicMapItemType>;
};

export const Grid: React.FC<GridProps> = ({ items }) => {
  const children = React.useMemo(() => {
    return items.map(item => (
      <foreignObject
        key={item.id}
        x={item.xPercentagePosition}
        y={item.yPercentagePosition}
        width={item.widthPercentage}
        height={item.heightPercentage}
      >
        <TopicMapItem
          backgroundImage={item.backgroundImage}
          title={item.label}
          editAction={
            () => console.info("Add edit action") /* TODO: Add edit action */
          }
        />
      </foreignObject>
    ));
  }, [items]);

  return (
    <div className={styles.gridWrapper}>
      <svg viewBox="0 0 100 100" className={styles.grid} width={20} height={12}>
        {children}
      </svg>
    </div>
  );
};
