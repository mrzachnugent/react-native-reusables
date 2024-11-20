import * as HoverCardPrimitive from '@rn-primitives/hover-card';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from '~/styles/stylesheet';
import { withOpacity } from '~/styles/utils/with-opacity';
import { TextStyleContext } from './text';

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
  HoverCardPrimitive.ContentRef,
  HoverCardPrimitive.ContentProps
>(({ style, align = 'center', sideOffset = 4, ...props }, ref) => {
  const { styles } = useStyles(stylesheet);
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Overlay style={StyleSheet.absoluteFill}>
        <Animated.View entering={FadeIn}>
          <TextStyleContext.Provider value={styles.text}>
            <HoverCardPrimitive.Content
              ref={ref}
              align={align}
              sideOffset={sideOffset}
              style={style ? StyleSheet.flatten([styles.root, style]) : styles.root}
              {...props}
            />
          </TextStyleContext.Provider>
        </Animated.View>
      </HoverCardPrimitive.Overlay>
    </HoverCardPrimitive.Portal>
  );
});
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardContent, HoverCardTrigger };

const stylesheet = createStyleSheet(({ colors, utils }) => {
  return {
    text: {
      color: colors.popoverForeground,
    },
    root: {
      width: utils.rem(24),
      borderRadius: utils.rounded('md'),
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.popover,
      padding: utils.space(4),
      ...utils.shadow('md'),
      shadowColor: withOpacity(colors.foreground, 0.05),
    },
  };
});
