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
};

const renderIcon = (
  state: NoteButtonIconState,
  iconColor: string,
): JSX.Element => {
  const Icon = icons[state];
  return <Icon iconColor={iconColor} />;
};

type NoteButtonProps = {
  backgroundColor: string;
  borderColor: string;
  iconColor: string;
  buttonState: NoteButtonIconState;
};

export const NoteButton: React.FC<NoteButtonProps> = ({
  backgroundColor,
  borderColor,
  iconColor,
  buttonState,
}): JSX.Element => {
  const classNames = `${styles.button}`;

  return (
    <div
      data-testid="svgBtn"
      className={classNames}
      style={{ backgroundColor, borderColor }}
    >
      {renderIcon(buttonState, iconColor)}
    </div>
  );
};
