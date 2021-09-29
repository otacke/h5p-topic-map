import * as React from "react";
import { useState } from "react";
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

const makeHead = (arrowColor: string): JSX.Element => {
  return (
    <svg
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
    <svg
      width="12"
      height="12"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 13.8534V16.5556C0 16.8045 0.195556 17 0.444444 17H3.14667C3.26222 17 3.37778 16.9556 3.45778 16.8667L13.1644 7.16891L9.83111 3.83558L0.133333 13.5334C0.0444445 13.6222 0 13.7289 0 13.8534ZM15.7422 4.59114C16.0889 4.24447 16.0889 3.68447 15.7422 3.3378L13.6622 1.2578C13.3156 0.911136 12.7556 0.911136 12.4089 1.2578L10.7822 2.88447L14.1156 6.2178L15.7422 4.59114Z"
        fill="#3E3E3E"
      />
    </svg>
  );
  const notes = (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 0.75H12V2.25H0V0.75ZM0 3.75H12V5.25H0V3.75ZM0 6.75H12V8.25H0V6.75ZM0 9.75H7.5V11.25H0V9.75Z"
        fill="#223535"
      />
    </svg>
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
  hasNote: boolean,
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
        stroke={arrowColor}
        fill={circleColor}
        className={`${styles.buttonCircle}`}
        cx="6"
        cy="6"
        r="4px"
      />

      <svg viewBox="-9 -9 30 30">{renderIcons(hasNote, iconColor)}</svg>

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

  const [isShown, setIsShown] = useState(false);
  const [hasNote, setHasNote] = useState(false);

  let button;
  if (hasNote)
    button = makeButton(
      arrowColor,
      circleColor,
      iconColor,
      type,
      direction,
      hasNote,
    );
  else if (isShown)
    button = makeButton(
      arrowColor,
      circleColor,
      iconColor,
      type,
      direction,
      hasNote,
    );

  let arrow;
  switch (type) {
    case ArrowType.NonDirectional:
      arrow = (
        <div
          className={classNames}
          style={length}
          onMouseLeave={() => setIsShown(false)}
          onMouseEnter={() => setIsShown(true)}
        >
          {makeBody(arrowColor)}
          {button}
        </div>
      );
      break;
    case ArrowType.BiDirectional:
      arrow = (
        <div
          className={classNames}
          style={length}
          onMouseLeave={() => setIsShown(false)}
          onMouseEnter={() => setIsShown(true)}
        >
          {makeMirroredHead(arrowColor)}
          {makeBody(arrowColor)}
          {makeHead(arrowColor)}
          {button}
        </div>
      );
      break;
    case ArrowType.Directional:
      arrow = (
        <div
          className={classNames}
          style={length}
          onMouseLeave={() => setIsShown(false)}
          onMouseEnter={() => setIsShown(true)}
        >
          {makeBody(arrowColor)}
          {makeHead(arrowColor)}
          {button}
        </div>
      );
  }

  // apply shadow around whole arrow
  arrow = <div className={styles.shadow}>{arrow}</div>;

  return arrow;
};
