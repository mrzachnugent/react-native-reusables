import React from 'react';
import { GestureResponderEvent, Pressable, Text, View } from 'react-native';
import * as Slot from '~/lib/rn-primitives/slot/slot-native';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/types';

interface RootProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  type?: 'foreground' | 'background';
  portalHostName?: string;
}

interface RootContext extends RootProps {
  nativeID: string;
}
const ToastContext = React.createContext<RootContext | null>(null);

const Root = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & RootProps
>(
  (
    {
      asChild,
      type = 'foreground',
      open,
      onOpenChange,
      portalHostName,
      ...viewProps
    },
    ref
  ) => {
    const nativeID = React.useId();

    if (!open) {
      return null;
    }

    const Component = asChild ? Slot.View : View;
    return (
      <ToastContext.Provider
        value={{
          open,
          onOpenChange,
          type,
          nativeID,
        }}
      >
        <Component
          ref={ref}
          role='status'
          aria-live={type === 'foreground' ? 'assertive' : 'polite'}
          {...viewProps}
        />
      </ToastContext.Provider>
    );
  }
);

Root.displayName = 'RootToast';

function useToastContext() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error(
      'Toast compound components cannot be rendered outside the Toast component'
    );
  }
  return context;
}

const Close = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable>
>(({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
  const { onOpenChange } = useToastContext();

  function onPress(ev: GestureResponderEvent) {
    if (disabled) return;
    onOpenChange(false);
    onPressProp?.(ev);
  }

  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <Component
      ref={ref}
      aria-disabled={disabled ?? undefined}
      role='button'
      onPress={onPress}
      disabled={disabled ?? undefined}
      {...props}
    />
  );
});

Close.displayName = 'CloseToast';

const Action = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable>
>(({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
  const { onOpenChange } = useToastContext();

  function onPress(ev: GestureResponderEvent) {
    if (disabled) return;
    onOpenChange(false);
    onPressProp?.(ev);
  }

  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <Component
      ref={ref}
      aria-disabled={disabled ?? undefined}
      role='button'
      onPress={onPress}
      disabled={disabled ?? undefined}
      {...props}
    />
  );
});

Action.displayName = 'ActionToast';

const Title = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>((props, ref) => {
  const { nativeID } = useToastContext();
  return (
    <Text ref={ref} role='heading' nativeID={`${nativeID}_label`} {...props} />
  );
});

Title.displayName = 'TitleToast';

const Description = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>((props, ref) => {
  const { nativeID } = useToastContext();
  return <Text ref={ref} nativeID={`${nativeID}_desc`} {...props} />;
});

Description.displayName = 'DescriptionToast';

export { Action, Close, Description, Root, Title };
