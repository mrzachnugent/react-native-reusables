import type { StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native';

type Style = ViewStyle | TextStyle | ImageStyle;

/**
 * Combine styles
 */
export function cs(...args: StyleProp<Style>[]) {
  if (args.length === 0) return undefined;

  if (args.length === 1) return args[0];

  const styles = args.flat(1).filter(Boolean) as Array<NonNullable<StyleProp<Style>>>;

  if (styles.length === 0) return undefined;

  if (styles.length === 1) return styles[0];

  return styles;
}

/**
 * Combine function styles
 */
export function cfs(...cbs: Array<StyleProp<Style> | ((args: any) => StyleProp<Style>)>) {
  return (args: any) => {
    if (cbs.length === 0) return undefined;

    const styles = cbs
      .map((cb) => (typeof cb === 'function' ? cb(args) : cb))
      .flat(1)
      .filter(Boolean) as Array<NonNullable<StyleProp<Style>>>;

    if (styles.length === 0) return undefined;

    if (styles.length === 1) return styles[0];

    return styles;
  };
}
