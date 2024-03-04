import type { ForceMountable } from '@rnr/types';

interface HoverCardRootProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  /**
   * Platform: WEB ONLY
   * @default 700
   */
  openDelay?: number;
  /**
   * Platform: WEB ONLY
   * @default 300
   */
  closeDelay?: number;
}

interface HoverCardPortalProps extends ForceMountable {
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

interface HoverCardOverlayProps extends ForceMountable {
  closeOnPress?: boolean;
}

export type { HoverCardRootProps, HoverCardOverlayProps, HoverCardPortalProps };
