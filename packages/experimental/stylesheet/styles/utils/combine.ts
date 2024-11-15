import { StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native';

type Style = ViewStyle | TextStyle | ImageStyle;

/**
 * Combine styles
 */
export function cs<T extends Style, U extends Style>(...args: (StyleProp<T> | StyleProp<U>)[]) {
  if (args.length === 0) return undefined;

  if (args.length === 1) return args[0];

  const styles = args.flat(1).filter(Boolean) as (StyleProp<T> | StyleProp<U>)[];

  if (styles.length === 0) return undefined;

  if (styles.length === 1) return styles[0];

  return styles;
}

/**
 * Combine function styles
 */
export function cfs<T extends Style>(...cbs: Array<StyleProp<T> | ((args: any) => StyleProp<T>)>) {
  return (args: any) => {
    if (cbs.length === 0) return undefined;

    const styles = cbs
      .map((cb) => (typeof cb === 'function' ? cb(args) : cb))
      .flat(1)
      .filter(Boolean) as Array<NonNullable<StyleProp<T>>>;

    if (styles.length === 0) return undefined;

    if (styles.length === 1) return styles[0];

    return styles;
  };
}
