'use client';

import { withRegistryProvider } from '@/registry/registry-provider';

import {
  ToggleGroupIcon as ToggleGroupIconNewYork,
  ToggleGroupItem as ToggleGroupItemNewYork,
  ToggleGroup as ToggleGroupNewYork,
} from '@/registry/new-york/components/ui/toggle-group';

import {
  ToggleGroup as ToggleGroupDefault,
  ToggleGroupIcon as ToggleGroupIconDefault,
  ToggleGroupItem as ToggleGroupItemDefault,
} from '@/registry/default/components/ui/toggle-group';

export const ToggleGroup = withRegistryProvider(ToggleGroupDefault, ToggleGroupNewYork);
export const ToggleGroupIcon = withRegistryProvider(ToggleGroupIconDefault, ToggleGroupIconNewYork);
export const ToggleGroupItem = withRegistryProvider(ToggleGroupItemDefault, ToggleGroupItemNewYork);
