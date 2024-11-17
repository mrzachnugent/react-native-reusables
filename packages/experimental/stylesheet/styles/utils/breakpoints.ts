export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const BREAKPOINT_KEYS = Object.keys(BREAKPOINTS) as (keyof typeof BREAKPOINTS)[];

export function getCurrentBreakpoint(width: number) {
  return BREAKPOINT_KEYS.find((key) => width >= BREAKPOINTS[key]) ?? BREAKPOINT_KEYS[0];
}
