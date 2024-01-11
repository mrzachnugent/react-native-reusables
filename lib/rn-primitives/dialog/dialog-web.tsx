import * as Dialog from '@radix-ui/react-dialog';
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
  DialogContentProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogRootProps,
} from './types';

const Root = React.forwardRef<ViewRef, SlottableViewProps & DialogRootProps>(
  ({ asChild, open, onOpenChange, ...viewProps }, ref) => {
    const Component = asChild ? Slot.View : View;
    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Component ref={ref} {...viewProps} />
      </Dialog.Root>
    );
  }
);

Root.displayName = 'RootWebDialog';

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
        <Dialog.Trigger
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

Trigger.displayName = 'TriggerWebDialog';

/**
 * @param {object} props.forceMount - Platform: ALL
 * @param {string} props.container - Platform: WEB ONLY
 * @param {rest} ...rest - Platform: Native - Modal props
 */
const Portal = React.forwardRef<
  React.ElementRef<typeof Modal>,
  React.ComponentPropsWithoutRef<typeof Modal> & DialogPortalProps
>(({ forceMount, container, children }, _ref) => {
  return (
    <Dialog.Portal
      forceMount={forceMount}
      children={children}
      container={container}
    />
  );
});

Portal.displayName = 'PortalWebDialog';

const Overlay = React.forwardRef<
  PressableRef,
  SlottablePressableProps & DialogOverlayProps
>(({ asChild, forceMount, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <Dialog.Overlay forceMount={forceMount} asChild>
      <Component ref={ref} {...props} />
    </Dialog.Overlay>
  );
});

Overlay.displayName = 'OverlayWebDialog';

const Content = React.forwardRef<
  PressableRef,
  SlottablePressableProps & DialogContentProps
>(
  (
    {
      asChild,
      forceMount,

      onOpenAutoFocus,
      onCloseAutoFocus,
      onEscapeKeyDown,
      onInteractOutside,
      onPointerDownOutside,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Dialog.Content
        onOpenAutoFocus={onOpenAutoFocus}
        onCloseAutoFocus={onCloseAutoFocus}
        onEscapeKeyDown={onEscapeKeyDown}
        onInteractOutside={onInteractOutside}
        onPointerDownOutside={onPointerDownOutside}
        forceMount={forceMount}
      >
        {/* @ts-expect-error tabIndex is web-only */}
        <Component ref={ref} tabIndex={-1} {...props} />
      </Dialog.Content>
    );
  }
);

Content.displayName = 'ContentWebDialog';

const Close = React.forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, ...props }, ref) => {
    const { buttonRef, hideHtmlButtonProps, pressableProps } =
      useTrigger<HTMLButtonElement>(props);

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <>
        <Dialog.Close ref={buttonRef} {...hideHtmlButtonProps} />
        <Dialog.Close asChild>
          <Component ref={ref} role='button' {...pressableProps} />
        </Dialog.Close>
      </>
    );
  }
);

Close.displayName = 'CloseWebDialog';

const Title = React.forwardRef<TextRef, SlottableTextProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.Text : Text;
    return (
      <Dialog.Title asChild>
        <Component ref={ref} {...props} />
      </Dialog.Title>
    );
  }
);

Title.displayName = 'TitleWebDialog';

const Description = React.forwardRef<TextRef, SlottableTextProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.Text : Text;
    return (
      <Dialog.Description asChild>
        <Component ref={ref} {...props} />
      </Dialog.Description>
    );
  }
);

Description.displayName = 'DescriptionWebDialog';

export { Close, Content, Description, Overlay, Portal, Root, Title, Trigger };
