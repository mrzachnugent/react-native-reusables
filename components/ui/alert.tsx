import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/lib/utils';
import { View, Text, StyleSheet } from 'react-native';
import * as LucideIcon from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

const alertVariants = cva(
  'bg-background relative w-full rounded-lg border p-5',
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
  React.ComponentPropsWithoutRef<typeof View> &
    VariantProps<typeof alertVariants> & {
      icon?: keyof typeof LucideIcon;
    }
>(({ children, icon, className, variant, style, ...props }, ref) => {
  const { colorScheme } = useColorScheme();
  const Icon = LucideIcon[icon ?? 'AlertTriangle'] as LucideIcon.Icon;
  return (
    <View
      ref={ref}
      role='alert'
      className={cn(alertVariants({ variant }), icon && 'pl-[50]', className)}
      style={[
        colorScheme === 'dark' ? styles.shadowDark : styles.shadowLight,
        style,
      ]}
      {...props}
    >
      {icon && (
        <Icon
          size={21}
          className={cn(
            variant === 'destructive'
              ? 'text-destructive'
              : variant === 'success'
              ? 'text-emerald-500'
              : 'text-foreground',
            'translate-y-[-3px] absolute left-[16] top-[18]'
          )}
        />
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

export { Alert, AlertTitle, AlertDescription };

const styles = StyleSheet.create({
  shadowLight: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  shadowDark: {
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
});
