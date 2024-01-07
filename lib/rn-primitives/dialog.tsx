import React from 'react';
import {
  GestureResponderEvent,
  Modal,
  NativeSyntheticEvent,
  Pressable,
  Text,
  View,
} from 'react-native';
import * as Slot from '~/lib/rn-primitives/slot';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/utils';

interface RootProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

interface RootContext extends RootProps {
  nativeID: string;
}
const DialogContext = React.createContext<RootContext | null>(null);

const Root = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & RootProps
>(({ asChild, open, onOpenChange, ...viewProps }, ref) => {
  const nativeID = React.useId();
  const Component = asChild ? Slot.View : View;
  return (
    <DialogContext.Provider
      value={{
        open,
        onOpenChange,
        nativeID,
      }}
    >
      <Component ref={ref} {...viewProps} />
    </DialogContext.Provider>
  );
});

Root.displayName = 'RootDialog';

function useDialogContext() {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error(
      'Dialog compound components cannot be rendered outside the Dialog component'
    );
  }
  return context;
}

const Trigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable>
>(({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
  const { open, onOpenChange } = useDialogContext();

  function onPress(ev: GestureResponderEvent) {
    if (disabled) return;
    const newValue = !open;
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

Trigger.displayName = 'TriggerDialog';

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
    const { open, onOpenChange } = useDialogContext();

    function onRequestClose(ev: NativeSyntheticEvent<any>) {
      onOpenChange(!open);
      onRequestCloseProp?.(ev);
    }

    return (
      <Modal
        ref={ref}
        aria-hidden={!(forceMount || open)}
        transparent={transparent}
        statusBarTranslucent={statusBarTranslucent}
        onRequestClose={onRequestClose}
        visible={forceMount || open}
        {...props}
      />
    );
  }
);

Portal.displayName = 'PortalDialog';

const Overlay = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable> & {
    forceMount?: boolean;
    closeOnPress?: boolean;
    children: NonNullable<
      ComponentPropsWithAsChild<typeof Pressable>['children']
    >;
  }
>(
  (
    {
      asChild,
      forceMount = false,
      closeOnPress = true,
      onPress: OnPressProp,
      ...props
    },
    ref
  ) => {
    const { open, onOpenChange } = useDialogContext();

    function onPress(ev: GestureResponderEvent) {
      if (closeOnPress) {
        onOpenChange(!open);
      }
      OnPressProp?.(ev);
    }

    if (!forceMount) {
      if (!open) {
        return null;
      }
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return <Component ref={ref} onPress={onPress} {...props} />;
  }
);

Overlay.displayName = 'OverlayDialog';

const Content = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable> & { forceMount?: boolean }
>(({ asChild, forceMount = false, ...props }, ref) => {
  const { open, nativeID } = useDialogContext();

  if (!forceMount) {
    if (!open) {
      return null;
    }
  }

  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <Component
      ref={ref}
      role='dialog'
      nativeID={nativeID}
      aria-labelledby={`${nativeID}_label`}
      aria-describedby={`${nativeID}_desc`}
      aria-modal={true}
      {...props}
    />
  );
});

Content.displayName = 'ContentDialog';

const Close = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable>
>(({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
  const { onOpenChange } = useDialogContext();

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

Close.displayName = 'CloseDialog';

const Title = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>((props, ref) => {
  const { nativeID } = useDialogContext();
  return (
    <Text ref={ref} role='heading' nativeID={`${nativeID}_label`} {...props} />
  );
});

Title.displayName = 'TitleDialog';

const Description = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>((props, ref) => {
  const { nativeID } = useDialogContext();
  return <Text ref={ref} nativeID={`${nativeID}_desc`} {...props} />;
});

Description.displayName = 'DescriptionDialog';

export { Close, Content, Description, Overlay, Portal, Root, Title, Trigger };
