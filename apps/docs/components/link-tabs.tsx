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
      activationMode='manual'
    />
  );
}

function LinkTabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        'inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b p-0',
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
          'inline-flex no-underline items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative h-9 rounded-none border-b-2 border-b-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none',
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
        'mt-5 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold',
        className
      )}
      {...props}
    />
  );
}

export { LinkTabs, LinkTabsList, LinkTabsTrigger, LinkTabsContent };
