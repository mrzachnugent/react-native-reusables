import { cn } from '@/registry/new-york/lib/utils';
import * as AvatarPrimitive from '@rn-primitives/avatar';
import * as React from 'react';

function Avatar({
  className,
  ...props
}: AvatarPrimitive.RootProps & {
  ref?: React.RefObject<AvatarPrimitive.RootRef | null>;
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
  ref?: React.RefObject<AvatarPrimitive.ImageRef | null>;
}) {
  return <AvatarPrimitive.Image className={cn('aspect-square size-full', className)} {...props} />;
}

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.FallbackProps & {
  ref?: React.RefObject<AvatarPrimitive.FallbackRef | null>;
}) {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        'bg-muted flex size-full flex-row items-center justify-center rounded-full',
        className
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarFallback, AvatarImage };
