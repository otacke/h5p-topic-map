import { v4 as uuidV4 } from "uuid";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as React from "react";
import { useEffectOnce } from "react-use";
import styles from "./DialogResources.module.scss";
import { Link } from "../../../types/Link";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

export type DialogResourceProps = {
  relevantLinks: string[];
  id: string;
};

export const DialogResources: React.FC<DialogResourceProps> = ({
  relevantLinks,
  id,
}) => {
  const [userData, setUserData] = useLocalStorage(id);
  const [link, setLink] = React.useState("");
  const [customLinks, setCustomLinks] = React.useState<Array<JSX.Element>>([]);
  const inputFieldRef = React.useRef<HTMLInputElement>(null);

  const removeCustomLink = (linkToRemove: string): void => {
    userData[id].links = userData[id].links?.filter(
      (item: Link) => item.id !== linkToRemove,
    );

    setUserData(userData);
    // we can disable this check since this function will not be called before the page is rendered
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    populateCustomLinks();
  };

  const relevantItems = relevantLinks.map((item: string) => (
    <li key={item} className={styles.li}>
      <a href={item}>{item}</a>
    </li>
  ));

  // extract the generation of custom links list to separate function
  const populateCustomLinks = (): void => {
    if (userData[id].links) {
      setCustomLinks(
        userData[id].links!.map((item: Link) => (
          <li key={item.id} className={styles.li}>
            <a href={item.url}>{item.url}</a>
            <button
              className={styles.removeButton}
              type="button"
              onClick={() => removeCustomLink(item.id)}
            >
              <Cross2Icon />
            </button>
          </li>
        )),
      );
    }
  };

  const saveCustomLink = (newLink: string): void => {
    const tempNewLink: Link = { id: uuidV4(), url: newLink };
    if (!("links" in userData[id])) {
      userData[id].links = [] as Array<Link>;
    }
    userData[id].links!.push(tempNewLink);

    setUserData(userData);
    populateCustomLinks();
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

  // build a list of custom links for the first render
  useEffectOnce(() => {
    populateCustomLinks();
  });

  return (
    <form>
      <p> {relevantLinkLabel}: </p>
      <ul>{relevantItems}</ul>
      <p> {customLinkLabel}: </p>
      <ul>{customLinks}</ul>
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
