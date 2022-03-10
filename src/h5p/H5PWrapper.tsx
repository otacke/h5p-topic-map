import * as React from "react";
import * as ReactDOM from "react-dom";
import { IH5PWrapper } from "../../H5P";
import { App } from "../components/App/App";
import { ContentIdContext } from "../contexts/ContentIdContext";
import { H5PContext } from "../contexts/H5PContext";
import { LocalizationContext } from "../contexts/LocalizationContext";
import { H5PExtras } from "../types/H5P/H5PExtras";
import { Params } from "../types/H5P/Params";
import { Translations } from "../types/Translations";
import { getEmptyParams } from "../utils/semantics.utils";
import {
  H5P,
  normalizeGridBackgroundImagePath,
  normalizeSizes,
  normalizeTopicMapItemPaths,
  normalizeArrowItemPaths,
  normalizeDialogAudioPaths,
  normalizeArrowDialogAudioPaths,
} from "./H5P.util";

export class H5PWrapper extends H5P.EventDispatcher implements IH5PWrapper {
  private wrapper: HTMLElement;

  constructor(params: Params, contentId: string, extras?: H5PExtras) {
    super();

    this.wrapper = H5PWrapper.createWrapperElement();

    let paramsWithFallbacks: Required<Params> = {
      ...getEmptyParams(),
      ...params,
    };

    paramsWithFallbacks = normalizeTopicMapItemPaths(
      paramsWithFallbacks,
      contentId,
    );

    paramsWithFallbacks = normalizeArrowItemPaths(
      paramsWithFallbacks,
      contentId,
    );

    paramsWithFallbacks = normalizeGridBackgroundImagePath(
      paramsWithFallbacks,
      contentId,
    );

    paramsWithFallbacks = normalizeDialogAudioPaths(
      paramsWithFallbacks,
      contentId,
    );

    paramsWithFallbacks = normalizeArrowDialogAudioPaths(
      paramsWithFallbacks,
      contentId,
    );

    paramsWithFallbacks = normalizeSizes(paramsWithFallbacks);

    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const l10n = params.l10n ?? ({} as Translations);
    const title = extras?.metadata.title;

    ReactDOM.render(
      <ContentIdContext.Provider value={contentId}>
        <LocalizationContext.Provider value={l10n}>
          <H5PContext.Provider value={this}>
            <App params={paramsWithFallbacks} title={title} />
          </H5PContext.Provider>
        </LocalizationContext.Provider>
      </ContentIdContext.Provider>,
      this.wrapper,
    );
  }

  attach($container: JQuery<HTMLElement>): void {
    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error(
        "Found no containing element to attach `h5p-topic-map` to.",
      );
      return;
    }

    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-topic-map");
  }

  private static createWrapperElement(): HTMLDivElement {
    return document.createElement("div");
  }
}
