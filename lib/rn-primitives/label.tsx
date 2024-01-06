import React from 'react';
import { Pressable, Text as RNText } from 'react-native';
import * as Slot from '~/lib/rn-primitives/slot';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/utils';

const Root = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable>
>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;
  return <Component ref={ref} {...props} />;
});

Root.displayName = 'RootLabel';

const Text = React.forwardRef<
  React.ElementRef<typeof RNText>,
  React.ComponentPropsWithoutRef<typeof RNText> & {
    nativeID: string;
  }
>((props, ref) => {
  return <RNText ref={ref} {...props} />;
});

Text.displayName = 'TextLabel';

export { Root, Text };
