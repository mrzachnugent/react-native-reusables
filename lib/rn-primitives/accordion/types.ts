import { ForceMountable } from '../types';

type SingleRootProps = {
  type: 'single';
  value: string | undefined;
  onValueChange: (value: string | undefined) => void;
};

type MultipleRootProps = {
  type: 'multiple';
  value: string[];
  onValueChange: (value: string[]) => void;
};

type AccordionContext = (SingleRootProps | MultipleRootProps) & {
  disabled?: boolean;
  collapsable?: boolean;
};

type AccordionRootProps = AccordionContext & {
  /**
   * Platform: WEB ONLY
   */
  dir?: 'ltr' | 'rtl';
  /**
   * Platform: WEB ONLY
   */
  orientation?: 'vertical' | 'horizontal';
};

interface ItemProps {
  value: string;
  disabled?: boolean;
}

type AccordionItemContext = ItemProps & { nativeID: string };
type AccordionItemProps = ItemProps;
type AccordionContentProps = ForceMountable;

export type {
  AccordionContentProps,
  AccordionContext,
  AccordionItemContext,
  AccordionItemProps,
  AccordionRootProps,
};
