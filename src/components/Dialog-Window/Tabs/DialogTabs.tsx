/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-array-index-key */
import * as React from "react";
import { Root, List, Trigger, Content } from "@radix-ui/react-tabs";
import { useMedia } from "react-use";
import styles from "./DialogTabs.module.scss";
import { DialogContent } from "../../../types/DialogContent";
import { DialogText } from "../Text/DialogText";
import { DialogResources } from "../Resources/DialogResources";
import { DialogVideo } from "../Video/DialogVideo";
import { DialogAudio } from "../Audio/DialogAudio";
import { useL10n } from "../../../hooks/useLocalization";
import { DialogNote } from "../Notes/DialogNote";
import { CommonItemType } from "../../../types/CommonItemType";

export type TabProps = {
  item: CommonItemType;
};

type Translation = {
  audio: string;
  video: string;
  links: string;
  text: string;
};

const defaultTabValue = (tabContents: DialogContent | undefined): string => {
  switch (true) {
    case tabContents?.text !== undefined:
      return "Text";
    case tabContents?.video !== undefined:
      return "Video";
    case tabContents?.audio !== undefined:
      return "Audio";
    case tabContents?.links !== undefined:
      return "Resources";
    default:
      return "";
  }
};

const tabLabelItems = (
  tabContents: DialogContent | undefined,
  translation: Translation,
): JSX.Element[] => {
  const items = [];
  tabContents?.text
    ? items.push(
        <Trigger key="Text" value="Text" className={styles.trigger}>
          {translation.text}
        </Trigger>,
      )
    : null;
  tabContents?.links
    ? items.push(
        <Trigger key="links" className={styles.trigger} value="Resources">
          {translation.links}
        </Trigger>,
      )
    : null;
  tabContents?.video && tabContents.video.path
    ? items.push(
        <Trigger key="video" className={styles.trigger} value="Video">
          {translation.video}
        </Trigger>,
      )
    : null;
  tabContents?.audio && tabContents.audio.file && tabContents.audio.file.path
    ? items.push(
        <Trigger key="audio" className={styles.trigger} value="Audio">
          {translation.audio}
        </Trigger>,
      )
    : null;
  return items;
};

const tabItems = (item: CommonItemType): JSX.Element[] => {
  const { id, description, topicImage, dialog } = item;

  const items: JSX.Element[] = [];
  dialog?.text
    ? items.push(
        <Content key="text" value="Text">
          <DialogText
            topicImage={topicImage}
            introduction={description}
            bodyText={dialog?.text}
          />
        </Content>,
      )
    : null;
  dialog?.links
    ? items.push(
        <Content key="links" value="Resources">
          <DialogResources relevantLinks={dialog.links} id={id} />
        </Content>,
      )
    : null;
  dialog?.video && dialog.video.path
    ? items.push(
        <Content key="video" value="Video">
          <DialogVideo
            video={{
              path: dialog.video.path,
              mime: dialog.video.mime,
              copyright: dialog.video.copyright,
            }}
          />
        </Content>,
      )
    : null;
  dialog?.audio && dialog.audio.file && dialog.audio.file.path
    ? items.push(
        <Content key="audio" value="Audio">
          <DialogAudio
            audioTrack={{
              path: dialog.audio.file.path,
              mime: dialog.audio.file.mime,
              copyright: dialog.audio.file.copyright,
            }}
            subtext={dialog.audio.subtext}
          />
        </Content>,
      )
    : null;
  return items;
};

export const DialogTabs: React.FC<TabProps> = ({ item }) => {
  const translation: Translation = {
    audio: useL10n("copyrightAudio"),
    video: useL10n("copyrightVideo"),
    links: useL10n("dialogResourcesLabel"),
    text: useL10n("dialogTextLabel"),
  };

  const listAriaLabel = useL10n("dialogTabListAriaLabel");
  const noteLabel = useL10n("dialogNoteLabel");
  const smallScreen = useMedia("(max-width: 768px)");

  return (
    <Root
      className={styles.tabs}
      defaultValue={defaultTabValue(item.dialog)}
      orientation="vertical"
    >
      <List className={styles.list} aria-label={listAriaLabel}>
        {tabLabelItems(item.dialog, translation)}
        {smallScreen ? (
          <Trigger key="notes" className={styles.trigger} value="notes">
            {noteLabel}
          </Trigger>
        ) : null}
      </List>
      <div className={styles.tabItemWrapper}>
        {tabItems(item)}
        {smallScreen ? (
          <Content key="notes" value="notes" className={styles.noteWrapper}>
            <DialogNote maxLength={160} id={item.id} />
          </Content>
        ) : null}
      </div>
    </Root>
  );
};
