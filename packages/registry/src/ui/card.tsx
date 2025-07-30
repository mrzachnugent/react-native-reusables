'use client';

import { withRegistryProvider } from '@/registry/registry-provider';

import {
  CardContent as CardContentNewYork,
  CardDescription as CardDescriptionNewYork,
  CardFooter as CardFooterNewYork,
  CardHeader as CardHeaderNewYork,
  Card as CardNewYork,
  CardTitle as CardTitleNewYork,
} from '@/registry/new-york/components/ui/card';

import {
  CardContent as CardContentDefault,
  Card as CardDefault,
  CardDescription as CardDescriptionDefault,
  CardFooter as CardFooterDefault,
  CardHeader as CardHeaderDefault,
  CardTitle as CardTitleDefault,
} from '@/registry/default/components/ui/card';

export const Card = withRegistryProvider(CardDefault, CardNewYork);
export const CardContent = withRegistryProvider(CardContentDefault, CardContentNewYork);
export const CardDescription = withRegistryProvider(CardDescriptionDefault, CardDescriptionNewYork);
export const CardFooter = withRegistryProvider(CardFooterDefault, CardFooterNewYork);
export const CardHeader = withRegistryProvider(CardHeaderDefault, CardHeaderNewYork);
export const CardTitle = withRegistryProvider(CardTitleDefault, CardTitleNewYork);
