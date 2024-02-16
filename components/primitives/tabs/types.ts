import type { ForceMountable } from '~/components/primitives/types';

interface TabsRootProps {
  value: string;
  onValueChange: (value: string) => void;
  /**
   * Platform: WEB ONLY
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Platform: WEB ONLY
   */
  dir?: 'ltr' | 'rtl';
  /**
   * Platform: WEB ONLY
   */
  activationMode?: 'automatic' | 'manual';
}

interface TabsContentProps extends ForceMountable {
  value: string;
}

export type { TabsContentProps, TabsRootProps };
