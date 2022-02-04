import * as React from "react";
import { Trigger, Content, Tabs, TabsList } from "@radix-ui/react-tabs";
import styles from "./Navbar.module.scss";
import { useL10n } from "../../hooks/useLocalization";

export type NavbarProps = {
  navbarTitle: string;
};

export const Navbar: React.FC<NavbarProps> = ({ navbarTitle }) => {
  const navbarAriaLabel = useL10n("navbarTabsListAriaLabel");
  const topicMapSectionLabel = useL10n("navbarTopicMapSectionLabel");
  const notesSectionLabel = useL10n("navbarNotesSectionLabel");
  const helpSectionLabel = useL10n("navbarHelpSectionLabel");

  return (
    <div className={styles.mainBody}>
      <button className={styles.navbarTitle} type="button">
        {navbarTitle}
      </button>
      <Tabs defaultValue={topicMapSectionLabel}>
        <TabsList className={styles.sectionsMenu} aria-label={navbarAriaLabel}>
          <Trigger
            className={styles.sectionTitle}
            key={topicMapSectionLabel}
            value={topicMapSectionLabel}
            aria-label={topicMapSectionLabel}
          >
            {topicMapSectionLabel}
          </Trigger>
          <Trigger
            className={styles.sectionTitle}
            key={notesSectionLabel}
            value={notesSectionLabel}
            aria-label={notesSectionLabel}
          >
            {notesSectionLabel}
          </Trigger>
          <Trigger
            className={styles.sectionTitle}
            key={helpSectionLabel}
            value={helpSectionLabel}
            aria-label={helpSectionLabel}
          >
            {helpSectionLabel}
          </Trigger>
          <Trigger
            className={styles.sectionTitle}
            key="▰▰▰▰▱▱▱▱▱▱ 40%"
            value="▰▰▰▰▱▱▱▱▱▱ 40%"
            aria-label="Progress bar"
          >
            ▰▰▰▰▱▱▱▱▱▱ 40%
          </Trigger>
          <Trigger
            className={styles.sectionTitle}
            key="©"
            value="©"
            aria-label="Copyright"
          >
            ©
          </Trigger>
        </TabsList>
        <Content
          className={styles.sectionContent}
          key={topicMapSectionLabel}
          value={topicMapSectionLabel}
        >
          <div />
        </Content>
        <Content
          className={styles.sectionContent}
          key={notesSectionLabel}
          value={notesSectionLabel}
        >
          <h3>Notes section</h3>
        </Content>
        <Content
          className={styles.sectionContent}
          key={helpSectionLabel}
          value={helpSectionLabel}
        >
          <h3>Help section</h3>
        </Content>
        <Content
          className={styles.sectionContent}
          key="▰▰▰▰▱▱▱▱▱▱ 40%"
          value="▰▰▰▰▱▱▱▱▱▱ 40%"
        >
          <h3>Progress bar section</h3>
        </Content>
        <Content className={styles.sectionContent} key="©" value="©">
          <h3>Copyright info</h3>
        </Content>
      </Tabs>
    </div>
  );
};
