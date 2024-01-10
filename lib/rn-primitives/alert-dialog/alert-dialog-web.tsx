import * as AlertDialog from '@radix-ui/react-alert-dialog';
import React from 'react';
import {
  Modal,
  Pressable,
  Text,
  View,
  type GestureResponderEvent,
} from 'react-native';
import { useTrigger } from '../hooks/useTrigger';
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
  ContentProps,
  OverlayProps,
  PortalProps,
} from './types';

const Root = React.forwardRef<
  ViewRef,
  SlottableViewProps & AlertDialogRootProps
>(({ asChild, open, onOpenChange, ...viewProps }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <Component ref={ref} {...viewProps} />
    </AlertDialog.Root>
  );
});

Root.displayName = 'RootAlertWebDialog';

const Trigger = React.forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, onPress: onPressProp, ...props }, ref) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    function onPress(ev: GestureResponderEvent) {
      if (onPressProp) {
        onPressProp(ev);
      }
      if (buttonRef.current) {
        buttonRef.current.click();
      }
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <>
        <AlertDialog.Trigger
          ref={buttonRef}
          aria-hidden
          style={{ position: 'absolute', zIndex: -999999999 }}
          aria-disabled={true}
          tabIndex={-1}
        />
        <Component ref={ref} onPress={onPress} role='button' {...props} />
      </>
    );
  }
);

Trigger.displayName = 'TriggerAlertWebDialog';

/**
 * @param {object} props.forceMount - Platform: ALL
 * @param {string} props.container - Platform: WEB ONLY
 * @param {rest} ...rest - Platform: Native - Modal props
 */
const Portal = React.forwardRef<
  React.ElementRef<typeof Modal>,
  React.ComponentPropsWithoutRef<typeof Modal> & PortalProps
>(({ forceMount, container, children }, _ref) => {
  return (
    <AlertDialog.Portal
      forceMount={forceMount}
      children={children}
      container={container}
    />
  );
});

Portal.displayName = 'PortalAlertWebDialog';

const Overlay = React.forwardRef<ViewRef, SlottableViewProps & OverlayProps>(
  ({ asChild, forceMount, children, ...props }, ref) => {
    return (
      <Slot.View ref={ref} {...props}>
        <AlertDialog.Overlay>{children}</AlertDialog.Overlay>
      </Slot.View>
    );
  }
);

Overlay.displayName = 'OverlayAlertWebDialog';

const Content = React.forwardRef<
  ViewRef,
  SlottableViewProps &
    ContentProps & {
      /**
       * Platform: WEB ONLY
       */
      onOpenAutoFocus?: (ev: Event) => void;
      /**
       * Platform: WEB ONLY
       */
      onCloseAutoFocus?: (ev: Event) => void;
      /**
       * Platform: WEB ONLY
       */
      onEscapeKeyDown?: (ev: Event) => void;
    }
>(
  (
    {
      asChild,
      forceMount,

      onOpenAutoFocus,
      onCloseAutoFocus,
      onEscapeKeyDown,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot.View : View;
    return (
      <AlertDialog.Content
        onOpenAutoFocus={onOpenAutoFocus}
        onCloseAutoFocus={onCloseAutoFocus}
        onEscapeKeyDown={onEscapeKeyDown}
        forceMount={forceMount}
        asChild
      >
        <Component ref={ref} {...props} />
      </AlertDialog.Content>
    );
  }
);

Content.displayName = 'ContentAlertWebDialog';

const Cancel = React.forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, ...props }, ref) => {
    const { buttonRef, hideHtmlButtonProps, pressableProps } =
      useTrigger(props);

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <>
        <AlertDialog.Cancel ref={buttonRef} {...hideHtmlButtonProps} />
        <AlertDialog.Cancel asChild>
          <Component ref={ref} {...pressableProps} />
        </AlertDialog.Cancel>
      </>
    );
  }
);

Cancel.displayName = 'CancelAlertWebDialog';

const Action = React.forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, ...props }, ref) => {
    const { buttonRef, hideHtmlButtonProps, pressableProps } =
      useTrigger(props);

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <>
        <AlertDialog.Action ref={buttonRef} {...hideHtmlButtonProps} />
        <AlertDialog.Action asChild>
          <Component ref={ref} {...pressableProps} />
        </AlertDialog.Action>
      </>
    );
  }
);

Action.displayName = 'ActionAlertWebDialog';

const Title = React.forwardRef<TextRef, SlottableTextProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.Text : Text;
    return (
      <AlertDialog.Title asChild>
        <Component ref={ref} {...props} />
      </AlertDialog.Title>
    );
  }
);

Title.displayName = 'TitleAlertWebDialog';

const Description = React.forwardRef<TextRef, SlottableTextProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.Text : Text;
    return (
      <AlertDialog.Description asChild>
        <Component ref={ref} {...props} />
      </AlertDialog.Description>
    );
  }
);

Description.displayName = 'DescriptionAlertWebDialog';

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
