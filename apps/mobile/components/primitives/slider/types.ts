interface SliderRootProps {
  value: number;
  disabled?: boolean;
  min?: number;
  max?: number;
  /**
   * Platform: WEB ONLY
   */
  dir?: 'ltr' | 'rtl';
  /**
   * Platform: WEB ONLY
   */
  inverted?: boolean;
  /**
   * Platform: WEB ONLY
   */
  step?: number;
  /**
   * Platform: WEB ONLY
   */
  onValueChange?: (value: number[]) => void;
}

export type { SliderRootProps };
