import * as React from "react";
import { Image } from "../../../types/H5P/Image";
import styles from "./DialogText.module.scss";

export type DialogTextProps = {
  topicImage: Image | undefined;
  introduction: string | undefined;
  bodyText: string | undefined;
};

export const DialogText: React.FC<DialogTextProps> = ({
  topicImage,
  introduction,
  bodyText,
}) => {
  // TODO: Translate
  const copyrightTitle = "Photo";

  const copyright = topicImage?.copyright;
  const renderCopyright = copyright
    ? `${copyrightTitle}: ${copyright.title} / ${copyright.author}`
    : null;

  return (
    <div className={styles.dialogText}>
      {topicImage ? (
        <>
          <img
            className={styles.topicImage}
            src={topicImage.path}
            alt={topicImage.alt ?? ""}
          />
          {copyright ? (
            <div className={styles.copyright}>{renderCopyright}</div>
          ) : null}
        </>
      ) : null}

      {introduction ? (
        <p className={styles.introduction}>{introduction}</p>
      ) : null}

      {bodyText ? <p className={styles.bodyText}>{bodyText}</p> : null}
    </div>
  );
};
