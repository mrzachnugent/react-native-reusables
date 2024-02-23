import * as ContextMenu from '@radix-ui/react-context-menu';
import * as React from 'react';
import { GestureResponderEvent, Pressable, Text, View } from 'react-native';
import * as Slot from '~/components/primitives/slot/slot-native';
import { useAugmentedRef } from '~/components/primitives/hooks';
import type {
  ForceMountable,
  PositionedContentProps,
  PressableRef,
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
  TextRef,
  ViewRef,
} from '~/components/primitives/types';
import type {
  ContextMenuCheckboxItemProps,
  ContextMenuItemProps,
  ContextMenuOverlayProps,
  ContextMenuPortalProps,
  ContextMenuRadioGroupProps,
  ContextMenuRadioItemProps,
  ContextMenuRootProps,
  ContextMenuSeparatorProps,
  ContextMenuSubProps,
  ContextMenuSubTriggerProps,
} from './types';
import { EmptyGestureResponderEvent } from '~/components/primitives/utils';

const ContextMenuContext = React.createContext<ContextMenuRootProps | null>(
  null
);

const Root = React.forwardRef<
  ViewRef,
  SlottableViewProps & ContextMenuRootProps
>(({ asChild, open, onOpenChange, ...viewProps }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <ContextMenuContext.Provider value={{ open, onOpenChange }}>
      <ContextMenu.Root onOpenChange={onOpenChange}>
        <Component ref={ref} {...viewProps} />
      </ContextMenu.Root>
    </ContextMenuContext.Provider>
  );
});

Root.displayName = 'RootWebContextMenu';

function useContextMenuContext() {
  const context = React.useContext(ContextMenuContext);
  if (!context) {
    throw new Error(
      'ContextMenu compound components cannot be rendered outside the ContextMenu component'
    );
  }
  return context;
}

const Trigger = React.forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, disabled = false, ...props }, ref) => {
    const augmentedRef = useAugmentedRef({ ref });
    const { open } = useContextMenuContext();

    React.useLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLDivElement;
        augRef.dataset.state = open ? 'open' : 'closed';
      }
    }, [open]);

    React.useLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLDivElement;
        if (disabled) {
          augRef.dataset.disabled = 'true';
        } else {
          augRef.dataset.disabled = undefined;
        }
      }
    }, [disabled]);

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <ContextMenu.Trigger disabled={disabled ?? undefined} asChild>
        <Component ref={augmentedRef} disabled={disabled} {...props} />
      </ContextMenu.Trigger>
    );
  }
);

Trigger.displayName = 'TriggerWebContextMenu';

function Portal({ forceMount, container, children }: ContextMenuPortalProps) {
  return (
    <ContextMenu.Portal
      forceMount={forceMount}
      container={container}
      children={children}
    />
  );
}

const Overlay = React.forwardRef<
  PressableRef,
  SlottablePressableProps & ContextMenuOverlayProps
>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;
  return <Component ref={ref} {...props} />;
});

Overlay.displayName = 'OverlayWebContextMenu';

const ContextMenuContentContext = React.createContext<{
  close: () => void;
} | null>(null);

const Content = React.forwardRef<
  ViewRef,
  SlottableViewProps & PositionedContentProps
>(
  (
    {
      asChild = false,
      forceMount,
      align: _align,
      side: _side,
      sideOffset: _sideOffset,
      alignOffset = 0,
      avoidCollisions = true,
      insets,
      loop,
      onCloseAutoFocus,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      collisionBoundary,
      sticky,
      hideWhenDetached,
      ...props
    },
    ref
  ) => {
    const itemRef = React.useRef<HTMLDivElement>(null);

    function close() {
      itemRef.current?.click();
    }

    const Component = asChild ? Slot.View : View;
    return (
      <ContextMenuContentContext.Provider value={{ close }}>
        <ContextMenu.Content
          forceMount={forceMount}
          alignOffset={alignOffset}
          avoidCollisions={avoidCollisions}
          collisionPadding={insets}
          loop={loop}
          onCloseAutoFocus={onCloseAutoFocus}
          onEscapeKeyDown={onEscapeKeyDown}
          onPointerDownOutside={onPointerDownOutside}
          onFocusOutside={onFocusOutside}
          onInteractOutside={onInteractOutside}
          collisionBoundary={collisionBoundary}
          sticky={sticky}
          hideWhenDetached={hideWhenDetached}
        >
          <Component ref={ref} {...props} />
          <ContextMenu.Item
            ref={itemRef}
            aria-hidden
            style={{ position: 'fixed', top: 0, left: 0, zIndex: -999999999 }}
            aria-disabled
            tabIndex={-1}
            hidden
          />
        </ContextMenu.Content>
      </ContextMenuContentContext.Provider>
    );
  }
);

Content.displayName = 'ContentWebContextMenu';

function useContextMenuContentContext() {
  const context = React.useContext(ContextMenuContentContext);
  if (!context) {
    throw new Error(
      'ContextMenu compound components cannot be rendered outside the ContextMenu component'
    );
  }
  return context;
}

const Item = React.forwardRef<
  PressableRef,
  SlottablePressableProps & ContextMenuItemProps
>(
  (
    { asChild, textValue, closeOnPress = true, onPress: onPressProp, ...props },
    ref
  ) => {
    const { close } = useContextMenuContentContext();

    function onKeyDown(ev: React.KeyboardEvent) {
      if (ev.key === 'Enter' || ev.key === ' ') {
        onPressProp?.(EmptyGestureResponderEvent);
        if (closeOnPress) {
          close();
        }
      }
    }

    function onPress(ev: GestureResponderEvent) {
      onPressProp?.(ev);
      if (closeOnPress) {
        close();
      }
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <ContextMenu.Item
        textValue={textValue}
        disabled={props.disabled ?? undefined}
        onSelect={closeOnPress ? undefined : onSelected}
        asChild
      >
        <Component
          ref={ref}
          role='button'
          onPress={onPress}
          onKeyDown={onKeyDown}
          {...props}
        />
      </ContextMenu.Item>
    );
  }
);

Item.displayName = 'ItemWebContextMenu';

const Group = React.forwardRef<ViewRef, SlottableViewProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;
    return (
      <ContextMenu.Group asChild>
        <Component ref={ref} {...props} />
      </ContextMenu.Group>
    );
  }
);

Group.displayName = 'GroupWebContextMenu';

const Label = React.forwardRef<TextRef, SlottableTextProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.Text : Text;
    return (
      <ContextMenu.Label asChild>
        <Component ref={ref} {...props} />
      </ContextMenu.Label>
    );
  }
);

Label.displayName = 'LabelWebContextMenu';

const CheckboxItem = React.forwardRef<
  PressableRef,
  SlottablePressableProps & ContextMenuCheckboxItemProps
>(
  (
    {
      asChild,
      checked,
      onCheckedChange,
      textValue,
      disabled = false,
      closeOnPress = true,
      onPress: onPressProp,
      onKeyDown: onKeyDownProp,
      ...props
    },
    ref
  ) => {
    const { close } = useContextMenuContentContext();

    function onKeyDown(ev: React.KeyboardEvent) {
      onKeyDownProp?.(ev);
      if (ev.key === 'Enter' || ev.key === ' ') {
        onPressProp?.(EmptyGestureResponderEvent);
        onCheckedChange?.(!checked);
        if (closeOnPress) {
          close();
        }
      }
    }

    function onPress(ev: GestureResponderEvent) {
      onPressProp?.(ev);
      onCheckedChange?.(!checked);
      if (closeOnPress) {
        close();
      }
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <ContextMenu.CheckboxItem
        textValue={textValue}
        checked={checked}
        onCheckedChange={onCheckedChange}
        onSelect={closeOnPress ? undefined : onSelected}
        disabled={disabled ?? undefined}
        asChild
      >
        <Component
          ref={ref}
          disabled={disabled}
          // @ts-expect-error web only
          onKeyDown={onKeyDown}
          onPress={onPress}
          role='button'
          {...props}
        />
      </ContextMenu.CheckboxItem>
    );
  }
);

CheckboxItem.displayName = 'CheckboxItemWebContextMenu';

const ContextMenuRadioGroupContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
} | null>(null);

const RadioGroup = React.forwardRef<
  ViewRef,
  SlottableViewProps & ContextMenuRadioGroupProps
>(({ asChild, value, onValueChange, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <ContextMenuRadioGroupContext.Provider value={{ value, onValueChange }}>
      <ContextMenu.RadioGroup
        value={value}
        onValueChange={onValueChange}
        asChild
      >
        <Component ref={ref} {...props} />
      </ContextMenu.RadioGroup>
    </ContextMenuRadioGroupContext.Provider>
  );
});

RadioGroup.displayName = 'RadioGroupWebContextMenu';

function useContextMenuRadioGroupContext() {
  const context = React.useContext(ContextMenuRadioGroupContext);
  if (!context) {
    throw new Error(
      'ContextMenu compound components cannot be rendered outside the ContextMenu component'
    );
  }
  return context;
}

const RadioItem = React.forwardRef<
  PressableRef,
  SlottablePressableProps & ContextMenuRadioItemProps
>(
  (
    {
      asChild,
      value,
      textValue,
      closeOnPress = true,
      onPress: onPressProp,
      onKeyDown: onKeyDownProp,
      ...props
    },
    ref
  ) => {
    const { onValueChange } = useContextMenuRadioGroupContext();
    const { close } = useContextMenuContentContext();

    function onKeyDown(ev: React.KeyboardEvent) {
      onKeyDownProp?.(ev);
      if (ev.key === 'Enter' || ev.key === ' ') {
        onValueChange?.(value);
        onPressProp?.(EmptyGestureResponderEvent);
        if (closeOnPress) {
          close();
        }
      }
    }

    function onPress(ev: GestureResponderEvent) {
      onValueChange?.(value);
      onPressProp?.(ev);
      if (closeOnPress) {
        close();
      }
    }
    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <ContextMenu.RadioItem
        value={value}
        textValue={textValue}
        disabled={props.disabled ?? undefined}
        onSelect={closeOnPress ? undefined : onSelected}
        asChild
      >
        <Component
          ref={ref}
          // @ts-expect-error web only
          onKeyDown={onKeyDown}
          onPress={onPress}
          {...props}
        />
      </ContextMenu.RadioItem>
    );
  }
);

RadioItem.displayName = 'RadioItemWebContextMenu';

const ItemIndicator = React.forwardRef<
  ViewRef,
  SlottableViewProps & ForceMountable
>(({ asChild, forceMount, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <ContextMenu.ItemIndicator forceMount={forceMount} asChild>
      <Component ref={ref} {...props} />
    </ContextMenu.ItemIndicator>
  );
});

ItemIndicator.displayName = 'ItemIndicatorWebContextMenu';

const Separator = React.forwardRef<
  ViewRef,
  SlottableViewProps & ContextMenuSeparatorProps
>(({ asChild, decorative, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <ContextMenu.Separator asChild>
      <Component ref={ref} {...props} />
    </ContextMenu.Separator>
  );
});

Separator.displayName = 'SeparatorWebContextMenu';

const ContextMenuSubContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
} | null>(null);

const Sub = React.forwardRef<ViewRef, SlottableViewProps & ContextMenuSubProps>(
  ({ asChild, open, onOpenChange, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;
    return (
      <ContextMenuSubContext.Provider value={{ open, onOpenChange }}>
        <ContextMenu.Sub open={open} onOpenChange={onOpenChange}>
          <Component ref={ref} {...props} />
        </ContextMenu.Sub>
      </ContextMenuSubContext.Provider>
    );
  }
);

Sub.displayName = 'SubWebContextMenu';

function useSubContext() {
  const context = React.useContext(ContextMenuSubContext);
  if (!context) {
    throw new Error(
      'ContextMenu compound components cannot be rendered outside the ContextMenu component'
    );
  }
  return context;
}

const SubTrigger = React.forwardRef<
  PressableRef,
  SlottablePressableProps & ContextMenuSubTriggerProps
>(({ asChild, textValue, disabled = false, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <ContextMenu.SubTrigger
      disabled={disabled ?? undefined}
      textValue={textValue}
      asChild
    >
      <Component ref={ref} {...props} />
    </ContextMenu.SubTrigger>
  );
});

SubTrigger.displayName = 'SubTriggerWebContextMenu';

const SubContent = React.forwardRef<
  PressableRef,
  SlottablePressableProps & ForceMountable
>(({ asChild = false, forceMount, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <ContextMenu.Portal>
      <ContextMenu.SubContent forceMount={forceMount}>
        <Component ref={ref} {...props} />
      </ContextMenu.SubContent>
    </ContextMenu.Portal>
  );
});

Content.displayName = 'ContentWebContextMenu';

export {
  CheckboxItem,
  Content,
  Group,
  Item,
  ItemIndicator,
  Label,
  Overlay,
  Portal,
  RadioGroup,
  RadioItem,
  Root,
  Separator,
  Sub,
  SubContent,
  SubTrigger,
  Trigger,
  useSubContext,
  useContextMenuContext,
};

function onSelected(ev: Event) {
  ev.preventDefault();
}
