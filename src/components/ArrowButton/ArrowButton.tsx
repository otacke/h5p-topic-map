/* eslint-disable react/destructuring-assignment */
import * as React from "react";
import { ArrowType } from "../../types/ArrowType";
import styles from "./ArrowButton.module.scss";
import { CompletedIcon, EditIcon, NoteIcon } from "../Icons/Icons";
import { ArrowButtonIconState } from "../../types/ArrowButtonIconState";

const renderIcon = (
  state: ArrowButtonIconState,
  iconColor: string,
): JSX.Element => {
  switch (state) {
    case ArrowButtonIconState.Completed:
      return <CompletedIcon iconColor={iconColor} />;
    case ArrowButtonIconState.Notes:
      return <NoteIcon iconColor={iconColor} />;
    default:
      return <EditIcon iconColor={iconColor} />;
  }
};

type ArrowButtonProps = {
  arrowColor: string;
  circleColor: string;
  iconColor: string;
  type: ArrowType;
  buttonState: ArrowButtonIconState;
};

export const ArrowButton: React.FC<ArrowButtonProps> = ({
  arrowColor,
  circleColor,
  iconColor,
  type,
  buttonState,
}): JSX.Element => {
  let classNames = `${styles.button}`;

  if (type === ArrowType.Directional)
    classNames += ` ${styles.buttonDirectional}`;
  else classNames += ` ${styles.buttonNonDirectional}`;

  return (
    <svg
      data-testid="svgBtn"
      className={classNames}
      viewBox="0 0 11 11"
      preserveAspectRatio="xMaxYMid"
    >
      <circle
        stroke={arrowColor}
        fill={circleColor}
        className={`${styles.buttonCircle}`}
        cx="6"
        cy="6"
        r="4"
      />

      <svg viewBox="-11 -10 30 30">{renderIcon(buttonState, iconColor)}</svg>

      <circle
        fill="transparent"
        className={styles.buttonCircle}
        style={{ cursor: "pointer" }}
        cx="6"
        cy="6"
        r="4"
      />
    </svg>
  );
};
