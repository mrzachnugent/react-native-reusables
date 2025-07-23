'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@docs/lib/utils';

const SectionTabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Root ref={ref} className={cn('relative w-full', className)} {...props} />
));

SectionTabs.displayName = TabsPrimitive.Root.displayName;

const SectionTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'text-muted-foreground inline-flex h-9 w-full items-center justify-start rounded-none border-b p-0',
      className
    )}
    {...props}
  />
));
SectionTabsList.displayName = TabsPrimitive.List.displayName;

const SectionTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'ring-offset-background focus-visible:ring-ring text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative inline-flex h-9 items-center justify-center whitespace-nowrap rounded-none border-b-2 border-b-transparent px-4 py-1 pb-3 pt-2 text-sm font-semibold shadow-none transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-none',
      className
    )}
    {...props}
  />
));
SectionTabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const SectionTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'ring-offset-background focus-visible:ring-ring relative mt-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold',
      className
    )}
    {...props}
  />
));
SectionTabsContent.displayName = TabsPrimitive.Content.displayName;

export { SectionTabs, SectionTabsList, SectionTabsTrigger, SectionTabsContent };
