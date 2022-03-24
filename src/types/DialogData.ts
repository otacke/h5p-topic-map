import { Link } from "./Link";

export type DialogData = {
  links?: Array<Required<Link>>;
  note?: string;
  noteDone?: boolean;
};
