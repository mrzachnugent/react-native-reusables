'use client';

import { withRegistryProvider } from '@/registry/registry-provider';

import { Label as LabelNewYork } from '@/registry/new-york/components/ui/label';

import { Label as LabelDefault } from '@/registry/default/components/ui/label';

export const Label = withRegistryProvider(LabelDefault, LabelNewYork);
