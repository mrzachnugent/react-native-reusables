'use client';

import { withRegistryProvider } from '@/registry/registry-provider';

import { Skeleton as SkeletonNewYork } from '@/registry/new-york/components/ui/skeleton';

import { Skeleton as SkeletonDefault } from '@/registry/default/components/ui/skeleton';

export const Skeleton = withRegistryProvider(SkeletonDefault, SkeletonNewYork);
