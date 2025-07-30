'use client';

import { withRegistryProvider } from '@/registry/registry-provider';

import {
  NativeSelectScrollView as NativeSelectScrollViewNewYork,
  SelectContent as SelectContentNewYork,
  SelectGroup as SelectGroupNewYork,
  SelectItem as SelectItemNewYork,
  SelectLabel as SelectLabelNewYork,
  Select as SelectNewYork,
  SelectScrollDownButton as SelectScrollDownButtonNewYork,
  SelectScrollUpButton as SelectScrollUpButtonNewYork,
  SelectSeparator as SelectSeparatorNewYork,
  SelectTrigger as SelectTriggerNewYork,
  SelectValue as SelectValueNewYork,
} from '@/registry/new-york/components/ui/select';

import {
  NativeSelectScrollView as NativeSelectScrollViewDefault,
  Option,
  SelectContent as SelectContentDefault,
  Select as SelectDefault,
  SelectGroup as SelectGroupDefault,
  SelectItem as SelectItemDefault,
  SelectLabel as SelectLabelDefault,
  SelectScrollDownButton as SelectScrollDownButtonDefault,
  SelectScrollUpButton as SelectScrollUpButtonDefault,
  SelectSeparator as SelectSeparatorDefault,
  SelectTrigger as SelectTriggerDefault,
  SelectValue as SelectValueDefault,
} from '@/registry/default/components/ui/select';

export type { Option };

export const NativeSelectScrollView = withRegistryProvider(
  NativeSelectScrollViewDefault,
  NativeSelectScrollViewNewYork
);
export const Select = withRegistryProvider(SelectDefault, SelectNewYork);
export const SelectContent = withRegistryProvider(SelectContentDefault, SelectContentNewYork);
export const SelectGroup = withRegistryProvider(SelectGroupDefault, SelectGroupNewYork);
export const SelectItem = withRegistryProvider(SelectItemDefault, SelectItemNewYork);
export const SelectLabel = withRegistryProvider(SelectLabelDefault, SelectLabelNewYork);
export const SelectScrollDownButton = withRegistryProvider(
  SelectScrollDownButtonDefault,
  SelectScrollDownButtonNewYork
);
export const SelectScrollUpButton = withRegistryProvider(
  SelectScrollUpButtonDefault,
  SelectScrollUpButtonNewYork
);
export const SelectSeparator = withRegistryProvider(SelectSeparatorDefault, SelectSeparatorNewYork);
export const SelectTrigger = withRegistryProvider(SelectTriggerDefault, SelectTriggerNewYork);
export const SelectValue = withRegistryProvider(SelectValueDefault, SelectValueNewYork);
