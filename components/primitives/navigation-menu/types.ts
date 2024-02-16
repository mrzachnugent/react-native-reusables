import type { ForceMountable } from '~/components/primitives/types';

interface NavigationMenuRootProps {
  value: string | undefined;
  onValueChange: (value: string | undefined) => void;
  /**
   * Platform: WEB ONLY
   */
  delayDuration?: number;
  /**
   * Platform: WEB ONLY
   */
  skipDelayDuration?: number;
  /**
   * Platform: WEB ONLY
   */
  dir?: 'ltr' | 'rtl';
  /**
   * Platform: WEB ONLY
   */
  orientation?: 'horizontal' | 'vertical';
}

interface NavigationMenuItemProps {
  value: string | undefined;
}

interface NavigationMenuPortalProps extends ForceMountable {
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

interface NavigationMenuLinkProps {
  active?: boolean;
}

export type {
  NavigationMenuItemProps,
  NavigationMenuPortalProps,
  NavigationMenuRootProps,
  NavigationMenuLinkProps,
};
