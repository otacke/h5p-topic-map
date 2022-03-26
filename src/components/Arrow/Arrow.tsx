import * as React from "react";
import { FC, MouseEventHandler } from "react";
import { ArrowItemType } from "../../types/ArrowItemType";
import { ArrowType } from "../../types/ArrowType";
import { NoteButtonIconState } from "../../types/NoteButtonIconState";
import { Position } from "../../types/Position";
import { UserData } from "../../types/UserData";
import { GridDimensions } from "../Grid/Grid";
import styles from "./Arrow.module.scss";
import { ArrowNoteButton } from "./ArrowNoteButton";

export type ArrowProps = {
  item: ArrowItemType;
  onClick: MouseEventHandler;
  grid?: GridDimensions;
  storageData: UserData;
  dialogeIsOpen: boolean;
  onTouchStart: React.TouchEventHandler;
  onKeyUp: React.KeyboardEventHandler;
};

const calculateIsHorizontal = (
  startPosition: Position,
  endPosition: Position,
): boolean => {
  return (
    Math.abs(startPosition.x - endPosition.x) >
    Math.abs(startPosition.y - endPosition.y)
  );
};

export const Arrow: FC<ArrowProps> = ({
  item,
  grid,
  onTouchStart,
  onClick,
  onKeyUp,
  storageData,
  dialogeIsOpen,
}) => {
  const [pathDef, setPathDef] = React.useState<string>("");
  const [strokeWidth, setStrokeWidth] = React.useState<number>(4);
  const [buttonState, setButtonState] = React.useState<NoteButtonIconState>(
    NoteButtonIconState.None,
  );
  const [middleX, setMiddleX] = React.useState(2);
  const [middleY, setMiddleY] = React.useState(2);
  const arrowContainerRef = React.createRef<HTMLDivElement>();
  const isHorizontal = calculateIsHorizontal(
    item.startPosition,
    item.endPosition,
  );

  React.useEffect(() => {
    switch (true) {
      case storageData[item.id]?.noteDone:
        setButtonState(NoteButtonIconState.Done);
        break;
      case storageData[item.id]?.note &&
        storageData[item.id]?.note?.trim().length !== 0:
        setButtonState(NoteButtonIconState.Text);
        break;
      case item.dialog?.hasNote:
        setButtonState(NoteButtonIconState.Default);
        break;
      default:
        setButtonState(NoteButtonIconState.None);
    }
  }, [item, buttonState, setButtonState, storageData, dialogeIsOpen]);

  React.useEffect(() => {
    if (arrowContainerRef.current) {
      const gridElement = arrowContainerRef.current;

      if (grid) {
        if (isHorizontal) {
          setStrokeWidth((gridElement.clientHeight / grid.numberOfRows) * 0.66);
        } else {
          setStrokeWidth(
            (gridElement.clientWidth / grid.numberOfColumns) * 0.66,
          );
        }
      }

      const startx = (item.startPosition.x / 100) * gridElement.clientWidth;
      const starty = (item.startPosition.y / 100) * gridElement.clientHeight;
      const endx = (item.endPosition.x / 100) * gridElement.clientWidth;
      const endy = (item.endPosition.y / 100) * gridElement.clientHeight;

      const midx = (startx + endx) / 2;
      const midy = (starty + endy) / 2;

      const asPoint = (position: Position): string =>
        `${(position.x / 100) * gridElement.clientWidth},${
          (position.y / 100) * gridElement.clientHeight
        }`;
      const path = `${startx},${starty} ${
        item.relativeBreakpoints?.map(asPoint).join(" ") ?? ""
      } ${endx},${endy}`;
      setMiddleX(midx);
      setMiddleY(midy);
      setPathDef(path);
    }
  }, [arrowContainerRef, item, grid, buttonState, isHorizontal]);

  return (
    <div className={`${styles.arrow}`}>
      <div
        ref={arrowContainerRef}
        aria-label={item.label}
        className={`arrow-item ${styles.arrow}`}
      >
        <svg className={styles.arrowSvg}>
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="0.7"
              refY="1"
              orient="auto"
            >
              <path d="M0,0 L0,2 L1.5,1 z" fill="var(--theme-color-4)" />
            </marker>
            <marker
              id="arrowtail"
              markerWidth="10"
              markerHeight="10"
              refX="0.7"
              refY="1"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L0,2 L1.5,1 z" fill="var(--theme-color-4)" />
            </marker>
          </defs>
          <polyline
            className={styles.path}
            points={pathDef}
            fill="transparent"
            stroke="var(--theme-color-4)"
            strokeWidth={strokeWidth}
            markerEnd={
              item.arrowType === ArrowType.BiDirectional ||
              item.arrowType === ArrowType.Directional
                ? "url(#arrowhead)"
                : ""
            }
            markerStart={
              item.arrowType === ArrowType.BiDirectional
                ? "url(#arrowtail)"
                : ""
            }
            onClick={onClick}
            role="button"
            tabIndex={0}
            onTouchStart={onTouchStart}
            onKeyUp={onKeyUp}
          />
        </svg>
      </div>
      <ArrowNoteButton
        position={{ x: middleX, y: middleY }}
        buttonState={buttonState}
      />
    </div>
  );
};
