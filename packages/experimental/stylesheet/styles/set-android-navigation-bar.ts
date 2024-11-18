import * as NavigationBar from 'expo-navigation-bar';
import { Platform } from 'react-native';
import { NAV_THEME } from '~/styles/nav-theme';

export function setAndroidNavigationBar(theme: 'light' | 'dark') {
  if (Platform.OS !== 'android') return;
  return Promise.all([
    NavigationBar.setButtonStyleAsync(theme === 'dark' ? 'light' : 'dark'),
    NavigationBar.setBackgroundColorAsync(
      theme === 'dark' ? NAV_THEME.dark.colors.background : NAV_THEME.light.colors.background
    ),
  ]);
}
