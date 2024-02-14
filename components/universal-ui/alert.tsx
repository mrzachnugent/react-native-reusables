import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/lib/utils';
import { Text, View } from 'react-native';
import * as LucideIcon from 'lucide-react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';

const alertVariants = cva(
  'relative w-full rounded-lg border border-border p-4',
  {
    variants: {
      variant: {
        default: 'bg-background',
        destructive: 'border-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const alertIconVariants = cva(' text-foreground', {
  variants: {
    variant: {
      default: '',
      destructive: 'text-destructive',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const Alert = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> &
    VariantProps<typeof alertVariants> & {
      icon: keyof typeof LucideIcon;
      iconSize?: number;
      iconClassName?: string;
    }
>(
  (
    {
      className,
      variant,
      children,
      icon,
      iconSize = 16,
      iconClassName,
      ...props
    },
    ref
  ) => {
    const { colorScheme } = useColorScheme();
    const Icon = LucideIcon[icon] as LucideIcon.LucideIcon;
    return (
      <View
        ref={ref}
        role='alert'
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        <View className='absolute left-4 top-4 -translate-y-0.5'>
          <Icon
            size={iconSize}
            color={
              variant === 'destructive'
                ? NAV_THEME[colorScheme ?? 'light'].notification
                : NAV_THEME[colorScheme ?? 'light'].text
            }
          />
        </View>
        {children}
      </View>
    );
  }
);
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn(
      'pl-7 mb-1 font-medium text-base leading-none tracking-tight text-foreground',
      className
    )}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn('pl-7 text-sm leading-relaxed text-foreground', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
