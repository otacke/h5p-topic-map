import * as React from "react";
import styles from "./DialogResources.module.scss";

export type DialogResourceProps = {
  relevantLinks: string[];
  customLinks: string[];
};

export const DialogResources: React.FC<DialogResourceProps> = ({
  relevantLinks,
  customLinks,
}) => {
  const relevantItems = relevantLinks.map((link: string) => (
    <li key={link} className={styles.li}>
      <a href={link}>{link}</a>
    </li>
  ));

  const customItems = customLinks.map((link: string) => (
    <li key={link} className={styles.li}>
      <a href={link}>{link}</a>
    </li>
  ));

  return (
    <div>
      <p> Relevante lenker: </p>
      <ul>{relevantItems}</ul>
      <p> Dine lenker: </p>
      <ul>{customItems}</ul>

      <div>
        <input className={styles.input} placeholder="www.nyresurss.no" />
        <input className={styles.inputButton} type="button" value="Legg til" />
      </div>
    </div>
  );
};
