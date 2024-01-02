import React from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import { PressableSlot, ViewSlot } from '~/lib/rn-primitives/slot';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/utils';

interface RootProps {
  disabled?: boolean;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

interface CheckboxContext extends RootProps {
  nativeID?: string;
}

const CheckboxContext = React.createContext({} as CheckboxContext);

const Root = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable> & RootProps
>(
  (
    { asChild, disabled = false, checked, onCheckedChange, nativeID, ...props },
    ref
  ) => {
    return (
      <CheckboxContext.Provider
        value={{
          disabled,
          checked,
          onCheckedChange,
          nativeID,
        }}
      >
        <Trigger ref={ref} {...props} />
      </CheckboxContext.Provider>
    );
  }
);

Root.displayName = 'RootCheckbox';

function useCheckboxContext() {
  const context = React.useContext(CheckboxContext);
  if (!context) {
    throw new Error(
      'Checkbox compound components cannot be rendered outside the Checkbox component'
    );
  }
  return context;
}

const Trigger = React.forwardRef<
  React.ElementRef<typeof Pressable> & { click?: () => void },
  ComponentPropsWithAsChild<typeof Pressable>
>(({ asChild, onPress: onPressProp, ...props }, ref) => {
  const { disabled, checked, onCheckedChange, nativeID } = useCheckboxContext();

  function onPress(ev: GestureResponderEvent) {
    if (disabled) return;
    const newValue = !checked;
    onCheckedChange(newValue);
    onPressProp?.(ev);
  }

  const Slot = asChild ? PressableSlot : Pressable;
  return (
    <Slot
      ref={ref}
      nativeID={nativeID}
      aria-disabled={disabled}
      role='checkbox'
      aria-checked={checked}
      onPress={onPress}
      accessibilityState={{
        checked,
        disabled,
      }}
      disabled={disabled}
      {...props}
    />
  );
});

Trigger.displayName = 'TriggerCheckbox';

const Indicator = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & { forceMount?: boolean }
>(({ asChild, forceMount = false, ...props }, ref) => {
  const { checked, disabled } = useCheckboxContext();

  if (!forceMount) {
    if (!checked) {
      return null;
    }
  }

  const Slot = asChild ? ViewSlot : View;
  return (
    <Slot
      ref={ref}
      aria-disabled={disabled}
      aria-hidden={!(forceMount || checked)}
      role={'presentation'}
      {...props}
    />
  );
});

Indicator.displayName = 'IndicatorCheckbox';

export { Indicator, Root };
