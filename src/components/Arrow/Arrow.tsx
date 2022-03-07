import * as React from "react";
import { FC, MouseEventHandler } from "react";
import { NoteButtonIconState } from "../../types/NoteButtonIconState";
import { ArrowItemType } from "../../types/ArrowItemType";
import { ArrowType } from "../../types/ArrowType";
import { NoteButton } from "../NoteButton/NoteButton";
import styles from "./Arrow.module.scss";
import gridStyles from "../Grid/Grid.module.scss";

export type ArrowProps = {
  item: ArrowItemType;
  onClick: MouseEventHandler;
};

export const Arrow: FC<ArrowProps> = ({ item, onClick }) => {
  // const columns = 31;
  // const rows = 19;
  // const defaultGapSize = 4;
  const [pathDef, setPathDef] = React.useState<string>("");
  const arrowContainerRef = React.createRef<HTMLDivElement>();
  React.useEffect(() => {
    // const gridElement = document.querySelector(`.grid`) as HTMLElement;
    // console.info("useEffect gridElement", gridElement);
    console.info("useEffect arrowContainerRef", arrowContainerRef);
    if (arrowContainerRef.current) {
      const gridElement = arrowContainerRef.current;
      const path = `M ${
        (item.startPosition.x / 100) * gridElement.clientWidth
      } ${(item.startPosition.y / 100) * gridElement.clientHeight} L ${
        (item.endPosition.x / 100) * gridElement.clientWidth
      } ${(item.endPosition.y / 100) * gridElement.clientHeight}`;
      setPathDef(path);
    }
  }, [arrowContainerRef, item]);

  const buttonState = NoteButtonIconState.Default;
  // eslint-disable-next-line no-console
  console.log("ARROW", item);
  const cellSize = 4;
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
          strokeWidth={cellSize}
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
