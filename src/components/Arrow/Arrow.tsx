import * as React from "react";
import { FC, MouseEventHandler } from "react";
import Xarrow from "react-xarrows";
import { ArrowButtonIconState } from "../../types/ArrowButtonIconState";
import { ArrowItemType } from "../../types/ArrowItemType";
import { ArrowType } from "../../types/ArrowType";
import { ArrowButton } from "../ArrowButton/ArrowButton";
import styles from "./Arrow.module.scss";

export type ArrowProps = {
  item: ArrowItemType;
  onClick: MouseEventHandler;
};

export const Arrow: FC<ArrowProps> = ({ item, onClick }) => {
  const buttonState = ArrowButtonIconState.Default;

  return (
    <div aria-label={item.label} className={`arrow-item ${styles.arrow}`}>
      <Xarrow
        labels={{
          middle: (
            <ArrowButton
              arrowColor="var(--theme-color-2)"
              buttonState={buttonState}
              circleColor="var(--theme-color-3)"
              iconColor="var(--theme-color-4)"
              type={item.arrowType}
            />
          ),
        }}
        start={item.startElementId}
        end={item.endElementId}
        path="grid"
        gridBreak={item.arrowType === ArrowType.Directional ? "0%" : undefined}
        showHead={[ArrowType.BiDirectional, ArrowType.Directional].includes(
          item.arrowType,
        )}
        showTail={[ArrowType.BiDirectional].includes(item.arrowType)}
        lineColor="var(--theme-color-2)"
        headColor="var(--theme-color-2)"
        tailColor="var(--theme-color-2)"
        strokeWidth={4}
        headSize={2}
        tailSize={2}
        zIndex={1}
        divContainerStyle={{
          pointerEvents: "auto",
        }}
        arrowBodyProps={{
          tabIndex: -1,
          onClick,
          role: "button",
        }}
      />
    </div>
  );
};
