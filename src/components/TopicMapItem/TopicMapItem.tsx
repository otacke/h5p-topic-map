import * as React from "react";
import { FC, MouseEventHandler } from "react";
import { useAppWidth } from "../../hooks/useAppWidth";
import { BreakpointSize } from "../../types/BreakpointSize";
import { NoteButtonIconState } from "../../types/NoteButtonIconState";
import { TopicMapItemType } from "../../types/TopicMapItemType";
import { UserData } from "../../types/UserData";
import { GridDimensions } from "../Grid/Grid";
import { NoteButton } from "../NoteButton/NoteButton";
import styles from "./TopicMapItem.module.scss";

export type TopicMapItemProps = {
  item: TopicMapItemType;
  onClick: MouseEventHandler;
  storageData: UserData;
  grid?: GridDimensions;
  gridRef?: React.RefObject<HTMLDivElement>;
};

const sizeClassname = {
  [BreakpointSize.Large]: styles.large,
  [BreakpointSize.Medium]: styles.medium,
  [BreakpointSize.Small]: styles.small,
  [BreakpointSize.XSmall]: styles.xSmall,
  [BreakpointSize.XXSmall]: styles.xxSmall,
};

export const TopicMapItem: FC<TopicMapItemProps> = ({
  item,
  onClick,
  storageData,
  grid,
  gridRef,
}) => {
  const appWidth = useAppWidth();
  const buttonElement = React.useRef<HTMLButtonElement>(null);
  const [strokeWidth, setStrokeWidth] = React.useState<number>(4);

  const className = React.useMemo(
    () => [styles.topicMapItem, sizeClassname[appWidth]].join(" "),
    [appWidth],
  );

  React.useEffect(() => {
    if (gridRef) {
      const gridElement = gridRef.current;
      if (grid && gridElement) {
        setStrokeWidth((gridElement.clientWidth / grid.numberOfColumns) * 0.66);
      }
    }
  }, [appWidth, grid, gridRef, buttonElement]);

  let btnState: NoteButtonIconState = NoteButtonIconState.Default;
  if (item.dialog?.hasNote) {
    switch (true) {
      case storageData[item.id]?.noteDone:
        btnState = NoteButtonIconState.Done;
        break;
      case storageData[item.id]?.note &&
        storageData[item.id]?.note?.length !== 0:
        btnState = NoteButtonIconState.Notes;
        break;
      default:
        btnState = NoteButtonIconState.Default;
    }
  }

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      ref={buttonElement}
    >
      {item.topicImage?.path && (
        <img
          className={styles.image}
          src={item.topicImage.path}
          alt={item.topicImageAltText ?? ""}
          width={item.topicImage.width}
          height={item.topicImage.height}
        />
      )}

      <div
        className={`${styles.inner} ${
          item.topicImage?.path ? "" : styles.noImage
        } ${item.dialog?.hasNote ? styles.withNote : ""}`}
        style={{
          paddingTop:
            item.topicImage?.path && item.dialog?.hasNote
              ? strokeWidth * 1.4
              : strokeWidth * 0.66,
        }}
      >
        {item.dialog?.hasNote ? (
          <div
            className={`${styles.icon} ${
              item.topicImage?.path ? "" : styles.withoutImage
            }`}
            style={{
              left:
                (buttonElement.current
                  ? buttonElement.current.getBoundingClientRect().width / 2
                  : 0) -
                (strokeWidth * 1.4) / 2,
              top: 0 - strokeWidth / 2,
            }}
          >
            <NoteButton
              backgroundColor="var(--theme-color-3)"
              borderColor="white"
              iconColor="white"
              buttonState={btnState}
              strokeWidth={strokeWidth}
            />
          </div>
        ) : null}
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
