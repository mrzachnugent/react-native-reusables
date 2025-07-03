import { Icon } from '@/components/ui/icon';
import { NativeOnlyAnimatedView } from '@/components/ui/native-only-animated-view';
import { cn } from '@/lib/utils';
import * as SelectPrimitive from '@rn-primitives/select';
import { Check, ChevronDown, ChevronDownIcon, ChevronUpIcon } from 'lucide-react-native';
import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { TextClassContext } from './text';

type Option = SelectPrimitive.Option;

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

function SelectValue({
  ref,
  className,
  ...props
}: SelectPrimitive.ValueProps & {
  ref?: React.RefObject<SelectPrimitive.ValueRef>;
  className?: string;
}) {
  const { value } = SelectPrimitive.useRootContext();
  return (
    <SelectPrimitive.Value
      ref={ref}
      className={cn(
        'line-clamp-1 flex flex-row items-center gap-2',
        !value && 'text-muted-foreground',
        className
      )}
      {...props}
    />
  );
}

function SelectTrigger({
  ref,
  className,
  children,
  size = 'default',
  ...props
}: SelectPrimitive.TriggerProps & {
  ref?: React.RefObject<SelectPrimitive.TriggerRef>;
  children?: React.ReactNode;
  size?: 'default' | 'sm';
}) {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        'border-input dark:bg-input/30 dark:active:bg-input/50 flex flex-row items-center justify-between gap-2 rounded-md border bg-background px-3 py-2 shadow-sm h-9',
        Platform.select({
          web: 'focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-input/50 w-fit whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm',
          native: 'shadow-black/5',
        }),
        props.disabled && 'opacity-50',
        size === 'sm' && 'h-8 py-1.5',
        className
      )}
      {...props}
    >
      <>{children}</>
      <Icon as={ChevronDown} aria-hidden={true} className='size-4 text-muted-foreground' />
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = 'popper',
  portalHost,
  ...props
}: SelectPrimitive.ContentProps & {
  ref?: React.RefObject<SelectPrimitive.ContentRef>;
  className?: string;
  portalHost?: string;
}) {
  return (
    <SelectPrimitive.Portal hostName={portalHost}>
      <SelectPrimitive.Overlay style={Platform.select({ native: StyleSheet.absoluteFill })}>
        <TextClassContext.Provider value='text-popover-foreground'>
          <NativeOnlyAnimatedView className='z-50' entering={FadeIn} exiting={FadeOut}>
            <SelectPrimitive.Content
              className={cn(
                'bg-popover relative z-50 min-w-[8rem] rounded-md border border-border shadow-md',
                Platform.select({
                  web: cn(
                    'animate-in fade-in-0 zoom-in-95 max-h-52 origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto',
                    props.side === 'bottom' && 'slide-in-from-top-2',
                    props.side === 'top' && 'slide-in-from-bottom-2'
                  ),
                  native: 'p-1 shadow-black/5',
                }),
                position === 'popper' &&
                  Platform.select({
                    web: cn(
                      props.side === 'bottom' && 'translate-y-1',
                      props.side === 'top' && '-translate-y-1'
                    ),
                  }),
                className
              )}
              position={position}
              {...props}
            >
              <SelectScrollUpButton />
              <SelectPrimitive.Viewport
                className={cn(
                  'p-1',
                  position === 'popper' &&
                    cn(
                      'w-full',
                      Platform.select({
                        web: 'h-[var(--radix-select-trigger-height)]  min-w-[var(--radix-select-trigger-width)]',
                      })
                    )
                )}
              >
                {children}
              </SelectPrimitive.Viewport>
              <SelectScrollDownButton />
            </SelectPrimitive.Content>
          </NativeOnlyAnimatedView>
        </TextClassContext.Provider>
      </SelectPrimitive.Overlay>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.LabelProps & {
  ref?: React.RefObject<SelectPrimitive.LabelRef>;
}) {
  return (
    <SelectPrimitive.Label
      className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.ItemProps & {
  ref?: React.RefObject<SelectPrimitive.ItemRef>;
}) {
  return (
    <SelectPrimitive.Item
      className={cn(
        'group active:bg-accent relative flex flex-row w-full items-center gap-2 rounded-sm py-1.5 pr-8 pl-2',
        Platform.select({
          web: 'focus:bg-accent focus:text-accent-foreground outline-none cursor-default data-[disabled]:pointer-events-none [&_svg]:pointer-events-none  *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2',
        }),
        props.disabled && 'opacity-50',
        className
      )}
      {...props}
    >
      <View className='absolute right-2 flex size-3.5 items-center justify-center'>
        <SelectPrimitive.ItemIndicator>
          <Icon as={Check} className='text-muted-foreground shrink-0 size-4' />
        </SelectPrimitive.ItemIndicator>
      </View>
      <SelectPrimitive.ItemText className='text-foreground group-active:text-accent-foreground text-sm select-none' />
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.SeparatorProps & {
  ref?: React.RefObject<SelectPrimitive.SeparatorRef>;
}) {
  return (
    <SelectPrimitive.Separator
      className={cn(
        'bg-border -mx-1 my-1 h-px',
        Platform.select({ web: 'pointer-events-none' }),
        className
      )}
      {...props}
    />
  );
}

/**
 * @platform Web only
 * Returns null on native platforms
 */
function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  if (Platform.OS !== 'web') {
    return null;
  }
  return (
    <SelectPrimitive.ScrollUpButton
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <Icon as={ChevronUpIcon} className='size-4' />
    </SelectPrimitive.ScrollUpButton>
  );
}

/**
 * @platform Web only
 * Returns null on native platforms
 */
function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  if (Platform.OS !== 'web') {
    return null;
  }
  return (
    <SelectPrimitive.ScrollDownButton
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <Icon as={ChevronDownIcon} className='size-4' />
    </SelectPrimitive.ScrollDownButton>
  );
}

/**
 * @platform Native only
 * Returns the children on the web
 */
function NativeSelectScrollView({ className, ...props }: React.ComponentProps<typeof ScrollView>) {
  if (Platform.OS === 'web') {
    return <>{props.children}</>;
  }
  return <ScrollView className={cn('max-h-52', className)} {...props} />;
}

export {
  NativeSelectScrollView,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  type Option,
};
