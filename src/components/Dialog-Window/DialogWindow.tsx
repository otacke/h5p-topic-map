import * as React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Root, Content, Title, Close, Overlay } from "@radix-ui/react-dialog";
import styles from "./DialogWindow.module.scss";

export type DialogWindowProps = {
  title: string;
  notes: string;
};

const arialLabel = "Close";
export const DialogWindow: React.FC<DialogWindowProps> = ({
  title,
}): JSX.Element => {
  return (
    <Root defaultOpen>
      <Overlay className={styles.overlay} />
      <Content className={styles.dialogContent}>
        <Title className={styles.dialogTitle}>{title}</Title>
        <Close className={styles.closeButton}>
          <Cross2Icon aria-label={arialLabel} />
        </Close>
      </Content>
    </Root>
  );
};
