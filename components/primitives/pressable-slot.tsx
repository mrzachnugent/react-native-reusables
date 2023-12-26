import * as React from 'react';
import { Pressable } from 'react-native';
import { composeRefs, mergeProps } from '~/components/primitives/utils';
import { isTextChildren } from '~/lib/utils';

type PressableSlotProps = React.ComponentPropsWithoutRef<typeof Pressable>;

const PressableSlot = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  PressableSlotProps
>((props, forwardedRef) => {
  const { children, ...PressableslotProps } = props;

  if (!React.isValidElement(children)) {
    return null;
  }

  return React.cloneElement<
    React.ComponentPropsWithoutRef<typeof Pressable>,
    React.ElementRef<typeof Pressable>
  >(isTextChildren(children) ? <Pressable /> : children, {
    ...mergeProps(PressableslotProps, children.props),
    ref: forwardedRef
      ? composeRefs(forwardedRef, (children as any).ref)
      : (children as any).ref,
  });
});

PressableSlot.displayName = 'Slot';

export { PressableSlot };
