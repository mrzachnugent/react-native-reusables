import '../global.css';

import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { HeaderRightView } from '@showcase/components/header-right-view';
import { StyleProvider, useStyle } from '@showcase/components/styles/style-provider';
import { Text } from '@showcase/components/styles/ui';
import { ThemeToggle } from '@showcase/components/theme-toggle';
import { useGeistFont } from '@showcase/hooks/use-geist-font';
import { NAV_THEME } from '@showcase/lib/theme';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, vars } from 'nativewind';
import * as React from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';

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
  const [loaded, error] = useGeistFont();
  const { colorScheme } = useColorScheme();

  React.useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider value={NAV_THEME[colorScheme]}>
      <StyleProvider>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <GestureHandlerRootView
          style={{ flex: 1, backgroundColor: NAV_THEME[colorScheme].colors.background }}>
          <KeyboardProvider>
            <StyleBorderRadiusProvider>
              <Stack
                screenOptions={{
                  headerBackTitle: 'Back',
                  headerTitle(props) {
                    return (
                      <Text className="ios:font-medium android:mt-1.5 text-xl">
                        {toOptions(props.children.split('/').pop())}
                      </Text>
                    );
                  },
                  headerRight: () => <HeaderRightView />,
                }}>
                <Stack.Screen
                  name="index"
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
                  name="theming"
                  options={{
                    presentation: 'modal',
                    title: 'Theming',
                    headerRight: () => <ThemeToggle />,
                  }}
                />
              </Stack>
            </StyleBorderRadiusProvider>
            <PortalHost />
          </KeyboardProvider>
        </GestureHandlerRootView>
      </StyleProvider>
    </ThemeProvider>
  );
}

const defaultRadius = vars({
  '--radius': '8px', // 0.5rem
});

const newYorkRadius = vars({
  '--radius': '10px', // 0.625rem
});

function StyleBorderRadiusProvider({ children }: { children: React.ReactNode }) {
  const { style } = useStyle();
  return (
    <View
      style={style === 'default' ? { flex: 1, ...defaultRadius } : { flex: 1, ...newYorkRadius }}>
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
