import { PixelRatio } from 'react-native';
import { rem } from './rem';

/**
 * JsDoc values are based on the default unit scale of 14dp.
 */
const FONT_SIZES = {
  /**
   * xs: 10.5dp
   */
  xs: rem(0.75),
  /**
   * sm: 12.25dp
   */
  sm: rem(0.875),
  /**
   * base: 14dp
   */
  base: rem(1),
  /**
   * lg: 15.75dp
   */
  lg: rem(1.125),
  /**
   * xl: 17.5dp
   */
  xl: rem(1.25),
  /**
   * 2xl: 21dp
   */
  '2xl': rem(1.5),
  /**
   * 3xl: 26.25dp
   */
  '3xl': rem(1.875),
  /**
   * 4xl: 31.5dp
   */
  '4xl': rem(2.25),
  /**
   * 5xl: 42dp
   */
  '5xl': rem(3),
  /**
   * 6xl: 52.5dp
   */
  '6xl': rem(3.75),
  /**
   * 7xl: 63dp
   */
  '7xl': rem(4.5),
  /**
   * 8xl: 84dp
   */
  '8xl': rem(6),
  /**
   * 9xl: 112dp
   */
  '9xl': rem(8),
};

export function createFontSize(fontScale: number) {
  return (key: keyof typeof FONT_SIZES) => {
    return PixelRatio.roundToNearestPixel(FONT_SIZES[key] * fontScale);
  };
}
