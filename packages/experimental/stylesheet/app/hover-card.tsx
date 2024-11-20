import { CalendarDays } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, type PressableStateCallbackType, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
import { Text } from '~/components/ui/text';
import { createStyleSheet, useStyles } from '~/styles/stylesheet';
import { withOpacity } from '~/styles/utils/with-opacity';

// TODO(zach): For New Arch - Fix @rn-primitives/hooks -> useRelativePosition - https://stackoverflow.com/a/76888613

export default function HoverCardScreen() {
  const { styles, theme } = useStyles(stylesheet);
  const triggerRef = React.useRef<React.ElementRef<typeof HoverCardTrigger>>(null);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  return (
    <>
      <View style={styles.root}>
        <Pressable
          style={styles.externalTrigger}
          onPress={() => {
            // open programmatically
            triggerRef.current?.open();
          }}
        />
        <HoverCard>
          <HoverCardTrigger ref={triggerRef} asChild>
            <Button variant='link' size='lg'>
              <Text>@nextjs</Text>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent
            insets={contentInsets}
            // hack
            sideOffset={insets.top + insets.bottom}
            side='bottom'
            align='center'
            style={styles.content}
          >
            <Avatar alt='Vercel avatar'>
              <AvatarImage source={{ uri: 'https://github.com/vercel.png' }} />
              <AvatarFallback>
                <Text>VA</Text>
              </AvatarFallback>
            </Avatar>
            <View style={styles.wrapper}>
              <Text style={styles.semibold}>@nextjs</Text>
              <Text>The React Framework – created and maintained by @vercel.</Text>
              <View style={styles.footer}>
                <CalendarDays size={14} color={withOpacity(theme.colors.foreground, 0.7)} />
                <Text style={styles.footerText}>Joined December 2021</Text>
              </View>
            </View>
          </HoverCardContent>
        </HoverCard>
      </View>
    </>
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
    content: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: utils.space(4),
    },
    wrapper: {
      flex: 1,
      gap: utils.space(1),
    },
    semibold: {
      fontWeight: utils.fontWeight('semibold'),
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: utils.space(2),
      gap: utils.space(2),
    },
    footerText: {
      fontSize: utils.fontSize('sm'),
      color: colors.mutedForeground,
    },
  };
});
