import { Audio } from "./H5P/Audio";
import { Video } from "./H5P/Video";

export type DialogContent = {
  hasNote: boolean;
  links?: Array<string>;
  text?: string;
  video?: Array<Video>;
  audio?: {
    /**
     * "Optional" because we can't force the user
     * to add a file, therefore there's an off-chance
     * that the value will be nullish
     *  */
    audioFile?: Array<Audio>;
    subtext?: string;
  };
};
