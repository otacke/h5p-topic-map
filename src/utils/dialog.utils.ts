import { Copyright } from "../types/H5P/Copyright";

export const formatCopyright = (
  copyrightTitle: string,
  { author, title }: Copyright,
): string => {
  const showTitleAuthorDivider = title && author;

  return `${copyrightTitle}: ${title ?? ""} ${
    showTitleAuthorDivider ? "/" : ""
  } ${author}`;
};
