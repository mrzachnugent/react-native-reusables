import '../global.css';

import { NAV_THEME } from '@/registry/new-york/lib/constants';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { SettingsNavLink } from '@showcase/components/SettingsNavLink';
import { ThemeToggle } from '@showcase/components/ThemeToggle';
import { StyleProvider, useStyle } from '@showcase/components/styles/style-provider';
import { Text } from '@showcase/components/styles/ui';
import { useGeistFont } from '@showcase/hooks/use-geist-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, vars } from 'nativewind';
import * as React from 'react';
import { Platform, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
  fonts: {
    bold: { fontFamily: 'Geist-Medium', fontWeight: '500' },
    medium: { fontFamily: 'Geist', fontWeight: '400' },
    regular: { fontFamily: 'Geist-Light', fontWeight: '300' },
    heavy: { fontFamily: 'Geist-SemiBold', fontWeight: '600' },
  },
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
  fonts: {
    bold: { fontFamily: 'Geist-Medium', fontWeight: '500' },
    medium: { fontFamily: 'Geist', fontWeight: '400' },
    regular: { fontFamily: 'Geist-Light', fontWeight: '300' },
    heavy: { fontFamily: 'Geist-SemiBold', fontWeight: '600' },
  },
};

SplashScreen.preventAutoHideAsync();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  useSetWebBackgroundClassName();
  const [loaded, error] = useGeistFont();

  React.useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DARK_THEME : LIGHT_THEME}>
      <StyleProvider>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <StyleBorderRadiusProvider>
              <Stack
                screenOptions={{
                  headerStyle: {},
                  headerBackTitle: 'Back',
                  headerTitle(props) {
                    return <Text className='text-xl font-medium'>{toOptions(props.children)}</Text>;
                  },
                  headerRight: () => <SettingsNavLink />,
                }}
              >
                <Stack.Screen
                  name='index'
                  options={{
                    headerLargeTitle: true,
                    headerTitle: 'Showcase',
                    headerLargeTitleShadowVisible: false,
                    headerLargeStyle: {
                      backgroundColor: colorScheme === 'dark' ? 'hsl(0 0% 3.9%)' : 'hsl(0 0% 100%)',
                    },
                  }}
                />

                <Stack.Screen
                  name='settings'
                  options={{
                    presentation: 'modal',
                    title: 'Settings',
                    headerRight: () => <ThemeToggle />,
                  }}
                />
              </Stack>
            </StyleBorderRadiusProvider>
          </BottomSheetModalProvider>
          <PortalHost />
        </GestureHandlerRootView>
      </StyleProvider>
    </ThemeProvider>
  );
}

const defaultRadius = vars({
  '--radius': '8px',
});

function StyleBorderRadiusProvider({ children }: { children: React.ReactNode }) {
  const { style } = useStyle();
  return (
    <View style={style === 'default' ? defaultRadius : undefined} className='flex-1'>
      {children}
    </View>
  );
}

function toOptions(name: string) {
  const title = name
    .split('-')
    .map(function (str: string) {
      return str.replace(/\b\w/g, function (char) {
        return char.toUpperCase();
      });
    })
    .join(' ');
  return title;
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
