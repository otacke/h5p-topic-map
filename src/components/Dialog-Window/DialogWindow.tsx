import * as React from "react";
import styles from "./DialogWindow.module.scss";

export type DialogWindowProps = {
  notes: string;
};

export const DialogWindow: React.FC<DialogWindowProps> = (
  props,
): JSX.Element => {
  return <div>Hello Modal</div>;
};
