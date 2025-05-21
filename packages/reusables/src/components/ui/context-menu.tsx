import * as ContextMenuPrimitive from '@rn-primitives/context-menu';
import * as React from 'react';
import {
  Platform,
  type StyleProp,
  StyleSheet,
  Text,
  type TextProps,
  View,
  type ViewStyle,
} from 'react-native';
import { Check } from '../../lib/icons/Check';
import { ChevronDown } from '../../lib/icons/ChevronDown';
import { ChevronRight } from '../../lib/icons/ChevronRight';
import { ChevronUp } from '../../lib/icons/ChevronUp';
import { cn } from '../../lib/utils';
import { TextClassContext } from './text';

const ContextMenu = ContextMenuPrimitive.Root;
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
const ContextMenuGroup = ContextMenuPrimitive.Group;
const ContextMenuSub = ContextMenuPrimitive.Sub;
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: ContextMenuPrimitive.SubTriggerProps & {
  ref?: React.RefObject<ContextMenuPrimitive.SubTriggerRef>;
  children?: React.ReactNode;
  inset?: boolean;
}) {
  const { open } = ContextMenuPrimitive.useSubContext();
  const Icon = Platform.OS === 'web' ? ChevronRight : open ? ChevronUp : ChevronDown;
  return (
    <TextClassContext.Provider
      value={cn(
        'select-none text-sm native:text-lg text-primary',
        open && 'native:text-accent-foreground'
      )}
    >
      <ContextMenuPrimitive.SubTrigger
        className={cn(
          'flex flex-row web:cursor-default web:select-none items-center gap-2 web:focus:bg-accent active:bg-accent web:hover:bg-accent rounded-sm px-2 py-1.5 native:py-2 web:outline-none',
          open && 'bg-accent',
          inset && 'pl-8',
          className
        )}
        {...props}
      >
        {children}
        <Icon size={18} className='ml-auto text-foreground' />
      </ContextMenuPrimitive.SubTrigger>
    </TextClassContext.Provider>
  );
}

function ContextMenuSubContent({
  className,
  ...props
}: ContextMenuPrimitive.SubContentProps & {
  ref?: React.RefObject<ContextMenuPrimitive.SubContentRef>;
}) {
  const { open } = ContextMenuPrimitive.useSubContext();
  return (
    <ContextMenuPrimitive.SubContent
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border mt-1 border-border bg-popover p-1 shadow-md shadow-foreground/5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        open
          ? 'web:animate-in web:fade-in-0 web:zoom-in-95'
          : 'web:animate-out web:fade-out-0 web:zoom-out',
        className
      )}
      {...props}
    />
  );
}

function ContextMenuContent({
  className,
  overlayClassName,
  overlayStyle,
  portalHost,
  ...props
}: ContextMenuPrimitive.ContentProps & {
  ref?: React.RefObject<ContextMenuPrimitive.ContentRef>;
  overlayStyle?: StyleProp<ViewStyle>;
  overlayClassName?: string;
  portalHost?: string;
}) {
  const { open } = ContextMenuPrimitive.useRootContext();
  return (
    <ContextMenuPrimitive.Portal hostName={portalHost}>
      <ContextMenuPrimitive.Overlay
        style={
          overlayStyle
            ? StyleSheet.flatten([
                Platform.OS !== 'web' ? StyleSheet.absoluteFill : undefined,
                overlayStyle as typeof StyleSheet.absoluteFill,
              ])
            : Platform.OS !== 'web'
            ? StyleSheet.absoluteFill
            : undefined
        }
        className={overlayClassName}
      >
        <ContextMenuPrimitive.Content
          className={cn(
            'z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 shadow-md shadow-foreground/5 web:data-[side=bottom]:slide-in-from-top-2 web:data-[side=left]:slide-in-from-right-2 web:data-[side=right]:slide-in-from-left-2 web:data-[side=top]:slide-in-from-bottom-2',
            open
              ? 'web:animate-in web:fade-in-0 web:zoom-in-95'
              : 'web:animate-out web:fade-out-0 web:zoom-out-95',
            className
          )}
          {...props}
        />
      </ContextMenuPrimitive.Overlay>
    </ContextMenuPrimitive.Portal>
  );
}

function ContextMenuItem({
  className,
  inset,
  ...props
}: ContextMenuPrimitive.ItemProps & {
  ref?: React.RefObject<ContextMenuPrimitive.ItemRef>;
  className?: string;
  inset?: boolean;
}) {
  return (
    <TextClassContext.Provider value='select-none text-sm native:text-lg text-popover-foreground web:group-focus:text-accent-foreground'>
      <ContextMenuPrimitive.Item
        className={cn(
          'relative flex flex-row web:cursor-default items-center gap-2 rounded-sm px-2 py-1.5 native:py-2 web:outline-none web:focus:bg-accent active:bg-accent web:hover:bg-accent group',
          inset && 'pl-8',
          props.disabled && 'opacity-50 web:pointer-events-none',
          className
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function ContextMenuCheckboxItem({
  className,
  children,
  ...props
}: ContextMenuPrimitive.CheckboxItemProps & {
  ref?: React.RefObject<ContextMenuPrimitive.CheckboxItemRef>;
  children?: React.ReactNode;
}) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      className={cn(
        'relative flex flex-row web:cursor-default items-center web:group rounded-sm py-1.5 native:py-2 pl-8 pr-2 web:outline-none web:focus:bg-accent active:bg-accent',
        props.disabled && 'web:pointer-events-none opacity-50',
        className
      )}
      {...props}
    >
      <View className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
        <ContextMenuPrimitive.ItemIndicator>
          <Check size={14} strokeWidth={3} className='text-foreground' />
        </ContextMenuPrimitive.ItemIndicator>
      </View>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

function ContextMenuRadioItem({
  className,
  children,
  ...props
}: ContextMenuPrimitive.RadioItemProps & {
  ref?: React.RefObject<ContextMenuPrimitive.RadioItemRef>;
  children?: React.ReactNode;
}) {
  return (
    <ContextMenuPrimitive.RadioItem
      className={cn(
        'relative flex flex-row web:cursor-default web:group items-center rounded-sm py-1.5 native:py-2 pl-8 pr-2 web:outline-none web:focus:bg-accent active:bg-accent',
        props.disabled && 'web:pointer-events-none opacity-50',
        className
      )}
      {...props}
    >
      <View className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
        <ContextMenuPrimitive.ItemIndicator>
          <View className='bg-foreground h-2 w-2 rounded-full' />
        </ContextMenuPrimitive.ItemIndicator>
      </View>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: ContextMenuPrimitive.LabelProps & {
  ref?: React.RefObject<ContextMenuPrimitive.LabelRef>;
  className?: string;
  inset?: boolean;
}) {
  return (
    <ContextMenuPrimitive.Label
      className={cn(
        'px-2 py-1.5 text-sm native:text-base font-semibold text-foreground web:cursor-default',
        inset && 'pl-8',
        className
      )}
      {...props}
    />
  );
}

function ContextMenuSeparator({
  className,
  ...props
}: ContextMenuPrimitive.SeparatorProps & {
  ref?: React.RefObject<ContextMenuPrimitive.SeparatorRef>;
}) {
  return (
    <ContextMenuPrimitive.Separator
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  );
}

function ContextMenuShortcut({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn(
        'ml-auto text-xs native:text-sm tracking-widest text-muted-foreground',
        className
      )}
      {...props}
    />
  );
}

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
};
