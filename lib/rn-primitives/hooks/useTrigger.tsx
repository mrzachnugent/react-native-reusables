import type { GestureResponderEvent, Pressable } from 'react-native';

export function useTrigger(
  buttonRef: React.RefObject<HTMLButtonElement>,
  pressableProps: React.ComponentPropsWithoutRef<typeof Pressable>
) {
  const { onPress: onPressProp, ...props } = pressableProps;
  function onPress(ev: GestureResponderEvent) {
    if (onPressProp) {
      onPressProp(ev);
    }
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  }
  return {
    htmlButtonProps: {
      'aria-hidden': true,
      style: { position: 'absolute', zIndex: -999999999 },
      'aria-disabled': true,
      tabIndex: -1,
    } as const,
    pressableProps: {
      role: 'button' as const,
      onPress,
      onKeyDown: (event: Event) => {
        const eventToDispatch = new KeyboardEvent('keydown', event);
        buttonRef.current?.dispatchEvent(eventToDispatch);
      },
      onKeyUp: (event: Event) => {
        const eventToDispatch = new KeyboardEvent('keyup', event);
        buttonRef.current?.dispatchEvent(eventToDispatch);
      },
      ...props,
    },
  };
}
