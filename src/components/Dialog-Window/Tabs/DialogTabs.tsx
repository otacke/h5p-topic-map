/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-array-index-key */
import * as React from "react";
import { Root, List, Trigger, Content } from "@radix-ui/react-tabs";
import { useMedia } from "react-use";
import styles from "./DialogTabs.module.scss";
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

const defaultTabValue = (item: CommonItemType): string => {
  const { description, topicImage, dialog } = item;
  switch (true) {
    case dialog?.text !== undefined ||
      topicImage !== undefined ||
      description !== undefined:
      return "Text";
    case dialog?.links !== undefined:
      return "Resources";
    case dialog?.video !== undefined:
      return "Video";
    case dialog?.audio !== undefined:
      return "Audio";
    default:
      return "";
  }
};

const tabLabelItems = (
  item: CommonItemType,
  translation: Translation,
): JSX.Element[] => {
  const { description, topicImage, dialog } = item;
  const items = [];

  const showTextTab = dialog?.text || topicImage || description;
  showTextTab
    ? items.push(
        <Trigger key="Text" value="Text" className={styles.trigger}>
          {translation.text}
        </Trigger>,
      )
    : null;
  dialog?.links
    ? items.push(
        <Trigger key="links" className={styles.trigger} value="Resources">
          {translation.links}
        </Trigger>,
      )
    : null;
  dialog?.video?.[0]?.path
    ? items.push(
        <Trigger key="video" className={styles.trigger} value="Video">
          {translation.video}
        </Trigger>,
      )
    : null;
  dialog?.audio?.audioFile?.[0]?.path
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

  const showTextTab = dialog?.text || topicImage || description;
  showTextTab
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
  dialog?.video?.[0]?.path
    ? items.push(
        <Content key="video" value="Video">
          <DialogVideo sources={dialog.video} />
        </Content>,
      )
    : null;
  dialog?.audio?.audioFile?.[0]?.path
    ? items.push(
        <Content key="audio" value="Audio">
          <DialogAudio
            audioTrack={dialog.audio.audioFile[0]}
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
      defaultValue={defaultTabValue(item)}
      orientation="vertical"
    >
      <List className={styles.list} aria-label={listAriaLabel}>
        {tabLabelItems(item, translation)}
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
            <DialogNote
              maxLength={item.dialog?.maxWordCount ?? 160}
              id={item.id}
              smallScreen
            />
          </Content>
        ) : null}
      </div>
    </Root>
  );
};
