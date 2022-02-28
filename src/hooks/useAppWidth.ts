import { useContext } from "react";
import { AppWidthContext } from "../contexts/AppWidthContext";
import { BreakpointSize } from "../types/BreakpointSize";

const breakpointSize = {
  [BreakpointSize.Large]: 1440,
  [BreakpointSize.Medium]: 1024,
  [BreakpointSize.Small]: 768,
  [BreakpointSize.XSmall]: 0,
};

export const useAppWidth = (): BreakpointSize => {
  const appWidth = useContext(AppWidthContext);

  const isLarge = appWidth > breakpointSize[BreakpointSize.Large];
  const isMedium = appWidth > breakpointSize[BreakpointSize.Medium];
  const isSmall = appWidth > breakpointSize[BreakpointSize.Small];

  if (isLarge) {
    return BreakpointSize.Large;
  }

  if (isMedium) {
    return BreakpointSize.Medium;
  }

  if (isSmall) {
    return BreakpointSize.Small;
  }

  return BreakpointSize.XSmall;
};
