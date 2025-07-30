'use client';

import { withRegistryProvider } from '@/registry/registry-provider';

import {
  Button as ButtonNewYork,
  buttonTextVariants as buttonTextVariantsNewYork,
  buttonVariants as buttonVariantsNewYork,
} from '@/registry/new-york/components/ui/button';

import {
  Button as ButtonDefault,
  ButtonProps,
  buttonTextVariants as buttonTextVariantsDefault,
  buttonVariants as buttonVariantsDefault,
} from '@/registry/default/components/ui/button';

export type { ButtonProps };

export const Button = withRegistryProvider(ButtonDefault, ButtonNewYork);
export const buttonTextVariants = withRegistryProvider(
  buttonTextVariantsDefault,
  buttonTextVariantsNewYork
);
export const buttonVariants = withRegistryProvider(buttonVariantsDefault, buttonVariantsNewYork);
