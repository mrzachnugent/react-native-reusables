import * as PopoverPrimitive from '@rn-primitives/popover';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from '~/styles/stylesheet';
import { TextStyleContext } from './text';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  PopoverPrimitive.ContentRef,
  PopoverPrimitive.ContentProps & { portalHost?: string }
>(({ style, align = 'center', sideOffset = 4, portalHost, ...props }, ref) => {
  const { styles } = useStyles(stylesheet);
  return (
    <PopoverPrimitive.Portal hostName={portalHost}>
      <PopoverPrimitive.Overlay style={StyleSheet.absoluteFill}>
        <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut}>
          <TextStyleContext.Provider value={styles.text}>
            <PopoverPrimitive.Content
              ref={ref}
              align={align}
              sideOffset={sideOffset}
              style={style ? StyleSheet.flatten([styles.content, style]) : styles.content}
              {...props}
            />
          </TextStyleContext.Provider>
        </Animated.View>
      </PopoverPrimitive.Overlay>
    </PopoverPrimitive.Portal>
  );
});
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverContent, PopoverTrigger };

const stylesheet = createStyleSheet(({ colors, utils }) => {
  return {
    text: {
      color: colors.popoverForeground,
    },
    content: {
      width: utils.space(72),
      borderRadius: utils.rounded('md'),
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.popover,
      padding: utils.space(4),
      ...utils.shadow('md'),
    },
  };
});
