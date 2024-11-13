import * as React from 'react';
import {
  I18nManager,
  type ImageStyle,
  PixelRatio,
  type TextStyle,
  useColorScheme,
  useWindowDimensions,
  type ViewStyle,
} from 'react-native';
import { type EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { BREAKPOINTS, THEMES } from './themes';
import { getFontSizes } from './utils/font-size';
import { getRounded } from './utils/rounded';
import { getSpaces } from './utils/space';
import { getTracking } from './utils/tracking';

export function useStyleSheet<T extends StyleSheet>(createStyleSheet?: CreateStyleSheet<T>) {
  const colorScheme = useColorScheme();
  const { fontScale, height, width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const breakpoint = React.useMemo(() => {
    return (
      Object.keys(BREAKPOINTS).find(
        (key) => width < BREAKPOINTS[key as keyof typeof BREAKPOINTS]
      ) ?? 'sm'
    );
  }, [width]);

  const styles = React.useMemo(() => {
    const utils = {
      themeName: colorScheme === 'dark' ? 'dark' : 'light',
      breakpoint,
      screen: { width, height },
      orientation: width > height ? 'landscape' : 'portrait',
      insets,
      pixelRatio: PixelRatio.get(),
      fontScale,
      rtl: I18nManager.isRTL,
      fontSize: getFontSizes(fontScale),
      space: getSpaces(fontScale),
      rounded: getRounded(fontScale),
      tracking: getTracking(fontScale),
    } satisfies StyleSheetUtils;

    return createStyleSheet ? createStyleSheet(THEMES[colorScheme ?? 'light'], utils) : ({} as T);
  }, [colorScheme, height, width, fontScale, insets, breakpoint]);

  return {
    styles,
    theme: THEMES[colorScheme ?? 'light'],
    breakpoint,
  };
}

export function createStyleSheet<T extends StyleSheet>(stylesheet?: CreateStyleSheet<T>) {
  return stylesheet;
}

type StyleSheet = {
  [x: string]:
    | (ViewStyle | ((...args: any) => ViewStyle) | ((...args: any) => (...args: any) => ViewStyle))
    | (TextStyle | ((...args: any) => TextStyle) | ((...args: any) => (...args: any) => TextStyle))
    | (ImageStyle | ((...args: any) => ImageStyle))
    | ((...args: any) => (...args: any) => ImageStyle);
};

type StyleSheetUtils = {
  themeName: ThemeName;
  breakpoint: string;
  screen: { width: number; height: number };
  orientation: 'portrait' | 'landscape';
  insets: EdgeInsets;
  pixelRatio: ReturnType<typeof PixelRatio.get>;
  fontScale: ReturnType<typeof useWindowDimensions>['fontScale'];
  rtl: typeof I18nManager.isRTL;
  fontSize: ReturnType<typeof getFontSizes>;
  space: ReturnType<typeof getSpaces>;
  rounded: ReturnType<typeof getRounded>;
  tracking: ReturnType<typeof getTracking>;
};

type ThemeName = keyof typeof THEMES;

type CreateStyleSheet<T extends StyleSheet> = (
  theme: (typeof THEMES)[ThemeName],
  utils: StyleSheetUtils
) => T;
