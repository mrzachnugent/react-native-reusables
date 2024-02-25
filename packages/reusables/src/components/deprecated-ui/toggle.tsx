import * as React from 'react';
import { Pressable, View } from 'react-native';
import { Button, buttonVariants } from '../../components/deprecated-ui/button';
import { cn } from '../../lib/utils';

interface ToggleProps {
  defaultValue?: boolean;
  value?: boolean;
  onChange?: React.Dispatch<React.SetStateAction<boolean>>;
  variant?: 'default' | 'outline';
}

const Toggle = React.forwardRef<
  React.ElementRef<typeof Button>,
  Omit<React.ComponentPropsWithoutRef<typeof Button>, 'variant' | 'onPress' | 'children'> &
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
                  value || isChecked ? 'secondary' : variant === 'default' ? 'ghost' : 'outline',
                size,
                className,
              })
            )}
          >
            {children}
          </View>
        )}
      </Pressable>
    );
  }
);

export { Toggle };
