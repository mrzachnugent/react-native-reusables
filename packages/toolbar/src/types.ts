interface ToolbarRootProps {
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
  loop?: boolean;
}

type SingleToggleGroupProps = {
  type: 'single';
  value: string | undefined;
  onValueChange: (val: string | undefined) => void;
};

type MultipleToggleGroupProps = {
  type: 'multiple';
  value: string[];
  onValueChange: (val: string[]) => void;
};

type ToolbarToggleGroupProps = (
  | SingleToggleGroupProps
  | MultipleToggleGroupProps
) & {
  disabled?: boolean;
};

interface ToolbarToggleItem {
  value: string;
}

export type { ToolbarToggleGroupProps, ToolbarToggleItem, ToolbarRootProps };
