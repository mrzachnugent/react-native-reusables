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

const Root = React.forwardRef<
  ViewRef,
  SlottableViewProps & DropdownMenuRootProps
>(({ asChild, open, onOpenChange, ...viewProps }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <DropdownMenu.Root open={open} onOpenChange={onOpenChange}>
      <Component ref={ref} {...viewProps} />
    </DropdownMenu.Root>
  );
});

Root.displayName = 'RootWebDropdownMenu';

const Trigger = React.forwardRef<PressableRef, SlottablePressableProps>(
  (
    {
      asChild,
      onLongPress: onLongPressProp,
      disabled = false,
      onAccessibilityAction: onAccessibilityActionProp,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <DropdownMenu.Trigger disabled={disabled ?? undefined} asChild>
        <Component ref={ref} {...props} />
      </DropdownMenu.Trigger>
    );
  }
);

Trigger.displayName = 'TriggerWebDropdownMenu';

/**
 * @warning when using a custom `<PortalHost />`, you will have to adjust the Content's sideOffset to account for nav elements like headers.
 */
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
  const { buttonRef, hideHtmlButtonProps, pressableProps } =
    useTrigger<HTMLDivElement>(props);

  function onSelected(ev: Event) {
    ev.preventDefault();
  }
  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <>
      <DropdownMenu.Item
        ref={buttonRef}
        textValue={textValue}
        disabled={props.disabled ?? undefined}
        onSelect={closeOnPress ? undefined : onSelected}
        {...hideHtmlButtonProps}
      />
      <DropdownMenu.Item
        textValue={textValue}
        disabled={props.disabled ?? undefined}
        asChild
      >
        <Component ref={ref} {...pressableProps} />
      </DropdownMenu.Item>
    </>
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
    const { buttonRef, hideHtmlButtonProps, pressableProps } =
      useTrigger<HTMLDivElement>({
        ...props,
        onKeyDown(ev) {
          if (ev.key === ' ') {
            buttonRef.current?.click();
          }
        },
      });

    function onSelected(ev: Event) {
      ev.preventDefault();
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <>
        <DropdownMenu.CheckboxItem
          ref={buttonRef}
          textValue={textValue}
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled ?? undefined}
          onSelect={closeOnPress ? undefined : onSelected}
          {...hideHtmlButtonProps}
        />
        <DropdownMenu.CheckboxItem
          textValue={textValue}
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled ?? undefined}
          asChild
        >
          <Component ref={ref} {...pressableProps} />
        </DropdownMenu.CheckboxItem>
      </>
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
  const { buttonRef, hideHtmlButtonProps, pressableProps } =
    useTrigger<HTMLDivElement>(props);

  function onSelected(ev: Event) {
    ev.preventDefault();
  }

  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <>
      <DropdownMenu.RadioItem
        ref={buttonRef}
        value={value}
        textValue={textValue}
        disabled={props.disabled ?? undefined}
        onSelect={closeOnPress ? undefined : onSelected}
        {...hideHtmlButtonProps}
      />
      <DropdownMenu.RadioItem
        value={value}
        textValue={textValue}
        disabled={props.disabled ?? undefined}
        asChild
      >
        <Component ref={ref} {...pressableProps} />
      </DropdownMenu.RadioItem>
    </>
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
      <Component ref={ref} role='presentation' {...props} />
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
      asChild
    >
      <Component ref={ref} {...props} />
    </DropdownMenu.SubTrigger>
  );
});

SubTrigger.displayName = 'SubTriggerWebDropdownMenu';

const SubContent = React.forwardRef<
  ViewRef,
  SlottableViewProps & ForceMountable
>(({ asChild = false, forceMount, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
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
