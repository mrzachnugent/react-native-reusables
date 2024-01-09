import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useDrawerStatus } from '@react-navigation/drawer';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from 'expo-router';
import { StyleSheet } from 'nativewind';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as NavigationMenu from '~/lib/rn-primitives/native/navigation-menu';
import { PortalHost } from '~/lib/rn-primitives/native/portal';

const shouldBlockNavWhenPortalRoot = () => false;

export default function MenubarPrimitiveScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const bottomBarHeight = useBottomTabBarHeight();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  const [value, setValue] = React.useState<string | undefined>();
  const [portalHost, setPortalHost] = React.useState<string | undefined>();
  const navigation = useNavigation();
  const isDrawerOpen = useDrawerStatus() === 'open';

  const blockNavWhenPortalRoot = shouldBlockNavWhenPortalRoot();

  function closeAll() {
    setValue(undefined);
  }

  React.useEffect(() => {
    const sub = navigation.addListener('blur', () => {
      if (!portalHost) {
        closeAll();
      }
    });

    return sub;
  }, [portalHost]);

  React.useEffect(() => {
    if (isDrawerOpen && !portalHost) {
      closeAll();
    }
  }, [isDrawerOpen]);

  return (
    <>
      <View
        pointerEvents={'box-none'}
        className='flex-1 items-center justify-center p-6 gap-12'
      >
        <Pressable
          onPress={() => {
            setPortalHost(portalHost === 'inner' ? undefined : 'inner');
          }}
          className='bg-secondary'
        >
          <Text className='text-xl text-foreground'>Toggle Portal</Text>
          <Text className='text-xl text-foreground'>
            {portalHost ?? 'root'}
          </Text>
        </Pressable>
        <NavigationMenu.Root
          onValueChange={setValue}
          value={value}
          className='flex-row items-center p-0.5 gap-5 z-50'
        >
          <NavigationMenu.List className='flex-row items-center gap-5'>
            <NavigationMenu.Item value='learn' className='bg-background'>
              <NavigationMenu.Trigger>
                <Text className='text-foreground text-xl'>Learn</Text>
              </NavigationMenu.Trigger>
              <NavigationMenu.Portal hostName={portalHost}>
                {!portalHost && blockNavWhenPortalRoot && (
                  <BlockNavHeaderAndBottomTabs
                    onPress={closeAll}
                    headerHeight={headerHeight}
                    bottomBarHeight={bottomBarHeight}
                  />
                )}
                <NavigationMenu.Content
                  insets={contentInsets}
                  sideOffset={portalHost ? -headerHeight : undefined}
                  className='bg-background w-2/3'
                >
                  <NavigationMenu.Link asChild onPress={closeAll}>
                    <Text className='text-foreground text-xl'>Stiches</Text>
                  </NavigationMenu.Link>
                  <NavigationMenu.Link asChild onPress={closeAll}>
                    <Text className='text-foreground text-xl'>Colors</Text>
                  </NavigationMenu.Link>
                  <NavigationMenu.Link asChild onPress={closeAll}>
                    <Text className='text-foreground text-xl'>Icons</Text>
                  </NavigationMenu.Link>
                </NavigationMenu.Content>
              </NavigationMenu.Portal>
            </NavigationMenu.Item>
            <NavigationMenu.Item value='overview' className='bg-background'>
              <NavigationMenu.Trigger>
                <Text className='text-foreground text-xl'>Overview</Text>
              </NavigationMenu.Trigger>
              <NavigationMenu.Portal hostName={portalHost}>
                {!portalHost && blockNavWhenPortalRoot && (
                  <BlockNavHeaderAndBottomTabs
                    onPress={closeAll}
                    headerHeight={headerHeight}
                    bottomBarHeight={bottomBarHeight}
                  />
                )}
                <NavigationMenu.Content
                  insets={contentInsets}
                  sideOffset={portalHost ? -headerHeight : undefined}
                  className='bg-background w-2/3'
                >
                  <NavigationMenu.Link asChild onPress={closeAll}>
                    <Text className='text-foreground text-xl'>
                      Introduction
                    </Text>
                  </NavigationMenu.Link>
                  <NavigationMenu.Link asChild onPress={closeAll}>
                    <Text className='text-foreground text-xl'>
                      Getting Started
                    </Text>
                  </NavigationMenu.Link>
                  <NavigationMenu.Link asChild onPress={closeAll}>
                    <Text className='text-foreground text-xl'>Styling</Text>
                  </NavigationMenu.Link>
                </NavigationMenu.Content>
              </NavigationMenu.Portal>
            </NavigationMenu.Item>
            <NavigationMenu.Item value='terminal' className='bg-background'>
              <NavigationMenu.Link asChild onPress={closeAll} className='z-50'>
                <Text className='text-foreground text-xl'>Github</Text>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
        {!!value && (
          <Pressable
            style={StyleSheet.absoluteFill}
            className='bg-green-500/30'
            onPress={closeAll}
          />
        )}
      </View>
      <PortalHost name='inner' />
    </>
  );
}

// forces the menubar to be closed before navigating
function BlockNavHeaderAndBottomTabs({
  onPress,
  headerHeight,
  bottomBarHeight,
}: {
  onPress: () => void;
  headerHeight: number;
  bottomBarHeight: number;
}) {
  return (
    <>
      <Pressable
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: headerHeight,
        }}
        className='bg-green-900'
        onPress={onPress}
      />

      <Pressable
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: bottomBarHeight,
        }}
        className='bg-green-900'
        onPress={onPress}
      />
    </>
  );
}
