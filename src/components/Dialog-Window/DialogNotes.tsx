import { Description } from "@radix-ui/react-dialog";
import * as React from "react";

export type NotesProps = {
  notes: string;
};

export const Notes: React.FC<NotesProps> = notes => {
  return (
    <>
      <form>
        <textarea id="notes" name="notes" rows={4} cols={5}>
          {notes}
        </textarea>
      </form>
    </>
  );
};
