import { useColorScheme } from 'nativewind';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Button, buttonVariants } from '~/components/ui/button';
import { cn } from '~/lib/utils';

interface ToggleProps {
  defaultValue?: boolean;
  value?: boolean;
  onChange?: React.Dispatch<React.SetStateAction<boolean>>;
  variant?: 'default' | 'outline';
}

const Toggle = React.forwardRef<
  React.ElementRef<typeof Button>,
  Omit<
    React.ComponentPropsWithoutRef<typeof Button>,
    'variant' | 'onPress' | 'children'
  > &
    ToggleProps & {
      children?: React.ReactNode;
    }
>(
  (
    {
      defaultValue,
      value,
      onChange,
      className,
      size,
      textClass,
      children,
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const { colorScheme } = useColorScheme();
    const [isChecked, setChecked] = React.useState(false);
    return (
      <Pressable
        ref={ref}
        onPress={() => {
          if (onChange) {
            onChange((prev) => !prev);
            return;
          }
          setChecked((prev) => !prev);
        }}
        role='switch'
        accessibilityState={{ selected: value || isChecked }}
        {...props}
      >
        {({ pressed }) => (
          <View
            className={cn(
              'border bg-background',
              pressed ? 'opacity-70' : '',
              value || isChecked ? 'border-border' : 'border-transparent',
              buttonVariants({
                variant:
                  value || isChecked
                    ? 'secondary'
                    : variant === 'default'
                    ? 'ghost'
                    : 'outline',
                size,
                className,
              })
            )}
            style={
              (value || isChecked) &&
              colorScheme === 'dark' &&
              styles.shadowDark
            }
          >
            {children}
          </View>
        )}
      </Pressable>
    );
  }
);

export { Toggle };

const styles = StyleSheet.create({
  shadowDark: {
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
});
