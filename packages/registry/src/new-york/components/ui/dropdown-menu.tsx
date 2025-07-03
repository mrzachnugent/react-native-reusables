import { Icon } from '@/new-york/components/ui/icon';
import { NativeOnlyAnimatedView } from '@/new-york/components/ui/native-only-animated-view';
import { TextClassContext } from '@/new-york/components/ui/text';
import { cn } from '@/new-york/lib/utils';
import * as DropdownMenuPrimitive from '@rn-primitives/dropdown-menu';
import { Check, ChevronDown, ChevronRight, ChevronUp } from 'lucide-react-native';
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
import { FadeIn } from 'react-native-reanimated';

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  iconClassName,
  ...props
}: DropdownMenuPrimitive.SubTriggerProps & {
  ref?: React.RefObject<DropdownMenuPrimitive.SubTriggerRef>;
  children?: React.ReactNode;
  iconClassName?: string;
  inset?: boolean;
}) {
  const { open } = DropdownMenuPrimitive.useSubContext();
  const icon = Platform.OS === 'web' ? ChevronRight : open ? ChevronUp : ChevronDown;
  return (
    <TextClassContext.Provider
      value={cn(
        'text-sm select-none group-active:text-accent-foreground',
        open && 'text-accent-foreground'
      )}
    >
      <DropdownMenuPrimitive.SubTrigger
        className={cn(
          'group flex flex-row items-center rounded-sm px-2 py-1.5 active:bg-accent',
          Platform.select({
            web: 'focus:bg-accent focus:text-accent-foreground cursor-default outline-none [&_svg]:pointer-events-none',
          }),
          open && 'bg-accent',
          inset && 'pl-8'
        )}
        {...props}
      >
        <>{children}</>
        <Icon as={icon} className={cn('ml-auto shrink-0 text-foreground size-4', iconClassName)} />
      </DropdownMenuPrimitive.SubTrigger>
    </TextClassContext.Provider>
  );
}

function DropdownMenuSubContent({
  className,
  ...props
}: DropdownMenuPrimitive.SubContentProps & {
  ref?: React.RefObject<DropdownMenuPrimitive.SubContentRef>;
}) {
  return (
    <NativeOnlyAnimatedView entering={FadeIn}>
      <DropdownMenuPrimitive.SubContent
        className={cn(
          'bg-popover overflow-hidden rounded-md border border-border p-1 shadow-lg',
          Platform.select({
            web: 'animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 fade-in-0 data-[state=closed]:zoom-out-95 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-context-menu-content-transform-origin)',
          }),
          className
        )}
        {...props}
      />
    </NativeOnlyAnimatedView>
  );
}

function DropdownMenuContent({
  className,
  overlayClassName,
  overlayStyle,
  portalHost,
  ...props
}: DropdownMenuPrimitive.ContentProps & {
  ref?: React.RefObject<DropdownMenuPrimitive.ContentRef>;
  overlayStyle?: StyleProp<ViewStyle>;
  overlayClassName?: string;
  portalHost?: string;
}) {
  return (
    <DropdownMenuPrimitive.Portal hostName={portalHost}>
      <DropdownMenuPrimitive.Overlay
        style={Platform.select({
          web: overlayStyle ?? undefined,
          native: overlayStyle
            ? StyleSheet.flatten([StyleSheet.absoluteFill, overlayStyle])
            : StyleSheet.absoluteFill,
        })}
        className={overlayClassName}
      >
        <NativeOnlyAnimatedView entering={FadeIn}>
          <TextClassContext.Provider value='text-popover-foreground'>
            <DropdownMenuPrimitive.Content
              className={cn(
                'bg-popover overflow-hidden rounded-md border border-border p-1 shadow-lg min-w-[8rem]',
                Platform.select({
                  web: cn(
                    'animate-in fade-in-0 zoom-in-95 z-50 max-h-(--radix-context-menu-content-available-height) origin-(--radix-context-menu-content-transform-origin) cursor-default',
                    props.side === 'bottom' && 'slide-in-from-top-2',
                    props.side === 'top' && 'slide-in-from-bottom-2'
                  ),
                }),
                className
              )}
              {...props}
            />
          </TextClassContext.Provider>
        </NativeOnlyAnimatedView>
      </DropdownMenuPrimitive.Overlay>
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant,
  ...props
}: DropdownMenuPrimitive.ItemProps & {
  ref?: React.RefObject<DropdownMenuPrimitive.ItemRef>;
  className?: string;
  inset?: boolean;
  variant?: 'default' | 'destructive';
}) {
  return (
    <TextClassContext.Provider
      value={cn(
        'select-none text-sm text-popover-foreground group-active:text-popover-foreground',
        variant === 'destructive' && 'text-destructive group-active:text-destructive'
      )}
    >
      <DropdownMenuPrimitive.Item
        className={cn(
          'group relative flex flex-row items-center gap-2 rounded-sm px-2 py-1.5 active:bg-accent',
          Platform.select({
            web: cn(
              'focus:bg-accent focus:text-accent-foreground cursor-default outline-none data-[disabled]:pointer-events-none',
              variant === 'destructive' && 'focus:bg-destructive/10 dark:focus:bg-destructive/20'
            ),
          }),
          variant === 'destructive' && 'active:bg-destructive/10 dark:active:bg-destructive/20',
          props.disabled && 'opacity-50',
          inset && 'pl-8',
          className
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  ...props
}: DropdownMenuPrimitive.CheckboxItemProps & {
  ref?: React.RefObject<DropdownMenuPrimitive.CheckboxItemRef>;
  children?: React.ReactNode;
}) {
  return (
    <TextClassContext.Provider value='text-sm text-popover-foreground select-none group-active:text-accent-foreground'>
      <DropdownMenuPrimitive.CheckboxItem
        className={cn(
          'group relative flex flex-row items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 active:bg-accent',
          Platform.select({
            web: 'focus:bg-accent focus:text-accent-foreground cursor-default outline-none data-[disabled]:pointer-events-none',
          }),
          props.disabled && 'opacity-50',
          className
        )}
        {...props}
      >
        <View className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
          <DropdownMenuPrimitive.ItemIndicator>
            <Icon
              as={Check}
              className={cn(
                'text-foreground size-4',
                Platform.select({ web: 'pointer-events-none' })
              )}
            />
          </DropdownMenuPrimitive.ItemIndicator>
        </View>
        <>{children}</>
      </DropdownMenuPrimitive.CheckboxItem>
    </TextClassContext.Provider>
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: DropdownMenuPrimitive.RadioItemProps & {
  ref?: React.RefObject<DropdownMenuPrimitive.RadioItemRef>;
  children?: React.ReactNode;
}) {
  return (
    <TextClassContext.Provider value='text-sm text-popover-foreground select-none group-active:text-accent-foreground'>
      <DropdownMenuPrimitive.RadioItem
        className={cn(
          'group relative flex flex-row items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 active:bg-accent',
          Platform.select({
            web: 'focus:bg-accent focus:text-accent-foreground cursor-default outline-none  data-[disabled]:pointer-events-none',
          }),
          props.disabled && 'opacity-50',
          className
        )}
        {...props}
      >
        <View className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
          <DropdownMenuPrimitive.ItemIndicator>
            <View className='bg-foreground h-2 w-2 rounded-full' />
          </DropdownMenuPrimitive.ItemIndicator>
        </View>
        <>{children}</>
      </DropdownMenuPrimitive.RadioItem>
    </TextClassContext.Provider>
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: DropdownMenuPrimitive.LabelProps & {
  ref?: React.RefObject<DropdownMenuPrimitive.LabelRef>;
  className?: string;
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Label
      className={cn('text-foreground px-2 py-1.5 text-sm font-medium', inset && 'pl-8', className)}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: DropdownMenuPrimitive.SeparatorProps & {
  ref?: React.RefObject<DropdownMenuPrimitive.SeparatorRef>;
}) {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  );
}

function DropdownMenuShortcut({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
