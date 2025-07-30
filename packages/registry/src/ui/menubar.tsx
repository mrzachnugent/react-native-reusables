'use client';

import { withRegistryProvider } from '@/registry/registry-provider';

import {
  MenubarCheckboxItem as MenubarCheckboxItemNewYork,
  MenubarContent as MenubarContentNewYork,
  MenubarGroup as MenubarGroupNewYork,
  MenubarItem as MenubarItemNewYork,
  MenubarLabel as MenubarLabelNewYork,
  MenubarMenu as MenubarMenuNewYork,
  Menubar as MenubarNewYork,
  MenubarPortal as MenubarPortalNewYork,
  MenubarRadioGroup as MenubarRadioGroupNewYork,
  MenubarRadioItem as MenubarRadioItemNewYork,
  MenubarSeparator as MenubarSeparatorNewYork,
  MenubarShortcut as MenubarShortcutNewYork,
  MenubarSubContent as MenubarSubContentNewYork,
  MenubarSub as MenubarSubNewYork,
  MenubarSubTrigger as MenubarSubTriggerNewYork,
  MenubarTrigger as MenubarTriggerNewYork,
} from '@/registry/new-york/components/ui/menubar';

import {
  MenubarCheckboxItem as MenubarCheckboxItemDefault,
  MenubarContent as MenubarContentDefault,
  Menubar as MenubarDefault,
  MenubarGroup as MenubarGroupDefault,
  MenubarItem as MenubarItemDefault,
  MenubarLabel as MenubarLabelDefault,
  MenubarMenu as MenubarMenuDefault,
  MenubarPortal as MenubarPortalDefault,
  MenubarRadioGroup as MenubarRadioGroupDefault,
  MenubarRadioItem as MenubarRadioItemDefault,
  MenubarSeparator as MenubarSeparatorDefault,
  MenubarShortcut as MenubarShortcutDefault,
  MenubarSubContent as MenubarSubContentDefault,
  MenubarSub as MenubarSubDefault,
  MenubarSubTrigger as MenubarSubTriggerDefault,
  MenubarTrigger as MenubarTriggerDefault,
} from '@/registry/default/components/ui/menubar';

export const Menubar = withRegistryProvider(MenubarDefault, MenubarNewYork);
export const MenubarCheckboxItem = withRegistryProvider(
  MenubarCheckboxItemDefault,
  MenubarCheckboxItemNewYork
);
export const MenubarContent = withRegistryProvider(MenubarContentDefault, MenubarContentNewYork);
export const MenubarGroup = withRegistryProvider(MenubarGroupDefault, MenubarGroupNewYork);
export const MenubarItem = withRegistryProvider(MenubarItemDefault, MenubarItemNewYork);
export const MenubarLabel = withRegistryProvider(MenubarLabelDefault, MenubarLabelNewYork);
export const MenubarMenu = withRegistryProvider(MenubarMenuDefault, MenubarMenuNewYork);
export const MenubarPortal = withRegistryProvider(MenubarPortalDefault, MenubarPortalNewYork);
export const MenubarRadioGroup = withRegistryProvider(
  MenubarRadioGroupDefault,
  MenubarRadioGroupNewYork
);
export const MenubarRadioItem = withRegistryProvider(
  MenubarRadioItemDefault,
  MenubarRadioItemNewYork
);
export const MenubarSeparator = withRegistryProvider(
  MenubarSeparatorDefault,
  MenubarSeparatorNewYork
);
export const MenubarShortcut = withRegistryProvider(MenubarShortcutDefault, MenubarShortcutNewYork);
export const MenubarSub = withRegistryProvider(MenubarSubDefault, MenubarSubNewYork);
export const MenubarSubContent = withRegistryProvider(
  MenubarSubContentDefault,
  MenubarSubContentNewYork
);
export const MenubarSubTrigger = withRegistryProvider(
  MenubarSubTriggerDefault,
  MenubarSubTriggerNewYork
);
export const MenubarTrigger = withRegistryProvider(MenubarTriggerDefault, MenubarTriggerNewYork);
