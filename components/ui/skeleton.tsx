import { Skeleton as MotiSkeleton } from 'moti/skeleton';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { NAV_THEME } from '~/lib/constants';
const COLORS_LIGHT_THEME = [
  NAV_THEME.light.card,
  NAV_THEME.light.border,
  NAV_THEME.light.card,
  NAV_THEME.light.border,
  NAV_THEME.light.card,
  NAV_THEME.light.border,
];
const COLORS_DARK_THEME = [
  NAV_THEME.dark.border,
  NAV_THEME.dark.card,
  NAV_THEME.dark.border,
  NAV_THEME.dark.card,
  NAV_THEME.dark.card,
  NAV_THEME.dark.border,
];
/**
 * @docs https://moti.fyi/skeleton
 */
export function Skeleton(props: React.ComponentProps<typeof MotiSkeleton>) {
  const { colorScheme } = useColorScheme();
  const {
    colorMode = colorScheme,
    colors = colorScheme === 'dark' ? COLORS_DARK_THEME : COLORS_LIGHT_THEME,
    ...rest
  } = props;
  return <MotiSkeleton colorMode={colorMode} colors={colors} {...rest} />;
}
