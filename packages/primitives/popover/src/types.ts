import type { ForceMountable, PressableRef } from '@rnr/types';

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

interface PopoverTriggerRef extends PressableRef {
  open: () => void;
  close: () => void;
}

export type { PopoverOverlayProps, PopoverPortalProps, PopoverTriggerRef };
