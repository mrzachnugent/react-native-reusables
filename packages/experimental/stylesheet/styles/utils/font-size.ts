import { getBaseUnitScale } from './base-unit';

/**
 * JsDoc values are based on the default unit scale of 14dp.
 */
const fontSize = {
  /**
   * xs: 10.5dp
   */
  xs: getBaseUnitScale(0.75),
  /**
   * sm: 12.25dp
   */
  sm: getBaseUnitScale(0.875),
  /**
   * base: 14dp
   */
  base: getBaseUnitScale(1),
  /**
   * lg: 15.75dp
   */
  lg: getBaseUnitScale(1.125),
  /**
   * xl: 17.5dp
   */
  xl: getBaseUnitScale(1.25),
  /**
   * 2xl: 21dp
   */
  '2xl': getBaseUnitScale(1.5),
  /**
   * 3xl: 26.25dp
   */
  '3xl': getBaseUnitScale(1.875),
  /**
   * 4xl: 31.5dp
   */
  '4xl': getBaseUnitScale(2.25),
  /**
   * 5xl: 42dp
   */
  '5xl': getBaseUnitScale(3),
  /**
   * 6xl: 52.5dp
   */
  '6xl': getBaseUnitScale(3.75),
  /**
   * 7xl: 63dp
   */
  '7xl': getBaseUnitScale(4.5),
  /**
   * 8xl: 84dp
   */
  '8xl': getBaseUnitScale(6),
  /**
   * 9xl: 112dp
   */
  '9xl': getBaseUnitScale(8),
};

type FontSizeOptions = keyof typeof fontSize;

export function getFontSizes(fontScale: number) {
  const adjustedFontSize = {} as typeof fontSize;

  for (const key in fontSize) {
    adjustedFontSize[key as FontSizeOptions] = fontSize[key as FontSizeOptions] * fontScale;
  }

  return adjustedFontSize;
}
