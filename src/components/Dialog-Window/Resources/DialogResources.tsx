import { Cross2Icon } from "@radix-ui/react-icons";
import * as React from "react";
import styles from "./DialogResources.module.scss";

export type DialogResourceProps = {
  relevantLinks: string[];
  customLinks: string[];
  id: string;
};

export const DialogResources: React.FC<DialogResourceProps> = ({
  relevantLinks,
  customLinks,
  id,
}) => {
  console.info(localStorage);
  const currentLocalStorage = JSON.parse(localStorage.getItem(id) ?? "{}");

  // populate the local storage with custom links for testing
  if (
    !("localCustomLinks" in currentLocalStorage) ||
    !currentLocalStorage.localCustomLinks.length
  ) {
    currentLocalStorage.localCustomLinks = [...customLinks];
  }

  const removeCustomLink = (linkToRemove: string): void => {
    currentLocalStorage.localCustomLinks =
      currentLocalStorage.localCustomLinks.filter(
        (item: string) => item !== linkToRemove,
      );

    localStorage.setItem(id, JSON.stringify(currentLocalStorage));
  };

  const customItems = currentLocalStorage.localCustomLinks.map(
    (link: string) => (
      <li key={link} className={styles.li}>
        <a href={link}>{link}</a>
        <button
          className={styles.closeButton}
          type="button"
          onClick={() => removeCustomLink(link)}
        >
          <Cross2Icon />
        </button>
      </li>
    ),
  );

  const relevantItems = relevantLinks.map((link: string) => (
    <li key={link} className={styles.li}>
      <a href={link}>{link}</a>
    </li>
  ));

  const [cList, setList] = React.useState(customItems);
  const [link, setLink] = React.useState("");
  const inputFieldRef = React.useRef<HTMLInputElement>(null);

  const saveCustomLink = (newLink: string): void => {
    currentLocalStorage.localCustomLinks = [
      ...currentLocalStorage.localCustomLinks,
      newLink,
    ];

    localStorage.setItem(id, JSON.stringify(currentLocalStorage));
  };

  const updateCustomList = (): void => {
    if (link.length < 3) {
      return;
    }

    saveCustomLink(link);

    const newElement = (
      <li key={link} className={styles.li}>
        <a href={link}>{link}</a>
        <button
          className={styles.closeButton}
          type="button"
          onClick={() => removeCustomLink(link)}
        >
          <Cross2Icon />
        </button>
      </li>
    );

    setList((prevState: any) => [...prevState, newElement]);
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
