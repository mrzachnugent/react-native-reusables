'use client';

import { withRegistryProvider } from '@/registry/registry-provider';

import { NativeOnlyAnimatedView as NativeOnlyAnimatedViewNewYork } from '@/registry/new-york/components/ui/native-only-animated-view';

import { NativeOnlyAnimatedView as NativeOnlyAnimatedViewDefault } from '@/registry/default/components/ui/native-only-animated-view';

export const NativeOnlyAnimatedView = withRegistryProvider(
  NativeOnlyAnimatedViewDefault,
  NativeOnlyAnimatedViewNewYork
);
