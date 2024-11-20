import * as React from 'react';
import { Pressable, PressableStateCallbackType, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
} from '~/components/ui/context-menu';
import { Text } from '~/components/ui/text';
import { createStyleSheet, useStyles } from '~/styles/stylesheet';
import { withOpacity } from '~/styles/utils/with-opacity';

export default function ContextScreen() {
  const { styles } = useStyles(stylesheet);
  const triggerRef = React.useRef<React.ElementRef<typeof ContextMenuTrigger>>(null);
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
      <View style={styles.root}>
        <Pressable
          style={styles.externalTrigger}
          onPress={() => {
            // Only for Native platforms: open menu programmatically
            triggerRef.current?.open();
          }}
        />
        <ContextMenu>
          <ContextMenuTrigger ref={triggerRef} style={styles.trigger}>
            <Text>Long press here</Text>
          </ContextMenuTrigger>

          <ContextMenuContent align='start' insets={contentInsets}>
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
              <ContextMenuSubContent>
                <Animated.View entering={FadeIn.duration(200)}>
                  <ContextMenuItem>
                    <Text>Save Page As...</Text>
                    <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <Text>Create Shortcut...</Text>
                  </ContextMenuItem>

                  <ContextMenuSeparator />
                  <ContextMenuItem>
                    <Text>Developer Tools</Text>
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
              <Text>Show Bookmarks Bar</Text>
              <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem
              checked={subCheckboxValue}
              onCheckedChange={setSubCheckboxValue}
              closeOnPress={false}
            >
              <Text>Show Full URLs</Text>
            </ContextMenuCheckboxItem>
            <ContextMenuSeparator />
            <ContextMenuRadioGroup value={radioValue} onValueChange={setRadioValue}>
              <ContextMenuLabel inset>People</ContextMenuLabel>
              <ContextMenuSeparator />
              <ContextMenuRadioItem value='pedro' closeOnPress={false}>
                <Text>Elmer Fudd</Text>
              </ContextMenuRadioItem>
              <ContextMenuRadioItem value='colm' closeOnPress={false}>
                <Text>Foghorn Leghorn</Text>
              </ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuContent>
        </ContextMenu>
      </View>
    </>
  );
}

const stylesheet = createStyleSheet(({ colors, utils }) => {
  return {
    root: {
      flex: 1,
      justifyContent: 'center',
      padding: utils.space(6),
    },
    externalTrigger: (state: PressableStateCallbackType) => {
      return {
        position: 'absolute',
        top: 0,
        right: 0,
        width: utils.space(16),
        height: utils.space(16),
        backgroundColor: state.pressed ? withOpacity(colors.primary, 0.05) : undefined,
      };
    },
    trigger: {
      height: 150,
      width: '100%',
      maxWidth: 300,
      marginHorizontal: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: utils.rounded('md'),
      borderWidth: 1,
      borderColor: colors.foreground,
      borderStyle: 'dashed',
    },
  };
});
