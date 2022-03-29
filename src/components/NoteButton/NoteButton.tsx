/* eslint-disable react/destructuring-assignment */
import * as React from "react";
import styles from "./NoteButton.module.scss";
import { DoneIcon, EditIcon, IconProps, NoteIcon } from "../Icons/Icons";
import { NoteButtonIconState } from "../../types/NoteButtonIconState";

const icons: Record<NoteButtonIconState, React.FC<IconProps>> = {
  [NoteButtonIconState.Done]: DoneIcon,
  [NoteButtonIconState.Notes]: NoteIcon,
  [NoteButtonIconState.Text]: NoteIcon,
  [NoteButtonIconState.Default]: EditIcon,
  [NoteButtonIconState.None]: EditIcon,
};

const renderIcon = (
  state: NoteButtonIconState,
  iconColor: string,
  strokeWidth: number|undefined,
): JSX.Element => {
  const Icon = icons[state];
  const size = strokeWidth ? strokeWidth * 0.75 : undefined;
  return <Icon iconColor={iconColor} width={size} height={size} />;
};

type NoteButtonProps = {
  backgroundColor: string;
  borderColor: string;
  iconColor: string;
  buttonState: NoteButtonIconState;
  strokeWidth: number | undefined;
};

export const NoteButton: React.FC<NoteButtonProps> = ({
  backgroundColor,
  borderColor,
  iconColor,
  buttonState,
  strokeWidth,
}): JSX.Element => {

  const classNames = `${styles.button}`;
  const minSize = strokeWidth? strokeWidth * 1.5 : 0;
  return (
    <div
      data-testid="svgBtn"
      className={classNames}
      style={{ backgroundColor, borderColor, minWidth: minSize, minHeight: minSize }}
    >
      {renderIcon(buttonState, iconColor, strokeWidth)}
    </div>
  );
};
