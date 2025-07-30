'use client';

import { withRegistryProvider } from '@/registry/registry-provider';

import { Progress as ProgressNewYork } from '@/registry/new-york/components/ui/progress';

import { Progress as ProgressDefault } from '@/registry/default/components/ui/progress';

export const Progress = withRegistryProvider(ProgressDefault, ProgressNewYork);
