import type { ForceMountable } from '../types';

type AlertDialogRootProps = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
};

type AlertDialogContext = AlertDialogRootProps & {
  nativeID: string;
};

interface PortalProps extends ForceMountable {
  /**
   * Platform: WEB ONLY
   */
  container?: HTMLElement | null | undefined;
}
type OverlayProps = ForceMountable;
type ContentProps = ForceMountable;

export type {
  AlertDialogContext,
  AlertDialogRootProps,
  PortalProps,
  OverlayProps,
  ContentProps,
};
