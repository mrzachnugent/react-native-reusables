import React from 'react';
import {
  Modal,
  Pressable,
  Text,
  View,
  type GestureResponderEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import * as Slot from '../slot';
import type {
  PressableRef,
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
  TextRef,
  ViewRef,
} from '../types';
import type {
  AlertDialogRootProps,
  AlertDialogContentProps,
  AlertDialogOverlayProps,
  AlertDialogPortalProps,
} from './types';

type AlertDialogContext = AlertDialogRootProps & {
  nativeID: string;
};

const AlertDialogContext = React.createContext<AlertDialogContext | null>(null);

const Root = React.forwardRef<
  ViewRef,
  SlottableViewProps & AlertDialogRootProps
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

Root.displayName = 'RootNativeAlertDialog';

function useAlertDialogContext() {
  const context = React.useContext(AlertDialogContext);
  if (!context) {
    throw new Error(
      'AlertDialog compound components cannot be rendered outside the AlertDialog component'
    );
  }
  return context;
}

const Trigger = React.forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
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
  }
);

Trigger.displayName = 'TriggerNativeAlertDialog';

const Portal = React.forwardRef<
  React.ElementRef<typeof Modal>,
  React.ComponentPropsWithoutRef<typeof Modal> & AlertDialogPortalProps
>(
  (
    {
      transparent = true,
      statusBarTranslucent = true,
      forceMount,
      onRequestClose: onRequestCloseProp,
      container: _container,
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

Portal.displayName = 'PortalNativeAlertDialog';

const Overlay = React.forwardRef<
  ViewRef,
  SlottableViewProps & AlertDialogOverlayProps
>(({ asChild, forceMount, ...props }, ref) => {
  const { open: value } = useAlertDialogContext();

  if (!forceMount) {
    if (!value) {
      return null;
    }
  }

  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} {...props} />;
});

Overlay.displayName = 'OverlayNativeAlertDialog';

const Content = React.forwardRef<
  ViewRef,
  SlottableViewProps & AlertDialogContentProps
>(({ asChild, forceMount, ...props }, ref) => {
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

Content.displayName = 'ContentNativeAlertDialog';

const Cancel = React.forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
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
  }
);

Cancel.displayName = 'CloseNativeAlertDialog';

const Action = React.forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
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
  }
);

Action.displayName = 'ActionNativeAlertDialog';

const Title = React.forwardRef<TextRef, SlottableTextProps>(
  ({ asChild, ...props }, ref) => {
    const { nativeID } = useAlertDialogContext();
    const Component = asChild ? Slot.Text : Text;
    return (
      <Component
        ref={ref}
        role='heading'
        nativeID={`${nativeID}_label`}
        {...props}
      />
    );
  }
);

Title.displayName = 'TitleNativeAlertDialog';

const Description = React.forwardRef<TextRef, SlottableTextProps>(
  ({ asChild, ...props }, ref) => {
    const { nativeID } = useAlertDialogContext();
    const Component = asChild ? Slot.Text : Text;
    return <Component ref={ref} nativeID={`${nativeID}_desc`} {...props} />;
  }
);

Description.displayName = 'DescriptionNativeAlertDialog';

export {
  Action,
  Cancel,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
};
