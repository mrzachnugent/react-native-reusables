'use client';

import { withRegistryProvider } from '@/registry/registry-provider';

import {
  TabsContent as TabsContentNewYork,
  TabsList as TabsListNewYork,
  Tabs as TabsNewYork,
  TabsTrigger as TabsTriggerNewYork,
} from '@/registry/new-york/components/ui/tabs';

import {
  TabsContent as TabsContentDefault,
  Tabs as TabsDefault,
  TabsList as TabsListDefault,
  TabsTrigger as TabsTriggerDefault,
} from '@/registry/default/components/ui/tabs';

export const Tabs = withRegistryProvider(TabsDefault, TabsNewYork);
export const TabsContent = withRegistryProvider(TabsContentDefault, TabsContentNewYork);
export const TabsList = withRegistryProvider(TabsListDefault, TabsListNewYork);
export const TabsTrigger = withRegistryProvider(TabsTriggerDefault, TabsTriggerNewYork);
