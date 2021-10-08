import * as React from "react";
import { DialogWindowProps } from "./DialogWindow";
import styles from "./DialogWindow.module.scss";

export type DialogTestWrapperProps = {
  modal: JSX.Element;
};

export const DialogTestWrapper: React.FC<DialogTestWrapperProps> = (
  props,
): JSX.Element => {
  const [show, setShow] = React.useState(false);
  const handleOpen = (): void => setShow(true);
  const handleClose = (): void => setShow(false);

  const renderModal = (): JSX.Element => {
    // eslint-disable-next-line no-console
    console.log(show);
    if (show) return props.modal;
    return <></>;
  };

  return (
    <>
      <button type="button" onClick={handleOpen}>
        Test DialogWindow
      </button>
      {renderModal()}
    </>
  );
};
