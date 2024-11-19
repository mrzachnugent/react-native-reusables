import { PixelRatio } from 'react-native';
import { rem } from './rem';

/**
 * Commented values are based on the default unit scale of 14dp.
 */
const ROUNDED = {
  /**
   * none: 0dp
   */
  none: 0,
  /**
   * sm: 1.75dp
   */
  sm: rem(0.125),
  /**
   * base: 3.5dp
   */
  base: rem(0.25),
  /**
   * md: 5.25dp
   */
  md: rem(0.375),
  /**
   * lg: 7dp
   */
  lg: rem(0.5),
  /**
   * xl: 10.5dp
   */
  xl: rem(0.75),
  /**
   * 2xl: 14dp
   */
  '2xl': rem(1),
  /**
   * 3xl: 21dp
   */
  '3xl': rem(1.5),
  /**
   * full : 9999dp
   */
  full: 9999,
};

export function createRounded(fontScale: number) {
  return (key: keyof typeof ROUNDED) => {
    return PixelRatio.roundToNearestPixel(ROUNDED[key] * fontScale);
  };
}
