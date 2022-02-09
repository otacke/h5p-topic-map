import {
  Close,
  Content,
  Description,
  Overlay,
  Root,
  Title,
} from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as React from "react";
import { FC } from "react";
import { useL10n } from "../../hooks/useLocalization";
import { CommonItemType } from "../../types/CommonItemType";
import styles from "./DialogWindow.module.scss";

export type DialogWindowProps = {
  item: CommonItemType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const DialogWindow: FC<DialogWindowProps> = ({
  item,
  open,
  onOpenChange,
}) => {
  const ariaLabel = useL10n("closeDialog");

  if (!item.dialog) {
    return null;
  }

  return (
    <Root open={open} onOpenChange={onOpenChange}>
      <Overlay className={styles.overlay} />
      <Content className={styles.dialogContent}>
        <Title className={styles.dialogTitle}>{item.label}</Title>
        {item.dialog.text ? (
          <Description dangerouslySetInnerHTML={{ __html: item.dialog.text }} />
        ) : null}
        <Close className={styles.closeButton} aria-label={ariaLabel}>
          <Cross2Icon />
        </Close>
      </Content>
    </Root>
  );
};
