import { Close, Content, Overlay, Root, Title } from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as React from "react";
import { FC } from "react";
import { useMedia } from "react-use";
import { useL10n } from "../../hooks/useLocalization";
import { CommonItemType } from "../../types/CommonItemType";
import { UserData } from "../../types/UserData";
import styles from "./DialogWindow.module.scss";
import { DialogNote } from "./Notes/DialogNote";
import { DialogTabs } from "./Tabs/DialogTabs";

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
  setStorageData: React.Dispatch<React.SetStateAction<UserData>>;
  storageData: UserData;
};

export const DialogWindow: FC<DialogWindowProps> = ({
  item,
  open,
  onOpenChange,
  confirmWindow,
  children,
  setStorageData,
  storageData,
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

  const noTabItems =
    !item.description &&
    !item.topicImage &&
    !item.dialog.audio?.audioFile &&
    (!item.dialog.links ||
      item.dialog.links?.filter(link => Boolean(link.url)).length === 0) &&
    !item.dialog.showAddLinks &&
    !item.dialog.text &&
    !item.dialog.video;

  const hasNote = item.dialog?.hasNote;

  let content = smallScreen ? (
    <Content className={styles.dialogContentSmallScreen}>
      <Title className={styles.dialogTitle}>{item.label}</Title>
      {!noTabItems && (
        <DialogTabs
          item={item}
          storageData={storageData}
          setStorageData={setStorageData}
        />
      )}
      {noTabItems && hasNote && (
        <div className={`${styles.noteWrapper} ${styles.fullWidth}`}>
          <DialogNote
            maxLength={item.dialog.maxWordCount ?? 160}
            id={item.id}
            setStorageData={setStorageData}
            storageData={storageData}
          />
        </div>
      )}
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
      {!noTabItems && (
        <DialogTabs
          item={item}
          storageData={storageData}
          setStorageData={setStorageData}
        />
      )}
      <Close className={styles.closeButton} aria-label={ariaLabel}>
        <Cross2Icon />
      </Close>
    </Content>
  );

  if (hasNote && !smallScreen) {
    content = (
      <Content
        className={noTabItems ? styles.dialogContent : styles.dialogContentWide}
      >
        <Title
          className={styles.dialogTitle}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: item.label }}
        />
        {!noTabItems && (
          <div className={styles.tabWrapper}>
            <DialogTabs
              item={item}
              storageData={storageData}
              setStorageData={setStorageData}
            />
          </div>
        )}
        <div
          className={`${styles.noteWrapper} ${
            noTabItems ? styles.fullWidth : ""
          }`}
        >
          <DialogNote
            maxLength={item.dialog.maxWordCount ?? 160}
            id={item.id}
            setStorageData={setStorageData}
            storageData={storageData}
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
