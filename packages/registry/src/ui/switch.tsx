'use client';

import { withRegistryProvider } from '@/registry/registry-provider';

import { Switch as SwitchNewYork } from '@/registry/new-york/components/ui/switch';

import { Switch as SwitchDefault } from '@/registry/default/components/ui/switch';

export const Switch = withRegistryProvider(SwitchDefault, SwitchNewYork);
