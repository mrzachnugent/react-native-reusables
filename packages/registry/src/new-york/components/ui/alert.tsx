import { Icon } from '@/new-york/components/ui/icon';
import { Text, TextClassContext } from '@/new-york/components/ui/text';
import { cn } from '@/new-york/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react-native';
import * as React from 'react';
import { View, type ViewProps } from 'react-native';

const alertVariants = cva(
  'relative bg-background w-full rounded-lg border border-border px-4 pt-3.5 pb-2',
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
  icon,
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
    <TextClassContext.Provider
      value={cn(
        'text-sm text-foreground',
        variant === 'destructive' && 'text-destructive',
        className
      )}
    >
      <View role='alert' className={alertVariants({ variant, className })} {...props}>
        <View className='absolute left-3.5 top-3'>
          <Icon
            as={icon}
            size={iconSize}
            className={cn(variant === 'destructive' && 'text-destructive', iconClassName)}
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
      className={cn('pl-6 ml-0.5 mb-1 min-h-4 font-medium leading-none tracking-tight', className)}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }: React.ComponentProps<typeof Text>) {
  const textClass = React.useContext(TextClassContext);
  return (
    <Text
      className={cn(
        'pl-6 ml-0.5 pb-1.5 text-sm leading-relaxed text-muted-foreground',
        textClass?.includes('text-destructive') && 'text-destructive/90',
        className
      )}
      {...props}
    />
  );
}

export { Alert, AlertDescription, AlertTitle };
