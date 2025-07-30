'use client';

import { withRegistryProvider } from '@/registry/registry-provider';

import {
  AvatarFallback as AvatarFallbackNewYork,
  AvatarImage as AvatarImageNewYork,
  Avatar as AvatarNewYork,
} from '@/registry/new-york/components/ui/avatar';

import {
  Avatar as AvatarDefault,
  AvatarFallback as AvatarFallbackDefault,
  AvatarImage as AvatarImageDefault,
} from '@/registry/default/components/ui/avatar';

export const Avatar = withRegistryProvider(AvatarDefault, AvatarNewYork);
export const AvatarFallback = withRegistryProvider(AvatarFallbackDefault, AvatarFallbackNewYork);
export const AvatarImage = withRegistryProvider(AvatarImageDefault, AvatarImageNewYork);
