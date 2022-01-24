import { v4 as uuidV4 } from "uuid";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as React from "react";
import styles from "./DialogResources.module.scss";
import { useLocalStorage } from "../../../h5p/H5P.util";
import { Link } from "../../../types/Link";

export type DialogResourceProps = {
  relevantLinks: string[];
  id: string;
};

export const DialogResources: React.FC<DialogResourceProps> = ({
  relevantLinks,
  id,
}) => {
  /* UserData: {
    id1: {links: [],
          note: ""}
  }
  
  two types - useLocalStorage -> (h5p-topic-map-userdata - key for the UserData object) 
  DialogData (links: [...], note: "...") and UserData ([key: string]: DialogData)
  */

  const [currentLocalStorage, setCurrentLocalStorage] = useLocalStorage(
    "h5p-topic-map-userdata",
    id,
  );

  const removeCustomLink = (linkToRemove: string): void => {
    currentLocalStorage[id].links = currentLocalStorage[id].links?.filter(
      (item: Link) => item.id !== linkToRemove,
    );

    setCurrentLocalStorage(currentLocalStorage);

    // we can disable this check since this function will not be called before the page is rendered
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setCustomItems(
      currentLocalStorage[id].links?.map((item: Link) => (
        <li key={item.id} className={styles.li}>
          <a href={item.url}>{item.url}</a>
          <button
            className={styles.closeButton}
            type="button"
            onClick={() => removeCustomLink(item.id)}
          >
            <Cross2Icon />
          </button>
        </li>
      )),
    );
  };

  const [customItems, setCustomItems] = React.useState(() =>
    currentLocalStorage[id].links?.map((item: Link) => (
      <li key={item.id} className={styles.li}>
        <a href={item.url}>{item.url}</a>
        <button
          className={styles.closeButton}
          type="button"
          onClick={() => removeCustomLink(item.id)}
        >
          <Cross2Icon />
        </button>
      </li>
    )),
  );

  const relevantItems = relevantLinks.map((link: string) => (
    <li key={link} className={styles.li}>
      <a href={link}>{link}</a>
    </li>
  ));

  const [link, setLink] = React.useState("");
  const inputFieldRef = React.useRef<HTMLInputElement>(null);

  const saveCustomLink = (newLink: string): void => {
    const tempNewLink = { id: uuidV4(), url: newLink } as Link;
    if (!("links" in currentLocalStorage[id])) {
      currentLocalStorage[id].links = [];
    }
    currentLocalStorage[id].links?.push(tempNewLink);

    setCurrentLocalStorage(currentLocalStorage);
    setCustomItems(
      currentLocalStorage[id].links?.map((item: Link) => (
        <li key={item.id} className={styles.li}>
          <a href={item.url}>{item.url}</a>
          <button
            className={styles.closeButton}
            type="button"
            onClick={() => removeCustomLink(item.id)}
          >
            <Cross2Icon />
          </button>
        </li>
      )),
    );
  };

  const updateCustomList = (): void => {
    if (link.length < 3) {
      return;
    }

    saveCustomLink(link);
    setLink("");

    if (inputFieldRef.current != null) {
      inputFieldRef.current.value = "";
    }
  };

  const relevantLinkLabel = "Relevante lenker";
  const customLinkLabel = "Dine lenker";
  const addLinkLabel = "Legg til";

  // map the list of links here instead of using custom items above
  // or use useMemo
  return (
    <form>
      <p> {relevantLinkLabel}: </p>
      <ul>{relevantItems}</ul>
      <p> {customLinkLabel}: </p>
      <ul>{customItems}</ul>
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
