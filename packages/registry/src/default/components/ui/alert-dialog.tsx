'use client';

import { buttonTextVariants, buttonVariants } from '@/registry/default/components/ui/button';
import { NativeOnlyAnimatedView } from '@/registry/default/components/ui/native-only-animated-view';
import { TextClassContext } from '@/registry/default/components/ui/text';
import { cn } from '@/registry/default/lib/utils';
import * as AlertDialogPrimitive from '@rn-primitives/alert-dialog';
import * as React from 'react';
import { Platform, View, type ViewProps } from 'react-native';
import { FadeIn, FadeOut } from 'react-native-reanimated';

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

function AlertDialogOverlay({
  className,
  children,
  ...props
}: Omit<AlertDialogPrimitive.OverlayProps, 'asChild'> & {
  ref?: React.RefObject<null | AlertDialogPrimitive.OverlayRef>;
}) {
  return (
    <AlertDialogPrimitive.Overlay
      className={cn(
        'absolute bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black/80 p-2',
        Platform.select({
          web: 'animate-in fade-in-0 fixed',
        }),
        className
      )}
      {...props}>
      <NativeOnlyAnimatedView
        entering={FadeIn.duration(200).delay(50)}
        exiting={FadeOut.duration(150)}>
        <>{children}</>
      </NativeOnlyAnimatedView>
    </AlertDialogPrimitive.Overlay>
  );
}

function AlertDialogContent({
  className,
  portalHost,
  ...props
}: AlertDialogPrimitive.ContentProps & {
  ref?: React.RefObject<null | AlertDialogPrimitive.ContentRef>;
  portalHost?: string;
}) {
  return (
    <AlertDialogPortal hostName={portalHost}>
      <AlertDialogOverlay>
        <AlertDialogPrimitive.Content
          className={cn(
            'bg-background border-border z-50 flex max-w-lg flex-col gap-4 rounded-lg border p-6 shadow-lg',
            Platform.select({
              web: 'animate-in fade-in-0 zoom-in-95 duration-200',
            }),
            className
          )}
          {...props}
        />
      </AlertDialogOverlay>
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({ className, ...props }: ViewProps) {
  return (
    <TextClassContext.Provider value="text-center sm:text-left">
      <View className={cn('flex flex-col gap-2', className)} {...props} />
    </TextClassContext.Provider>
  );
}

function AlertDialogFooter({ className, ...props }: ViewProps) {
  return (
    <View
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2', className)}
      {...props}
    />
  );
}

function AlertDialogTitle({
  className,
  ...props
}: AlertDialogPrimitive.TitleProps & {
  ref?: React.RefObject<null | AlertDialogPrimitive.TitleRef>;
}) {
  return (
    <AlertDialogPrimitive.Title
      className={cn('text-foreground text-lg font-semibold', className)}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: AlertDialogPrimitive.DescriptionProps & {
  ref?: React.RefObject<null | AlertDialogPrimitive.DescriptionRef>;
}) {
  return (
    <AlertDialogPrimitive.Description
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

function AlertDialogAction({
  className,
  ...props
}: AlertDialogPrimitive.ActionProps & {
  ref?: React.RefObject<null | AlertDialogPrimitive.ActionRef>;
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
  ref?: React.RefObject<null | AlertDialogPrimitive.CancelRef>;
}) {
  return (
    <TextClassContext.Provider value={buttonTextVariants({ className, variant: 'outline' })}>
      <AlertDialogPrimitive.Cancel
        className={cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0', className)}
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
