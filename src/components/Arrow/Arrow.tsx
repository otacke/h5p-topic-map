import * as React from "react";
import { Position } from "../../types/Position";
import styles from "./Arrow.module.scss";

export type ArrowProps = {
    start: Position;
    end: Position;
    color: string;
}

export const Arrow: React.FC<ArrowProps> = ({
    start,
    end,
    color,
}) => {

    const arrowHead = (
        <svg className={styles.head} viewBox="0 0 20 40" preserveAspectRatio="xMaxYMid">
            <polygon points="0,0 0,40 20,20" fill={color}>
            </polygon>
        </svg>);

    const arrowBody = (
        <svg className={styles.body} viewBox="0 0 1 40" preserveAspectRatio="none">
            <rect x="0" y="15" width="1" height="10" fill={color} />
        </svg>);

    // find angle and direction of arrow
    let angle = Math.atan2(start.y - end.y, end.x - start.x) * (180 / Math.PI);
    if (angle < 0) angle = 360 + angle;
    
    let pointsUp = (angle > 45 && angle < 135);
    let pointsDown = (angle > 225 && angle < 315);
    let pointsLeft = (angle >= 135 && angle <= 225);

    let classNames = styles.arrow + ' ';
    let length;

    if (pointsUp || pointsDown) {
        length = { width: Math.abs(end.y - start.y) };
        if (pointsUp)
            classNames += styles.pointUp;
        else
            classNames += styles.pointDown;
    }
    else {
        length = { width: Math.abs(end.x - start.x) };
        if (pointsLeft)
            classNames += styles.pointLeft
    }

    let arrow = (
        <div className={classNames} style={length}>
            {arrowBody}
            {arrowHead}
        </div>
    );
    return arrow;
};