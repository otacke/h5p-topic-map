import { ContentUserData } from "../types/ContentUserData";
import {
  getContentUserData,
  setContentUserData,
} from "../utils/user-data.utils";

/**
 * Read the stored data from local storage based on the current default storage key.
 * Return a UserData object with correct types and a function to update it.
 *
 * @param contentId The id of the current topic map
 */
export const useLocalStorage = (
  contentId: string,
): [
  userData: ContentUserData,
  setUserData: (updatedUserData: ContentUserData) => void,
] => {
  const userData = getContentUserData(contentId);

  if (!("dialogs" in userData)) {
    userData.dialogs = {};
  }

  return [
    userData,
    newData => {
      setContentUserData(contentId, newData);
    },
  ];
};
