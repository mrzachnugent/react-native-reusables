'use client';

import { withRegistryProvider } from '@/registry/registry-provider';

import { Separator as SeparatorNewYork } from '@/registry/new-york/components/ui/separator';

import { Separator as SeparatorDefault } from '@/registry/default/components/ui/separator';

export const Separator = withRegistryProvider(SeparatorDefault, SeparatorNewYork);
