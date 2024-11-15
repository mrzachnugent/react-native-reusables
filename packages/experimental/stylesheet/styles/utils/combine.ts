import { StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native';

type BaseStyle = ViewStyle | TextStyle | ImageStyle;
type Style<T extends BaseStyle> = StyleProp<T>;

/**
 * Combine styles
 */
export function cs<T extends BaseStyle, U extends BaseStyle>(...args: (Style<T> | Style<U>)[]) {
  if (args.length === 0) return undefined;

  if (args.length === 1) return args[0];

  const styles = args.flat(1).filter(Boolean) as (Style<T> | Style<U>)[];

  if (styles.length === 0) return undefined;

  if (styles.length === 1) return styles[0];

  return styles;
}

/**
 * Combine function styles
 */
export function cfs<T extends BaseStyle>(...cbs: Array<Style<T> | ((args: any) => Style<T>)>) {
  return (args: any) => {
    if (cbs.length === 0) return undefined;

    const styles = cbs
      .map((cb) => (typeof cb === 'function' ? cb(args) : cb))
      .flat(1)
      .filter(Boolean) as Array<NonNullable<Style<T>>>;

    if (styles.length === 0) return undefined;

    if (styles.length === 1) return styles[0];

    return styles;
  };
}
