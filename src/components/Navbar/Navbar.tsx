import * as React from "react";
import { Trigger, Content, Tabs, TabsList } from "@radix-ui/react-tabs";
import styles from "./Navbar.module.scss";
import { useL10n } from "../../hooks/useLocalization";
import { TranslationKey } from "../../types/TranslationKey";

export type NavbarProps = {
  navbarTitle: string;
  navbarContent: {
    title: TranslationKey | string;
    content: JSX.Element;
    ariaLabel: TranslationKey | string;
  }[];
};

export const Navbar: React.FC<NavbarProps> = ({
  navbarContent,
  navbarTitle,
}) => {
  const navbarAriaLabel = useL10n("navbarTabsListAriaLabel");
  // TODO need to add translations to titles and aria labels of each tab

  return (
    <div className={styles.mainBody}>
      <button className={styles.navbarTitle} type="button">
        {navbarTitle}
      </button>
      <Tabs className={styles.root} defaultValue={navbarContent[0].title}>
        <TabsList className={styles.sectionsMenu} aria-label={navbarAriaLabel}>
          {navbarContent.map(section => (
            <Trigger
              className={styles.sectionTitle}
              key={section.title}
              value={section.title}
              aria-label={section.ariaLabel}
            >
              {section.title}
            </Trigger>
          ))}
        </TabsList>
        {navbarContent.map(section => (
          <Content
            className={styles.sectionContent}
            key={section.title}
            value={section.title}
          >
            {section.content}
          </Content>
        ))}
      </Tabs>
    </div>
  );
};
