import '~/global.css';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import * as React from 'react';
import { AppState } from 'react-native';
import { ToastProvider } from '~/components/old-ui/toast';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { NAV_THEME } from '~/lib/constants';
import { PortalHost } from '~/components/primitives/portal/portal-native';
import { useColorScheme } from '~/lib/useColorScheme';

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

async function onFetchUpdateAsync() {
  if (__DEV__) return;

  const update = await Updates.checkForUpdateAsync();

  if (update.isAvailable) {
    await Updates.fetchUpdateAsync();
    await Updates.reloadAsync();
  }
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  useAppForground(onFetchUpdateAsync, true);

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem('theme');
      if (!theme) {
        setAndroidNavigationBar(colorScheme);
        AsyncStorage.setItem('theme', colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === 'dark' ? 'dark' : 'light';
      setAndroidNavigationBar(colorTheme);
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);

        setIsColorSchemeLoaded(true);
        return;
      }
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      <BottomSheetModalProvider>
        <Stack initialRouteName='(main)'>
          <Stack.Screen
            name='(main)'
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name='modal'
            options={{ presentation: 'modal', title: 'Modal' }}
          />
        </Stack>
      </BottomSheetModalProvider>
      <PortalHost />
      <ToastProvider />
    </ThemeProvider>
  );
}

function useAppForground(cb: () => void, onMount = true) {
  const appState = React.useRef(AppState.currentState);
  React.useEffect(() => {
    if (onMount) {
      cb();
    }
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        cb();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);
}
