'use client';

import { withRegistryProvider } from '@/registry/registry-provider';

import { Textarea as TextareaNewYork } from '@/registry/new-york/components/ui/textarea';

import { Textarea as TextareaDefault } from '@/registry/default/components/ui/textarea';

export const Textarea = withRegistryProvider(TextareaDefault, TextareaNewYork);
