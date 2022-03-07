import * as React from "react";
import { FC, MouseEventHandler } from "react";
import { NoteButtonIconState } from "../../types/NoteButtonIconState";
import { ArrowItemType } from "../../types/ArrowItemType";
import { ArrowType } from "../../types/ArrowType";
import { NoteButton } from "../NoteButton/NoteButton";
import styles from "./Arrow.module.scss";
import gridStyles from "../Grid/Grid.module.scss";
import { GridDimensions } from "../Grid/Grid";
import { Position } from "../../types/Position";

export type ArrowProps = {
  item: ArrowItemType;
  onClick: MouseEventHandler;
  grid?: GridDimensions;
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

export const Arrow: FC<ArrowProps> = ({ item, grid, onClick }) => {
  const [pathDef, setPathDef] = React.useState<string>("");
  const [strokeWidth, setStrokeWidth] = React.useState<number>(4);

  const arrowContainerRef = React.createRef<HTMLDivElement>();
  React.useEffect(() => {
    // const gridElement = document.querySelector(`.grid`) as HTMLElement;
    // console.info("useEffect gridElement", gridElement);
    const isHorizontal = calculateIsHorizontal(
      item.startPosition,
      item.endPosition,
    );

    console.info("useEffect arrowContainerRef", arrowContainerRef);
    if (arrowContainerRef.current) {
      const gridElement = arrowContainerRef.current;

      if (grid) {
        if (isHorizontal) {
          setStrokeWidth(gridElement.clientHeight / grid.numberOfRows);
        } else {
          setStrokeWidth(gridElement.clientWidth / grid.numberOfColumns);
        }
        console.info("strokeWidth", strokeWidth);
      }

      const path = `M ${
        (item.startPosition.x / 100) * gridElement.clientWidth
      } ${(item.startPosition.y / 100) * gridElement.clientHeight} L ${
        (item.endPosition.x / 100) * gridElement.clientWidth
      } ${(item.endPosition.y / 100) * gridElement.clientHeight}`;
      setPathDef(path);
    }
  }, [arrowContainerRef, item, grid]);

  const buttonState = NoteButtonIconState.Default;
  // eslint-disable-next-line no-console
  console.log("ARROW", item);

  // const pathDef = `M ${item.startPosition.x} ${item.startPosition.y} L ${item.endPosition.x} ${item.endPosition.y}`;
  // const gridElement = document.querySelector(`.grid`) as HTMLElement;
  // console.info("gridElement", gridElement);
  // const pathDef = `M ${(item.startPosition.x / 100)*gridElement.clientWidth} ${(item.startPosition.y/100)*gridElement.clientHeight} L ${(item.endPosition.x/100)*gridElement.clientWidth} ${(item.endPosition.y/100)*gridElement.clientHeight}`;

  return (
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
            <path
              d="M0,0 L0,2 L1.5,1 z"
              fill="var(--theme-color-4)"
              onClick={() => ""}
            />
          </marker>
          <marker
            id="arrowtail"
            markerWidth="10"
            markerHeight="10"
            refX="0.7"
            refY="1"
            orient="auto-start-reverse"
          >
            <path
              d="M0,0 L0,2 L1.5,1 z"
              fill="var(--theme-color-4)"
              onClick={() => ""}
            />
          </marker>
        </defs>
        <path
          className={styles.path}
          d={pathDef}
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
          onClick={() => ""}
        />
      </svg>
    </div>
  );

  // return (
  //   <div aria-label={item.label} className={`arrow-item ${styles.arrow}`}>
  //     <Xarrow
  //       labels={{
  //         middle: (
  //           <NoteButton
  //             backgroundColor="var(--theme-color-2)"
  //             buttonState={buttonState}
  //             borderColor="var(--theme-color-3)"
  //             iconColor="var(--theme-color-4)"
  //           />
  //         ),
  //       }}
  //       start={item.startElementId}
  //       end={item.endElementId}
  //       path="grid"
  //       gridBreak={item.arrowType === ArrowType.Directional ? "0%" : undefined}
  //       showHead={[ArrowType.BiDirectional, ArrowType.Directional].includes(
  //         item.arrowType,
  //       )}
  //       showTail={[ArrowType.BiDirectional].includes(item.arrowType)}
  //       lineColor="var(--theme-color-2)"
  //       headColor="var(--theme-color-2)"
  //       tailColor="var(--theme-color-2)"
  //       strokeWidth={4}
  //       headSize={2}
  //       tailSize={2}
  //       zIndex={1}
  //       divContainerStyle={{
  //         pointerEvents: "auto",
  //       }}
  //       arrowBodyProps={{
  //         tabIndex: -1,
  //         onClick,
  //         role: "button",
  //       }}
  //     />
  //   </div>
  // );
};
