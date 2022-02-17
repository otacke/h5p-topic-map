import { H5PObject } from "../../H5P";
import { Audio } from "../types/H5P/Audio";
import { Params } from "../types/H5P/Params";
import { TopicMapItemType } from "../types/TopicMapItemType";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const H5P = (window as any).H5P as H5PObject;

export const normalizeAssetPath = (path: string, contentId: string): string => {
  const pathAlreadyAbsolute =
    path.startsWith("http://") || path.startsWith("https://");

  if (pathAlreadyAbsolute) {
    return path;
  }
  return H5P.getPath(path, contentId);
};

/**
 * Replace relative paths to image(s) in Topic Map Item(s) with absolute paths
 *
 * @param items An array with Topic Map Items being used in the current H5P
 * @param contentId Content id of the H5P being shown
 */
export const makeBackgroundImagePathsAbsolute = (
  items: Array<TopicMapItemType> | undefined,
  contentId: string,
): Array<TopicMapItemType> | undefined => {
  if (!items) return undefined;

  return items.map(item => {
    if (!item.topicImage) return item;

    return {
      ...item,
      topicImage: {
        ...item.topicImage,
        path: normalizeAssetPath(item.topicImage.path, contentId),
      },
    };
  });
};

export const normalizeTopicMapItemPaths = <Type extends Params>(
  params: Type,
  contentId: string,
): Type => {
  let topicMapItems: TopicMapItemType[] | undefined;
  if (params.topicMap) {
    topicMapItems = makeBackgroundImagePathsAbsolute(
      params.topicMap.topicMapItems,
      contentId,
    );
  }

  return {
    ...params,
    topicMap: {
      ...(params.topicMap ?? {}),
      topicMapItems,
    },
  };
};

export const normalizeGridBackgroundImagePath = <Type extends Params>(
  params: Type,
  contentId: string,
): Type => {
  if (!params.topicMap?.gridBackgroundImage?.path) {
    return params;
  }

  const path = normalizeAssetPath(
    params.topicMap.gridBackgroundImage.path,
    contentId,
  );

  return {
    ...params,
    topicMap: {
      ...(params.topicMap ?? {}),
      gridBackgroundImage: {
        ...(params.topicMap?.gridBackgroundImage ?? {}),
        path,
      },
    },
  };
};

/**
 * It is in the nature of the grid to create sizes that doesn't
 * necessarily fit. Therefore, this function changes the sizes of
 * elements touching the positive edges to fit a 100*100
 * normalized grid.
 */
export const normalizeSizes = (params: Required<Params>): Required<Params> => {
  const topicMapItems: Array<TopicMapItemType> | undefined =
    params.topicMap?.topicMapItems?.map(item => {
      const tooWide = item.xPercentagePosition + item.widthPercentage > 100;
      const tooTall = item.yPercentagePosition + item.heightPercentage > 100;

      let { widthPercentage, heightPercentage } = item;
      if (tooWide) {
        widthPercentage = 100 - item.xPercentagePosition;
      }

      if (tooTall) {
        heightPercentage = 100 - item.yPercentagePosition;
      }

      return {
        ...item,
        widthPercentage,
        heightPercentage,
      };
    });

  return {
    ...params,
    topicMap: {
      ...(params.topicMap ?? {}),
      topicMapItems,
    },
  };
};

/**
 * Replace relative paths to audio(s) in Dialog(s) with absolute paths
 *
 * @param items An array with Audio Items being used in the current H5P
 * @param contentId Content id of the H5P being shown
 */
export const makeAudioPathsAbsolute = (
  items: Array<Audio> | undefined,
  contentId: string,
): Array<Audio> | undefined => {
  if (!items) return undefined;

  return items.map(item => {
    if (!item.path) return item;

    return {
      ...item,
      path: normalizeAssetPath(item.path, contentId),
    };
  });
};

/**
 * Replace relative paths to image(s) in Topic Map Item(s) with absolute paths
 *
 * @param items An array with Topic Map Items being used in the current H5P
 * @param contentId Content id of the H5P being shown
 */
export const makeDialogAudioPathsAbsolute = (
  items: Array<TopicMapItemType> | undefined,
  contentId: string,
): Array<TopicMapItemType> | undefined => {
  if (!items) return undefined;

  return items.map(item => {
    if (!item.dialog?.audio?.audioFile) return item;

    const audioFile = makeAudioPathsAbsolute(
      item.dialog?.audio.audioFile,
      contentId,
    );

    return {
      ...item,
      dialog: {
        ...item.dialog,
        audio: {
          ...item.dialog.audio,
          audioFile,
        },
      },
    };
  });
};

export const normalizeDialogAudioPaths = <Type extends Params>(
  params: Type,
  contentId: string,
): Type => {
  let topicMapItems: TopicMapItemType[] | undefined;
  if (params.topicMap) {
    topicMapItems = makeDialogAudioPathsAbsolute(
      params.topicMap.topicMapItems,
      contentId,
    );
  }

  return {
    ...params,
    topicMap: {
      ...(params.topicMap ?? {}),
      topicMapItems,
    },
  };
};
