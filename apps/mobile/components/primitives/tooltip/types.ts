import type { ForceMountable } from '~/components/primitives/types';

interface TooltipRootProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  /**
   * Platform: WEB ONLY
   * @default 700
   */
  delayDuration?: number;
  /**
   * Platform: WEB ONLY
   * @default 300
   */
  skipDelayDuration?: number;
  /**
   * Platform: WEB ONLY
   */
  disableHoverableContent?: boolean;
}

interface TooltipPortalProps extends ForceMountable {
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

interface TooltipOverlayProps extends ForceMountable {
  closeOnPress?: boolean;
}

export type { TooltipRootProps, TooltipPortalProps, TooltipOverlayProps };
