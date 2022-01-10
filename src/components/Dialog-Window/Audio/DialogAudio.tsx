import * as React from "react"
import styles from "./DialogAudio.module.scss"

export type AudioProps = {
    // Should this be more strict?
    audioTrack : unknown;
    description : string;
    text : string;
}

export const Audio: React.FC<AudioProps> = ({audioTrack, description, text}) => {
    return (
        <div>
            <p className={styles.description}>{description}</p>
        </div>
    )
}
