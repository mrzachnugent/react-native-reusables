'use client';

import { withRegistryProvider } from '@/registry/registry-provider';

import {
  DropdownMenuCheckboxItem as DropdownMenuCheckboxItemNewYork,
  DropdownMenuContent as DropdownMenuContentNewYork,
  DropdownMenuGroup as DropdownMenuGroupNewYork,
  DropdownMenuItem as DropdownMenuItemNewYork,
  DropdownMenuLabel as DropdownMenuLabelNewYork,
  DropdownMenu as DropdownMenuNewYork,
  DropdownMenuPortal as DropdownMenuPortalNewYork,
  DropdownMenuRadioGroup as DropdownMenuRadioGroupNewYork,
  DropdownMenuRadioItem as DropdownMenuRadioItemNewYork,
  DropdownMenuSeparator as DropdownMenuSeparatorNewYork,
  DropdownMenuShortcut as DropdownMenuShortcutNewYork,
  DropdownMenuSubContent as DropdownMenuSubContentNewYork,
  DropdownMenuSub as DropdownMenuSubNewYork,
  DropdownMenuSubTrigger as DropdownMenuSubTriggerNewYork,
  DropdownMenuTrigger as DropdownMenuTriggerNewYork,
} from '@/registry/new-york/components/ui/dropdown-menu';

import {
  DropdownMenuCheckboxItem as DropdownMenuCheckboxItemDefault,
  DropdownMenuContent as DropdownMenuContentDefault,
  DropdownMenu as DropdownMenuDefault,
  DropdownMenuGroup as DropdownMenuGroupDefault,
  DropdownMenuItem as DropdownMenuItemDefault,
  DropdownMenuLabel as DropdownMenuLabelDefault,
  DropdownMenuPortal as DropdownMenuPortalDefault,
  DropdownMenuRadioGroup as DropdownMenuRadioGroupDefault,
  DropdownMenuRadioItem as DropdownMenuRadioItemDefault,
  DropdownMenuSeparator as DropdownMenuSeparatorDefault,
  DropdownMenuShortcut as DropdownMenuShortcutDefault,
  DropdownMenuSubContent as DropdownMenuSubContentDefault,
  DropdownMenuSub as DropdownMenuSubDefault,
  DropdownMenuSubTrigger as DropdownMenuSubTriggerDefault,
  DropdownMenuTrigger as DropdownMenuTriggerDefault,
} from '@/registry/default/components/ui/dropdown-menu';

export const DropdownMenu = withRegistryProvider(DropdownMenuDefault, DropdownMenuNewYork);
export const DropdownMenuCheckboxItem = withRegistryProvider(
  DropdownMenuCheckboxItemDefault,
  DropdownMenuCheckboxItemNewYork
);
export const DropdownMenuContent = withRegistryProvider(
  DropdownMenuContentDefault,
  DropdownMenuContentNewYork
);
export const DropdownMenuGroup = withRegistryProvider(
  DropdownMenuGroupDefault,
  DropdownMenuGroupNewYork
);
export const DropdownMenuItem = withRegistryProvider(
  DropdownMenuItemDefault,
  DropdownMenuItemNewYork
);
export const DropdownMenuLabel = withRegistryProvider(
  DropdownMenuLabelDefault,
  DropdownMenuLabelNewYork
);
export const DropdownMenuPortal = withRegistryProvider(
  DropdownMenuPortalDefault,
  DropdownMenuPortalNewYork
);
export const DropdownMenuRadioGroup = withRegistryProvider(
  DropdownMenuRadioGroupDefault,
  DropdownMenuRadioGroupNewYork
);
export const DropdownMenuRadioItem = withRegistryProvider(
  DropdownMenuRadioItemDefault,
  DropdownMenuRadioItemNewYork
);
export const DropdownMenuSeparator = withRegistryProvider(
  DropdownMenuSeparatorDefault,
  DropdownMenuSeparatorNewYork
);
export const DropdownMenuShortcut = withRegistryProvider(
  DropdownMenuShortcutDefault,
  DropdownMenuShortcutNewYork
);
export const DropdownMenuSub = withRegistryProvider(DropdownMenuSubDefault, DropdownMenuSubNewYork);
export const DropdownMenuSubContent = withRegistryProvider(
  DropdownMenuSubContentDefault,
  DropdownMenuSubContentNewYork
);
export const DropdownMenuSubTrigger = withRegistryProvider(
  DropdownMenuSubTriggerDefault,
  DropdownMenuSubTriggerNewYork
);
export const DropdownMenuTrigger = withRegistryProvider(
  DropdownMenuTriggerDefault,
  DropdownMenuTriggerNewYork
);
