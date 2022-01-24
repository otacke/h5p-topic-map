import * as React from "react";
import { useState } from "react";
import { ArrowDirection } from "../../types/ArrowDirection";
import { ArrowType } from "../../types/ArrowType";
import { DialogWindow } from "../Dialog-Window/DialogWindow";
import styles from "./Arrow.module.scss";
import { ArrowBody, ArrowHead, MirroredArrowHead } from "./ArrowParts";
import { ArrowButton } from "./Button";
import { ButtonIconState, getButtonIconState } from "./Utils";

export type ArrowProps = {
  arrowColor: string;
  circleColor: string;
  iconColor: string;
  type: ArrowType;
  notes: string;
  completed: boolean;
  direction: ArrowDirection;
};

export const Arrow: React.FC<ArrowProps> = ({
  arrowColor,
  circleColor,
  iconColor,
  type,
  notes,
  completed,
  direction,
}) => {
  const [isDialogueShown, setIsDialogueShown] = React.useState<boolean>(false);
  const [buttonState, setButtonState] = useState(
    getButtonIconState(completed, notes),
  );

  const directionClassNames = {
    [ArrowDirection.Up]: styles.pointUp,
    [ArrowDirection.Down]: styles.pointDown,
    [ArrowDirection.Left]: styles.pointLeft,
    [ArrowDirection.Right]: styles.pointRight,
  };

  let classNames = `${styles.arrow} ${directionClassNames[direction]}`;

  React.useEffect(() => {
    setButtonState(getButtonIconState(completed, notes));
  }, [completed, notes]);

  if (buttonState === ButtonIconState.Empty) {
    classNames += ` ${styles.emptyArrow}`;
  } else {
    classNames += ` ${styles.filledArrow}`;
  }

  const button = (
    <button type="button">
      <ArrowButton
        arrowColor={arrowColor}
        circleColor={circleColor}
        iconColor={iconColor}
        type={type}
        direction={direction}
        buttonState={buttonState}
      />
    </button>
  );

  let arrow;
  switch (type) {
    case ArrowType.NonDirectional:
      arrow = (
        <div data-testid="ndArrow" className={classNames}>
          <ArrowBody arrowColor={arrowColor} />
          {button}
        </div>
      );
      break;
    case ArrowType.BiDirectional:
      arrow = (
        <div data-testid="bdArrow" className={classNames}>
          <MirroredArrowHead arrowColor={arrowColor} />
          <ArrowBody arrowColor={arrowColor} />
          <ArrowHead arrowColor={arrowColor} />
          {button}
        </div>
      );
      break;
    case ArrowType.Directional:
      arrow = (
        <div data-testid="dArrow" className={classNames}>
          <ArrowBody arrowColor={arrowColor} />
          <ArrowHead arrowColor={arrowColor} />
          {button}
        </div>
      );
  }

  // apply shadow around arrow
  arrow = (
    <>
      <div
        className={styles.shadow}
        onKeyDown={e =>
          ["Space", "Enter"].includes(e.code) && setIsDialogueShown
        }
        onClick={() => setIsDialogueShown(true)}
        role="button"
        tabIndex={0}
      >
        {arrow}
      </div>
      <DialogWindow
        title=""
        notes={notes}
        open={isDialogueShown}
        onOpenChange={setIsDialogueShown}
      />
    </>
  );

  return arrow;
};
