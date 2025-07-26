'use client';

import { Icon } from '@/registry/default/components/ui/icon';
import { Text, TextClassContext } from '@/registry/default/components/ui/text';
import { cn } from '@/registry/default/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react-native';
import * as React from 'react';
import { View, type ViewProps } from 'react-native';

const alertVariants = cva('border-border relative w-full rounded-lg border p-4', {
  variants: {
    variant: {
      default: 'bg-background',
      destructive: 'border-destructive/50 dark:border-destructive',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

function Alert({
  className,
  variant,
  children,
  icon,
  iconClassName,
  ...props
}: ViewProps &
  VariantProps<typeof alertVariants> & {
    ref?: React.RefObject<View | null>;
    icon: LucideIcon;
    iconClassName?: string;
  }) {
  return (
    <TextClassContext.Provider
      value={cn('text-foreground', variant === 'destructive' && 'text-destructive', className)}>
      <View role="alert" className={alertVariants({ variant, className })} {...props}>
        <View className="absolute left-4 top-4">
          <Icon
            as={icon}
            className={cn('size-4', variant === 'destructive' && 'text-destructive', iconClassName)}
          />
        </View>
        {children}
      </View>
    </TextClassContext.Provider>
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<typeof Text>) {
  return (
    <Text
      className={cn('mb-1 pl-7 font-medium leading-none tracking-tight', className)}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }: React.ComponentProps<typeof Text>) {
  const textClass = React.useContext(TextClassContext);
  return (
    <Text
      className={cn(
        'text-foreground pl-7 text-sm leading-relaxed',
        textClass?.includes('text-destructive') && 'text-destructive',
        className
      )}
      {...props}
    />
  );
}

export { Alert, AlertDescription, AlertTitle };
