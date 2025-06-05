import { Text, TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react-native';
import * as React from 'react';
import { View, type ViewProps } from 'react-native';

const alertVariants = cva(
  'relative bg-background w-full rounded-lg border border-border px-4 py-3',
  {
    variants: {
      variant: {
        default: '',
        destructive: 'border-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Alert({
  className,
  variant,
  children,
  icon: Icon,
  iconSize = 16,
  iconClassName,
  ...props
}: ViewProps &
  VariantProps<typeof alertVariants> & {
    ref?: React.RefObject<View>;
    icon: LucideIcon;
    iconSize?: number;
    iconClassName?: string;
  }) {
  return (
    <TextClassContext.Provider value={cn('text-sm text-foreground', className)}>
      <View role='alert' className={alertVariants({ variant, className })} {...props}>
        <View className='absolute left-3.5 top-4 -translate-y-0.5'>
          <Icon
            size={iconSize}
            className={cn(
              iconClassName,
              'text-foreground',
              variant === 'destructive' && 'text-destructive'
            )}
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
      className={cn(
        'pl-7 mb-1 font-medium text-base leading-none tracking-tight text-foreground',
        className
      )}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }: React.ComponentProps<typeof Text>) {
  return (
    <Text className={cn('pl-7 text-sm leading-relaxed text-foreground', className)} {...props} />
  );
}

export { Alert, AlertDescription, AlertTitle };
