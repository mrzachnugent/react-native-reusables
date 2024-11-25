import {
  Cloud,
  Github,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  UserPlus,
  Users,
} from 'lucide-react-native';
import * as React from 'react';
import { Pressable, type PressableStateCallbackType, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Text } from '~/components/ui/text';
import { createStyleSheet, useStyles } from '~/styles/stylesheet';
import { withOpacity } from '~/styles/utils/with-opacity';

// TODO(zach): Check up on issue https://github.com/react-navigation/react-navigation/issues/12294

export default function DropdownMenuScreen() {
  const { styles, theme } = useStyles(stylesheet);
  const triggerRef = React.useRef<React.ElementRef<typeof DropdownMenuTrigger>>(null);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <View style={styles.root}>
      <Pressable
        style={styles.externalTrigger}
        onPress={() => {
          // open menu programmatically
          triggerRef.current?.open();
        }}
      />
      <DropdownMenu>
        <DropdownMenuTrigger ref={triggerRef} asChild>
          <Button variant='outline'>
            <Text>Open</Text>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent insets={contentInsets}>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Users color={theme.colors.foreground} size={14} />
              <Text>Team</Text>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <UserPlus color={theme.colors.foreground} size={14} />
                <Text>Invite users</Text>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <Animated.View entering={FadeIn.duration(200)}>
                  <DropdownMenuItem>
                    <Mail color={theme.colors.foreground} size={14} />
                    <Text>Email</Text>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare color={theme.colors.foreground} size={14} />
                    <Text>Message</Text>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <PlusCircle color={theme.colors.foreground} size={14} />
                    <Text>More...</Text>
                  </DropdownMenuItem>
                </Animated.View>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem>
              <Plus color={theme.colors.foreground} size={14} />
              <Text>New Team</Text>
              <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Github color={theme.colors.foreground} size={14} />
            <Text>GitHub</Text>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LifeBuoy color={theme.colors.foreground} size={14} />
            <Text>Support</Text>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Cloud color={theme.colors.foreground} size={14} />
            <Text>API</Text>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut color={theme.colors.foreground} size={14} />
            <Text>Log out</Text>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </View>
  );
}

const stylesheet = createStyleSheet(({ colors, utils }) => {
  return {
    root: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
  };
});
