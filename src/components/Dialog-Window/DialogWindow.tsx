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

  if (!item.dialog) {
    return null;
  }

  let content = (
    <Content className={styles.dialogContent}>
      <Title className={styles.dialogTitle}>{item.label}</Title>
      <div style={{ width: "100%", display: "inline-block" }}>
        <DialogTabs tabContents={item.dialog} />
      </div>
      <Close className={styles.closeButton} aria-label={ariaLabel}>
        <Cross2Icon />
      </Close>
    </Content>
  );

  if (item.dialog.note) {
    content = (
      <Content className={styles.dialogContentWithNote}>
        <Title className={styles.dialogTitle}>{item.label}</Title>
        <div className={styles.tabWrapper}>
          <DialogTabs tabContents={item.dialog} />
        </div>
        <div className={styles.noteWrapper}>
          <DialogNote maxLength={10} id="random" />
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

// <Root open={open} onOpenChange={onOpenChange}>
//   <Overlay className={styles.overlay} />
//   <Content className={styles.dialogContent}>
//     <Title className={styles.dialogTitle}>{item.label}</Title>
//     <div style={{width: "45%", display: "inline-block"}}>
//       <DialogTabs tabContents={item.dialog} />
//     </div>
//     <div style={{float: "right", width: "45%", height:"40vh"}}>
//       <DialogNote maxLength={10} id="random"/>
//     </div>
//     <Close className={styles.closeButton} aria-label={ariaLabel}>
//       <Cross2Icon />
//     </Close>
//   </Content>
// </Root>
