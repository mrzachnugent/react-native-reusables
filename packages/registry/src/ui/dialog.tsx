'use client';

import { withRegistryProvider } from '@/registry/registry-provider';

import {
  DialogClose as DialogCloseNewYork,
  DialogContent as DialogContentNewYork,
  DialogDescription as DialogDescriptionNewYork,
  DialogFooter as DialogFooterNewYork,
  DialogHeader as DialogHeaderNewYork,
  Dialog as DialogNewYork,
  DialogOverlay as DialogOverlayNewYork,
  DialogPortal as DialogPortalNewYork,
  DialogTitle as DialogTitleNewYork,
  DialogTrigger as DialogTriggerNewYork,
} from '@/registry/new-york/components/ui/dialog';

import {
  DialogClose as DialogCloseDefault,
  DialogContent as DialogContentDefault,
  Dialog as DialogDefault,
  DialogDescription as DialogDescriptionDefault,
  DialogFooter as DialogFooterDefault,
  DialogHeader as DialogHeaderDefault,
  DialogOverlay as DialogOverlayDefault,
  DialogPortal as DialogPortalDefault,
  DialogTitle as DialogTitleDefault,
  DialogTrigger as DialogTriggerDefault,
} from '@/registry/default/components/ui/dialog';

export const Dialog = withRegistryProvider(DialogDefault, DialogNewYork);
export const DialogClose = withRegistryProvider(DialogCloseDefault, DialogCloseNewYork);
export const DialogContent = withRegistryProvider(DialogContentDefault, DialogContentNewYork);
export const DialogDescription = withRegistryProvider(
  DialogDescriptionDefault,
  DialogDescriptionNewYork
);
export const DialogFooter = withRegistryProvider(DialogFooterDefault, DialogFooterNewYork);
export const DialogHeader = withRegistryProvider(DialogHeaderDefault, DialogHeaderNewYork);
export const DialogOverlay = withRegistryProvider(DialogOverlayDefault, DialogOverlayNewYork);
export const DialogPortal = withRegistryProvider(DialogPortalDefault, DialogPortalNewYork);
export const DialogTitle = withRegistryProvider(DialogTitleDefault, DialogTitleNewYork);
export const DialogTrigger = withRegistryProvider(DialogTriggerDefault, DialogTriggerNewYork);
