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
import { DARK_COLORS, LIGHT_COLORS } from './colors';
import { getCurrentBreakpoint } from './utils/breakpoints';
import { getFontSizes } from './utils/font-size';
import { getMediaMinWidth } from './utils/media-min-width';
import { getRounded } from './utils/rounded';
import { getSpaces } from './utils/space';
import { getTracking } from './utils/tracking';

export function useStyles<T extends StyleSheet>(createStyleSheet?: CreateStyleSheet<T>) {
  const { fontScale, height, width } = useWindowDimensions();
  const colorScheme = useColorScheme() ?? 'light';
  const insets = useSafeAreaInsets();

  const runtime = React.useMemo((): Runtime => {
    return {
      themeName: colorScheme === 'dark' ? 'dark' : 'light',
      breakpoint: getCurrentBreakpoint(width),
      screen: { width, height },
      orientation: width > height ? 'landscape' : 'portrait',
      insets,
      statusBar: { height: StatusBar.currentHeight },
      pixelRatio: PixelRatio.get(),
      fontScale,
      rtl: I18nManager.isRTL,
    };
  }, [colorScheme, height, width, fontScale, insets]);

  const themes = React.useMemo(() => {
    // TODO: make functions instead of objects
    // TODO: add rem()
    // TODO: add constant utils
    const utils = {
      mediaMinWidth: getMediaMinWidth(runtime.breakpoint),
      fontSize: getFontSizes(fontScale),
      space: getSpaces(fontScale),
      rounded: getRounded(fontScale),
      tracking: getTracking(fontScale),
    };
    return {
      light: { colors: LIGHT_COLORS, utils },
      dark: { colors: DARK_COLORS, utils },
    };
  }, [runtime]);

  const styles = React.useMemo(() => {
    return createStyleSheet ? createStyleSheet(themes[colorScheme], runtime) : ({} as T);
  }, [themes, colorScheme, runtime]);

  return {
    styles,
    theme: themes[colorScheme],
    breakpoint: runtime.breakpoint,
  };
}

export function createStyleSheet<T extends StyleSheet>(stylesheet?: CreateStyleSheet<T>) {
  return stylesheet;
}

// TODO: check up on unistyles wip branch to see if the cb->cb->style should be removed
type StyleSheet = {
  [x: string]:
    | (ViewStyle | ((...args: any) => ViewStyle) | ((...args: any) => (...args: any) => ViewStyle))
    | (TextStyle | ((...args: any) => TextStyle) | ((...args: any) => (...args: any) => TextStyle))
    | (ImageStyle | ((...args: any) => ImageStyle))
    | ((...args: any) => (...args: any) => ImageStyle);
};

type Utils = {
  mediaMinWidth: ReturnType<typeof getMediaMinWidth>;
  fontSize: ReturnType<typeof getFontSizes>;
  space: ReturnType<typeof getSpaces>;
  rounded: ReturnType<typeof getRounded>;
  tracking: ReturnType<typeof getTracking>;
};

type Themes = {
  light: {
    colors: typeof LIGHT_COLORS;
    utils: Utils;
  };
  dark: {
    colors: typeof LIGHT_COLORS;
    utils: Utils;
  };
};

type ThemeName = keyof Themes;

type Runtime = {
  themeName: ThemeName;
  breakpoint: ReturnType<typeof getCurrentBreakpoint>;
  screen: { width: number; height: number };
  orientation: 'portrait' | 'landscape';
  insets: EdgeInsets;
  statusBar: { height: typeof StatusBar.currentHeight };
  pixelRatio: ReturnType<typeof PixelRatio.get>;
  fontScale: ReturnType<typeof useWindowDimensions>['fontScale'];
  rtl: typeof I18nManager.isRTL;
};

type CreateStyleSheet<T extends StyleSheet> = (theme: Themes[ThemeName], runtime: Runtime) => T;
