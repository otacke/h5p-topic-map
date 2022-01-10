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
  const customItems = customLinks.map((link: string) => (
    <li key={link} className={styles.li}>
      <a href={link}>{link}</a>
    </li>
  ));

  const relevantItems = relevantLinks.map((link: string) => (
    <li key={link} className={styles.li}>
      <a href={link}>{link}</a>
    </li>
  ));

  const [cList, setList] = React.useState(customItems);
  const [link, setLink] = React.useState("");
  let inputField: HTMLInputElement | null;

  const updateCustomList = (): void => {
    if (link.length < 3) {
      return;
    }

    const newElement = (
      <li key={link} className={styles.li}>
        <a href={link}>{link}</a>
      </li>
    );

    setList(prevState => [...prevState, newElement]);
    setLink("");
    if (inputField != null) {
      inputField.value = "";
    }
  };

  const updateLink = (linkText: string): void => {
    setLink(linkText);
  };

  return (
    <form>
      <p> Relevante lenker: </p>
      <ul>{relevantItems}</ul>
      <p> Dine lenker: </p>
      <ul>{cList}</ul>
      <div>
        <input
          className={styles.input}
          type="text"
          placeholder="www.nyresurss.no"
          onChange={e => updateLink(e.target.value)}
          ref={input => {
            inputField = input;
          }}
        />
        <button
          className={styles.inputButton}
          type="button"
          onClick={() => updateCustomList()}
        >
          Legg til
        </button>
      </div>
    </form>
  );
};
