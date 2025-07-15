import '@/global.css';

import { ThemeToggle } from '@/components/theme-toggle';
import { NAV_THEME } from '@/lib/theme';
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Platform } from 'react-native';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  useSetWebBackgroundClassName();
  const { colorScheme } = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack>
        <Stack.Screen
          name='index'
          options={{
            title: 'Starter Base',
            headerRight: () => <ThemeToggle />,
          }}
        />
      </Stack>
      <PortalHost />
    </ThemeProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

function useSetWebBackgroundClassName() {
  useIsomorphicLayoutEffect(() => {
    if (Platform.OS !== 'web') {
      return;
    }
    // Adds the background color to the html element to prevent white background on overscroll.
    document.documentElement.classList.add('bg-background');
  }, []);
}
