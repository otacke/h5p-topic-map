/* eslint-disable jsx-a11y/media-has-caption */
import * as React from "react";
import styles from "./DialogAudio.module.scss";

export type AudioProps = {
  audioTrack: { path: string };
  description: string;
  subText: JSX.Element;
};

export const Audio: React.FC<AudioProps> = ({
  audioTrack,
  description,
  subText,
}) => {
  return (
    <div>
      <audio src={audioTrack.path} controls />
      <p className={styles.description}>{description}</p>
      <>{subText}</>
    </div>
  );
};
