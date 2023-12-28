import { useColorScheme } from 'nativewind';
import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { cn } from '~/lib/utils';
import { Button, buttonVariants } from '~/components/ui/button';

interface ToggleGroupProps {
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  disabled?: boolean;
  type?: 'single' | 'multiple';
}

interface ToggleGroupContext {
  value: string | string[];
  setValue: React.Dispatch<React.SetStateAction<string | string[]>>;
  onValueChange?: (value: string | string[]) => void;
  disabled: boolean;
}

const ToggleGroupContext = React.createContext({} as ToggleGroupContext);

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & ToggleGroupProps
>(
  (
    {
      defaultValue = '',
      onValueChange,
      className,
      disabled = false,
      type = 'single',
      ...props
    },
    ref
  ) => {
    const [value, setValue] = React.useState(
      type === 'single'
        ? defaultValue
        : Array.isArray(defaultValue)
        ? defaultValue
        : []
    );

    return (
      <ToggleGroupContext.Provider
        value={{
          value,
          setValue,
          disabled,
          onValueChange,
        }}
      >
        <View
          role={type === 'single' ? 'radiogroup' : 'group'}
          ref={ref}
          className={cn('flex-row gap-3', className)}
          {...props}
        />
      </ToggleGroupContext.Provider>
    );
  }
);

ToggleGroup.displayName = 'ToggleGroup';

function useToggleGroupContext() {
  const context = React.useContext(ToggleGroupContext);
  if (!context) {
    throw new Error(
      'ToggleGroup compound components cannot be rendered outside the ToggleGroup component'
    );
  }
  return context;
}

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof Button>,
  Omit<React.ComponentPropsWithoutRef<typeof Button>, 'disabled' | 'style'> & {
    name: string;
    buttonClass?: string;
    children?: React.ReactNode;
    style?: ViewStyle;
  }
>(
  (
    {
      className,
      name,
      buttonClass,
      onPress,
      children,
      variant = 'default',
      size,
      style,
      ...props
    },
    ref
  ) => {
    const { value, setValue, disabled, onValueChange } =
      useToggleGroupContext();

    const { colorScheme } = useColorScheme();

    function handleOnPress(ev: GestureResponderEvent) {
      setValue((prev) => {
        if (typeof prev === 'string') {
          const newVal = prev === name ? '' : name;
          onValueChange?.(newVal);
          return newVal;
        }
        if (prev.includes(name)) {
          const newVal = prev.filter((v) => v !== name);
          onValueChange?.(newVal);
          return newVal;
        }
        const newVal = [...prev, name];
        onValueChange?.(newVal);
        return newVal;
      });
      onPress?.(ev);
    }

    const isSelected = Array.isArray(value)
      ? value.includes(name)
      : value === name;

    return (
      <Pressable
        disabled={disabled}
        onPress={handleOnPress}
        className={buttonClass}
        accessibilityState={{ selected: value === name }}
        role={typeof name === 'string' ? 'radio' : 'switch'}
        ref={ref}
        {...props}
      >
        {({ pressed }) => (
          <View
            className={cn(
              'border bg-background',
              pressed ? 'opacity-70' : '',
              isSelected ? 'border-border' : 'border-transparent',
              buttonVariants({
                variant: isSelected
                  ? 'secondary'
                  : variant === 'default'
                  ? 'ghost'
                  : 'outline',
                size,
                className,
              })
            )}
            style={[
              isSelected && colorScheme === 'dark' && styles.shadowDark,
              style,
            ]}
          >
            {children}
          </View>
        )}
      </Pressable>
    );
  }
);

export { ToggleGroup, ToggleGroupItem };

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
