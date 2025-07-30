'use client';

import { withRegistryProvider } from '@/registry/registry-provider';

import { Icon as IconNewYork } from '@/registry/new-york/components/ui/icon';

import { Icon as IconDefault } from '@/registry/default/components/ui/icon';

export const Icon = withRegistryProvider(IconDefault, IconNewYork);
