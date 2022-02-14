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
import { useMedia } from "react-use";
import { useL10n } from "../../hooks/useLocalization";
import { CommonItemType } from "../../types/CommonItemType";
import styles from "./DialogWindow.module.scss";
import { DialogNote } from "./Notes/DialogNote";
import { DialogTabs } from "./Tabs/DialogTabs";

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
  const smallScreen = useMedia("(max-width: 768px)");

  if (!item.dialog) {
    return null;
  }

  let content = (
    <Content className={styles.dialogContent}>
      <Title className={styles.dialogTitle}>{item.label}</Title>
      <DialogTabs tabContents={item.dialog} id={item.id} />
      <Close className={styles.closeButton} aria-label={ariaLabel}>
        <Cross2Icon />
      </Close>
    </Content>
  );

  if (item.dialog.hasNote && !smallScreen) {
    content = (
      <Content className={styles.dialogContentWithNote}>
        <Title className={styles.dialogTitle}>{item.label}</Title>
        <div className={styles.tabWrapper}>
          <DialogTabs tabContents={item.dialog} id={item.id} />
        </div>
        <div className={styles.noteWrapper}>
          <DialogNote maxLength={160} id={item.id} />
        </div>
        <Close className={styles.closeButton} aria-label={ariaLabel}>
          <Cross2Icon />
        </Close>
      </Content>
    );
  }

  return (
    <Root open={open} onOpenChange={onOpenChange}>
      <Overlay className={styles.overlay} />
      {content}
    </Root>
  );
};
