import * as React from "react";
import { Close, Content, Overlay, Root, Title } from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { FC } from "react";
import { useMedia } from "react-use";
import { useL10n } from "../../hooks/useLocalization";
import { CommonItemType } from "../../types/CommonItemType";
import { UserData } from "../../types/UserData";
import { DialogNote } from "./Notes/DialogNote";
import { DialogTabs } from "./Tabs/DialogTabs";
import styles from "./DialogWindow.module.scss";

export type DialogWindowProps = {
  item: CommonItemType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  confirmWindow?: {
    confirmAction: () => void;
    denyAction: () => void;
    confirmText: string;
    denyText: string;
  };
  setUserDataCopy?: React.Dispatch<React.SetStateAction<UserData>>;
};

export const DialogWindow: FC<DialogWindowProps> = ({
  item,
  open,
  onOpenChange,
  confirmWindow,
  children,
  setUserDataCopy,
}) => {
  const ariaLabel = useL10n("closeDialog");
  const smallScreen = useMedia("(max-width: 768px)");

  if (confirmWindow) {
    return (
      <Root open={open} onOpenChange={onOpenChange}>
        <Overlay className={styles.overlay} />
        <Content className={styles.confirmWindowContent}>
          <Title className={styles.dialogTitle}>{item.label}</Title>
          {children}
          <div className={styles.confirmationButtons}>
            <button
              type="button"
              className={styles.confirmButton}
              onClick={confirmWindow.confirmAction}
            >
              {confirmWindow.confirmText}
            </button>
            <button
              type="button"
              className={styles.denyButton}
              onClick={confirmWindow.denyAction}
            >
              {confirmWindow.denyText}
            </button>
          </div>
          <Close className={styles.closeButton} aria-label={ariaLabel}>
            <Cross2Icon />
          </Close>
        </Content>
      </Root>
    );
  }

  if (!item.dialog) {
    return null;
  }

  let content = smallScreen ? (
    <Content className={styles.dialogContentWithNote}>
      <Title className={styles.dialogTitle}>{item.label}</Title>
      <DialogTabs item={item} />
      <Close className={styles.closeButton} aria-label={ariaLabel}>
        <Cross2Icon />
      </Close>
    </Content>
  ) : (
    <Content className={styles.dialogContent}>
      <Title
        className={styles.dialogTitle}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: item.label }}
      />
      <DialogTabs item={item} />
      <Close className={styles.closeButton} aria-label={ariaLabel}>
        <Cross2Icon />
      </Close>
    </Content>
  );

  if (item.dialog.hasNote && !smallScreen) {
    content = (
      <Content className={styles.dialogContentWithNote}>
        <Title
          className={styles.dialogTitle}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: item.label }}
        />
        <div className={styles.tabWrapper}>
          <DialogTabs item={item} />
        </div>
        <div className={styles.noteWrapper}>
          <DialogNote
            maxLength={item.dialog.maxWordCount ?? 160}
            id={item.id}
            setUserDataCopy={setUserDataCopy}
          />
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
