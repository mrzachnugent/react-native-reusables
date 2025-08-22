'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@docs/lib/utils';
import Link from 'next/link';

function LinkTabs({
  className,
  ...props
}: Omit<
  React.ComponentProps<typeof TabsPrimitive.Root>,
  'value' | 'defaultValue' | 'onValueChange' | 'activationMode'
> & {
  value: `/${string}`;
}) {
  return (
    <TabsPrimitive.Root
      className={cn('relative w-full', className)}
      {...props}
      activationMode="manual"
    />
  );
}

function LinkTabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        'text-muted-foreground inline-flex h-9 w-full items-center justify-start rounded-none border-b p-0',
        className
      )}
      {...props}
    />
  );
}

function LinkTabsTrigger({ className, ...props }: React.ComponentProps<typeof Link>) {
  return (
    <TabsPrimitive.Trigger value={props.href.toString()} asChild>
      <Link
        className={cn(
          'ring-offset-background focus-visible:ring-ring text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative inline-flex h-9 items-center justify-center whitespace-nowrap rounded-none border-b-2 border-b-transparent px-4 py-1 pb-3 pt-2 text-sm font-semibold no-underline shadow-none transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-none',
          className
        )}
        {...props}
      />
    </TabsPrimitive.Trigger>
  );
}

function LinkTabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn(
        'ring-offset-background focus-visible:ring-ring relative mt-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold',
        className
      )}
      {...props}
    />
  );
}

export { LinkTabs, LinkTabsList, LinkTabsTrigger, LinkTabsContent };
