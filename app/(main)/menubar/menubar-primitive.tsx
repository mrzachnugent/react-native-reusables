import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useDrawerStatus } from '@react-navigation/drawer';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from 'expo-router';
import { StyleSheet } from 'nativewind';
import React from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Menubar from '~/lib/rn-primitives/menubar';
import { PortalHost } from '~/lib/rn-primitives/portal';

const shouldBlockNavWhenPortalRoot = () => false;

// Gotchas:
// - Keeping other menubar menus pressable when one is open
// - Root portal: hanndling closing menus when navigating when not using overlay
// - Closing menus when dimensions change
// - When in a scrollable view, and custom overlay is used, and outside press to close is wanted, might have to add multiple overlays when a menu is open in different components

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
  const [openRecent, setOpenRecent] = React.useState(false);
  const [showMoreOptions, setShowMoreOptions] = React.useState(false);
  const [useSameKeyboard, setUseSameKeyboard] = React.useState(true);
  const [keyboardType, setKeyboardType] = React.useState<string>();
  const [portalHost, setPortalHost] = React.useState<string | undefined>();
  const navigation = useNavigation();
  const isDrawerOpen = useDrawerStatus() === 'open';

  const blockNavWhenPortalRoot = shouldBlockNavWhenPortalRoot();

  const window = useWindowDimensions();
  const previousWindow = React.useRef(window);

  function closeAllSubMenus() {
    setOpenRecent(false);
    setShowMoreOptions(false);
  }

  function closeAll() {
    closeAllSubMenus();
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
    if (isDrawerOpen) {
      closeAll();
    }
  }, [isDrawerOpen]);

  React.useEffect(() => {
    if (
      window.width !== previousWindow.current.width ||
      window.height !== previousWindow.current.height
    ) {
      closeAll();
    }
    previousWindow.current = window;
  }, [
    window.width,
    window.height,
    previousWindow.current.height,
    previousWindow.current.width,
  ]);

  return (
    <>
      <ScrollView scrollEnabled={!value}>
        {!!value && (
          <Pressable
            style={StyleSheet.absoluteFill}
            className='bg-red-500'
            onPress={closeAll}
          />
        )}
        <View
          style={{ height: window.height }}
          pointerEvents={'box-none'}
          className=' items-center justify-center p-6 gap-12'
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
          <Menubar.Root
            onValueChange={setValue}
            value={value}
            className='flex-row items-center p-0.5 gap-5 z-50'
          >
            <Menubar.Menu value='file' className='bg-background'>
              <Menubar.Trigger onPress={closeAllSubMenus}>
                <Text className='text-foreground text-xl'>File</Text>
              </Menubar.Trigger>
              <Menubar.Portal hostName={portalHost}>
                {!portalHost && blockNavWhenPortalRoot && (
                  <BlockNavHeaderAndBottomTabs
                    onPress={closeAll}
                    headerHeight={headerHeight}
                    bottomBarHeight={bottomBarHeight}
                  />
                )}
                <Menubar.Content
                  insets={contentInsets}
                  sideOffset={portalHost ? -headerHeight : undefined}
                  className='bg-background'
                >
                  <Menubar.Group>
                    <Menubar.Item onPress={closeAllSubMenus}>
                      <Text className='text-foreground text-xl'>
                        New Text File
                      </Text>
                    </Menubar.Item>
                    <Menubar.Item onPress={closeAllSubMenus}>
                      <Text className='text-foreground text-xl'>
                        New File...
                      </Text>
                    </Menubar.Item>
                    <Menubar.Item onPress={closeAllSubMenus}>
                      <Text className='text-foreground text-xl'>
                        New Window
                      </Text>
                    </Menubar.Item>
                  </Menubar.Group>
                  <Menubar.Separator />
                  <Menubar.Group>
                    <Menubar.Item onPress={closeAllSubMenus}>
                      <Text className='text-foreground text-xl'>Open...</Text>
                    </Menubar.Item>
                    <Menubar.Sub open={openRecent} onOpenChange={setOpenRecent}>
                      <Menubar.SubTrigger>
                        <Text className='text-foreground text-xl'>
                          {'>'} Open Recent
                        </Text>
                      </Menubar.SubTrigger>
                      <Menubar.SubContent>
                        <Menubar.Item onPress={closeAllSubMenus}>
                          <Text className='text-foreground text-xl'>expo</Text>
                        </Menubar.Item>
                        <Menubar.Item onPress={closeAllSubMenus}>
                          <Text className='text-foreground text-xl'>
                            native-wind
                          </Text>
                        </Menubar.Item>
                      </Menubar.SubContent>
                    </Menubar.Sub>
                  </Menubar.Group>
                </Menubar.Content>
              </Menubar.Portal>
            </Menubar.Menu>
            <Menubar.Menu value='keyboard' className='bg-background'>
              <Menubar.Trigger onPress={closeAllSubMenus}>
                <Text className='text-foreground text-xl'>Keyboard</Text>
              </Menubar.Trigger>
              <Menubar.Portal hostName={portalHost}>
                {!portalHost && blockNavWhenPortalRoot && (
                  <BlockNavHeaderAndBottomTabs
                    onPress={closeAll}
                    headerHeight={headerHeight}
                    bottomBarHeight={bottomBarHeight}
                  />
                )}
                <Menubar.Content
                  insets={contentInsets}
                  sideOffset={portalHost ? -headerHeight : undefined}
                  className='bg-background'
                >
                  <Menubar.Group>
                    <Menubar.CheckboxItem
                      checked={useSameKeyboard}
                      onCheckedChange={setUseSameKeyboard}
                      closeOnPress={false}
                      className='flex-row items-center gap-3'
                    >
                      <Menubar.ItemIndicator className='w-4 h-4 bg-red-500' />
                      <Text className='text-foreground text-xl'>
                        Use Same Keyboard Language
                      </Text>
                    </Menubar.CheckboxItem>
                    <Menubar.Item onPress={closeAllSubMenus}>
                      <Text className='text-foreground text-xl'>
                        Keyboard Settings
                      </Text>
                    </Menubar.Item>
                  </Menubar.Group>
                  <Menubar.Separator />
                  <Menubar.Group>
                    <Menubar.Sub
                      open={showMoreOptions}
                      onOpenChange={setShowMoreOptions}
                    >
                      <Menubar.SubTrigger>
                        <Text className='text-foreground text-xl'>
                          {'>'} More Options...
                        </Text>
                      </Menubar.SubTrigger>
                      <Menubar.SubContent>
                        <Menubar.RadioGroup
                          value={keyboardType}
                          onValueChange={setKeyboardType}
                        >
                          <Menubar.RadioItem
                            value='hardware'
                            closeOnPress={false}
                            className='flex-row items-center gap-3'
                          >
                            <Text className='text-foreground text-xl'>
                              Hardware
                            </Text>
                            <Menubar.ItemIndicator className='w-4 h-4 bg-blue-500' />
                          </Menubar.RadioItem>
                          <Menubar.RadioItem
                            value='software'
                            closeOnPress={false}
                            className='flex-row items-center gap-3'
                          >
                            <Text className='text-foreground text-xl'>
                              Software
                            </Text>
                            <Menubar.ItemIndicator className='w-4 h-4 bg-blue-500' />
                          </Menubar.RadioItem>
                        </Menubar.RadioGroup>
                      </Menubar.SubContent>
                    </Menubar.Sub>
                  </Menubar.Group>
                </Menubar.Content>
              </Menubar.Portal>
            </Menubar.Menu>
            <Menubar.Menu value='terminal' className=' bg-background'>
              <Menubar.Trigger className='z-50'>
                <Text className='text-foreground text-xl'>Terminal</Text>
              </Menubar.Trigger>
              <Menubar.Portal hostName={portalHost}>
                {!portalHost && blockNavWhenPortalRoot && (
                  <BlockNavHeaderAndBottomTabs
                    onPress={closeAll}
                    headerHeight={headerHeight}
                    bottomBarHeight={bottomBarHeight}
                  />
                )}

                <Menubar.Content
                  insets={contentInsets}
                  sideOffset={portalHost ? -headerHeight : undefined}
                  className='bg-background'
                  align='end'
                >
                  <Menubar.Item onPress={closeAllSubMenus}>
                    <Text className='text-foreground text-xl'>
                      New Terminal
                    </Text>
                  </Menubar.Item>
                </Menubar.Content>
              </Menubar.Portal>
            </Menubar.Menu>
          </Menubar.Root>
          {!!value && (
            <Pressable
              style={StyleSheet.absoluteFill}
              className='bg-green-500/30'
              onPress={closeAll}
            />
          )}
        </View>

        <View
          pointerEvents={'box-none'}
          style={{ height: window.height / 2 }}
        ></View>
      </ScrollView>
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
