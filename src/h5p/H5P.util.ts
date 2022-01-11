import { H5PObject } from "../../H5P";
import { TopicMapItemType } from "../types/TopicMapItemType";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const H5P = (window as any).H5P as H5PObject;

/**
 * Replace relative paths to image(s) in Topic Map Item(s) with absolute paths
 *
 * @param items An array with Topic Map Items being used in the current H5P
 * @param contentId Content id of the H5P being shown
 * @returns {void}
 */
export const makeBackgroundImagePathsAbsolute = (
  items: Array<TopicMapItemType> | undefined,
  contentId: string,
): Array<TopicMapItemType> | undefined => {
  if (!items) return undefined;

  return items.map(item => {
    if (!item.backgroundImage) return item;

    const pathAlreadyAbsolute =
      item.backgroundImage.path.match(/^http(s)?:\/\//);

    return {
      ...item,
      backgroundImage: {
        ...item.backgroundImage,
        path: pathAlreadyAbsolute
          ? item.backgroundImage.path
          : H5P.getPath(item.backgroundImage.path, contentId),
      },
    };
  });
};
