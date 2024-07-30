import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { buttonVariants } from '../../components/deprecated-ui/button';
import * as Slot from '@rn-primitives/slot';
import { cn } from '../../lib/utils';

interface CollapsibleProps {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  defaultOpen?: boolean;
  disabled?: boolean;
}

interface CollapsibleContext {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  nativeID: string;
  disabled: boolean;
}

const CollapsibleContext = React.createContext({} as CollapsibleContext);

const Collapsible = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & CollapsibleProps
>(({ open, setOpen, defaultOpen, className, disabled = false, ...props }, ref) => {
  const [visible, setVisible] = React.useState(defaultOpen ?? false);
  const nativeID = React.useId();

  return (
    <CollapsibleContext.Provider
      value={{
        nativeID,
        visible: open ?? visible,
        setVisible: setOpen ?? setVisible,
        disabled: disabled ?? false,
      }}
    >
      <View ref={ref} role='presentation' className={cn('gap-3', className)} {...props} />
    </CollapsibleContext.Provider>
  );
});

function useCollapsibleContext() {
  const context = React.useContext(CollapsibleContext);
  if (!context) {
    throw new Error(
      'Collapsible compound components cannot be rendered outside the Collapsible component'
    );
  }
  return context;
}

const CollapsibleHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  return (
    <View
      role='heading'
      ref={ref}
      className={cn('flex-row items-center justify-between gap-3 px-4', className)}
      {...props}
    />
  );
});

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
>(({ className, onPress, variant = 'outline', size = 'sm', asChild = false, ...props }, ref) => {
  const { nativeID, visible, setVisible, disabled } = useCollapsibleContext();

  function handleOnPress(event: GestureResponderEvent) {
    setVisible((prev) => !prev);
    onPress?.(event);
  }

  const Trigger = asChild ? Slot.Pressable : Pressable;
  return (
    <Trigger
      key={`collapsible-trigger-${nativeID}`}
      onPress={handleOnPress}
      disabled={disabled}
      aria-expanded={visible}
      nativeID={nativeID}
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
});

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof Animated.View>,
  React.ComponentPropsWithoutRef<typeof Animated.View>
>(({ className, ...props }, ref) => {
  const { nativeID, visible } = useCollapsibleContext();

  if (!visible) return null;
  return (
    <Animated.View
      entering={FadeInDown}
      exiting={FadeOutUp.duration(150)}
      role='summary'
      ref={ref}
      className={cn('gap-3', className)}
      key={`collapsible-content-${nativeID}`}
      aria-labelledby={nativeID}
      {...props}
    />
  );
});

export { Collapsible, CollapsibleContent, CollapsibleHeader, CollapsibleTrigger };
