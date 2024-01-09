import React from 'react';
import {
  GestureResponderEvent,
  Modal,
  NativeSyntheticEvent,
  Pressable,
  Text,
  View,
} from 'react-native';
import * as Slot from '~/lib/rn-primitives/native/slot';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/types';

interface RootProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

interface RootContext extends RootProps {
  nativeID: string;
}

const AlertDialogContext = React.createContext<RootContext | null>(null);

const Root = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & RootProps
>(({ asChild, open: value, onOpenChange, ...viewProps }, ref) => {
  const nativeID = React.useId();
  const Component = asChild ? Slot.View : View;
  return (
    <AlertDialogContext.Provider
      value={{
        open: value,
        onOpenChange,
        nativeID,
      }}
    >
      <Component ref={ref} {...viewProps} />
    </AlertDialogContext.Provider>
  );
});

Root.displayName = 'RootAlertDialog';

function useAlertDialogContext() {
  const context = React.useContext(AlertDialogContext);
  if (!context) {
    throw new Error(
      'AlertDialog compound components cannot be rendered outside the AlertDialog component'
    );
  }
  return context;
}

const Trigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable>
>(({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
  const { open: value, onOpenChange } = useAlertDialogContext();

  function onPress(ev: GestureResponderEvent) {
    if (disabled) return;
    const newValue = !value;
    onOpenChange(newValue);
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

Trigger.displayName = 'TriggerAlertDialog';

const Portal = React.forwardRef<
  React.ElementRef<typeof Modal>,
  React.ComponentPropsWithoutRef<typeof Modal> & {
    forceMount?: boolean;
  }
>(
  (
    {
      transparent = true,
      statusBarTranslucent = true,
      forceMount,
      onRequestClose: onRequestCloseProp,
      ...props
    },
    ref
  ) => {
    const { open: value, onOpenChange } = useAlertDialogContext();

    function onRequestClose(ev: NativeSyntheticEvent<any>) {
      onOpenChange(!value);
      onRequestCloseProp?.(ev);
    }

    return (
      <Modal
        ref={ref}
        aria-hidden={!(forceMount || value)}
        transparent={transparent}
        statusBarTranslucent={statusBarTranslucent}
        onRequestClose={onRequestClose}
        visible={forceMount || value}
        {...props}
      />
    );
  }
);

Portal.displayName = 'PortalAlertDialog';

const Overlay = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & {
    forceMount?: boolean;
    closeOnPress?: boolean;
  }
>(({ asChild, forceMount = false, closeOnPress = true, ...props }, ref) => {
  const { open: value } = useAlertDialogContext();

  if (!forceMount) {
    if (!value) {
      return null;
    }
  }

  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} {...props} />;
});

Overlay.displayName = 'OverlayAlertDialog';

const Content = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & { forceMount?: boolean }
>(({ asChild, forceMount = false, ...props }, ref) => {
  const { open: value, nativeID } = useAlertDialogContext();

  if (!forceMount) {
    if (!value) {
      return null;
    }
  }

  const Component = asChild ? Slot.View : View;
  return (
    <Component
      ref={ref}
      role='alertdialog'
      nativeID={nativeID}
      aria-labelledby={`${nativeID}_label`}
      aria-describedby={`${nativeID}_desc`}
      aria-modal={true}
      {...props}
    />
  );
});

Content.displayName = 'ContentAlertDialog';

const Close = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable>
>(({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
  const { onOpenChange } = useAlertDialogContext();

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

Close.displayName = 'CloseAlertDialog';

const Action = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable>
>(({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
  const { onOpenChange } = useAlertDialogContext();

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

Action.displayName = 'ActionAlertDialog';

const Title = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>((props, ref) => {
  const { nativeID } = useAlertDialogContext();
  return (
    <Text ref={ref} role='heading' nativeID={`${nativeID}_label`} {...props} />
  );
});

Title.displayName = 'TitleAlertDialog';

const Description = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>((props, ref) => {
  const { nativeID } = useAlertDialogContext();
  return <Text ref={ref} nativeID={`${nativeID}_desc`} {...props} />;
});

Description.displayName = 'DescriptionAlertDialog';

export {
  Action,
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
};
