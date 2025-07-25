'use client';

import { NativeOnlyAnimatedView } from '@/registry/default/components/ui/native-only-animated-view';
import { TextClassContext } from '@/registry/default/components/ui/text';
import { cn } from '@/registry/default/lib/utils';
import * as HoverCardPrimitive from '@rn-primitives/hover-card';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { FadeIn, FadeOut } from 'react-native-reanimated';

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

function HoverCardContent({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: HoverCardPrimitive.ContentProps & {
  ref?: React.RefObject<null | HoverCardPrimitive.ContentRef>;
}) {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Overlay style={Platform.select({ native: StyleSheet.absoluteFill })}>
        <NativeOnlyAnimatedView entering={FadeIn} exiting={FadeOut}>
          <TextClassContext.Provider value="text-popover-foreground">
            <HoverCardPrimitive.Content
              align={align}
              sideOffset={sideOffset}
              className={cn(
                'bg-popover border-border outline-hidden z-50 w-64 rounded-md border p-4 shadow-md',
                Platform.select({
                  web: cn(
                    'animate-in fade-in-0 zoom-in-95 origin-(--radix-hover-card-content-transform-origin) cursor-default [&>*]:cursor-auto',
                    props.side === 'bottom' && 'slide-in-from-top-2',
                    props.side === 'top' && 'slide-in-from-bottom-2'
                  ),
                  native: 'shadow-black/10',
                }),
                className
              )}
              {...props}
            />
          </TextClassContext.Provider>
        </NativeOnlyAnimatedView>
      </HoverCardPrimitive.Overlay>
    </HoverCardPrimitive.Portal>
  );
}

export { HoverCard, HoverCardContent, HoverCardTrigger };
