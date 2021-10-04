import * as React from "react";
import { useState } from "react";
import { Position } from "../../types/Position";
import styles from "./Arrow.module.scss";
import { makeButton } from "./Button";
import * as Utils from "./Utils";
import { ArrowDirection, ArrowType, ButtonIconState } from "./Utils";

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
  const direction = Utils.findDirection(angle);

  let classNames = `${styles.arrow} `;
  let length;

  switch (direction) {
    case ArrowDirection.Up:
      length = { width: Math.abs(end.y - start.y) };
      classNames += styles.pointUp;
      break;
    case ArrowDirection.Down:
      length = { width: Math.abs(end.y - start.y) };
      classNames += styles.pointDown;
      break;
    case ArrowDirection.Left:
      length = { width: Math.abs(end.x - start.x) };
      classNames += styles.pointLeft;
      break;
    case ArrowDirection.Right:
      length = { width: Math.abs(end.x - start.x) };
      classNames += styles.pointRight;
      break;
  }

  const [buttonState, setButtonState] = useState(
    Utils.getButtonIconState(completed, notes),
  );

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

  React.useEffect(() => {
    setButtonState(Utils.getButtonIconState(completed, notes));
  }, [completed, notes]);

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
