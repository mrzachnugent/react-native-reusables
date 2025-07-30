'use client';

import { withRegistryProvider } from '@/registry/registry-provider';

import { Checkbox as CheckboxNewYork } from '@/registry/new-york/components/ui/checkbox';

import { Checkbox as CheckboxDefault } from '@/registry/default/components/ui/checkbox';

export const Checkbox = withRegistryProvider(CheckboxDefault, CheckboxNewYork);
