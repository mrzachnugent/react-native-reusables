'use client';

import { withRegistryProvider } from '@/registry/registry-provider';

import {
  PopoverContent as PopoverContentNewYork,
  Popover as PopoverNewYork,
  PopoverTrigger as PopoverTriggerNewYork,
} from '@/registry/new-york/components/ui/popover';

import {
  PopoverContent as PopoverContentDefault,
  Popover as PopoverDefault,
  PopoverTrigger as PopoverTriggerDefault,
} from '@/registry/default/components/ui/popover';

export const Popover = withRegistryProvider(PopoverDefault, PopoverNewYork);
export const PopoverContent = withRegistryProvider(PopoverContentDefault, PopoverContentNewYork);
export const PopoverTrigger = withRegistryProvider(PopoverTriggerDefault, PopoverTriggerNewYork);
