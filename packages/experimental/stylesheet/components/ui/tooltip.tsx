import * as TooltipPrimitive from '@rn-primitives/tooltip';
import * as React from 'react';
import { Platform, StyleSheet, ViewStyle } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { TextClassContext } from '~/components/ui/text';
import { createStyleSheet, useStyleSheet } from '~/lib/styles/stylesheet';
import { cs } from '~/lib/styles/utils/combine';
import { shadow } from '~/lib/styles/utils/shadow';

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  TooltipPrimitive.ContentRef,
  TooltipPrimitive.ContentProps & { portalHost?: string }
>(({ style, sideOffset = 4, portalHost, ...props }, ref) => {
  const { styles } = useStyleSheet(stylesheet);
  return (
    <TooltipPrimitive.Portal hostName={portalHost}>
      <TooltipPrimitive.Overlay style={Platform.OS !== 'web' ? StyleSheet.absoluteFill : undefined}>
        <Animated.View
          entering={Platform.select({ web: undefined, default: FadeIn })}
          exiting={Platform.select({ web: undefined, default: FadeOut })}
        >
          <TextClassContext.Provider value={styles.text}>
            <TooltipPrimitive.Content
              ref={ref}
              sideOffset={sideOffset}
              style={cs(styles.content, style) as ViewStyle}
              {...props}
            />
          </TextClassContext.Provider>
        </Animated.View>
      </TooltipPrimitive.Overlay>
    </TooltipPrimitive.Portal>
  );
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipContent, TooltipTrigger };

const stylesheet = createStyleSheet(({ colors }, { space, rounded, fontSize }) => {
  return {
    text: {
      color: colors.popoverForeground,
      fontSize: fontSize['sm'],
    },
    content: {
      zIndex: 50,
      borderRadius: rounded['md'],
      borderWidth: space['hairline'],
      borderColor: colors.border,
      backgroundColor: colors.popover,
      paddingHorizontal: space[3],
      paddingVertical: space[1.5],
      ...shadow['md'],
    },
  };
});
