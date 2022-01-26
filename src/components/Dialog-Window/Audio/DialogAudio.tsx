/* eslint-disable jsx-a11y/media-has-caption */
import * as React from "react";
import { Audio } from "../../../types/h5p/Audio";
import { formatCopyright } from "../../../utils/dialog.utils";
import styles from "./DialogAudio.module.scss";

export type DialogAudioProps = {
  audioTrack: Audio;
  subtext?: string;
};

export const DialogAudio: React.FC<DialogAudioProps> = ({
  audioTrack,
  subtext,
}) => {
  // TODO: Translate
  const copyrightTitle = "Audio";

  return (
    <>
      <audio className={styles.audioPlayer} src={audioTrack.path} controls />

      {audioTrack.copyright ? (
        <p className={styles.copyright}>
          {formatCopyright(copyrightTitle, audioTrack.copyright)}
        </p>
      ) : null}

      {subtext ? (
        <div
          className={styles.subtext}
          dangerouslySetInnerHTML={{ __html: subtext }}
        />
      ) : null}
    </>
  );
};
