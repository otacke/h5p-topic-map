/* eslint-disable react/destructuring-assignment */
import * as React from "react";
import { ArrowDirection, ArrowType, ButtonIconState } from "./Utils";
import styles from "./Button.module.scss";
import { createCompletedIcon, createEditIcon, createNoteIcon } from "./Icons";

const renderIcon = (state: ButtonIconState, iconColor: string): JSX.Element => {
  switch (state) {
    case ButtonIconState.Completed:
      return createCompletedIcon(iconColor);
    case ButtonIconState.Notes:
      return createNoteIcon(iconColor);
    default:
      return createEditIcon(iconColor);
  }
};

export function clickArrow(): void {
  // TODO
}

interface ArrowButtonProps {
  arrowColor: string;
  circleColor: string;
  iconColor: string;
  type: ArrowType;
  direction: ArrowDirection;
  buttonState: ButtonIconState;
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({
  arrowColor,
  circleColor,
  iconColor,
  type,
  direction,
  buttonState,
}): JSX.Element => {
  let classNames = `${styles.button}`;

  if (type !== ArrowType.Directional)
    classNames += ` ${styles.buttonNonDirectional}`;
  else classNames += ` ${styles.buttonDirectional}`;

  switch (direction) {
    case ArrowDirection.Up:
      classNames += ` ${styles.buttonUp}`;
      break;
    case ArrowDirection.Down:
      classNames += ` ${styles.buttonDown}`;
      break;
    case ArrowDirection.Left:
      classNames += ` ${styles.buttonLeft}`;
      break;
    case ArrowDirection.Right:
      classNames += ` ${styles.buttonRight}`;
      break;
  }

  return (
    <svg
      data-testid="svgBtn"
      className={classNames}
      viewBox="0 0 12 12"
      preserveAspectRatio="xMaxYMid"
    >
      <circle
        stroke={arrowColor}
        fill={circleColor}
        className={`${styles.buttonCircle}`}
        cx="6"
        cy="6"
        r="4px"
      />

      <svg viewBox="-9 -9 30 30">{renderIcon(buttonState, iconColor)}</svg>

      <circle
        fill="transparent"
        className={`${styles.buttonCircle}`}
        style={{ cursor: "pointer" }}
        onClick={clickArrow}
        cx="6"
        cy="6"
        r="4px"
      />
    </svg>
  );
};
