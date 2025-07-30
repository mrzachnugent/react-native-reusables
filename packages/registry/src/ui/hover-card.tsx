'use client';

import { withRegistryProvider } from '@/registry/registry-provider';

import {
  HoverCardContent as HoverCardContentNewYork,
  HoverCard as HoverCardNewYork,
  HoverCardTrigger as HoverCardTriggerNewYork,
} from '@/registry/new-york/components/ui/hover-card';

import {
  HoverCardContent as HoverCardContentDefault,
  HoverCard as HoverCardDefault,
  HoverCardTrigger as HoverCardTriggerDefault,
} from '@/registry/default/components/ui/hover-card';

export const HoverCard = withRegistryProvider(HoverCardDefault, HoverCardNewYork);
export const HoverCardContent = withRegistryProvider(
  HoverCardContentDefault,
  HoverCardContentNewYork
);
export const HoverCardTrigger = withRegistryProvider(
  HoverCardTriggerDefault,
  HoverCardTriggerNewYork
);
