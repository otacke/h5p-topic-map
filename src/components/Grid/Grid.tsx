import * as React from "react";
import { ArrowItemType } from "../../types/ArrowItemType";
import { ArrowType } from "../../types/ArrowType";
import { TopicMapItemType } from "../../types/TopicMapItemType";
import { Arrow } from "../Arrow/Arrow";
import { TopicMapItem } from "../TopicMapItem/TopicMapItem";
import styles from "./Grid.module.scss";

export type GridProps = {
  items: Array<TopicMapItemType>;
  arrows: Array<ArrowItemType>;
};

export const Grid: React.FC<GridProps> = ({ items, arrows }) => {
  const itemComponents = React.useMemo(() => {
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
          backgroundImage={item.backgroundImage}
          title={item.label}
        />
      </div>
    ));
  }, [items]);

  const arrowComponents = React.useMemo(() => {
    return arrows.map(arrow => (
      <div
        key={arrow.id}
        className={styles.arrowWrapper}
        style={{
          left: `${arrow.xPercentagePosition}%`,
          top: `${arrow.yPercentagePosition}%`,
          height: `${arrow.heightPercentage}%`,
          width: `${arrow.widthPercentage}%`,
        }}
      >
        <Arrow

          arrowColor="green"
          circleColor="blue"
          iconColor="red"
          type={arrow.arrowType}
          notes=""
          completed={false}
          direction={arrow.arrowDirection}
        />
      </div>
    ));
  }, [arrows]);

  return (
    <div className={styles.gridWrapper}>
      <div className={styles.grid}>
        {itemComponents}
        {arrowComponents}
      </div>
    </div>
  );
};
