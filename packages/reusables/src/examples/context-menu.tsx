import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function ContextMenuPreview() {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [checkboxValue2, setCheckboxValue2] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState('pedro');

  return (
    <ContextMenu className='w-[300px] h-[150px]'>
      <ContextMenuTrigger className='flex w-full h-full items-center justify-center rounded-md border border-border border-dashed web:outline-none web:cursor-default'>
        <Text className='text-sm'>
          {Platform.select({ web: 'Right click here', default: 'Long press here' })}
        </Text>
      </ContextMenuTrigger>
      <ContextMenuContent className='w-52' insets={contentInsets}>
        <ContextMenuItem inset>
          <Text>Back</Text>
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          <Text>Forward</Text>
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          <Text>Reload</Text>
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>
            <Text>More Tools</Text>
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className='web:w-44'>
            <ContextMenuItem>
              <Text>Save Page...</Text>
            </ContextMenuItem>
            <ContextMenuItem>
              <Text>Create Shortcut...</Text>
            </ContextMenuItem>
            <ContextMenuItem>
              <Text>Name Window...</Text>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              <Text>Developer Tools</Text>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem variant='destructive'>
              <Text>Delete</Text>
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem
          closeOnPress={false}
          checked={checkboxValue}
          onCheckedChange={setCheckboxValue}
        >
          <Text>Show Bookmarks</Text>
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem
          closeOnPress={false}
          checked={checkboxValue2}
          onCheckedChange={setCheckboxValue2}
        >
          <Text>Show Full URLs</Text>
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value={radioValue} onValueChange={setRadioValue}>
          <ContextMenuLabel inset>
            <Text>People</Text>
          </ContextMenuLabel>
          <ContextMenuRadioItem closeOnPress={false} value='pedro'>
            <Text>Pedro Duarte</Text>
          </ContextMenuRadioItem>
          <ContextMenuRadioItem closeOnPress={false} value='colm'>
            <Text>Colm Tuite</Text>
          </ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
