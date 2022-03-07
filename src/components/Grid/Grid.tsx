import * as React from "react";
import { useState } from "react";
import { Xwrapper } from "react-xarrows";
import { ArrowItemType } from "../../types/ArrowItemType";
import { CommonItemType } from "../../types/CommonItemType";
import { Image } from "../../types/H5P/Image";
import { TopicMapItemType } from "../../types/TopicMapItemType";
import { UserData } from "../../types/UserData";
import { Arrow } from "../Arrow/Arrow";
import { DialogWindow } from "../Dialog-Window/DialogWindow";
import { TopicMapItem } from "../TopicMapItem/TopicMapItem";
import styles from "./Grid.module.scss";

export type GridProps = {
  items: Array<TopicMapItemType>;
  arrowItems: Array<ArrowItemType>;
  backgroundImage: Image | undefined;
  setStorageData: React.Dispatch<React.SetStateAction<UserData>>;
  storageData: UserData;
  grid?: GridDimensions;
};

export type GridDimensions = {
  numberOfColumns: number;
  numberOfRows: number;
};

export const Grid: React.FC<GridProps> = ({
  items,
  arrowItems,
  backgroundImage,
  setStorageData,
  storageData,
  grid,
}) => {
  // eslint-disable-next-line no-console
  console.log("Grid", items, arrowItems, grid);
  const [itemShowingDialog, setItemShowingDialog] =
    useState<CommonItemType | null>(null);
  const [allItems] = useState<Array<TopicMapItemType | ArrowItemType>>([
    ...items,
    ...arrowItems,
  ]);

  const getFirstArrowPosition = (
    arrow: ArrowItemType,
    xORy: "x" | "y",
  ): number => {
    return arrow.startPosition?.[xORy] < arrow.endPosition?.[xORy]
      ? arrow.startPosition?.[xORy]
      : arrow.endPosition?.[xORy];
  };

  const sortItems = React.useCallback(
    (
      a: TopicMapItemType | ArrowItemType,
      b: TopicMapItemType | ArrowItemType,
    ): number => {
      const arrowA = a as ArrowItemType;
      const arrowB = b as ArrowItemType;
      const boxA = a as TopicMapItemType;
      const boxB = b as TopicMapItemType;

      // Sort after index first
      if (boxA.index != null && boxB.index != null) {
        return boxA.index < boxB.index ? -1 : 1;
      }
      if (boxA.index != null && boxB.index == null) {
        return -1;
      }
      if (boxA.index == null && boxB.index != null) {
        return 1;
      }

      const arrowAx = getFirstArrowPosition(arrowA, "x");
      const arrowBx = getFirstArrowPosition(arrowB, "x");
      const arrowAy = getFirstArrowPosition(arrowA, "y");
      const arrowBy = getFirstArrowPosition(arrowB, "y");

      // Then sort after position
      if (
        (boxA.xPercentagePosition || arrowAx) ===
        (boxB.xPercentagePosition || arrowBx)
      ) {
        return (boxA.yPercentagePosition || arrowAy) <
          (boxB.yPercentagePosition || arrowBy)
          ? -1
          : 1;
      }

      return (boxA.xPercentagePosition || arrowAx) <
        (boxB.xPercentagePosition || arrowBx)
        ? -1
        : 1;
    },
    [],
  );

  const sortBoxes = (a: TopicMapItemType, b: TopicMapItemType): number => {
    // Sort after index first
    if (a.index != null && b.index != null) {
      return a.index < b.index ? -1 : 1;
    }
    if (a.index != null && b.index == null) {
      return -1;
    }
    if (a.index == null && b.index != null) {
      return 1;
    }
    // Then sort after position
    if (a.xPercentagePosition === b.xPercentagePosition) {
      return a.yPercentagePosition < b.yPercentagePosition ? -1 : 1;
    }

    return a.xPercentagePosition < b.xPercentagePosition ? -1 : 1;
  };

  const sortArrows = React.useCallback(
    (a: ArrowItemType, b: ArrowItemType): number => {
      const arrowAx = getFirstArrowPosition(a, "x");
      const arrowBx = getFirstArrowPosition(b, "x");
      const arrowAy = getFirstArrowPosition(a, "y");
      const arrowBy = getFirstArrowPosition(b, "y");

      if (arrowAx === arrowBx) {
        return arrowAy < arrowBy ? 1 : -1;
      }

      return arrowAx < arrowBx ? 1 : -1;
    },
    [],
  );

  const addArrowAfter = (
    array: Array<ArrowItemType | TopicMapItemType>,
    index: number,
    newItem: ArrowItemType,
  ): Array<ArrowItemType | TopicMapItemType> => {
    return [...array.slice(0, index), newItem, ...array.slice(index)];
  };

  const allTheseMapItems = React.useMemo(() => {
    const onClick = (item: ArrowItemType): void => {
      // eslint-disable-next-line no-console
      console.log("onClick", item);
      setItemShowingDialog(item);
    };

    const sortedBoxes = items.concat().sort((a, b) => sortBoxes(a, b));

    let boxesAndArrows: Array<TopicMapItemType | ArrowItemType> =
      sortedBoxes.concat();

    arrowItems
      .concat()
      .sort((a, b) => sortArrows(a, b))
      .forEach(arrow => {
        boxesAndArrows.forEach((box, index) => {
          if (box.id === arrow.startElementId) {
            boxesAndArrows = addArrowAfter(boxesAndArrows, index + 1, arrow);
          }
        });
      });

    return boxesAndArrows.map(item => {
      const arrow = item as ArrowItemType;
      const box = item as TopicMapItemType;

      if (arrow.arrowType) {
        return (
          <Arrow
            key={item.id}
            item={arrow}
            grid={grid}
            onClick={() => onClick(arrow)}
          />
        );
      }

      return (
        <div
          key={item.id}
          id={item.id}
          className={styles.itemWrapper}
          style={{
            left: `${box.xPercentagePosition}%`,
            top: `${box.yPercentagePosition}%`,
            height: `${box.heightPercentage}%`,
            width: `${box.widthPercentage}%`,
          }}
        >
          <TopicMapItem
            item={box}
            onClick={() => setItemShowingDialog(item)}
            storageData={storageData}
          />
        </div>
      );
    });
  }, [arrowItems, grid, items, sortArrows, storageData]);

  const allMapItems = React.useMemo(() => {
    const onClick = (item: ArrowItemType): void => {
      // eslint-disable-next-line no-console
      console.log("onClick", item);
      setItemShowingDialog(item);
    };

    return allItems
      .concat()
      .sort((a, b) => sortItems(a, b))
      .map(item => {
        const arrow = item as ArrowItemType;
        const box = item as TopicMapItemType;

        if (arrow.arrowType) {
          return (
            <Arrow
              key={item.id}
              item={arrow}
              grid={grid}
              onClick={() => onClick(arrow)}
            />
          );
        }

        return (
          <div
            key={item.id}
            id={item.id}
            className={styles.itemWrapper}
            style={{
              left: `${box.xPercentagePosition}%`,
              top: `${box.yPercentagePosition}%`,
              height: `${box.heightPercentage}%`,
              width: `${box.widthPercentage}%`,
            }}
          >
            <TopicMapItem
              item={box}
              onClick={() => setItemShowingDialog(item)}
              storageData={storageData}
            />
          </div>
        );
      });
  }, [allItems, grid, sortItems, storageData]);

  const arrows = React.useMemo(() => {
    const onClick = (item: ArrowItemType): void => {
      // eslint-disable-next-line no-console
      console.log("onClick", item);
      setItemShowingDialog(item);
    };

    return arrowItems.map(item => (
      <Arrow
        key={item.id}
        item={item}
        grid={grid}
        onClick={() => onClick(item)}
      />
    ));
  }, [arrowItems, grid]);

  const children = React.useMemo(
    () =>
      items
        .concat()
        .sort((a, b) => sortItems(a, b))
        .map(item => (
          <div
            key={item.id}
            id={item.id}
            className={styles.itemWrapper}
            style={{
              left: `${item.xPercentagePosition}%`,
              top: `${item.yPercentagePosition}%`,
              height: `${item.heightPercentage}%`,
              width: `${item.widthPercentage}%`,
            }}
          >
            <TopicMapItem
              item={item}
              onClick={() => setItemShowingDialog(item)}
              storageData={storageData}
            />
          </div>
        )),

    // We want to update re-render the elements whenever `itemShowingDialog` changes (i.e. the dialog window is closed).
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, storageData, itemShowingDialog],
  );

  const bgImageStyle: string | undefined = backgroundImage?.path
    ? `url(${backgroundImage.path})`
    : undefined;

  return (
    <Xwrapper>
      <div
        className={styles.gridWrapper}
        style={{ backgroundImage: bgImageStyle }}
      >
        <div className={styles.grid}>
          {allTheseMapItems}
          {itemShowingDialog?.dialog ? (
            <DialogWindow
              item={itemShowingDialog}
              open={!!itemShowingDialog}
              onOpenChange={() => setItemShowingDialog(null)}
              setStorageData={setStorageData}
              storageData={storageData}
            />
          ) : null}
        </div>
      </div>
    </Xwrapper>
  );
};
