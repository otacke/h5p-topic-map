import { jSXElement, JSX_TYPES } from "@babel/types";
import * as React from "react";
import { Position } from "../../types/Position";
import styles from "./Arrow.module.scss";

export type ArrowProps = {
    start: Position;
    end: Position;
    color: string;
}

export const Arrow: React.FC<ArrowProps>= ({
    start,
    end,
    color,
}) => {
    
    
    let width = Math.abs(start.x) + Math.abs(end.x);
    let height = Math.abs(start.y) + Math.abs(end.y);

    //length and angle of arrow
    let length =  Math.sqrt(Math.pow((end.x-start.x),2) + Math.pow((end.y-start.y),2));
    let angle = Math.atan2(end.y-start.y, end.x-start.x) * 180 / Math.PI;

    // coordinates where arrow body should end and arrow head should begin
    let neckX = start.x + (length-20)*Math.cos(angle);
    let neckY = start.y + (length-20)*Math.sin(angle);
    
    
    const arrowHeadRight = (
    <svg className="arrow head" viewBox="0 0 20 40" preserveAspectRatio="xMaxYMid">
    <polygon points="0,0 0,40 20,20" fill={color}>
    </polygon>
    </svg>);

    const arrowBodyHorizontal = (
    <svg className={styles.body} viewBox="0 0 1 40" preserveAspectRatio="none">
    <rect x="0" y="15" width="1" height="10" fill={color}/>
    </svg>);

    let classNames = styles.arrow + ' ';

    if(start.x > end.x){
        classNames+=styles.pointLeft;
    }
    if(start.y > end.y){
        classNames+=styles.pointDown;
    }
    else if(start.y < end.y){
        classNames+=styles.pointUp;
    }

    let arrow = ( 
    <div className={classNames}>
        {arrowBodyHorizontal}
        {arrowHeadRight}
    </div>
    );

    //Right pointing arrow
    
    // todo: make different types of arrows
    


    return arrow;   
};