import type { EventDispatcher } from "h5p-types";
import { ContentUserData } from "../types/ContentUserData";
import { UserData } from "../types/UserData";
import { sendXAPIEvent } from "./x-api.utils";

const getUserData = (): UserData => {
  return JSON.parse(localStorage.getItem("h5p-topic-map-userdata") ?? "{}");
};

const setUserData = (userData: UserData): void => {
  localStorage.setItem("h5p-topic-map-userdata", JSON.stringify(userData));
};

export const getContentUserData = (contentId: string): ContentUserData => {
  const storedUserData = getUserData();

  if (!(contentId in storedUserData)) {
    storedUserData[contentId] = {
      dialogs: {},
    };
  }

  return storedUserData[contentId];
};

export const setContentUserData = (
  contentId: string,
  updatedUserData: ContentUserData,
): void => {
  const userData: UserData = {
    ...getUserData(),
    [contentId]: updatedUserData,
  };

  setUserData(userData);
};

export const exportAllUserData = (
  contentId: string,
  h5pInstance: EventDispatcher,
): void => {
  const contentUserData = getContentUserData(contentId);
  sendXAPIEvent(
    "completed",
    { type: "ALL_USER_DATA", ...contentUserData },
    h5pInstance,
    contentId,
  );
};
