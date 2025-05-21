import * as AlertDialogPrimitive from '@rn-primitives/alert-dialog';
import * as React from 'react';
import { Platform, View, type ViewProps } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { buttonTextVariants, buttonVariants } from '../../components/ui/button';
import { cn } from '../../lib/utils';
import { TextClassContext } from './text';

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

function AlertDialogOverlayWeb({
  className,
  ...props
}: AlertDialogPrimitive.OverlayProps & {
  ref?: React.RefObject<AlertDialogPrimitive.OverlayRef>;
}) {
  const { open } = AlertDialogPrimitive.useRootContext();
  return (
    <AlertDialogPrimitive.Overlay
      className={cn(
        'z-50 bg-black/80 flex justify-center items-center p-2 absolute top-0 right-0 bottom-0 left-0',
        open ? 'web:animate-in web:fade-in-0' : 'web:animate-out web:fade-out-0',
        className
      )}
      {...props}
    />
  );
}

function AlertDialogOverlayNative({
  className,
  children,
  ...props
}: AlertDialogPrimitive.OverlayProps & {
  ref?: React.RefObject<AlertDialogPrimitive.OverlayRef>;
}) {
  return (
    <AlertDialogPrimitive.Overlay
      className={cn(
        'z-50 absolute top-0 right-0 bottom-0 left-0 bg-black/80 flex justify-center items-center p-2',
        className
      )}
      {...props}
      asChild
    >
      <Animated.View entering={FadeIn.duration(150)} exiting={FadeOut.duration(150)}>
        {children}
      </Animated.View>
    </AlertDialogPrimitive.Overlay>
  );
}

const AlertDialogOverlay = Platform.select({
  web: AlertDialogOverlayWeb,
  default: AlertDialogOverlayNative,
});

function AlertDialogContent({
  className,
  portalHost,
  ...props
}: AlertDialogPrimitive.ContentProps & {
  ref?: React.RefObject<AlertDialogPrimitive.ContentRef>;
  portalHost?: string;
}) {
  const { open } = AlertDialogPrimitive.useRootContext();

  return (
    <AlertDialogPortal hostName={portalHost}>
      <AlertDialogOverlay>
        <AlertDialogPrimitive.Content
          className={cn(
            'z-50 max-w-lg gap-4 border border-border bg-background p-6 shadow-lg shadow-foreground/10 web:duration-200 rounded-lg',
            open
              ? 'web:animate-in web:fade-in-0 web:zoom-in-95'
              : 'web:animate-out web:fade-out-0 web:zoom-out-95',
            className
          )}
          {...props}
        />
      </AlertDialogOverlay>
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({ className, ...props }: ViewProps) {
  return <View className={cn('flex flex-col gap-2', className)} {...props} />;
}

function AlertDialogFooter({ className, ...props }: ViewProps) {
  return (
    <View
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end gap-2', className)}
      {...props}
    />
  );
}

function AlertDialogTitle({
  className,
  ...props
}: AlertDialogPrimitive.TitleProps & {
  ref?: React.RefObject<AlertDialogPrimitive.TitleRef>;
}) {
  return (
    <AlertDialogPrimitive.Title
      className={cn('text-lg native:text-xl text-foreground font-semibold', className)}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: AlertDialogPrimitive.DescriptionProps & {
  ref?: React.RefObject<AlertDialogPrimitive.DescriptionRef>;
}) {
  return (
    <AlertDialogPrimitive.Description
      className={cn('text-sm native:text-base text-muted-foreground', className)}
      {...props}
    />
  );
}

function AlertDialogAction({
  className,
  ...props
}: AlertDialogPrimitive.ActionProps & {
  ref?: React.RefObject<AlertDialogPrimitive.ActionRef>;
}) {
  return (
    <TextClassContext.Provider value={buttonTextVariants({ className })}>
      <AlertDialogPrimitive.Action className={cn(buttonVariants(), className)} {...props} />
    </TextClassContext.Provider>
  );
}

function AlertDialogCancel({
  className,
  ...props
}: AlertDialogPrimitive.CancelProps & {
  ref?: React.RefObject<AlertDialogPrimitive.CancelRef>;
}) {
  return (
    <TextClassContext.Provider value={buttonTextVariants({ className, variant: 'outline' })}>
      <AlertDialogPrimitive.Cancel
        className={cn(buttonVariants({ variant: 'outline', className }))}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};
