import * as React from 'react';
import { Pressable, Text as RNText } from 'react-native';
import * as Slot from '~/components/primitives/slot';
import type { ComponentPropsWithAsChild } from '~/components/primitives/types';
import type { LabelRootProps, LabelTextProps } from './types';

const Root = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  Omit<
    ComponentPropsWithAsChild<typeof Pressable>,
    'children' | 'hitSlop' | 'style'
  > &
    LabelRootProps
>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;
  return <Component ref={ref} {...props} />;
});

Root.displayName = 'RootNativeLabel';

const Text = React.forwardRef<
  React.ElementRef<typeof RNText>,
  ComponentPropsWithAsChild<typeof RNText> & LabelTextProps
>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText;
  return <Component ref={ref} {...props} />;
});

Text.displayName = 'TextNativeLabel';

export { Root, Text };
