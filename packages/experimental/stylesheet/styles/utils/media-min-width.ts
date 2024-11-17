import { BREAKPOINT_KEYS, BREAKPOINTS } from './breakpoints';

export function getMediaMinWidth(breakpoint: keyof typeof BREAKPOINTS) {
  const mediaMinWidth = {} as Record<keyof typeof BREAKPOINTS, boolean>;

  for (const key of BREAKPOINT_KEYS) {
    const currentIndex = BREAKPOINT_KEYS.indexOf(breakpoint);
    const targetIndex = BREAKPOINT_KEYS.indexOf(key);
    if (currentIndex === -1) {
      throw new Error(`Invalid current breakpoint: ${breakpoint}`);
    }
    if (targetIndex === -1) {
      throw new Error(`Invalid target breakpoint: ${key}`);
    }
    mediaMinWidth[key] = currentIndex >= targetIndex;
  }
  return mediaMinWidth;
}
