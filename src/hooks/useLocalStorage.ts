import { DialogData } from "../types/DialogData";
import { Link } from "../types/Link";
import { UserData } from "../types/UserData";

/**
 * Read the stored data from local storage based on the current default storage key.
 * Return a UserData object with correct types and a function to update it.
 *
 * @param dialogId Unique identificator of the element (dialog)
 */
export const useLocalStorage = (
  dialogId: string,
): [userData: UserData, setUserData: (updatedUserData: UserData) => void] => {
  // cast contents of parsed string to correct types
  const userData = JSON.parse(
    localStorage.getItem("h5p-topic-map-userdata") ?? "{}",
  ) as UserData;

  if (!(dialogId in userData)) {
    userData[dialogId] = {};
  } else {
    userData[dialogId] = userData[dialogId] as DialogData;

    if ("links" in userData) {
      userData.dialogId.links = userData.dialogId.links as Array<Link>;
    }
  }

  const setUserData = (updatedUserData: UserData): void => {
    localStorage.setItem(
      "h5p-topic-map-userdata",
      JSON.stringify(updatedUserData),
    );
  };

  return [userData, setUserData];
};
