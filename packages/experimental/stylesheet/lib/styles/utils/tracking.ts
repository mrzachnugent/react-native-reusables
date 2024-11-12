import { getBaseUnitScale } from './base-unit';

/**
 * JsDoc values are based on the default unit scale of 14dp.
 */
const tracking = {
  /**
   * tighter: -0.7dp
   */
  tighter: -getBaseUnitScale(0.05),

  /**
   * tight: -0.35dp
   */
  tight: -getBaseUnitScale(0.025),

  /**
   * normal: 0dp
   */
  normal: 0,

  /**
   * wide: 0.35dp
   */
  wide: getBaseUnitScale(0.025),

  /**
   * wider: 0.7dp
   */
  wider: getBaseUnitScale(0.05),

  /**
   * widest: 1.4dp
   */
  widest: getBaseUnitScale(0.1),
};

type TrackingOptions = keyof typeof tracking;

export function getTracking(fontScale: number) {
  const adjustedTracking = {} as typeof tracking;

  for (const key in tracking) {
    adjustedTracking[key as TrackingOptions] = tracking[key as TrackingOptions] * fontScale;
  }

  return adjustedTracking;
}
