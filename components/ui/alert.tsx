import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import * as LucideIcon from 'lucide-react-native';
import { useColorScheme } from '~/lib/useColorScheme';
import { Text, View, ViewStyle } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { cn } from '~/lib/utils';

const alertVariants = cva(
  'bg-background relative w-full rounded-lg border p-5 shadow shadow-primary/10',
  {
    variants: {
      variant: {
        default: 'border-muted-foreground',
        destructive: 'border-destructive',
        success: 'border-emerald-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Alert = React.forwardRef<
  React.ElementRef<typeof View>,
  Omit<React.ComponentPropsWithoutRef<typeof View>, 'style'> &
    VariantProps<typeof alertVariants> & {
      icon?: keyof typeof LucideIcon;
      style?: ViewStyle;
    }
>(({ children, icon, className, variant, style: styleProp, ...props }, ref) => {
  const { colorScheme } = useColorScheme();

  const Icon = LucideIcon[icon ?? 'AlertTriangle'] as LucideIcon.LucideIcon;
  return (
    <View
      ref={ref}
      role='alert'
      className={cn(
        alertVariants({ variant }),
        icon && 'ios:pl-[50] android:pl-[50] pl-[50px]',
        className
      )}
      {...props}
    >
      {icon && (
        <View className='absolute left-[16px] top-[18px] native:left-[15] native:top-[15]'>
          <Icon
            size={21}
            color={
              variant === 'destructive'
                ? NAV_THEME[colorScheme ?? 'light'].notification
                : variant === 'success'
                ? '#10b981'
                : NAV_THEME[colorScheme ?? 'light'].text
            }
          />
        </View>
      )}
      {children}
    </View>
  );
});
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn(
      'mb-1.5 text-xl font-medium leading-none tracking-tight text-foreground',
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
    className={cn('text-muted-foreground', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertDescription, AlertTitle };
