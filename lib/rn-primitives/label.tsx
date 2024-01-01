import React from 'react';
import { Pressable, Text as RNText } from 'react-native';
import { PressableSlot } from '~/lib/rn-primitives/slot';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/utils';

const Root = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable> & {
    nativeID: string;
  }
>(({ asChild, ...props }, ref) => {
  const Slot = asChild ? PressableSlot : Pressable;
  return <Slot ref={ref} {...props} />;
});

Root.displayName = 'RootLabel';

const Text = React.forwardRef<
  React.ElementRef<typeof RNText>,
  React.ComponentPropsWithoutRef<typeof RNText>
>((props, ref) => {
  return <RNText ref={ref} {...props} />;
});

Text.displayName = 'TextLabel';

export { Root, Text };
