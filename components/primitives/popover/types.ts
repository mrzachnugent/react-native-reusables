import type { ForceMountable } from '~/components/primitives/types';

interface PopoverRootProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

interface PopoverPortalProps extends ForceMountable {
  children: React.ReactNode;
  /**
   * Platform: NATIVE ONLY
   */
  hostName?: string;
  /**
   * Platform: WEB ONLY
   */
  container?: HTMLElement | null | undefined;
}

interface PopoverOverlayProps extends ForceMountable {
  closeOnPress?: boolean;
}

export type { PopoverRootProps, PopoverPortalProps, PopoverOverlayProps };
