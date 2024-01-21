import * as React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import * as PopoverPrimitive from '~/lib/rn-primitives/popover';
import * as Slot from '~/lib/rn-primitives/slot';
import { SlottableTextProps, TextRef } from '~/lib/rn-primitives/types';

import { cn } from '~/lib/utils';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => {
  const open = true;
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Overlay
        style={Platform.OS !== 'web' ? StyleSheet.absoluteFill : undefined}
      >
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <PopoverPrimitive.Content
            ref={ref}
            align={align}
            sideOffset={sideOffset}
            className={cn(
              'z-50 w-72 rounded-md web:cursor-auto border border-border bg-popover p-4 shadow-md web:outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
              open
                ? 'web:animate-in web:zoom-in-95 web:fade-in-0'
                : 'web:animate-out web:fade-out-0 web:zoom-out-95',
              className
            )}
            {...props}
          />
        </Animated.View>
      </PopoverPrimitive.Overlay>
    </PopoverPrimitive.Portal>
  );
});
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

const PopoverText = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Text : Text;
    return (
      <Component
        ref={ref}
        className={cn('text-popover-foreground', className)}
        {...props}
      />
    );
  }
);
PopoverText.displayName = 'PopoverText';

export { Popover, PopoverTrigger, PopoverContent, PopoverText };
