import * as React from "react";

export type DialogResourceProps = {
  links: string[];
};

export const DialogResources: React.FC<DialogResourceProps> = ({ links }) => {
  return (
    <div>
      <p> Relevante lenker: </p>
      <p> Dine lenker: </p>
    </div>
  );
};
