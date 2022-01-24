export enum ButtonIconState {
  Empty,
  Edit,
  Notes,
  Completed,
}

export const getButtonIconState = (
  completed: boolean,
  notes: string,
): ButtonIconState => {
  let tempState;
  if (completed) tempState = ButtonIconState.Completed;
  else if (notes.length !== 0) tempState = ButtonIconState.Notes;
  else tempState = ButtonIconState.Empty;
  return tempState;
};

export const mouseHover = (
  buttonState: ButtonIconState,
  state: ButtonIconState,
  setButtonState: (value: ButtonIconState) => void,
): void => {
  switch (buttonState) {
    case ButtonIconState.Empty:
    case ButtonIconState.Edit:
      setButtonState(state);
      break;
  }
};
