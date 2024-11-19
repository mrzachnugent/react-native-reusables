import { BREAKPOINT_KEYS, BREAKPOINTS } from './breakpoints';

export function createMediaMinWidth(breakpoint: keyof typeof BREAKPOINTS) {
  return (key: keyof typeof BREAKPOINTS) => {
    const currentIndex = BREAKPOINT_KEYS.indexOf(breakpoint);
    const targetIndex = BREAKPOINT_KEYS.indexOf(key);
    if (currentIndex === -1) {
      throw new Error(`Invalid current breakpoint: ${breakpoint}`);
    }
    if (targetIndex === -1) {
      throw new Error(`Invalid target breakpoint: ${key}`);
    }
    return currentIndex >= targetIndex;
  };
}
