/* eslint-disable max-classes-per-file */
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

declare class H5PEvent {
  type: string;

  data: unknown;

  extras?: {
    bubbles?: boolean;
    external?: boolean;
  };

  constructor(
    type: string,
    data: unknown,
    extras?: {
      bubbles?: boolean;
      external?: boolean;
    },
  );

  /**
   * Prevent this event from bubbling up to parent
   */
  preventBubbling(): void;

  /**
   * Get bubbling status
   *
   * @returns
   *   true if bubbling false otherwise
   */
  getBubbles(): boolean;

  /**
   * Try to schedule an event for externalDispatcher
   *
   * @returns
   *   true if external and not already scheduled, otherwise false
   */
  scheduleForExternal(): boolean;
}

declare class XAPIEvent extends H5PEvent {
  type: "xAPI";

  constructor();

  /**
   * Set scored result statements.
   *
   * @param {number} score
   * @param {number} maxScore
   * @param {object} instance
   * @param {boolean} completion
   * @param {boolean} success
   */
  setScoredResult(
    score: number,
    maxScore: number,
    instance: H5PObject,
    completion: number,
    success: number,
  ): void;

  /**
   * Set a verb.
   *
   * @param verb
   *   Verb in short form, one of the verbs defined at
   *   {@link https://help.csod.com/help/csod_0/Content/Catalog/xAPI_Package_Support/xAPI_Appendix.htm?TocPath=Learning%7CContent%7CxAPI%7C_____6}
   *
   */
  setVerb(verb: string): void;

  /**
   * Get the statements verb id.
   *
   * @param full
   *   if true the full verb id prefixed by http://adlnet.gov/expapi/verbs/
   *   will be returned
   * @returns
   *   Verb or null if no verb with an id has been defined
   */
  getVerb(full: boolean): string;

  /**
   * Set the object part of the statement.
   *
   * The id is found automatically (the url to the content)
   *
   * @param instance
   *   The H5P instance
   */
  setObject(instance: H5PObject): void;

  /**
   * Set the context part of the statement.
   *
   * @param instance
   *   The H5P instance
   */
  setContext(instance: H5PObject): void;

  /**
   * Set the actor. Email and name will be added automatically.
   */
  setActor(): void;
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
    event: string | H5PEvent,
    eventData?: any,
    extras?: {
      bubbles?: boolean;
      external?: boolean;
    },
  ) => void;

  /**
   * @param verb When the user have marked/unmarked a note as completed
   */
  triggerXAPI: (
    verb: "completed",
    extra: {
      topicMapId: string;
      itemId: string;
      completed: boolean;
      note: string;
    },
  ) => void;

  /**
   * @param verb When the user is typing in a note and it has been saved in user's local storage.
   */
  triggerXAPI: (
    verb: "answered",
    extra: {
      topicMapId: string;
      itemId: string;
      note: string;
    },
  ) => void;

  createXAPIEventTemplate<Verb extends "completed">(
    verb: Verb,
    extra: {
      contentId: string;
      itemId: string;
      completed: boolean;
      note: string;
    },
  ): XAPIEvent;

  createXAPIEventTemplate<Verb extends "answered">(
    verb: Verb,
    extra: {
      contentId: string;
      itemId: string;
      note: string;
    },
  ): XAPIEvent;
}

declare interface IH5PWrapper {
  attach($wrapper: JQuery<HTMLElement>): void;
}

declare interface IH5PEditorWrapper {
  appendTo($wrapper: JQuery<HTMLElement>): void;
  validate(): boolean;
  remove(): void;
}
