/* eslint-disable @typescript-eslint/no-explicit-any */

import { H5PWrapper } from "./src/h5p/H5PWrapper";

export interface H5PObject {
  jQuery: typeof JQuery;
  EventDispatcher: typeof EventDispatcher;
  TopicMap: typeof H5PWrapper;
  getPath: (path: string, contentId: string) => string;
  newRunnable: (
    library: { library: string; params: unknown },
    contentId: string,
    $attachTo: JQuery,
    skipResize?: boolean,
    extras?: unknown,
  ) => void;
}

export interface XApiExtraObject {
  markedAsCompleted?: boolean;
  note?: string;
  itemId: string;
  contentId: string;
}

declare class EventDispatcher {
  /**
   * Add new event listener.
   *
   * @throws {TypeError}
   *   listener must be a function
   * @param {string} type
   *   Event type
   * @param {H5P.EventCallback} listener
   *   Event listener
   * @param {Object} [thisArg]
   *   Optionally specify the this value when calling listener.
   */
  on: (type: string, listener: any, thisArg?: any) => void;

  /**
   * Add new event listener that will be fired only once.
   *
   * @throws {TypeError}
   *   listener must be a function
   * @param {string} type
   *   Event type
   * @param {H5P.EventCallback} listener
   *   Event listener
   * @param {Object} thisArg
   *   Optionally specify the this value when calling listener.
   */
  once: (type: string, listener: any, thisArg: any) => void;

  /**
   * Remove event listener.
   * If no listener is specified, all listeners will be removed.
   *
   * @throws {TypeError}
   *   listener must be a function
   * @param {string} type
   *   Event type
   * @param {H5P.EventCallback} listener
   *   Event listener
   */
  off: (type: string, listener: any) => void;

  /**
   * Dispatch event.
   *
   * @param {string|H5P.Event} event
   *   Event object or event type as string
   * @param {*} [eventData]
   *   Custom event data(used when event type as string is used as first
   *   argument).
   * @param {Object} [extras]
   * @param {boolean} [extras.bubbles]
   * @param {boolean} [extras.external]
   */
  trigger: (
    event: string | any,
    eventData?: any,
    extras?: {
      bubbles?: boolean;
      external?: boolean;
    },
  ) => void;

  /**
   * Dispatch event for Xapi
   *
   * @param {"completed"|"answered"} verb
   *   "completed": when user have marked/unmarked a note as completed.
   *   "answered": when user are typing in a note and it has been saved in user's local storage.
   * @param {XApiExtraObject} extra
   * Following information must be provided:
   *   - When verb "completed" is used: topicMapId, itemId, completed, note.
   *   - When verb "answered" is used: topicMapId, itemId, note.
   */
  triggerXAPI: (verb: "completed" | "answered", extra: XApiExtraObject) => void;
}

declare interface IH5PWrapper {
  attach($wrapper: JQuery<HTMLElement>): void;
}

declare interface IH5PEditorWrapper {
  appendTo($wrapper: JQuery<HTMLElement>): void;
  validate(): boolean;
  remove(): void;
}
