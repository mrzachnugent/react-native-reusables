const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

const BREAKPOINT_KEYS = Object.keys(BREAKPOINTS) as (keyof typeof BREAKPOINTS)[];

export function getCurrentBreakpoint(width: number) {
  return BREAKPOINT_KEYS.find((key) => width >= BREAKPOINTS[key]) ?? BREAKPOINT_KEYS[0];
}

export function createIsBreakpointUp(currentBreakpoint: keyof typeof BREAKPOINTS) {
  return (breakpoint: keyof typeof BREAKPOINTS) => {
    const currentIndex = BREAKPOINT_KEYS.indexOf(currentBreakpoint);
    const targetIndex = BREAKPOINT_KEYS.indexOf(breakpoint);

    if (currentIndex === -1) {
      throw new Error(`Invalid current breakpoint: ${currentBreakpoint}`);
    }
    if (targetIndex === -1) {
      throw new Error(`Invalid target breakpoint: ${breakpoint}`);
    }

    return currentIndex >= targetIndex;
  };
}
