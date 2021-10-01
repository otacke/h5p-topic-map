import * as React from "react";
import { useState } from "react";
import { Position } from "../../types/Position";
import styles from "./Arrow.module.scss";
import { createCompletedIcon, createEditIcon, createNoteIcon } from "./Icons";

export enum ArrowType {
  Directional,
  BiDirectional,
  NonDirectional,
}

enum ButtonIconState {
  Empty,
  Edit,
  Notes,
  Completed,
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
  completed: boolean;
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

function clickArrow(): void {
  // TODO
}

const makeButton = (
  arrowColor: string,
  circleColor: string,
  iconColor: string,
  type: ArrowType,
  direction: ArrowDirection,
  buttonState: ButtonIconState,
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

export const Arrow: React.FC<ArrowProps> = ({
  start,
  end,
  arrowColor,
  circleColor,
  iconColor,
  type,
  notes,
  completed,
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

  // todo find correct state
  // Hvis state = Notes eller completed så skal ikke det endres ved hover
  const [noteState, setNoteState] = useState(notes);

  let tempState;
  if (completed) tempState = ButtonIconState.Completed;
  else if (noteState.length !== 0) tempState = ButtonIconState.Notes;
  else tempState = ButtonIconState.Empty;

  const [buttonState, setButtonState] = useState(tempState);

  const mouseHover = (state: ButtonIconState): void => {
    switch (true) {
      case buttonState === ButtonIconState.Empty:
        setButtonState(state);
        break;
      case buttonState === ButtonIconState.Edit:
        setButtonState(state);
        break;
      default:
        break;
    }
  };

  let button;
  if (buttonState !== ButtonIconState.Empty)
    button = makeButton(
      arrowColor,
      circleColor,
      iconColor,
      type,
      direction,
      buttonState,
    );

  let arrow;
  switch (type) {
    case ArrowType.NonDirectional:
      arrow = (
        <div
          data-testid="ndArrow"
          className={classNames}
          style={length}
          onMouseEnter={() => mouseHover(ButtonIconState.Edit)}
          onMouseLeave={() => mouseHover(ButtonIconState.Empty)}
        >
          {makeBody(arrowColor)}
          {button}
        </div>
      );
      break;
    case ArrowType.BiDirectional:
      arrow = (
        <div
          data-testid="bdArrow"
          className={classNames}
          style={length}
          onMouseEnter={() => mouseHover(ButtonIconState.Edit)}
          onMouseLeave={() => mouseHover(ButtonIconState.Empty)}
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
          data-testid="dArrow"
          className={classNames}
          style={length}
          onMouseEnter={() => mouseHover(ButtonIconState.Edit)}
          onMouseLeave={() => mouseHover(ButtonIconState.Empty)}
        >
          {makeBody(arrowColor)}
          {makeHead(arrowColor)}
          {button}
        </div>
      );
  }

  // apply shadow around arrow
  arrow = <div className={styles.shadow}>{arrow}</div>;

  return arrow;
};
