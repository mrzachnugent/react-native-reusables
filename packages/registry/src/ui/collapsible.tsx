'use client';

import { withRegistryProvider } from '@/registry/registry-provider';

import {
  CollapsibleContent as CollapsibleContentNewYork,
  Collapsible as CollapsibleNewYork,
  CollapsibleTrigger as CollapsibleTriggerNewYork,
} from '@/registry/new-york/components/ui/collapsible';

import {
  CollapsibleContent as CollapsibleContentDefault,
  Collapsible as CollapsibleDefault,
  CollapsibleTrigger as CollapsibleTriggerDefault,
} from '@/registry/default/components/ui/collapsible';

export const Collapsible = withRegistryProvider(CollapsibleDefault, CollapsibleNewYork);
export const CollapsibleContent = withRegistryProvider(
  CollapsibleContentDefault,
  CollapsibleContentNewYork
);
export const CollapsibleTrigger = withRegistryProvider(
  CollapsibleTriggerDefault,
  CollapsibleTriggerNewYork
);
