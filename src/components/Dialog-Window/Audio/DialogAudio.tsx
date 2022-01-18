/* eslint-disable jsx-a11y/media-has-caption */
import * as React from "react";
import styles from "./DialogAudio.module.scss";

export type DialogAudioProps = {
  audioTrack: { path: string };
  description: string;
  subText: JSX.Element;
};

export const DialogAudio: React.FC<DialogAudioProps> = ({
  audioTrack,
  description,
  subText,
}) => {
  return (
    <div>
      <audio className={styles.audioPlayer} src={audioTrack.path} controls />
      <p className={styles.description}>{description}</p>
      <>{subText}</>
    </div>
  );
};
