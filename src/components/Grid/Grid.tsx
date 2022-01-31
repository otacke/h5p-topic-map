import * as React from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useState } from "react";
import { Xwrapper } from "react-xarrows";
import { ArrowItemType } from "../../types/ArrowItemType";
import { CommonItemType } from "../../types/CommonItemType";
import { Image } from "../../types/H5P/Image";
import { TopicMapItemType } from "../../types/TopicMapItemType";
import { Arrow } from "../Arrow/Arrow";
import { DialogWindow } from "../Dialog-Window/DialogWindow";
import { TopicMapItem } from "../TopicMapItem/TopicMapItem";
import styles from "./Grid.module.scss";

export type GridProps = {
  items: Array<TopicMapItemType>;
  arrowItems: Array<ArrowItemType>;
  backgroundImage: Image | undefined;
};

export const Grid: React.FC<GridProps> = ({
  items,
  arrowItems,
  backgroundImage,
}) => {
  const fullscreen = useFullScreenHandle();

  const [itemShowingDialog, setItemShowingDialog] =
    useState<CommonItemType | null>(null);

  const arrows = React.useMemo(() => {
    const onClick = (item: ArrowItemType): void => {
      setItemShowingDialog(item);
    };

    return arrowItems.map(item => (
      <Arrow item={item} onClick={() => onClick(item)} />
    ));
  }, [arrowItems]);

  const children = React.useMemo(
    () =>
      items.map(item => (
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
          />
        </div>
      )),
    [items],
  );

  const bgImageStyle: string | undefined = backgroundImage?.path
    ? `url(${backgroundImage.path})`
    : undefined;

  return (
    <Xwrapper>
      <FullScreen className={styles.fullscreenStyle} handle={fullscreen}>
        <div className={styles.gridWrapper}>
          <div
            className={styles.grid}
            style={{ backgroundImage: bgImageStyle }}
          >
            <button
              className={styles.fullscreenButton}
              type="button"
              title="Toggle fullscreen mode"
              onClick={fullscreen.active ? fullscreen.exit : fullscreen.enter}
            >
              <svg
                className={styles.fullscreenButtonSvg}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 14 14"
              >
                <path
                  fill="#333333"
                  d={
                    fullscreen.active
                      ? "M0 11H3V14H5V9H0V11ZM3 3H0V5H5V0H3V3ZM9 14H11V11H14V9H9V14ZM11 3V0H9V5H14V3H11Z"
                      : "M2 9H0V14H5V12H2V9ZM0 5H2V2H5V0H0V5ZM12 12H9V14H14V9H12V12ZM9 0V2H12V5H14V0H9Z"
                  }
                />
              </svg>
            </button>
            {arrows}
            {children}
            {itemShowingDialog?.dialog ? (
              <DialogWindow
                item={itemShowingDialog}
                open={!!itemShowingDialog}
                onOpenChange={() => setItemShowingDialog(null)}
              />
            ) : null}
          </div>
        </div>
      </FullScreen>
    </Xwrapper>
  );
};
