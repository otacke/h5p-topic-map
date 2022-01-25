import { DialogData } from "../types/DialogData";
import { Link } from "../types/Link";
import { UserData } from "../types/UserData";

/**
 * Read the stored data from local storage based on the current environemnt and dialog's id.
 * Return a UserData object with correct types and a function to update it.
 *
 * @param key An id for the current environment (topic map client)
 * @param dialogId Unique identificator of the element (dialog)
 * @returns {[UserData, void]}
 */
export const useLocalStorage = (
  key: "h5p-topic-map-userdata",
  dialogId: string,
): [
  currentLocalStorage: UserData,
  setStorageValue: (updatedStorageValue: UserData) => void,
] => {
  // cast contents of parsed string to correct types
  const currentLocalStorage = JSON.parse(
    localStorage.getItem(key) ?? "{}",
  ) as UserData;

  if (!(dialogId in currentLocalStorage)) {
    currentLocalStorage[dialogId] = {};
  } else {
    currentLocalStorage[dialogId] = currentLocalStorage[dialogId] as DialogData;

    if ("links" in currentLocalStorage) {
      currentLocalStorage.dialogId.links = currentLocalStorage.dialogId
        .links as Array<Link>;
    }
  }

  const setStorageValue = (updatedStorageValue: UserData): void => {
    localStorage.setItem(key, JSON.stringify(updatedStorageValue));
  };

  return [currentLocalStorage, setStorageValue];
};
