'use client';

import { withRegistryProvider } from '@/registry/registry-provider';

import { Input as InputNewYork } from '@/registry/new-york/components/ui/input';

import { Input as InputDefault } from '@/registry/default/components/ui/input';

export const Input = withRegistryProvider(InputDefault, InputNewYork);
