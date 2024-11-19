const FONT_WEIGHT = {
  /*
   * thin: 100,
   */
  thin: '100',
  /*
   * extralight: 200,
   */
  extralight: '200',
  /*
   * light: 300,
   */
  light: '300',
  /*
   * normal: 400,
   */
  normal: '400',
  /*
   * medium: 500,
   */
  medium: '500',
  /*
   * semibold: 600,
   */
  semibold: '600',
  /*
   * bold: 700,
   */
  bold: '700',
  /*
   * extrabold: 800,
   */
  extrabold: '800',
  /*
   * black: 900,
   */
  black: '900',
} as const;

export function getFontWeight(fontWeight: keyof typeof FONT_WEIGHT) {
  return FONT_WEIGHT[fontWeight];
}
