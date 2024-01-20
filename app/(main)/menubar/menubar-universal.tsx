import { useDrawerStatus } from '@react-navigation/drawer';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarItemText,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '~/components/universal-ui/menubar';

export default function MenubarPrimitiveScreen() {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  const [value, setValue] = React.useState<string | undefined>();
  const [isSubOpen, setIsSubOpen] = React.useState(false);
  const [isSubOpen2, setIsSubOpen2] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);
  const [isChecked2, setIsChecked2] = React.useState(false);
  const [radio, setRadio] = React.useState('michael');
  const navigation = useNavigation();
  const isDrawerOpen = useDrawerStatus() === 'open';
  React.useEffect(() => {
    const sub = navigation.addListener('blur', () => {
      onValueChange(undefined);
    });

    return sub;
  }, []);

  React.useEffect(() => {
    if (isDrawerOpen) {
      onValueChange(undefined);
    }
  }, [isDrawerOpen]);

  function closeSubs() {
    setIsSubOpen(false);
    setIsSubOpen2(false);
  }

  function onValueChange(val: string | undefined) {
    if (typeof val === 'string') {
      setValue(val);
      return;
    }
    closeSubs();
    setValue(undefined);
  }

  return (
    <View className='flex-1 items-center p-4'>
      {!!value && (
        <Pressable
          onPress={() => {
            onValueChange(undefined);
          }}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      <Menubar value={value} onValueChange={onValueChange}>
        <MenubarMenu value='file'>
          <MenubarTrigger onPress={closeSubs}>
            <MenubarItemText>File</MenubarItemText>
          </MenubarTrigger>
          <MenubarContent insets={contentInsets}>
            <MenubarItem>
              <MenubarItemText>New Tab</MenubarItemText>
              <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <MenubarItemText>New Window</MenubarItemText>
              <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>
              <MenubarItemText>New Incognito Window</MenubarItemText>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub open={isSubOpen} onOpenChange={setIsSubOpen}>
              <MenubarSubTrigger>
                <MenubarItemText>Share</MenubarItemText>
              </MenubarSubTrigger>
              <MenubarSubContent>
                <Animated.View entering={FadeIn.duration(200)}>
                  <MenubarItem>
                    <MenubarItemText>Email link</MenubarItemText>
                  </MenubarItem>
                  <MenubarItem>
                    <MenubarItemText>Messages</MenubarItemText>
                  </MenubarItem>
                  <MenubarItem>
                    <MenubarItemText>Notes</MenubarItemText>
                  </MenubarItem>
                </Animated.View>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>
              <MenubarItemText>Print...</MenubarItemText>
              <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu value='edit'>
          <MenubarTrigger onPress={closeSubs}>
            <MenubarItemText>Edit</MenubarItemText>
          </MenubarTrigger>
          <MenubarContent insets={contentInsets} className='native:w-48'>
            <MenubarItem>
              <MenubarItemText>Undo</MenubarItemText>
              <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <MenubarItemText>Redo</MenubarItemText>
              <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub open={isSubOpen2} onOpenChange={setIsSubOpen2}>
              <MenubarSubTrigger>
                <MenubarItemText>Find</MenubarItemText>
              </MenubarSubTrigger>
              <MenubarSubContent>
                <Animated.View entering={FadeIn.duration(200)}>
                  <MenubarItem>
                    <MenubarItemText>Search the web</MenubarItemText>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <MenubarItemText>Find...</MenubarItemText>
                  </MenubarItem>
                  <MenubarItem>
                    <MenubarItemText>Find Next</MenubarItemText>
                  </MenubarItem>
                  <MenubarItem>
                    <MenubarItemText>Find Previous</MenubarItemText>
                  </MenubarItem>
                </Animated.View>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>
              <MenubarItemText>Cut</MenubarItemText>
            </MenubarItem>
            <MenubarItem>
              <MenubarItemText>Copy</MenubarItemText>
            </MenubarItem>
            <MenubarItem>
              <MenubarItemText>Paste</MenubarItemText>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu value='view'>
          <MenubarTrigger onPress={closeSubs}>
            <MenubarItemText>View</MenubarItemText>
          </MenubarTrigger>
          <MenubarContent insets={contentInsets}>
            <MenubarCheckboxItem
              checked={isChecked}
              onCheckedChange={setIsChecked}
              closeOnPress={false}
            >
              <MenubarItemText>Always Show Bookmarks Bar</MenubarItemText>
            </MenubarCheckboxItem>
            <MenubarCheckboxItem
              checked={isChecked2}
              onCheckedChange={setIsChecked2}
              closeOnPress={false}
            >
              <MenubarItemText>Always Show Full URLs</MenubarItemText>
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem inset>
              <MenubarItemText>Reload</MenubarItemText>
              <MenubarShortcut>⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled inset>
              <MenubarItemText>Force Reload</MenubarItemText>
              <MenubarShortcut>⇧⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>
              <MenubarItemText>Toggle Fullscreen</MenubarItemText>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>
              <MenubarItemText>Hide Sidebar</MenubarItemText>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu value='profile'>
          <MenubarTrigger onPress={closeSubs}>
            <MenubarItemText>Profiles</MenubarItemText>
          </MenubarTrigger>
          <MenubarContent insets={contentInsets}>
            <MenubarRadioGroup value={radio} onValueChange={setRadio}>
              <MenubarRadioItem closeOnPress={false} value='andy'>
                <MenubarItemText>Andy</MenubarItemText>
              </MenubarRadioItem>
              <MenubarRadioItem closeOnPress={false} value='michael'>
                <MenubarItemText>Michael</MenubarItemText>
              </MenubarRadioItem>
              <MenubarRadioItem closeOnPress={false} value='creed'>
                <MenubarItemText>Creed</MenubarItemText>
              </MenubarRadioItem>
            </MenubarRadioGroup>
            <MenubarSeparator />
            <MenubarItem inset>
              <MenubarItemText>Edit...</MenubarItemText>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>
              <MenubarItemText>Add Profile...</MenubarItemText>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </View>
  );
}
