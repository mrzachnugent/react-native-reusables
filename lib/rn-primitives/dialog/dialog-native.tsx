import React from 'react';
import {
  GestureResponderEvent,
  Modal,
  NativeSyntheticEvent,
  Pressable,
  Text,
  View,
} from 'react-native';
import * as Slot from '~/lib/rn-primitives/slot/slot-native';
import type {
  PressableRef,
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
  TextRef,
  ViewRef,
} from '../types';
import type {
  DialogRootProps,
  DialogPortalProps,
  DialogOverlayProps,
  DialogContentProps,
} from './types';

interface RootContext extends DialogRootProps {
  nativeID: string;
}
const DialogContext = React.createContext<RootContext | null>(null);

const Root = React.forwardRef<ViewRef, SlottableViewProps & DialogRootProps>(
  ({ asChild, open, onOpenChange, ...viewProps }, ref) => {
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
  }
);

Root.displayName = 'RootNativeDialog';

function useDialogContext() {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error(
      'Dialog compound components cannot be rendered outside the Dialog component'
    );
  }
  return context;
}

const Trigger = React.forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
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
  }
);

Trigger.displayName = 'TriggerNativeDialog';

const Portal = React.forwardRef<
  React.ElementRef<typeof Modal>,
  React.ComponentPropsWithoutRef<typeof Modal> & DialogPortalProps
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

Portal.displayName = 'PortalNativeDialog';

const Overlay = React.forwardRef<
  PressableRef,
  SlottablePressableProps & DialogOverlayProps
>(
  (
    {
      asChild,
      forceMount,
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

Overlay.displayName = 'OverlayNativeDialog';

const Content = React.forwardRef<
  ViewRef,
  SlottableViewProps & DialogContentProps
>(({ asChild, forceMount, ...props }, ref) => {
  const { open, nativeID } = useDialogContext();

  if (!forceMount) {
    if (!open) {
      return null;
    }
  }

  const Component = asChild ? Slot.View : View;
  return (
    <Component
      ref={ref}
      role='dialog'
      nativeID={nativeID}
      aria-labelledby={`${nativeID}_label`}
      aria-describedby={`${nativeID}_desc`}
      aria-modal={true}
      onStartShouldSetResponder={onStartShouldSetResponder}
      {...props}
    />
  );
});

Content.displayName = 'ContentNativeDialog';

const Close = React.forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
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
  }
);

Close.displayName = 'CloseNativeDialog';

const Title = React.forwardRef<TextRef, SlottableTextProps>((props, ref) => {
  const { nativeID } = useDialogContext();
  return (
    <Text ref={ref} role='heading' nativeID={`${nativeID}_label`} {...props} />
  );
});

Title.displayName = 'TitleNativeDialog';

const Description = React.forwardRef<TextRef, SlottableTextProps>(
  (props, ref) => {
    const { nativeID } = useDialogContext();
    return <Text ref={ref} nativeID={`${nativeID}_desc`} {...props} />;
  }
);

Description.displayName = 'DescriptionNativeDialog';

export { Close, Content, Description, Overlay, Portal, Root, Title, Trigger };

function onStartShouldSetResponder() {
  return true;
}
