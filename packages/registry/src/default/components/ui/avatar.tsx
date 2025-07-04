'use client';

import { cn } from '@/registry/default/lib/utils';
import * as AvatarPrimitive from '@rn-primitives/avatar';
import * as React from 'react';

function Avatar({
  className,
  ...props
}: AvatarPrimitive.RootProps & {
  ref?: React.RefObject<AvatarPrimitive.RootRef>;
}) {
  return (
    <AvatarPrimitive.Root
      className={cn('relative flex size-8 shrink-0 overflow-hidden rounded-full', className)}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: AvatarPrimitive.ImageProps & {
  ref?: React.RefObject<AvatarPrimitive.ImageRef>;
}) {
  return <AvatarPrimitive.Image className={cn('aspect-square size-full', className)} {...props} />;
}

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.FallbackProps & {
  ref?: React.RefObject<AvatarPrimitive.FallbackRef>;
}) {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        'bg-muted flex flex-row size-full items-center justify-center rounded-full',
        className
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarFallback, AvatarImage };
