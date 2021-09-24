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

const makeMirroredHead = (color: string) => {
  return (
    <svg
      className= {`${styles.head} ${styles.mirrorX}`}
      viewBox="0 0 20 40"
      preserveAspectRatio="xMaxYMid"
    >
      <polygon points="0,0 0,40 20,20" fill={color} />
    </svg>);
}

const makeHead = (color:string) => {
  return (
    <svg
      className={styles.head}
      viewBox="0 0 20 40"
      preserveAspectRatio="xMaxYMid"
    >
      <polygon points="0,0 0,40 20,20" fill={color} />
    </svg>);
}

const makeBody = (color:string) => {
  return (
    <svg className={styles.body} viewBox="0 0 1 40" preserveAspectRatio="none">
      <rect x="0" y="15" width="1" height="10" fill={color} />
    </svg>
  );
}

const renderIcons = (hasNotes: boolean) => {
  const edit = <path fill="black" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
  const notes = <path fill="currentColor" d="M20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20M4,6V18H20V6H4M6,9H18V11H6V9M6,13H16V15H6V13Z" />
  return hasNotes ? notes : edit;
}

const makeCircle = (color: string, type: ArrowType) => {
  let directionalAlignment;

  if(type !== ArrowType.Directional)
    directionalAlignment = {left:"50%"};

  return (
  <svg
    className={styles.button}
    viewBox="0 0 12 12"
    preserveAspectRatio="xMaxYMid"
    style={directionalAlignment}
  >
    <circle
      cx="6"
      cy="6"
      r="4px"
      stroke="#FFFFFF"
      fill={color}
      strokeWidth="0.7"
    />
    <svg className= {styles.pointDown} viewBox="-12 -12 48 48">
      {renderIcons(true)}
    </svg>
  </svg>
  );
}

export const Arrow: React.FC<ArrowProps> = ({ start, end, color, type }) => {

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
          {makeBody(color)}
          {makeCircle(color, type)}
        </div>
      );
      break;
    case ArrowType.BiDirectional:
      arrow = (
        <div className={classNames} style={length}>
          {makeMirroredHead(color)}
          {makeBody(color)}
          {makeHead(color)}
          {makeCircle(color, type)}
        </div>
      );
      break;
    case ArrowType.Directional:
      arrow = (
        <div className={classNames} style={length}>
          {makeBody(color)}
          {makeHead(color)}
          {makeCircle(color, type)}
        </div>
      );
  }
  return arrow;
};
