/* eslint-disable react/destructuring-assignment */
import * as React from "react";
import styles from "./ArrowButton.module.scss";
import { CompletedIcon, EditIcon, IconProps, NoteIcon } from "../Icons/Icons";
import { ArrowButtonIconState } from "../../types/ArrowButtonIconState";

const icons: Record<ArrowButtonIconState, React.FC<IconProps>> = {
  [ArrowButtonIconState.Completed]: CompletedIcon,
  [ArrowButtonIconState.Notes]: NoteIcon,
  [ArrowButtonIconState.Default]: EditIcon,
};

const renderIcon = (
  state: ArrowButtonIconState,
  iconColor: string,
): JSX.Element => {
  const Icon = icons[state];
  return <Icon iconColor={iconColor} />;
};

type ArrowButtonProps = {
  backgroundColor: string;
  borderColor: string;
  iconColor: string;
  buttonState: ArrowButtonIconState;
};

export const ArrowButton: React.FC<ArrowButtonProps> = ({
  backgroundColor,
  borderColor,
  iconColor,
  buttonState,
}): JSX.Element => {
  const classNames = `${styles.button}`;

  return (
    <button
      type="button"
      data-testid="svgBtn"
      className={classNames}
      style={{ backgroundColor, borderColor }}
    >
      {renderIcon(buttonState, iconColor)}
    </button>
  );
};
