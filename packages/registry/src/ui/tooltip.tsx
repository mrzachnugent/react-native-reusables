'use client';

import { withRegistryProvider } from '@/registry/registry-provider';

import {
  TooltipContent as TooltipContentNewYork,
  Tooltip as TooltipNewYork,
  TooltipTrigger as TooltipTriggerNewYork,
} from '@/registry/new-york/components/ui/tooltip';

import {
  TooltipContent as TooltipContentDefault,
  Tooltip as TooltipDefault,
  TooltipTrigger as TooltipTriggerDefault,
} from '@/registry/default/components/ui/tooltip';

export const Tooltip = withRegistryProvider(TooltipDefault, TooltipNewYork);
export const TooltipContent = withRegistryProvider(TooltipContentDefault, TooltipContentNewYork);
export const TooltipTrigger = withRegistryProvider(TooltipTriggerDefault, TooltipTriggerNewYork);
