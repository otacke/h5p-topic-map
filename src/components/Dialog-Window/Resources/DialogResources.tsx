import * as React from "react";
import styles from "./DialogResources.module.scss";

export type DialogResourceProps = {
  links: string[];
};

export const DialogResources: React.FC<DialogResourceProps> = ({ links }) => {
  return (
    <div>
      <p> Relevante lenker: </p>
        <ul>
          <li className={styles.li}><a href="www.google.com">www.google.com</a></li>
          <li className={styles.li}><a href="www.yahoo.com">www.yahoo.com</a></li>
        </ul>
      <p> Dine lenker: </p>

      <div>
        <input className={styles.input} placeholder="www.nyresurss.no" />
        <input className={styles.inputButton} type="button" value="Legg til" />
      </div>
    </div>
  );
};
