'use client';

import { withRegistryProvider } from '@/registry/registry-provider';

import {
  Badge as BadgeNewYork,
  badgeTextVariants as badgeTextVariantsNewYork,
  badgeVariants as badgeVariantsNewYork,
} from '@/registry/new-york/components/ui/badge';

import {
  Badge as BadgeDefault,
  BadgeProps,
  badgeTextVariants as badgeTextVariantsDefault,
  badgeVariants as badgeVariantsDefault,
} from '@/registry/default/components/ui/badge';

export type { BadgeProps };

export const Badge = withRegistryProvider(BadgeDefault, BadgeNewYork);
export const badgeTextVariants = withRegistryProvider(
  badgeTextVariantsDefault,
  badgeTextVariantsNewYork
);
export const badgeVariants = withRegistryProvider(badgeVariantsDefault, badgeVariantsNewYork);
