'use client';

import { NativeOnlyAnimatedView } from '@/registry/default/components/ui/native-only-animated-view';
import { TextClassContext } from '@/registry/default/components/ui/text';
import { cn } from '@/registry/default/lib/utils';
import * as TooltipPrimitive from '@rn-primitives/tooltip';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated';

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

function TooltipContent({
  className,
  sideOffset = 4,
  portalHost,
  side = 'top',
  ...props
}: TooltipPrimitive.ContentProps & {
  ref?: React.RefObject<TooltipPrimitive.ContentRef>;
  portalHost?: string;
}) {
  return (
    <TooltipPrimitive.Portal hostName={portalHost}>
      <TooltipPrimitive.Overlay style={Platform.select({ native: StyleSheet.absoluteFill })}>
        <NativeOnlyAnimatedView
          entering={
            side === 'top'
              ? FadeInDown.withInitialValues({ transform: [{ translateY: 3 }] }).duration(150)
              : FadeInUp.withInitialValues({ transform: [{ translateY: -5 }] })
          }
          exiting={FadeOut}
        >
          <TextClassContext.Provider value='text-sm text-popover-foreground'>
            <TooltipPrimitive.Content
              sideOffset={sideOffset}
              className={cn(
                'bg-popover border border-border z-50 rounded-md px-3 py-2 sm:py-1.5',
                Platform.select({
                  web: cn(
                    'animate-in fade-in-0 zoom-in-95 w-fit origin-(--radix-tooltip-content-transform-origin) text-balance',
                    side === 'bottom' && 'slide-in-from-top-2',
                    side === 'left' && 'slide-in-from-right-2',
                    side === 'right' && 'slide-in-from-left-2',
                    side === 'top' && 'slide-in-from-bottom-2'
                  ),
                }),
                className
              )}
              side={side}
              {...props}
            />
          </TextClassContext.Provider>
        </NativeOnlyAnimatedView>
      </TooltipPrimitive.Overlay>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipContent, TooltipTrigger };
