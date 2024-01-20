import React from 'react';
import { Platform, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuItemText,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuSubTriggerText,
  ContextMenuTrigger,
} from '~/components/universal-ui/context-menu';

export default function ContextPrimitiveScreen() {
  const [open, setOpen] = React.useState(false);
  const [openSub, setOpenSub] = React.useState(false);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [subCheckboxValue, setSubCheckboxValue] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState('pedro');

  return (
    <>
      <View className='flex-1 justify-center items-center p-6 gap-12'>
        <ContextMenu
          open={open}
          onOpenChange={(newVal) => {
            setOpen(newVal);
            if (!newVal) {
              setOpenSub(false);
            }
          }}
        >
          <ContextMenuTrigger className='flex h-[150px] w-[300px] web:cursor-default items-center justify-center rounded-md border border-foreground border-dashed'>
            <Text className='text-foreground text-sm native:text-lg'>
              {Platform.OS === 'web' ? 'Right click here' : 'Long press here'}
            </Text>
          </ContextMenuTrigger>

          <ContextMenuContent
            align='start'
            insets={contentInsets}
            className='w-64 native:w-72'
          >
            <ContextMenuItem inset>
              <ContextMenuItemText>Back</ContextMenuItemText>
              <ContextMenuShortcut>⌘[</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem inset disabled>
              <ContextMenuItemText>Forward</ContextMenuItemText>
              <ContextMenuShortcut>⌘]</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem inset>
              <ContextMenuItemText>Reload</ContextMenuItemText>
              <ContextMenuShortcut>⌘R</ContextMenuShortcut>
            </ContextMenuItem>

            <ContextMenuSub open={openSub} onOpenChange={setOpenSub}>
              <ContextMenuSubTrigger inset>
                <ContextMenuSubTriggerText>
                  More Tools
                </ContextMenuSubTriggerText>
              </ContextMenuSubTrigger>
              <ContextMenuSubContent className='web:w-48 native:mt-1'>
                <Animated.View entering={FadeIn.duration(200)}>
                  <ContextMenuItem>
                    <ContextMenuItemText>Save Page As...</ContextMenuItemText>
                    <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <ContextMenuItemText>
                      Create Shortcut...
                    </ContextMenuItemText>
                  </ContextMenuItem>

                  <ContextMenuSeparator />
                  <ContextMenuItem>
                    <ContextMenuItemText>Developer Tools</ContextMenuItemText>
                  </ContextMenuItem>
                </Animated.View>
              </ContextMenuSubContent>
            </ContextMenuSub>

            <ContextMenuSeparator />
            <ContextMenuCheckboxItem
              checked={checkboxValue}
              onCheckedChange={setCheckboxValue}
              closeOnPress={false}
            >
              <ContextMenuItemText>Show Bookmarks Bar</ContextMenuItemText>
              <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem
              checked={subCheckboxValue}
              onCheckedChange={setSubCheckboxValue}
              closeOnPress={false}
            >
              <ContextMenuItemText>Show Full URLs</ContextMenuItemText>
            </ContextMenuCheckboxItem>
            <ContextMenuSeparator />
            <ContextMenuRadioGroup
              value={radioValue}
              onValueChange={setRadioValue}
            >
              <ContextMenuLabel inset>
                <ContextMenuItemText>People</ContextMenuItemText>
              </ContextMenuLabel>
              <ContextMenuSeparator />
              <ContextMenuRadioItem value='pedro' closeOnPress={false}>
                <ContextMenuItemText>Elmer Fudd</ContextMenuItemText>
              </ContextMenuRadioItem>
              <ContextMenuRadioItem value='colm' closeOnPress={false}>
                <ContextMenuItemText>Foghorn Leghorn</ContextMenuItemText>
              </ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuContent>
        </ContextMenu>
      </View>
    </>
  );
}
