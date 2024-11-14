import { PixelRatio, StyleSheet } from 'react-native';
import { getBaseUnitScale } from './base-unit';

function getSpaceScale(value: number) {
  return getBaseUnitScale(value) * 0.25;
}

/**
 * JsDoc values are based on the default unit scale of 14dp.
 */
const space = {
  /**
   * hairline: Hairline width
   */
  hairline: StyleSheet.hairlineWidth,

  /**
   * 0: 0dp
   */
  0: getSpaceScale(0),

  /**
   * 0.5: 1.75dp
   */
  0.5: getSpaceScale(0.5),

  /**
   * 1: 3.5dp
   */
  1: getSpaceScale(1),

  /**
   * 1.5: 5.25dp
   */
  1.5: getSpaceScale(1.5),

  /**
   * 2: 7dp
   */
  2: getSpaceScale(2),

  /**
   * 2.5: 8.75dp
   */
  2.5: getSpaceScale(2.5),

  /**
   * 3: 10.5dp
   */
  3: getSpaceScale(3),

  /**
   * 3.5: 12.25dp
   */
  3.5: getSpaceScale(3.5),

  /**
   * 4: 14dp
   */
  4: getSpaceScale(4),

  /**
   * 5: 17.5dp
   */
  5: getSpaceScale(5),

  /**
   * 6: 21dp
   */
  6: getSpaceScale(6),

  /**
   * 7: 24.5dp
   */
  7: getSpaceScale(7),

  /**
   * 8: 28dp
   */
  8: getSpaceScale(8),

  /**
   * 9: 31.5dp
   */
  9: getSpaceScale(9),

  /**
   * 10: 35dp
   */
  10: getSpaceScale(10),

  /**
   * 11: 38.5dp
   */
  11: getSpaceScale(11),

  /**
   * 12: 42dp
   */
  12: getSpaceScale(12),

  /**
   * 14: 49dp
   */
  14: getSpaceScale(14),

  /**
   * 16: 56dp
   */
  16: getSpaceScale(16),

  /**
   * 20: 70dp
   */
  20: getSpaceScale(20),

  /**
   * 24: 84dp
   */
  24: getSpaceScale(24),

  /**
   * 28: 98dp
   */
  28: getSpaceScale(28),

  /**
   * 32: 112dp
   */
  32: getSpaceScale(32),

  /**
   * 36: 126dp
   */
  36: getSpaceScale(36),

  /**
   * 40: 140dp
   */
  40: getSpaceScale(40),

  /**
   * 44: 154dp
   */
  44: getSpaceScale(44),

  /**
   * 48: 168dp
   */
  48: getSpaceScale(48),

  /**
   * 52: 182dp
   */
  52: getSpaceScale(52),

  /**
   * 56: 196dp
   */
  56: getSpaceScale(56),

  /**
   * 60: 210dp
   */
  60: getSpaceScale(60),

  /**
   * 64: 224dp
   */
  64: getSpaceScale(64),

  /**
   * 72: 252dp
   */
  72: getSpaceScale(72),

  /**
   * 80: 280dp
   */
  80: getSpaceScale(80),

  /**
   * 96: 336dp
   */
  96: getSpaceScale(96),
};

type SpaceOptions = keyof typeof space;

export function getSpaces(fontScale: number) {
  const adjustedSpace = {} as typeof space;

  for (const key in space) {
    adjustedSpace[key as SpaceOptions] = PixelRatio.roundToNearestPixel(
      space[key as SpaceOptions] * fontScale
    );
  }

  return adjustedSpace;
}
