import React from 'react';
import { Pressable, Text as RNText } from 'react-native';
import * as Slot from '~/lib/rn-primitives/native/slot';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/types';

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
  ComponentPropsWithAsChild<typeof RNText> & {
    nativeID: string;
  }
>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText;
  return <Component ref={ref} {...props} />;
});

Text.displayName = 'TextLabel';

export { Root, Text };
