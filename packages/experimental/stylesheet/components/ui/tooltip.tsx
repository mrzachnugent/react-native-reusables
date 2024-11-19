import * as TooltipPrimitive from '@rn-primitives/tooltip';
import * as React from 'react';
import { Platform, StyleSheet, ViewStyle } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { TextStyleContext } from '~/components/ui/text';
import { createStyleSheet, useStyles } from '~/styles/stylesheet';
import { cs } from '~/styles/utils/combine';

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  TooltipPrimitive.ContentRef,
  TooltipPrimitive.ContentProps & { portalHost?: string }
>(({ style, sideOffset = 4, portalHost, ...props }, ref) => {
  const { styles } = useStyles(stylesheet);
  return (
    <TooltipPrimitive.Portal hostName={portalHost}>
      <TooltipPrimitive.Overlay style={StyleSheet.absoluteFill}>
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <TextStyleContext.Provider value={styles.text}>
            <TooltipPrimitive.Content
              ref={ref}
              sideOffset={sideOffset}
              style={cs(styles.content, style) as ViewStyle}
              {...props}
            />
          </TextStyleContext.Provider>
        </Animated.View>
      </TooltipPrimitive.Overlay>
    </TooltipPrimitive.Portal>
  );
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipContent, TooltipTrigger };

const stylesheet = createStyleSheet(({ colors, utils }, { hairlineWidth }) => {
  return {
    text: {
      color: colors.popoverForeground,
      fontSize: utils.fontSize('sm'),
    },
    content: {
      zIndex: 50,
      borderRadius: utils.rounded('md'),
      borderWidth: hairlineWidth,
      borderColor: colors.border,
      backgroundColor: colors.popover,
      paddingHorizontal: utils.space(3),
      paddingVertical: utils.space(1.5),
      ...Platform.select({
        ios: utils.shadow('md') as ViewStyle,
        android: {
          borderWidth: 1,
        },
      }),
    },
  };
});
