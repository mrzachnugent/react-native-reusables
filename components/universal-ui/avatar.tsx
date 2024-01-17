import * as React from 'react';
import * as AvatarPrimitive from '~/lib/rn-primitives/avatar';
import * as Slot from '~/lib/rn-primitives/slot';
import { SlottableTextProps, TextRef } from '~/lib/rn-primitives/types';

import { Text } from 'react-native';
import { cn } from '~/lib/utils';

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

const AvatarFallbackText = React.forwardRef<TextRef, SlottableTextProps>(
  ({ asChild, className, ...props }, ref) => {
    const Component = asChild ? Slot.Text : Text;
    return (
      <Component
        ref={ref}
        className={cn('text-foreground text-base', className)}
        {...props}
      >
        ZN
      </Component>
    );
  }
);
AvatarFallbackText.displayName = 'AvatarFallbackText';

export { Avatar, AvatarImage, AvatarFallback, AvatarFallbackText };
