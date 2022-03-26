import * as React from "react";
import { FC } from "react";
import { NoteButtonIconState } from "../../types/NoteButtonIconState";
import { Position } from "../../types/Position";
import { NoteButton } from "../NoteButton/NoteButton";

export type ArrowNoteButtonProps = {
  buttonState: NoteButtonIconState;
  position: Position;
};

export const ArrowNoteButton: FC<ArrowNoteButtonProps> = ({
  buttonState,
  position,
}) => {
  const buttonElement = React.useRef<HTMLDivElement>(null);

  const [offsetX, setOffsetX] = React.useState(0);
  const [offsetY, setOffsetY] = React.useState(0);

  React.useEffect(() => {
    if (buttonElement.current) {
      setOffsetX(buttonElement.current.clientWidth / 2);
      setOffsetY(buttonElement.current.clientHeight / 2);
    }
  }, [buttonElement.current]);

  return (
    <div
      style={{
        position: "absolute",
        top: position.y - offsetY,
        left: position.x - offsetX,
      }}
    >
      {buttonState !== NoteButtonIconState.None && (
        <div ref={buttonElement}>
          <NoteButton
            backgroundColor="var(--theme-color-3)"
            borderColor="white"
            iconColor="white"
            buttonState={buttonState}
          />
        </div>
      )}
    </div>
  );
};
