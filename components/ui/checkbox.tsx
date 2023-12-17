import React from 'react';
import { Check } from 'lucide-react-native';

import { cn } from '~/lib/utils';
import { Pressable, View } from 'react-native';
import * as Haptics from 'expo-haptics';

interface CheckboxProps {
  value?: boolean;
  onChange?: React.Dispatch<React.SetStateAction<boolean>>;
  iconClass?: string;
  iconSize?: number;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  Omit<React.ComponentPropsWithoutRef<typeof Pressable>, 'onPress'> &
    CheckboxProps
>(
  (
    { className, value = false, onChange, iconClass, iconSize = 18, ...props },
    ref
  ) => {
    const [checked, setChecked] = React.useState(value);
    return (
      <Pressable
        ref={ref}
        role='checkbox'
        accessibilityState={{ checked: value || checked }}
        className={cn(
          'peer h-8 w-8 shrink-0 flex items-center bg-card justify-center rounded-md border border-primary ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          if (onChange) {
            onChange((prev) => !prev);
            return;
          }
          setChecked((prev) => !prev);
        }}
        {...props}
      >
        <View />
        {(value || checked) && (
          <Check size={iconSize} className={cn('text-foreground', iconClass)} />
        )}
      </Pressable>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
