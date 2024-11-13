import { getBaseUnitScale } from './base-unit';

/**
 * JsDoc values are based on the default unit scale of 14dp.
 */
const rounded = {
  /**
   * none: 0dp
   */
  none: 0,
  /**
   * sm: 1.75dp
   */
  sm: getBaseUnitScale(0.125),
  /**
   * base: 3.5dp
   */
  base: getBaseUnitScale(0.25),
  /**
   * md: 5.25dp
   */
  md: getBaseUnitScale(0.375),
  /**
   * lg: 7dp
   */
  lg: getBaseUnitScale(0.5),
  /**
   * xl: 10.5dp
   */
  xl: getBaseUnitScale(0.75),
  /**
   * 2xl: 14dp
   */
  '2xl': getBaseUnitScale(1),
  /**
   * 3xl: 21dp
   */
  '3xl': getBaseUnitScale(1.5),
  /**
   * full : 9999dp
   */
  full: 9999,
};

type RoundedOptions = keyof typeof rounded;

export function getRounded(fontScale: number) {
  const adjustedRounded = {} as typeof rounded;

  for (const key in rounded) {
    adjustedRounded[key as RoundedOptions] = rounded[key as RoundedOptions] * fontScale;
  }

  return adjustedRounded;
}
