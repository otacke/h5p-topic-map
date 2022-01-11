import { H5PObject } from "../../H5P";
import { TopicMapItemType } from "../types/TopicMapItemType";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const H5P = (window as any).H5P as H5PObject;

/**
 * Replace relative paths to content (image, sound and video files) in
 * Topic Map Item(s) with absolute paths
 *
 * @param items An array with Topic Map Items being used in the current H5P
 * @param contentId Content id of the H5P being shown
 * @returns {void}
 */
export const addAbsolutePathToFiles = (
  items: Array<TopicMapItemType> | undefined,
  contentId: string,
): void => {
  if (!items) return;

  items.map(item => {
    if (item.backgroundImage) {
      const updatedItem = { ...item };

      if (updatedItem.backgroundImage) {
        const pathAlreadyAbsolute =
          updatedItem.backgroundImage.path.startsWith("http://") ||
          updatedItem.backgroundImage.path.startsWith("https://");

        updatedItem.backgroundImage.path = pathAlreadyAbsolute
          ? updatedItem.backgroundImage.path
          : H5P.getPath(updatedItem.backgroundImage.path, contentId);
      }

      // if (updatedItem.soundFile) {
      //   ...
      // }

      return updatedItem;
    }

    return item;
  });
};
