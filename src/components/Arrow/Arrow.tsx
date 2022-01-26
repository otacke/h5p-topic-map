import * as React from "react";
import { useState } from "react";
import { ArrowDirection } from "../../types/ArrowDirection";
import { ArrowItemType } from "../../types/ArrowItemType";
import { ArrowType } from "../../types/ArrowType";
import { Position } from "../../types/Position";
import { wrapInAnchor } from "../../utils/element.utils";
import { DialogWindow } from "../Dialog-Window/DialogWindow";
import styles from "./Arrow.module.scss";
import { ArrowBody, ArrowHead, MirroredArrowHead } from "./ArrowParts";
import { ArrowButton } from "./Button";
import { ButtonIconState, findDirection, getButtonIconState } from "./Utils";

export type ArrowProps = {
  start: Position;
  end: Position;
  arrowColor: string;
  circleColor: string;
  iconColor: string;
  notes: string;
  completed: boolean;
  item: ArrowItemType;
};

export const Arrow: React.FC<ArrowProps> = ({
  start,
  end,
  arrowColor,
  circleColor,
  iconColor,
  notes,
  completed,
  item,
}) => {
  const [isDialogShown, setIsDialogShown] = React.useState(false);

  // find angle and direction of arrow
  let angle = Math.atan2(start.y - end.y, end.x - start.x) * (180 / Math.PI);
  if (angle < 0) angle = 360 + angle;
  const direction = findDirection(angle);

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
    getButtonIconState(completed, notes),
  );

  React.useEffect(() => {
    setButtonState(getButtonIconState(completed, notes));
  }, [completed, notes]);

  if (buttonState === ButtonIconState.Empty)
    classNames += ` ${styles.emptyArrow}`;
  else classNames += ` ${styles.filledArrow}`;

  const button = (
    <button type="button">
      <ArrowButton
        arrowColor={arrowColor}
        circleColor={circleColor}
        iconColor={iconColor}
        type={item.arrowType}
        direction={direction}
        buttonState={buttonState}
      />
    </button>
  );

  let arrow;
  switch (item.arrowType) {
    case ArrowType.NonDirectional:
      arrow = (
        <div data-testid="ndArrow" className={classNames} style={length}>
          <ArrowBody arrowColor={arrowColor} />
          {button}
        </div>
      );
      break;
    case ArrowType.BiDirectional:
      arrow = (
        <div data-testid="bdArrow" className={classNames} style={length}>
          <MirroredArrowHead arrowColor={arrowColor} />
          <ArrowBody arrowColor={arrowColor} />
          <ArrowHead arrowColor={arrowColor} />
          {button}
        </div>
      );
      break;
    case ArrowType.Directional:
      arrow = (
        <div data-testid="dArrow" className={classNames} style={length}>
          <ArrowBody arrowColor={arrowColor} />
          <ArrowHead arrowColor={arrowColor} />
          {button}
        </div>
      );
  }

  const itemHasDirectLink = item.dialogOrDirectLink === "directLink";
  const renderedArrow = (
    <>
      <div
        className={styles.shadow}
        onKeyDown={e => ["Space", "Enter"].includes(e.code) && setIsDialogShown}
        onClick={itemHasDirectLink ? undefined : () => setIsDialogShown(true)}
        role="button"
        tabIndex={0}
      >
        {arrow}
      </div>
      {itemHasDirectLink ? null : (
        <DialogWindow
          title=""
          notes={notes}
          open={isDialogShown}
          onOpenChange={setIsDialogShown}
        />
      )}
    </>
  );

  return itemHasDirectLink
    ? wrapInAnchor(renderedArrow, item.directLink ?? "#")
    : renderedArrow;
};
