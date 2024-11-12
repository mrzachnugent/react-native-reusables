import * as NavigationBar from 'expo-navigation-bar';
import { Platform } from 'react-native';
import { NAV_THEME } from '~/lib/styles/themes';

export async function setAndroidNavigationBar(theme: 'light' | 'dark') {
  if (Platform.OS !== 'android') return;
  await NavigationBar.setButtonStyleAsync(theme === 'dark' ? 'light' : 'dark');
  await NavigationBar.setBackgroundColorAsync(
    theme === 'dark' ? NAV_THEME.dark.colors.background : NAV_THEME.light.colors.background
  );
}
