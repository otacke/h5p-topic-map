import * as React from "react";
import { TopicMapItemType } from "../../types/TopicMapItemType";
import { wrapInAnchor } from "../../utils/element.utils";
import { DialogWindow } from "../Dialog-Window/DialogWindow";
import styles from "./TopicMapItem.module.scss";

export type TopicMapItemProps = {
  item: TopicMapItemType;
};

export const TopicMapItem: React.FC<TopicMapItemProps> = ({ item }) => {
  const [isDialogShown, setIsDialogShown] = React.useState(false);

  const itemHasDirectLink = item.dialogOrDirectLink === "directLink";

  const renderedItem = (
    <>
      <button
        type="button"
        className={styles.topicMapItem}
        onClick={itemHasDirectLink ? undefined : () => setIsDialogShown(true)}
      >
        {item.topicImage?.path && (
          <img
            className={styles.bgImage}
            src={item.topicImage.path}
            alt={item.topicImage.alt ?? ""}
          />
        )}
        <div className={styles.title}>{item.label}</div>
      </button>
      {itemHasDirectLink ? null : (
        <DialogWindow
          title={item.label}
          notes={item.dialog?.text}
          open={isDialogShown}
          onOpenChange={setIsDialogShown}
        />
      )}
    </>
  );

  return itemHasDirectLink
    ? wrapInAnchor(renderedItem, item.directLink ?? "#")
    : renderedItem;
};
