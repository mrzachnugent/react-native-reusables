'use client';

import { withRegistryProvider } from '@/registry/registry-provider';

import {
  AlertDialogAction as AlertDialogActionNewYork,
  AlertDialogCancel as AlertDialogCancelNewYork,
  AlertDialogContent as AlertDialogContentNewYork,
  AlertDialogDescription as AlertDialogDescriptionNewYork,
  AlertDialogFooter as AlertDialogFooterNewYork,
  AlertDialogHeader as AlertDialogHeaderNewYork,
  AlertDialog as AlertDialogNewYork,
  AlertDialogOverlay as AlertDialogOverlayNewYork,
  AlertDialogPortal as AlertDialogPortalNewYork,
  AlertDialogTitle as AlertDialogTitleNewYork,
  AlertDialogTrigger as AlertDialogTriggerNewYork,
} from '@/registry/new-york/components/ui/alert-dialog';

import {
  AlertDialogAction as AlertDialogActionDefault,
  AlertDialogCancel as AlertDialogCancelDefault,
  AlertDialogContent as AlertDialogContentDefault,
  AlertDialog as AlertDialogDefault,
  AlertDialogDescription as AlertDialogDescriptionDefault,
  AlertDialogFooter as AlertDialogFooterDefault,
  AlertDialogHeader as AlertDialogHeaderDefault,
  AlertDialogOverlay as AlertDialogOverlayDefault,
  AlertDialogPortal as AlertDialogPortalDefault,
  AlertDialogTitle as AlertDialogTitleDefault,
  AlertDialogTrigger as AlertDialogTriggerDefault,
} from '@/registry/default/components/ui/alert-dialog';

export const AlertDialog = withRegistryProvider(AlertDialogDefault, AlertDialogNewYork);
export const AlertDialogAction = withRegistryProvider(
  AlertDialogActionDefault,
  AlertDialogActionNewYork
);
export const AlertDialogCancel = withRegistryProvider(
  AlertDialogCancelDefault,
  AlertDialogCancelNewYork
);
export const AlertDialogContent = withRegistryProvider(
  AlertDialogContentDefault,
  AlertDialogContentNewYork
);
export const AlertDialogDescription = withRegistryProvider(
  AlertDialogDescriptionDefault,
  AlertDialogDescriptionNewYork
);
export const AlertDialogFooter = withRegistryProvider(
  AlertDialogFooterDefault,
  AlertDialogFooterNewYork
);
export const AlertDialogHeader = withRegistryProvider(
  AlertDialogHeaderDefault,
  AlertDialogHeaderNewYork
);
export const AlertDialogOverlay = withRegistryProvider(
  AlertDialogOverlayDefault,
  AlertDialogOverlayNewYork
);
export const AlertDialogPortal = withRegistryProvider(
  AlertDialogPortalDefault,
  AlertDialogPortalNewYork
);
export const AlertDialogTitle = withRegistryProvider(
  AlertDialogTitleDefault,
  AlertDialogTitleNewYork
);
export const AlertDialogTrigger = withRegistryProvider(
  AlertDialogTriggerDefault,
  AlertDialogTriggerNewYork
);
