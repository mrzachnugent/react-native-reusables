import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Theme, ThemeProvider, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { Text } from '@/registry/new-york/components/ui/text';
import { NAV_THEME } from '@/registry/new-york/lib/constants';
import { useColorScheme } from 'nativewind';
import { Icon } from '@/registry/new-york/components/ui/icon';
import { ChevronLeft } from 'lucide-react-native';
import { SettingsNavLink } from '@showcase/components/SettingsNavLink';
import { useGeistFont } from '@showcase/hooks/use-geist-font';
import { ReanimatedScreenProvider } from 'react-native-screens/reanimated';
import { ThemeToggle } from '@showcase/components/ThemeToggle';

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
      <ReanimatedScreenProvider>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
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
          </BottomSheetModalProvider>
          <PortalHost />
        </GestureHandlerRootView>
      </ReanimatedScreenProvider>
    </ThemeProvider>
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
