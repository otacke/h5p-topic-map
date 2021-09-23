import * as React from "react";
import { Position } from "../../types/Position";
import styles from "./Arrow.module.scss";

export enum ArrowType {
  Directional,
  BiDirectional,
  NonDirectional,
}

export type ArrowProps = {
  start: Position;
  end: Position;
  color: string;
  type: ArrowType;
};

export const Arrow: React.FC<ArrowProps> = ({ start, end, color, type }) => {
  const arrowHead = (
    <svg
      className={styles.head}
      viewBox="0 0 20 40"
      preserveAspectRatio="xMaxYMid"
    >
      <polygon points="0,0 0,40 20,20" fill={color} />
    </svg>
  );

  const arrowHeadMirrored = (
    <svg
      className={`${styles.head} ${styles.mirrorX}`}
      viewBox="0 0 20 40"
      preserveAspectRatio="xMaxYMid"
    >
      <polygon points="0,0 0,40 20,20" fill={color} />
    </svg>
  );

  const noteCircle = (
    <svg
      className={styles.button}
      viewBox="0 0 12 12"
      preserveAspectRatio="xMaxYMid"
    >
      <circle
        cx="6"
        cy="6"
        r="4px"
        stroke="#FFFFFF"
        fill={color}
        strokeWidth="0.7"
      />
    </svg>
  );

  const arrowBody = (
    <svg className={styles.body} viewBox="0 0 1 40" preserveAspectRatio="none">
      <rect x="0" y="15" width="1" height="10" fill={color} />
    </svg>
  );

  const bodyWrapper = (
    <svg viewBox="0 0 12 12" preserveAspectRatio="xMaxYMid">
      {arrowBody}
      {noteCircle}
    </svg>
  );

  // find angle and direction of arrow
  let angle = Math.atan2(start.y - end.y, end.x - start.x) * (180 / Math.PI);
  if (angle < 0) angle = 360 + angle;

  const pointsUp = angle > 45 && angle < 135;
  const pointsDown = angle > 225 && angle < 315;
  const pointsLeft = angle >= 135 && angle <= 225;

  let classNames = `${styles.arrow} `;
  let length;

  if (pointsUp || pointsDown) {
    length = { width: Math.abs(end.y - start.y) };
    if (pointsUp) classNames += styles.pointUp;
    else classNames += styles.pointDown;
  } else {
    length = { width: Math.abs(end.x - start.x) };
    if (pointsLeft) classNames += styles.pointLeft;
    else classNames += styles.pointRight;
  }

  let arrow;
  switch (type) {
    case ArrowType.NonDirectional:
      arrow = (
        <div className={classNames} style={length}>
          {arrowBody}
          {noteCircle}
        </div>
      );
      break;
    case ArrowType.BiDirectional:
      arrow = (
        <div className={classNames} style={length}>
          {arrowHeadMirrored}
          {arrowBody}
          {arrowHead}
          {noteCircle}
        </div>
      );
      break;
    case ArrowType.Directional:
      arrow = (
        <div className={classNames} style={length}>
          {arrowBody}
          {arrowHead}
          {noteCircle}
        </div>
      );
  }
  return arrow;
};
