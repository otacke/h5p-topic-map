import * as React from "react";
import { Trigger, Content, Tabs, TabsList } from "@radix-ui/react-tabs";
import styles from "./Navbar.module.scss";
// import { useL10n } from "../../hooks/useLocalization";

export type NavbarProps = {
  navbarTitle: string;
  navbarContent: { title: string; content: JSX.Element; ariaLabel: string }[];
};

export const Navbar: React.FC<NavbarProps> = ({
  navbarContent,
  navbarTitle,
}) => {
  // TODO translate
  const navbarAriaLabel = "Navigation bar with elements to control the content";
  // useL10n();

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
