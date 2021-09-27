import * as React from "react";
import { Position } from "../../types/Position";
import styles from "./Arrow.module.scss";

export enum ArrowType {
  Directional,
  BiDirectional,
  NonDirectional,
}

enum ArrowDirection {
  Up,
  Down,
  Left,
  Right,
}

export type ArrowProps = {
  start: Position;
  end: Position;
  arrowColor: string;
  circleColor: string;
  iconColor: string;
  type: ArrowType;
  notes: string;
};

let isShown = false;

const makeMirroredHead = (arrowColor: string): JSX.Element => {
  return (
    <svg
      className={`${styles.head} ${styles.mirrorX}`}
      viewBox="0 0 20 40"
      preserveAspectRatio="xMaxYMid"
    >
      <polygon points="0,0 0,40 20,20" fill={arrowColor} />
    </svg>
  );
};

const toggleButton = (): void => {
  isShown = !isShown;
};

const makeHead = (arrowColor: string): JSX.Element => {
  return (
    <svg
      onMouseEnter={() => toggleButton()}
      onMouseLeave={() => toggleButton()}
      className={styles.head}
      viewBox="0 0 20 40"
      preserveAspectRatio="xMaxYMid"
    >
      <polygon points="0,0 0,40 20,20" fill={arrowColor} />
    </svg>
  );
};

const makeBody = (arrowColor: string): JSX.Element => {
  return (
    <svg className={styles.body} viewBox="0 0 1 40" preserveAspectRatio="none">
      <rect x="0" y="15" width="1" height="10" fill={arrowColor} />
    </svg>
  );
};

const renderIcons = (hasNotes: boolean, iconColor: string): JSX.Element => {
  const edit = (
    <path
      fill={iconColor}
      d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
    />
  );
  const notes = (
    <path
      fill={iconColor}
      d="M20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20M4,6V18H20V6H4M6,9H18V11H6V9M6,13H16V15H6V13Z"
    />
  );
  return hasNotes ? notes : edit;
};

function clickArrow(): void {
  // TODO
}

const makeButton = (
  arrowColor: string,
  circleColor: string,
  iconColor: string,
  type: ArrowType,
  direction: ArrowDirection,
): JSX.Element => {
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
      id="svgBtn"
      className={classNames}
      viewBox="0 0 12 12"
      preserveAspectRatio="xMaxYMid"
    >
      <circle
        stroke={circleColor}
        fill={arrowColor}
        className={`${styles.buttonCircle}`}
      />

      <svg viewBox="-12 -12 48 48">{renderIcons(false, iconColor)}</svg>

      <circle
        fill="transparent"
        className={`${styles.buttonCircle}`}
        style={{ cursor: "pointer" }}
        onClick={clickArrow}
      />
    </svg>
  );
};

export const Arrow: React.FC<ArrowProps> = ({
  start,
  end,
  arrowColor,
  circleColor,
  iconColor,
  type,
}) => {
  // find angle and direction of arrow
  let angle = Math.atan2(start.y - end.y, end.x - start.x) * (180 / Math.PI);
  if (angle < 0) angle = 360 + angle;

  const pointsUp = angle > 45 && angle < 135;
  const pointsDown = angle > 225 && angle < 315;
  const pointsLeft = angle >= 135 && angle <= 225;

  let classNames = `${styles.arrow} `;
  let length;
  let direction;

  if (pointsUp || pointsDown) {
    length = { width: Math.abs(end.y - start.y) };
    if (pointsUp) {
      classNames += styles.pointUp;
      direction = ArrowDirection.Up;
    } else {
      classNames += styles.pointDown;
      direction = ArrowDirection.Down;
    }
  } else {
    length = { width: Math.abs(end.x - start.x) };
    if (pointsLeft) {
      classNames += styles.pointLeft;
      direction = ArrowDirection.Left;
    } else {
      classNames += styles.pointRight;
      direction = ArrowDirection.Right;
    }
  }

  let arrow;
  switch (type) {
    case ArrowType.NonDirectional:
      arrow = (
        <div className={classNames} style={length}>
          {makeBody(arrowColor)}
          {makeButton(arrowColor, circleColor, iconColor, type, direction)}
        </div>
      );
      break;
    case ArrowType.BiDirectional:
      arrow = (
        <div className={classNames} style={length}>
          {makeMirroredHead(arrowColor)}
          {makeBody(arrowColor)}
          {makeHead(arrowColor)}
          {makeButton(arrowColor, circleColor, iconColor, type, direction)}
        </div>
      );
      break;
    case ArrowType.Directional:
      arrow = (
        <div className={classNames} style={length}>
          {makeBody(arrowColor)}
          {makeHead(arrowColor)}
          {isShown
            ? makeButton(arrowColor, circleColor, iconColor, type, direction)
            : null}
        </div>
      );
  }
  return arrow;
};
