'use client';

import { withRegistryProvider } from '@/registry/registry-provider';

import { AspectRatio as AspectRatioNewYork } from '@/registry/new-york/components/ui/aspect-ratio';

import { AspectRatio as AspectRatioDefault } from '@/registry/default/components/ui/aspect-ratio';

export const AspectRatio = withRegistryProvider(AspectRatioDefault, AspectRatioNewYork);
