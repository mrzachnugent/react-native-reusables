'use client';

import { withRegistryProvider, withRegistryContentContext } from '@/registry/registry-provider';

import {
  TextClassContext as TextClassContextNewYork,
  Text as TextNewYork,
} from '@/registry/new-york/components/ui/text';

import {
  TextClassContext as TextClassContextDefault,
  Text as TextDefault,
} from '@/registry/default/components/ui/text';

export const Text = withRegistryProvider(TextDefault, TextNewYork);
export const TextClassContext = withRegistryContentContext(
  TextClassContextDefault,
  TextClassContextNewYork
);
