'use client';

import { withRegistryProvider } from '@/registry/registry-provider';

import {
  RadioGroupItem as RadioGroupItemNewYork,
  RadioGroup as RadioGroupNewYork,
} from '@/registry/new-york/components/ui/radio-group';

import {
  RadioGroup as RadioGroupDefault,
  RadioGroupItem as RadioGroupItemDefault,
} from '@/registry/default/components/ui/radio-group';

export const RadioGroup = withRegistryProvider(RadioGroupDefault, RadioGroupNewYork);
export const RadioGroupItem = withRegistryProvider(RadioGroupItemDefault, RadioGroupItemNewYork);
