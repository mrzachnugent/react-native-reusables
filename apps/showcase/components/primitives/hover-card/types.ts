import type { ForceMountable } from '~/components/primitives/types';

interface HoverCardRootProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
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
