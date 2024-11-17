import * as React from 'react';
import {
  type ImageStyle,
  type TextStyle,
  type ViewStyle,
  I18nManager,
  PixelRatio,
  StatusBar,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import { type EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { THEMES } from './themes';
import { getCurrentBreakpoint } from './utils/breakpoints';
import { getFontSizes } from './utils/font-size';
import { getMediaMinWidth } from './utils/media-min-width';
import { getRounded } from './utils/rounded';
import { getSpaces } from './utils/space';
import { getTracking } from './utils/tracking';

export function useStyleSheet<T extends StyleSheet>(createStyleSheet?: CreateStyleSheet<T>) {
  const { fontScale, height, width } = useWindowDimensions();
  const colorScheme = useColorScheme() ?? 'light';
  const insets = useSafeAreaInsets();

  const breakpoint = React.useMemo(() => {
    return getCurrentBreakpoint(width);
  }, [width]);

  const styles = React.useMemo(() => {
    const utils = {
      themeName: colorScheme === 'dark' ? 'dark' : 'light',
      breakpoint,
      mediaMinWidth: getMediaMinWidth(breakpoint),
      screen: { width, height },
      orientation: width > height ? 'landscape' : 'portrait',
      insets,
      statusBar: { height: StatusBar.currentHeight },
      pixelRatio: PixelRatio.get(),
      fontScale,
      rtl: I18nManager.isRTL,
      fontSize: getFontSizes(fontScale),
      space: getSpaces(fontScale),
      rounded: getRounded(fontScale),
      tracking: getTracking(fontScale),
    } satisfies Utils;

    return createStyleSheet ? createStyleSheet(THEMES[colorScheme], utils) : ({} as T);
  }, [colorScheme, height, width, fontScale, insets, breakpoint]);

  return {
    styles,
    theme: THEMES[colorScheme],
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

type ThemeName = keyof typeof THEMES;

type Utils = {
  themeName: ThemeName;
  breakpoint: ReturnType<typeof getCurrentBreakpoint>;
  mediaMinWidth: ReturnType<typeof getMediaMinWidth>;
  screen: { width: number; height: number };
  orientation: 'portrait' | 'landscape';
  insets: EdgeInsets;
  statusBar: { height: typeof StatusBar.currentHeight };
  pixelRatio: ReturnType<typeof PixelRatio.get>;
  fontScale: ReturnType<typeof useWindowDimensions>['fontScale'];
  rtl: typeof I18nManager.isRTL;
  fontSize: ReturnType<typeof getFontSizes>;
  space: ReturnType<typeof getSpaces>;
  rounded: ReturnType<typeof getRounded>;
  tracking: ReturnType<typeof getTracking>;
};

type CreateStyleSheet<T extends StyleSheet> = (
  theme: (typeof THEMES)[ThemeName],
  utils: Utils
) => T;
