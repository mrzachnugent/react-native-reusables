import { PixelRatio } from 'react-native';
import { rem } from './rem';

/**
 * Commented values are based on the default unit scale of 14dp.
 */
const TRACKING = {
  /**
   * tighter: -0.7dp
   */
  tighter: -rem(0.05),

  /**
   * tight: -0.35dp
   */
  tight: -rem(0.025),

  /**
   * normal: 0dp
   */
  normal: 0,

  /**
   * wide: 0.35dp
   */
  wide: rem(0.025),

  /**
   * wider: 0.7dp
   */
  wider: rem(0.05),

  /**
   * widest: 1.4dp
   */
  widest: rem(0.1),
};

export function createTracking(fontScale: number) {
  return (key: keyof typeof TRACKING) => {
    return PixelRatio.roundToNearestPixel(TRACKING[key] * fontScale);
  };
}
