import * as React from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import { cn } from '../../lib/utils';
import { Label } from './label';

interface RadioGroupProps {
  defaultValue?: string;
  onValueChange?: (val: string) => void;
  disabled?: boolean;
}

interface RadioGroupContext {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onValueChange?: (val: string) => void;
  disabled: boolean;
}

const RadioGroupContext = React.createContext({} as RadioGroupContext);

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & RadioGroupProps
>(({ defaultValue = '', onValueChange, className, disabled = false, ...props }, ref) => {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <RadioGroupContext.Provider
      value={{
        value,
        setValue,
        disabled,
        onValueChange,
      }}
    >
      <View role='radiogroup' ref={ref} className={cn('gap-2', className)} {...props} />
    </RadioGroupContext.Provider>
  );
});

RadioGroup.displayName = 'RadioGroup';

function useRadioGroupContext() {
  const context = React.useContext(RadioGroupContext);
  if (!context) {
    throw new Error(
      'RadioGroup compound components cannot be rendered outside the RadioGroup component'
    );
  }
  return context;
}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  Omit<React.ComponentPropsWithoutRef<typeof Pressable>, 'disabled'> & {
    name: string;
    labelClass?: string;
    buttonClass?: string;
    innerButtonClass?: string;
    children?: string;
  }
>(
  (
    { className, name, labelClass, buttonClass, innerButtonClass, onPress, children, ...props },
    ref
  ) => {
    const { value, setValue, disabled, onValueChange } = useRadioGroupContext();

    function handleOnPress(ev: GestureResponderEvent) {
      setValue(name);
      onValueChange?.(name);
      onPress?.(ev);
    }

    return (
      <View className={cn('flex-row gap-3 items-center', className)}>
        <Pressable
          disabled={disabled}
          onPress={handleOnPress}
          className={cn(
            'h-6 w-6 border-primary native:[borderWidth:1.5] web:border rounded-full items-center justify-center',
            buttonClass
          )}
          aria-labelledby={name}
          accessibilityState={{ selected: value === name }}
          role='radio'
          {...props}
        >
          {value === name && (
            <View ref={ref} className={cn('h-3 w-3 bg-primary rounded-full', innerButtonClass)} />
          )}
        </Pressable>
        <Label onPress={handleOnPress} className={cn('text-xl', labelClass)} nativeID={name}>
          {children}
        </Label>
      </View>
    );
  }
);

export { RadioGroup, RadioGroupItem };
