import * as Menubar from '@radix-ui/react-menubar';
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
  MenubarCheckboxItemProps,
  MenubarItemProps,
  MenubarMenuProps,
  MenubarOverlayProps,
  MenubarPortalProps,
  MenubarRadioGroupProps,
  MenubarRadioItemProps,
  MenubarRootProps,
  MenubarSeparatorProps,
  MenubarSubProps,
  MenubarSubTriggerProps,
} from './types';

const MenubarContext = React.createContext<MenubarRootProps | null>(null);

const Root = React.forwardRef<ViewRef, SlottableViewProps & MenubarRootProps>(
  ({ asChild, value, onValueChange, ...viewProps }, ref) => {
    const Component = asChild ? Slot.View : View;
    return (
      <MenubarContext.Provider value={{ value, onValueChange }}>
        <Menubar.Root value={value} onValueChange={onValueChange}>
          <Component ref={ref} {...viewProps} />
        </Menubar.Root>
      </MenubarContext.Provider>
    );
  }
);

Root.displayName = 'RootWebMenubar';

function useMenubarContext() {
  const context = React.useContext(MenubarContext);
  if (!context) {
    throw new Error(
      'Menubar compound components cannot be rendered outside the Menubar component'
    );
  }
  return context;
}

const MenubarMenuContext = React.createContext<MenubarMenuProps | null>(null);

const Menu = React.forwardRef<ViewRef, SlottableViewProps & MenubarMenuProps>(
  ({ asChild, value, ...viewProps }, ref) => {
    const Component = asChild ? Slot.View : View;
    return (
      <MenubarMenuContext.Provider value={{ value }}>
        <Menubar.Menu value={value}>
          <Component ref={ref} {...viewProps} />
        </Menubar.Menu>
      </MenubarMenuContext.Provider>
    );
  }
);

Menu.displayName = 'MenuWebMenubar';

function useMenubarMenuContext() {
  const context = React.useContext(MenubarMenuContext);
  if (!context) {
    throw new Error(
      'Menubar compound components cannot be rendered outside the Menubar component'
    );
  }
  return context;
}

const Trigger = React.forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, disabled = false, ...props }, ref) => {
    const augmentedRef = React.useRef<PressableRef>(null);
    useAugmentedRef({ augmentedRef, ref });
    const { value: menuValue } = useMenubarMenuContext();
    const { value } = useMenubarContext();

    React.useLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLDivElement;
        augRef.dataset.state = value && menuValue === value ? 'open' : 'closed';
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
      <Menubar.Trigger disabled={disabled ?? undefined} asChild>
        <Component ref={augmentedRef} disabled={disabled} {...props} />
      </Menubar.Trigger>
    );
  }
);

Trigger.displayName = 'TriggerWebMenubar';

function Portal({ forceMount, container, children }: MenubarPortalProps) {
  return (
    <Menubar.Portal
      forceMount={forceMount}
      container={container}
      children={children}
    />
  );
}

const Overlay = React.forwardRef<
  PressableRef,
  SlottablePressableProps & MenubarOverlayProps
>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;
  return <Component ref={ref} {...props} />;
});

Overlay.displayName = 'OverlayWebMenubar';

const Content = React.forwardRef<
  ViewRef,
  SlottableViewProps & PositionedContentProps
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
    const Component = asChild ? Slot.View : View;
    return (
      <Menubar.Content
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
      </Menubar.Content>
    );
  }
);

Content.displayName = 'ContentWebMenubar';

const Item = React.forwardRef<
  PressableRef,
  SlottablePressableProps & MenubarItemProps
>(({ asChild, textValue, closeOnPress = true, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <Menubar.Item
      textValue={textValue}
      disabled={props.disabled ?? undefined}
      onSelect={closeOnPress ? undefined : onSelected}
    >
      <Component ref={ref} pointerEvents='none' {...props} />
    </Menubar.Item>
  );
});

Item.displayName = 'ItemWebMenubar';

const Group = React.forwardRef<ViewRef, SlottableViewProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;
    return (
      <Menubar.Group asChild>
        <Component ref={ref} {...props} />
      </Menubar.Group>
    );
  }
);

Group.displayName = 'GroupWebMenubar';

const Label = React.forwardRef<TextRef, SlottableTextProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.Text : Text;
    return (
      <Menubar.Label asChild>
        <Component ref={ref} {...props} />
      </Menubar.Label>
    );
  }
);

Label.displayName = 'LabelWebMenubar';

const CheckboxItem = React.forwardRef<
  PressableRef,
  SlottablePressableProps & MenubarCheckboxItemProps
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
      <Menubar.CheckboxItem
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
      </Menubar.CheckboxItem>
    );
  }
);

CheckboxItem.displayName = 'CheckboxItemWebMenubar';

const RadioGroup = React.forwardRef<
  ViewRef,
  SlottableViewProps & MenubarRadioGroupProps
>(({ asChild, value, onValueChange, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <Menubar.RadioGroup value={value} onValueChange={onValueChange} asChild>
      <Component ref={ref} {...props} />
    </Menubar.RadioGroup>
  );
});

RadioGroup.displayName = 'RadioGroupWebMenubar';

const RadioItem = React.forwardRef<
  PressableRef,
  SlottablePressableProps & MenubarRadioItemProps
>(({ asChild, value, textValue, closeOnPress = true, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <Menubar.RadioItem
      value={value}
      textValue={textValue}
      disabled={props.disabled ?? undefined}
      onSelect={closeOnPress ? undefined : onSelected}
    >
      <Component ref={ref} pointerEvents='none' {...props} />
    </Menubar.RadioItem>
  );
});

RadioItem.displayName = 'RadioItemWebMenubar';

const ItemIndicator = React.forwardRef<
  ViewRef,
  SlottableViewProps & ForceMountable
>(({ asChild, forceMount, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <Menubar.ItemIndicator forceMount={forceMount} asChild>
      <Component ref={ref} {...props} />
    </Menubar.ItemIndicator>
  );
});

ItemIndicator.displayName = 'ItemIndicatorWebMenubar';

const Separator = React.forwardRef<
  ViewRef,
  SlottableViewProps & MenubarSeparatorProps
>(({ asChild, decorative, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <Menubar.Separator asChild>
      <Component ref={ref} {...props} />
    </Menubar.Separator>
  );
});

Separator.displayName = 'SeparatorWebMenubar';

const Sub = React.forwardRef<ViewRef, SlottableViewProps & MenubarSubProps>(
  ({ asChild, open, onOpenChange, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;
    return (
      <Menubar.Sub open={open} onOpenChange={onOpenChange}>
        <Component ref={ref} {...props} />
      </Menubar.Sub>
    );
  }
);

Sub.displayName = 'SubWebMenubar';

const SubTrigger = React.forwardRef<
  PressableRef,
  SlottablePressableProps & MenubarSubTriggerProps
>(({ asChild, textValue, disabled = false, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <Menubar.SubTrigger disabled={disabled ?? undefined} textValue={textValue}>
      <Component ref={ref} pointerEvents='none' {...props} />
    </Menubar.SubTrigger>
  );
});

SubTrigger.displayName = 'SubTriggerWebMenubar';

const SubContent = React.forwardRef<
  ViewRef,
  SlottableViewProps & ForceMountable
>(({ asChild = false, forceMount, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <Menubar.Portal>
      <Menubar.SubContent forceMount={forceMount}>
        <Component ref={ref} {...props} />
      </Menubar.SubContent>
    </Menubar.Portal>
  );
});

Content.displayName = 'ContentWebMenubar';

export {
  CheckboxItem,
  Content,
  Group,
  Item,
  ItemIndicator,
  Label,
  Menu,
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
