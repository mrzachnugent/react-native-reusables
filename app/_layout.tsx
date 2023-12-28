import '~/global.css';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import { useColorScheme } from 'nativewind';
import React, { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from '~/components/ui/toast';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { NAV_THEME } from '~/lib/constants';

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

async function onFetchUpdateAsync() {
  if (process.env.NODE_ENV === 'development') {
    return;
  }

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

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, setColorScheme } = useColorScheme();
  useAppForground(onFetchUpdateAsync, true);
  const [loaded, error] = useFonts(FontAwesome.font);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem('theme');
      if (!theme) {
        setAndroidNavigationBar(colorScheme);
        AsyncStorage.setItem('theme', colorScheme);
        return;
      }
      const colorTheme = theme === 'dark' ? 'dark' : 'light';
      setAndroidNavigationBar(colorTheme);
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);
        return;
      }
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

// TODO(web): Fix BottomSheetModalProvider hydration issue
function RootLayoutNav() {
  const { colorScheme } = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'light' ? LIGHT_THEME : DARK_THEME}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <SafeAreaProvider>
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
        <ToastProvider />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

function useAppForground(cb: () => void, onMount = true) {
  const appState = useRef(AppState.currentState);
  useEffect(() => {
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
