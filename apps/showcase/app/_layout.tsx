import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Theme, ThemeProvider, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeToggle } from '@showcase/components/ThemeToggle';
import { Text } from '@/registry/new-york/components/ui/text';
import { NAV_THEME } from '@/registry/new-york/lib/constants';
import { useColorScheme } from 'nativewind';
import { Icon } from '@/registry/new-york/components/ui/icon';
import { ChevronLeft } from 'lucide-react-native';

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

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  useSetWebBackgroundClassName();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Stack
            screenOptions={{
              headerBackTitle: 'Back',
              headerTitle(props) {
                return <Text className='text-xl font-semibold'>{toOptions(props.children)}</Text>;
              },
              headerRight: () => <ThemeToggle />,
              headerBackTitleStyle: {
                fontSize: 14,
              },
              headerLeft: () => (
                <Pressable
                  hitSlop={12}
                  onPress={() => router.back()}
                  className='flex-row items-center active:opacity-70'
                >
                  <Icon as={ChevronLeft} className='text-muted-foreground size-6 -ml-1' />
                  <Text className='text-muted-foreground text-sm -ml-1'>Back</Text>
                </Pressable>
              ),
            }}
          >
            <Stack.Screen
              name='index'
              options={{
                headerLargeTitle: true,
                headerTitle: 'Showcase',
                headerLargeTitleShadowVisible: false,
                headerLargeStyle: {
                  backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
                },
                headerLeft: null,
              }}
            />

            <Stack.Screen
              name='modal'
              options={{
                presentation: 'modal',
                title: 'Modal',
              }}
            />
          </Stack>
        </BottomSheetModalProvider>
        <PortalHost />
      </GestureHandlerRootView>
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
