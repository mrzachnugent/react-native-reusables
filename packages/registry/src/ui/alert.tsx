'use client';

import { withRegistryProvider } from '@/registry/registry-provider';

import {
  AlertDescription as AlertDescriptionNewYork,
  Alert as AlertNewYork,
  AlertTitle as AlertTitleNewYork,
} from '@/registry/new-york/components/ui/alert';

import {
  Alert as AlertDefault,
  AlertDescription as AlertDescriptionDefault,
  AlertTitle as AlertTitleDefault,
} from '@/registry/default/components/ui/alert';

export const Alert = withRegistryProvider(AlertDefault, AlertNewYork);
export const AlertDescription = withRegistryProvider(
  AlertDescriptionDefault,
  AlertDescriptionNewYork
);
export const AlertTitle = withRegistryProvider(AlertTitleDefault, AlertTitleNewYork);
