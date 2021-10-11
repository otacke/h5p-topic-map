import * as React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./DialogWindow.module.scss";

export type DialogWindowProps = {
  notes: string;
};

export const DialogWindow: React.FC<DialogWindowProps> = (
  props,
): JSX.Element => {
  return <div>Hello Modal</div>;
};
