import { useLocalStorage } from "react-use";
import { ContentUserData } from "../types/ContentUserData";
import { UserData } from "../types/UserData";
import {
  setContentUserData,
  userDataLocalStorageKey,
} from "../utils/user-data.utils";

/**
 * Read the stored data from local storage based on the current default storage key.
 * Return a UserData object with correct types and a function to update it.
 *
 * @param contentId The id of the current topic map
 */
export const useLocalStorageUserData = (
  contentId: string,
): [ContentUserData, (updatedUserData: ContentUserData) => void] => {
  const [userData, setUserData] = useLocalStorage<UserData>(
    userDataLocalStorageKey,
  );

  if (!userData?.dialogs) {
    setUserData({});
  }

  return [
    userData?.[contentId] ?? { dialogs: {} },
    newData => {
      setUserData(data => ({
        ...data,
        [contentId]: newData,
      }));
    },
  ];
};
