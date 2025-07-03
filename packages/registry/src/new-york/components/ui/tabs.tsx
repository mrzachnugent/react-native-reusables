import { TextClassContext } from '@/new-york/components/ui/text';
import { cn } from '@/new-york/lib/utils';
import * as TabsPrimitive from '@rn-primitives/tabs';
import * as React from 'react';
import { Platform } from 'react-native';

function Tabs({
  className,
  ...props
}: TabsPrimitive.RootProps & {
  ref?: React.RefObject<TabsPrimitive.RootRef>;
}) {
  return <TabsPrimitive.Root className={cn('flex flex-col gap-2', className)} {...props} />;
}

function TabsList({
  className,
  ...props
}: TabsPrimitive.ListProps & {
  ref?: React.RefObject<TabsPrimitive.ListRef>;
}) {
  return (
    <TabsPrimitive.List
      className={cn(
        'bg-muted text-muted-foreground flex flex-row h-9 w-fit items-center justify-center rounded-lg p-[3px]',
        Platform.select({ web: 'inline-flex' }),
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: TabsPrimitive.TriggerProps & {
  ref?: React.RefObject<TabsPrimitive.TriggerRef>;
}) {
  const { value } = TabsPrimitive.useRootContext();
  return (
    <TextClassContext.Provider
      value={cn(
        'text-foreground dark:text-muted-foreground text-sm font-medium',
        value === props.value && 'dark:text-foreground'
      )}
    >
      <TabsPrimitive.Trigger
        className={cn(
          'flex flex-row h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 shadow-none',
          Platform.select({
            web: 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring inline-flex whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-default',
          }),
          props.disabled && 'opacity-50',
          props.value === value && 'bg-background dark:border-foreground/10 dark:bg-input/30',
          Platform.select({ native: 'shadow-black/10' }),
          className
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function TabsContent({
  className,
  ...props
}: TabsPrimitive.ContentProps & {
  ref?: React.RefObject<TabsPrimitive.ContentRef>;
}) {
  return (
    <TabsPrimitive.Content
      className={cn(Platform.select({ web: 'flex-1 outline-none' }), className)}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
