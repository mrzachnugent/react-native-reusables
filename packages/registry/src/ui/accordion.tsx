'use client';

import { withRegistryProvider } from '@/registry/registry-provider';

import {
  AccordionContent as AccordionContentNewYork,
  AccordionItem as AccordionItemNewYork,
  Accordion as AccordionNewYork,
  AccordionTrigger as AccordionTriggerNewYork,
} from '@/registry/new-york/components/ui/accordion';

import {
  AccordionContent as AccordionContentDefault,
  Accordion as AccordionDefault,
  AccordionItem as AccordionItemDefault,
  AccordionTrigger as AccordionTriggerDefault,
} from '@/registry/default/components/ui/accordion';

export const Accordion = withRegistryProvider(AccordionDefault, AccordionNewYork);
export const AccordionContent = withRegistryProvider(
  AccordionContentDefault,
  AccordionContentNewYork
);
export const AccordionItem = withRegistryProvider(AccordionItemDefault, AccordionItemNewYork);
export const AccordionTrigger = withRegistryProvider(
  AccordionTriggerDefault,
  AccordionTriggerNewYork
);
