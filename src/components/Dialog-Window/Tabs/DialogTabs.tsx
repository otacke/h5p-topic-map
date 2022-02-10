/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-array-index-key */
import * as React from "react";
import { Root, List, Trigger, Content } from "@radix-ui/react-tabs";
import styles from "./DialogTabs.module.scss";
import { DialogContent } from "../../../types/DialogContent";
import { DialogText } from "../Text/DialogText";
import { DialogResources } from "../Resources/DialogResources";
import { DialogVideo } from "../Video/DialogVideo";
import { DialogAudio } from "../Audio/DialogAudio";
import { useL10n } from "../../../hooks/useLocalization";

export type TabProps = {
  tabContents: DialogContent;
  id: string;
};

type Translation = {
  audio: string;
  video: string;
  links: string;
  text: string;
};

const defaultTabValue = (tabContents: DialogContent): string => {
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
  tabContents: DialogContent,
  translation: Translation,
): JSX.Element[] => {
  const items = [];
  tabContents.text
    ? items.push(
        <Trigger value="Text" className={styles.trigger}>
          {translation.text}
        </Trigger>,
      )
    : null;
  tabContents.links
    ? items.push(
        <Trigger key="links" className={styles.trigger} value="Resources">
          {translation.links}
        </Trigger>,
      )
    : null;
  tabContents.video && tabContents.video.path
    ? items.push(
        <Trigger key="video" className={styles.trigger} value="Video">
          {translation.video}
        </Trigger>,
      )
    : null;
  tabContents.audio && tabContents.audio.file && tabContents.audio.file.path
    ? items.push(
        <Trigger key="audio" className={styles.trigger} value="Audio">
          {translation.audio}
        </Trigger>,
      )
    : null;
  return items;
};

const tabItems = (tabContents: DialogContent, id: string): JSX.Element[] => {
  const items: JSX.Element[] = [];
  tabContents.text
    ? items.push(
        <Content key="text" value="Text">
          <DialogText
            topicImage={undefined}
            introduction={undefined}
            bodyText={tabContents.text}
          />
        </Content>,
      )
    : null;
  tabContents.links
    ? items.push(
        <Content key="links" value="Resources">
          <DialogResources relevantLinks={tabContents.links} id={id} />
        </Content>,
      )
    : null;
  tabContents.video && tabContents.video.path
    ? items.push(
        <Content key="video" value="Video">
          <DialogVideo
            video={{
              path: tabContents.video.path,
              mime: tabContents.video.mime,
              copyright: tabContents.video.copyright,
            }}
          />
        </Content>,
      )
    : null;
  tabContents.audio && tabContents.audio.file && tabContents.audio.file.path
    ? items.push(
        <Content key="audio" value="Audio">
          <DialogAudio
            audioTrack={{
              path: tabContents.audio.file.path,
              mime: tabContents.audio.file.mime,
              copyright: tabContents.audio.file.copyright,
            }}
            subtext={tabContents.audio.subtext}
          />
        </Content>,
      )
    : null;
  return items;
};

export const DialogTabs: React.FC<TabProps> = ({ tabContents, id }) => {
  const translation: Translation = {
    audio: useL10n("copyrightAudio"),
    video: useL10n("copyrightVideo"),
    links: useL10n("dialogResourcesLabel"),
    text: useL10n("dialogTextLabel"),
  };

  const listAriaLabel = useL10n("dialogTabListAriaLabel");

  return (
    <Root
      className={styles.tabs}
      defaultValue={defaultTabValue(tabContents)}
      orientation="vertical"
    >
      <List className={styles.list} aria-label={listAriaLabel}>
        {tabLabelItems(tabContents, translation)}
      </List>
      <div className={styles.tabItemWrapper}>{tabItems(tabContents, id)}</div>
    </Root>
  );
};
