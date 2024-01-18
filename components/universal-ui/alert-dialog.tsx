import * as React from 'react';
import * as AlertDialogPrimitive from '~/lib/rn-primitives/alert-dialog';

import { Text, View, StyleSheet, Platform } from 'react-native';
import {
  ButtonText,
  buttonTextVariants,
  buttonVariants,
} from '~/components/universal-ui/button';
import { cn } from '~/lib/utils';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlayWeb = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  const { open } = AlertDialogPrimitive.useContext();
  return (
    <AlertDialogPrimitive.Overlay
      style={StyleSheet.absoluteFill}
      className={cn(
        'z-50 bg-black/80 flex justify-center items-center p-2',
        open ? 'animate-in fade-in-0' : 'animate-out fade-out-0',
        className
      )}
      {...props}
      ref={ref}
    />
  );
});

AlertDialogOverlayWeb.displayName = 'AlertDialogOverlayWeb';

const AlertDialogOverlayNative = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, children, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Overlay
      style={StyleSheet.absoluteFill}
      className={cn(
        'z-50 bg-black/80 flex justify-center items-center p-2',
        className
      )}
      {...props}
      ref={ref}
      asChild
    >
      <Animated.View
        entering={FadeIn.duration(150)}
        exiting={FadeOut.duration(150)}
      >
        {children}
      </Animated.View>
    </AlertDialogPrimitive.Overlay>
  );
});

AlertDialogOverlayNative.displayName = 'AlertDialogOverlayNative';

const AlertDialogOverlay = Platform.select({
  web: AlertDialogOverlayWeb,
  default: AlertDialogOverlayNative,
});

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => {
  const { open } = AlertDialogPrimitive.useContext();

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay>
        <Animated.View entering={FadeIn} exiting={FadeOut.duration(150)}>
          <AlertDialogPrimitive.Content
            ref={ref}
            className={cn(
              'z-50 max-w-lg gap-4 border border-border bg-background p-6 shadow-lg duration-200 rounded-lg',
              open
                ? 'web:animate-in web:fade-in-0 web:zoom-in-95'
                : 'web:animate-out web:fade-out-0 web:zoom-out-95',
              className
            )}
            {...props}
          />
        </Animated.View>
      </AlertDialogOverlay>
    </AlertDialogPortal>
  );
});
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => (
  <View className={cn('flex flex-col gap-2', className)} {...props} />
);
AlertDialogHeader.displayName = 'AlertDialogHeader';

const AlertDialogFooter = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => (
  <View
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end gap-2',
      className
    )}
    {...props}
  />
);
AlertDialogFooter.displayName = 'AlertDialogFooter';

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg native:text-xl text-foreground font-semibold',
      className
    )}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn('text-sm native:text-base text-muted-foreground', className)}
    {...props}
  />
));
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogActionText = React.forwardRef<
  React.ElementRef<typeof ButtonText>,
  React.ComponentPropsWithoutRef<typeof ButtonText>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn(buttonTextVariants({ className }))}
    {...props}
  />
));
AlertDialogActionText.displayName = 'AlertDialogActionText';

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: 'outline', className }))}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

const AlertDialogCancelText = React.forwardRef<
  React.ElementRef<typeof ButtonText>,
  React.ComponentPropsWithoutRef<typeof ButtonText>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn(buttonTextVariants({ className, variant: 'outline' }))}
    {...props}
  />
));
AlertDialogCancelText.displayName = 'AlertDialogCancelText';

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogActionText,
  AlertDialogCancel,
  AlertDialogCancelText,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};
