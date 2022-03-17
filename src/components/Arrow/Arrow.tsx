import * as React from "react";
import { FC, MouseEventHandler } from "react";
import { ArrowItemType } from "../../types/ArrowItemType";
import { ArrowType } from "../../types/ArrowType";
import { NoteButtonIconState } from "../../types/NoteButtonIconState";
import { Position } from "../../types/Position";
import { UserData } from "../../types/UserData";
import { GridDimensions } from "../Grid/Grid";
import styles from "./Arrow.module.scss";

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

const buttonForState = (buttonState: NoteButtonIconState): string => {
  switch (buttonState) {
    case NoteButtonIconState.Default:
      return "default";
    case NoteButtonIconState.Notes:
      return "notes";
    case NoteButtonIconState.Text:
      return "text";
    case NoteButtonIconState.Done:
      return "done";
  }
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
    NoteButtonIconState.Default,
  );

  const arrowContainerRef = React.createRef<HTMLDivElement>();

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
        setButtonState(NoteButtonIconState.Notes);
        break;
      default:
        setButtonState(NoteButtonIconState.Default);
    }
  }, [item, buttonState, setButtonState, storageData, dialogeIsOpen]);

  React.useEffect(() => {
    const isHorizontal = calculateIsHorizontal(
      item.startPosition,
      item.endPosition,
    );

    if (arrowContainerRef.current) {
      const gridElement = arrowContainerRef.current;

      if (grid) {
        if (isHorizontal) {
          setStrokeWidth((gridElement.clientHeight / grid.numberOfRows) * 0.66);
        } else {
          setStrokeWidth((gridElement.clientWidth / grid.numberOfColumns) * 0.66);
        }
      }

      const startx = (item.startPosition.x / 100) * gridElement.clientWidth;
      const starty = (item.startPosition.y / 100) * gridElement.clientHeight;
      const endx = (item.endPosition.x / 100) * gridElement.clientWidth;
      const endy = (item.endPosition.y / 100) * gridElement.clientHeight;

      const midx = (startx + endx) / 2;
      const midy = (starty + endy) / 2;

      const path = `${startx},${starty} ${midx},${midy} ${endx},${endy}`;

      setPathDef(path);
    }
  }, [arrowContainerRef, item, grid]);

  return (
    <div
      ref={arrowContainerRef}
      aria-label={item.label}
      className={`arrow-item ${styles.arrow}`}
    >
      <svg className={styles.arrowSvg}>
        <defs>
          <marker
            id="marker_text"
            markerWidth="1.25"
            markerHeight="1.25"
            refX="6"
            refY="6"
            orient="0"
            viewBox="0 0 20 20"
          >
            <path
              d="M0 0.75H12V2.25H0V0.75ZM0 3.75H12V5.25H0V3.75ZM0 6.75H12V8.25H0V6.75ZM0 9.75H7.5V11.25H0V9.75Z"
              fill="white"
            />
          </marker>
          <marker
            id="marker_done"
            markerWidth="1.25"
            markerHeight="1.25"
            refX="6"
            refY="6"
            orient="0"
            viewBox="0 0 20 20"
          >
            <path
              d="M5.9999 11.2L1.7999 6.99998L0.399902 8.39998L5.9999 14L17.9999 1.99998L16.5999 0.599976L5.9999 11.2Z"
              fill="white"
            />
          </marker>
          <marker
            id="marker_notes"
            markerWidth="10"
            markerHeight="10"
            refX="0.5"
            refY="0.5"
            orient="0"
          >
            <path
              d="m 0.19232127,0.81738523 v 0.1371902 c 0,0.012637 0.0089,0.022562 0.02019,0.022562 h 0.122787 c 0.0053,0 0.0105,-0.00226 0.01414,-0.00677 l 0.441064,-0.49235261 -0.151462,-0.1692326 -0.44066,0.49235671 c -0.004,0.00451 -0.0061,0.00993 -0.0061,0.016247 z m 0.715314,-0.47024336 c 0.01575,-0.0176004 0.01575,-0.0460315 0,-0.0636318 l -0.09451,-0.10560124 c -0.01575,-0.0176 -0.0412,-0.0176 -0.05695,0 l -0.07392,0.0825858 0.151467,0.16923257 z"
              fill="white"
            />
          </marker>
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
            item.arrowType === ArrowType.BiDirectional ? "url(#arrowtail)" : ""
          }
          onClick={onClick}
          markerMid={
            buttonState !== NoteButtonIconState.Default
              ? `url(#marker_${buttonForState(buttonState)})`
              : ""
          }
          role="button"
          tabIndex={0}
          onTouchStart={onTouchStart}
          onKeyUp={onKeyUp}
        />
      </svg>
    </div>
  );
};
