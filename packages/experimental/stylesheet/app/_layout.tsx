import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, useColorScheme } from 'react-native';
import { ThemeToggle } from '~/components/ThemeToggle';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { NAV_THEME } from '~/lib/styles/themes';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'android') {
        return;
      }
      const colorTheme = colorScheme === 'dark' ? 'dark' : 'light';
      setAndroidNavigationBar(colorTheme);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
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
