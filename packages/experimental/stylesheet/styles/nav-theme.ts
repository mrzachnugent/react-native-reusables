import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { DARK_COLORS, LIGHT_COLORS } from './colors';

export const NAV_THEME = {
  light: {
    ...DefaultTheme,
    colors: {
      background: LIGHT_COLORS.background,
      border: LIGHT_COLORS.border,
      card: LIGHT_COLORS.card,
      notification: LIGHT_COLORS.destructive,
      primary: LIGHT_COLORS.primary,
      text: LIGHT_COLORS.foreground,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      background: DARK_COLORS.background,
      border: DARK_COLORS.border,
      card: DARK_COLORS.card,
      notification: DARK_COLORS.destructive,
      primary: DARK_COLORS.primary,
      text: DARK_COLORS.foreground,
    },
  },
} as const;
