import * as ContextMenu from '@radix-ui/react-context-menu';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import * as Slot from '~/lib/rn-primitives/slot/slot-native';
import { useAugmentedRef } from '../hooks/useAugmentedRef';
import type {
  ForceMountable,
  PositionedContentProps,
  PressableRef,
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
  TextRef,
  ViewRef,
} from '../types';
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
    const augmentedRef = React.useRef<PressableRef>(null);
    useAugmentedRef({ augmentedRef, ref });
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
    const Component = asChild ? Slot.View : View;
    return (
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
      </ContextMenu.Content>
    );
  }
);

Content.displayName = 'ContentWebContextMenu';

const Item = React.forwardRef<
  PressableRef,
  SlottablePressableProps & ContextMenuItemProps
>(({ asChild, textValue, closeOnPress = true, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <ContextMenu.Item
      textValue={textValue}
      disabled={props.disabled ?? undefined}
      onSelect={closeOnPress ? undefined : onSelected}
    >
      <Component ref={ref} pointerEvents='none' {...props} />
    </ContextMenu.Item>
  );
});

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
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <ContextMenu.CheckboxItem
        textValue={textValue}
        checked={checked}
        onCheckedChange={onCheckedChange}
        onSelect={closeOnPress ? undefined : onSelected}
        disabled={disabled ?? undefined}
      >
        <Component
          ref={ref}
          pointerEvents='none'
          disabled={disabled}
          {...props}
        />
      </ContextMenu.CheckboxItem>
    );
  }
);

CheckboxItem.displayName = 'CheckboxItemWebContextMenu';

const RadioGroup = React.forwardRef<
  ViewRef,
  SlottableViewProps & ContextMenuRadioGroupProps
>(({ asChild, value, onValueChange, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <ContextMenu.RadioGroup value={value} onValueChange={onValueChange} asChild>
      <Component ref={ref} {...props} />
    </ContextMenu.RadioGroup>
  );
});

RadioGroup.displayName = 'RadioGroupWebContextMenu';

const RadioItem = React.forwardRef<
  PressableRef,
  SlottablePressableProps & ContextMenuRadioItemProps
>(({ asChild, value, textValue, closeOnPress = true, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <ContextMenu.RadioItem
      value={value}
      textValue={textValue}
      disabled={props.disabled ?? undefined}
      onSelect={closeOnPress ? undefined : onSelected}
    >
      <Component ref={ref} pointerEvents='none' {...props} />
    </ContextMenu.RadioItem>
  );
});

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

const Sub = React.forwardRef<ViewRef, SlottableViewProps & ContextMenuSubProps>(
  ({ asChild, open, onOpenChange, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;
    return (
      <ContextMenu.Sub open={open} onOpenChange={onOpenChange}>
        <Component ref={ref} {...props} />
      </ContextMenu.Sub>
    );
  }
);

Sub.displayName = 'SubWebContextMenu';

const SubTrigger = React.forwardRef<
  PressableRef,
  SlottablePressableProps & ContextMenuSubTriggerProps
>(({ asChild, textValue, disabled = false, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <ContextMenu.SubTrigger
      disabled={disabled ?? undefined}
      textValue={textValue}
    >
      <Component ref={ref} pointerEvents='none' {...props} />
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
};

function onSelected(ev: Event) {
  ev.preventDefault();
}
