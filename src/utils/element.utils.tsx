import * as React from "react";

export const wrapInAnchor = (
  element: JSX.Element,
  href: string,
): JSX.Element => (
  <a target="_blank" rel="noopener noreferrer" href={href}>
    {element}
  </a>
);
