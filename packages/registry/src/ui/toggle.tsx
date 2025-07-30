'use client';

import { withRegistryProvider } from '@/registry/registry-provider';

import {
  ToggleIcon as ToggleIconNewYork,
  Toggle as ToggleNewYork,
  toggleVariants as toggleVariantsNewYork,
} from '@/registry/new-york/components/ui/toggle';

import {
  Toggle as ToggleDefault,
  ToggleIcon as ToggleIconDefault,
  toggleVariants as toggleVariantsDefault,
} from '@/registry/default/components/ui/toggle';

export const Toggle = withRegistryProvider(ToggleDefault, ToggleNewYork);
export const ToggleIcon = withRegistryProvider(ToggleIconDefault, ToggleIconNewYork);
export const toggleVariants = withRegistryProvider(toggleVariantsDefault, toggleVariantsNewYork);
