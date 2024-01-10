import React from 'react';
import type { GestureResponderEvent } from 'react-native';
import { SlottablePressableProps } from '../types';

/**
 * To be avoided if possible.
 * @option #1: Pass `asChild` to parent component.
 * @option #2: If option 1 doesn't work, pass `asChild` to parent component and add `on<EventType>` (ex: onPress) to child component.
 * @option #3: If option 2 doesn't work, use the `useTrigger` hook as shown below.
 *
 * @example
 * const { pressableProps, hideHtmlButtonProps, buttonRef } = useTrigger<HTMLButtonElement>(props);
 * const Component = asChild ? Slot.Pressable : Pressable;
 * return (
 *  <>
 *    <WebPrimitive.Trigger ref={buttonRef} {...hideHtmlButtonProps} />
 *    <WebPrimitive.Trigger asChild>
 *      <Component ref={ref} {...pressableProps} />
 *    </WebPrimitive.Trigger>
 *  </>
 * )
 */
export function useTrigger<T extends HTMLElement>(
  pressableProps: SlottablePressableProps
) {
  const buttonRef = React.useRef<T>(null);
  const { onPress: onPressProp, onKeyDown, onKeyUp, ...props } = pressableProps;
  function onPress(ev: GestureResponderEvent) {
    if (onPressProp) {
      onPressProp(ev);
    }
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  }
  return {
    buttonRef,
    hideHtmlButtonProps: {
      'aria-hidden': true,
      style: { position: 'fixed', top: 0, left: 0, zIndex: -999999999 },
      'aria-disabled': true,
      tabIndex: -1,
    } as const,
    pressableProps: {
      onPress,
      onKeyDown: (event: Event) => {
        onKeyDown?.(event as unknown as React.KeyboardEvent);
        const eventToDispatch = new KeyboardEvent('keydown', event);
        buttonRef.current?.dispatchEvent(eventToDispatch);
      },
      onKeyUp: (event: Event) => {
        onKeyUp?.(event as unknown as React.KeyboardEvent);
        const eventToDispatch = new KeyboardEvent('keyup', event);
        buttonRef.current?.dispatchEvent(eventToDispatch);
      },
      ...props,
    },
  };
}
