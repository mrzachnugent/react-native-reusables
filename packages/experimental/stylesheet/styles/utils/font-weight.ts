const FONT_WEIGHT = {
  /*
   * thin: 100,
   */
  thin: '100',
  /*
   * extraLight: 200,
   */
  extraLight: '200',
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
   * semiBold: 600,
   */
  semiBold: '600',
  /*
   * bold: 700,
   */
  bold: '700',
  /*
   * extraBold: 800,
   */
  extraBold: '800',
  /*
   * black: 900,
   */
  black: '900',
} as const;

export function getFontWeight(fontWeight: keyof typeof FONT_WEIGHT) {
  return FONT_WEIGHT[fontWeight];
}
