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
  const inputFieldRef = React.useRef<HTMLInputElement>(null);

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
    if (inputFieldRef.current != null) {
      inputFieldRef.current.value = "";
    }
  };

  const relevantLinkLabel = "Relevante lenker";
  const customLinkLabel = "Dine lenker";
  const addLinkLabel = "Legg til";

  return (
    <form>
      <p> {relevantLinkLabel}: </p>
      <ul>{relevantItems}</ul>
      <p> {customLinkLabel}: </p>
      <ul>{cList}</ul>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          type="text"
          placeholder="www.example.com"
          onChange={e => setLink(e.target.value)}
          ref={inputFieldRef}
        />
        <button
          className={styles.inputButton}
          type="button"
          onClick={() => updateCustomList()}
        >
          {addLinkLabel}
        </button>
      </div>
    </form>
  );
};
