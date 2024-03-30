import type { ForceMountable } from '@rnr/types';

interface RootContext {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  openDelay?: number;
  closeDelay?: number;
}

interface HoverCardRootProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (value: boolean) => void;
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

export type { HoverCardRootProps, HoverCardOverlayProps, HoverCardPortalProps, RootContext };
