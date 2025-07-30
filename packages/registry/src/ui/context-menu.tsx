'use client';

import { withRegistryProvider } from '@/registry/registry-provider';

import {
  ContextMenuCheckboxItem as ContextMenuCheckboxItemNewYork,
  ContextMenuContent as ContextMenuContentNewYork,
  ContextMenuGroup as ContextMenuGroupNewYork,
  ContextMenuItem as ContextMenuItemNewYork,
  ContextMenuLabel as ContextMenuLabelNewYork,
  ContextMenu as ContextMenuNewYork,
  ContextMenuRadioGroup as ContextMenuRadioGroupNewYork,
  ContextMenuRadioItem as ContextMenuRadioItemNewYork,
  ContextMenuSeparator as ContextMenuSeparatorNewYork,
  ContextMenuShortcut as ContextMenuShortcutNewYork,
  ContextMenuSubContent as ContextMenuSubContentNewYork,
  ContextMenuSub as ContextMenuSubNewYork,
  ContextMenuSubTrigger as ContextMenuSubTriggerNewYork,
  ContextMenuTrigger as ContextMenuTriggerNewYork,
} from '@/registry/new-york/components/ui/context-menu';

import {
  ContextMenuCheckboxItem as ContextMenuCheckboxItemDefault,
  ContextMenuContent as ContextMenuContentDefault,
  ContextMenu as ContextMenuDefault,
  ContextMenuGroup as ContextMenuGroupDefault,
  ContextMenuItem as ContextMenuItemDefault,
  ContextMenuLabel as ContextMenuLabelDefault,
  ContextMenuRadioGroup as ContextMenuRadioGroupDefault,
  ContextMenuRadioItem as ContextMenuRadioItemDefault,
  ContextMenuSeparator as ContextMenuSeparatorDefault,
  ContextMenuShortcut as ContextMenuShortcutDefault,
  ContextMenuSubContent as ContextMenuSubContentDefault,
  ContextMenuSub as ContextMenuSubDefault,
  ContextMenuSubTrigger as ContextMenuSubTriggerDefault,
  ContextMenuTrigger as ContextMenuTriggerDefault,
} from '@/registry/default/components/ui/context-menu';

export const ContextMenu = withRegistryProvider(ContextMenuDefault, ContextMenuNewYork);
export const ContextMenuCheckboxItem = withRegistryProvider(
  ContextMenuCheckboxItemDefault,
  ContextMenuCheckboxItemNewYork
);
export const ContextMenuContent = withRegistryProvider(
  ContextMenuContentDefault,
  ContextMenuContentNewYork
);
export const ContextMenuGroup = withRegistryProvider(
  ContextMenuGroupDefault,
  ContextMenuGroupNewYork
);
export const ContextMenuItem = withRegistryProvider(ContextMenuItemDefault, ContextMenuItemNewYork);
export const ContextMenuLabel = withRegistryProvider(
  ContextMenuLabelDefault,
  ContextMenuLabelNewYork
);
export const ContextMenuRadioGroup = withRegistryProvider(
  ContextMenuRadioGroupDefault,
  ContextMenuRadioGroupNewYork
);
export const ContextMenuRadioItem = withRegistryProvider(
  ContextMenuRadioItemDefault,
  ContextMenuRadioItemNewYork
);
export const ContextMenuSeparator = withRegistryProvider(
  ContextMenuSeparatorDefault,
  ContextMenuSeparatorNewYork
);
export const ContextMenuShortcut = withRegistryProvider(
  ContextMenuShortcutDefault,
  ContextMenuShortcutNewYork
);
export const ContextMenuSub = withRegistryProvider(ContextMenuSubDefault, ContextMenuSubNewYork);
export const ContextMenuSubContent = withRegistryProvider(
  ContextMenuSubContentDefault,
  ContextMenuSubContentNewYork
);
export const ContextMenuSubTrigger = withRegistryProvider(
  ContextMenuSubTriggerDefault,
  ContextMenuSubTriggerNewYork
);
export const ContextMenuTrigger = withRegistryProvider(
  ContextMenuTriggerDefault,
  ContextMenuTriggerNewYork
);
