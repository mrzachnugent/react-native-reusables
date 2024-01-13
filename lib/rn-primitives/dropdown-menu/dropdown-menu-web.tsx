import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import * as Slot from '~/lib/rn-primitives/slot/slot-native';
import { useTrigger } from '../hooks/useTrigger';
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
  DropdownMenuCheckboxItemProps,
  DropdownMenuItemProps,
  DropdownMenuOverlayProps,
  DropdownMenuPortalProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps,
  DropdownMenuRootProps,
  DropdownMenuSeparatorProps,
  DropdownMenuSubProps,
  DropdownMenuSubTriggerProps,
} from './types';
import { useAugmentedRef } from '../hooks/useAugmentedRef';

const DropdownMenuContext = React.createContext<DropdownMenuRootProps | null>(
  null
);

const Root = React.forwardRef<
  ViewRef,
  SlottableViewProps & DropdownMenuRootProps
>(({ asChild, open, onOpenChange, ...viewProps }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <DropdownMenuContext.Provider value={{ open, onOpenChange }}>
      <DropdownMenu.Root open={open} onOpenChange={onOpenChange}>
        <Component ref={ref} {...viewProps} />
      </DropdownMenu.Root>
    </DropdownMenuContext.Provider>
  );
});

Root.displayName = 'RootWebDropdownMenu';

function useDropdownMenuContext() {
  const context = React.useContext(DropdownMenuContext);
  if (!context) {
    throw new Error(
      'DropdownMenu compound components cannot be rendered outside the DropdownMenu component'
    );
  }
  return context;
}

const Trigger = React.forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, disabled = false, ...props }, ref) => {
    const augmentedRef = React.useRef<PressableRef>(null);
    useAugmentedRef({ augmentedRef, ref });
    const { open } = useDropdownMenuContext();

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
      <DropdownMenu.Trigger disabled={disabled ?? undefined} asChild>
        <Component ref={augmentedRef} {...props} />
      </DropdownMenu.Trigger>
    );
  }
);

Trigger.displayName = 'TriggerWebDropdownMenu';

function Portal({ forceMount, container, children }: DropdownMenuPortalProps) {
  return (
    <DropdownMenu.Portal
      forceMount={forceMount}
      container={container}
      children={children}
    />
  );
}

const Overlay = React.forwardRef<
  PressableRef,
  SlottablePressableProps & DropdownMenuOverlayProps
>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;
  return <Component ref={ref} {...props} />;
});

Overlay.displayName = 'OverlayWebDropdownMenu';

const Content = React.forwardRef<
  PressableRef,
  SlottablePressableProps & PositionedContentProps
>(
  (
    {
      asChild = false,
      forceMount,
      align,
      side,
      sideOffset,
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
    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <DropdownMenu.Content
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
        align={align}
        side={side}
        sideOffset={sideOffset}
      >
        <Component ref={ref} {...props} />
      </DropdownMenu.Content>
    );
  }
);

Content.displayName = 'ContentWebDropdownMenu';

const Item = React.forwardRef<
  PressableRef,
  SlottablePressableProps & DropdownMenuItemProps
>(({ asChild, textValue, closeOnPress = true, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <DropdownMenu.Item
      textValue={textValue}
      disabled={props.disabled ?? undefined}
      onSelect={closeOnPress ? undefined : onSelected}
    >
      <Component ref={ref} pointerEvents='none' {...props} />
    </DropdownMenu.Item>
  );
});

Item.displayName = 'ItemWebDropdownMenu';

const Group = React.forwardRef<ViewRef, SlottableViewProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;
    return (
      <DropdownMenu.Group asChild>
        <Component ref={ref} {...props} />
      </DropdownMenu.Group>
    );
  }
);

Group.displayName = 'GroupWebDropdownMenu';

const Label = React.forwardRef<TextRef, SlottableTextProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.Text : Text;
    return (
      <DropdownMenu.Label asChild>
        <Component ref={ref} {...props} />
      </DropdownMenu.Label>
    );
  }
);

Label.displayName = 'LabelWebDropdownMenu';

const CheckboxItem = React.forwardRef<
  PressableRef,
  SlottablePressableProps & DropdownMenuCheckboxItemProps
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
      <DropdownMenu.CheckboxItem
        textValue={textValue}
        checked={checked}
        onCheckedChange={onCheckedChange}
        onSelect={closeOnPress ? undefined : onSelected}
        disabled={disabled ?? undefined}
      >
        <Component ref={ref} pointerEvents='none' {...props} />
      </DropdownMenu.CheckboxItem>
    );
  }
);

CheckboxItem.displayName = 'CheckboxItemWebDropdownMenu';

const RadioGroup = React.forwardRef<
  ViewRef,
  SlottableViewProps & DropdownMenuRadioGroupProps
>(({ asChild, value, onValueChange, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <DropdownMenu.RadioGroup
      value={value}
      onValueChange={onValueChange}
      asChild
    >
      <Component ref={ref} {...props} />
    </DropdownMenu.RadioGroup>
  );
});

RadioGroup.displayName = 'RadioGroupWebDropdownMenu';

const RadioItem = React.forwardRef<
  PressableRef,
  SlottablePressableProps & DropdownMenuRadioItemProps
>(({ asChild, value, textValue, closeOnPress = true, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <DropdownMenu.RadioItem
      value={value}
      textValue={textValue}
      disabled={props.disabled ?? undefined}
      onSelect={closeOnPress ? undefined : onSelected}
    >
      <Component ref={ref} pointerEvents='none' {...props} />
    </DropdownMenu.RadioItem>
  );
});

RadioItem.displayName = 'RadioItemWebDropdownMenu';

const ItemIndicator = React.forwardRef<
  ViewRef,
  SlottableViewProps & ForceMountable
>(({ asChild, forceMount, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <DropdownMenu.ItemIndicator forceMount={forceMount} asChild>
      <Component ref={ref} {...props} />
    </DropdownMenu.ItemIndicator>
  );
});

ItemIndicator.displayName = 'ItemIndicatorWebDropdownMenu';

const Separator = React.forwardRef<
  ViewRef,
  SlottableViewProps & DropdownMenuSeparatorProps
>(({ asChild, decorative, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <DropdownMenu.Separator asChild>
      <Component ref={ref} {...props} />
    </DropdownMenu.Separator>
  );
});

Separator.displayName = 'SeparatorWebDropdownMenu';

const Sub = React.forwardRef<
  ViewRef,
  SlottableViewProps & DropdownMenuSubProps
>(({ asChild, open, onOpenChange, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <DropdownMenu.Sub open={open} onOpenChange={onOpenChange}>
      <Component ref={ref} {...props} />
    </DropdownMenu.Sub>
  );
});

Sub.displayName = 'SubWebDropdownMenu';

const SubTrigger = React.forwardRef<
  PressableRef,
  SlottablePressableProps & DropdownMenuSubTriggerProps
>(({ asChild, textValue, disabled = false, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <DropdownMenu.SubTrigger
      disabled={disabled ?? undefined}
      textValue={textValue}
    >
      <Component ref={ref} pointerEvents='none' {...props} />
    </DropdownMenu.SubTrigger>
  );
});

SubTrigger.displayName = 'SubTriggerWebDropdownMenu';

const SubContent = React.forwardRef<
  PressableRef,
  SlottablePressableProps & ForceMountable
>(({ asChild = false, forceMount, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.SubContent forceMount={forceMount}>
        <Component ref={ref} {...props} />
      </DropdownMenu.SubContent>
    </DropdownMenu.Portal>
  );
});

Content.displayName = 'ContentWebDropdownMenu';

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
