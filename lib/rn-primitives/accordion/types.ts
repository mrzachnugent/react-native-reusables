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

type AccordionRootProps = AccordionContext;

interface ItemProps {
  value: string;
  disabled?: boolean;
}

type AccordionItemContext = ItemProps & { nativeID: string };
type AccordionItemProps = ItemProps;
type AccordionHeaderProps = {};
type AccordionTriggerProps = {};
type AccordionContentProps = { forceMount?: true | undefined };

export type {
  AccordionContentProps,
  AccordionContext,
  AccordionHeaderProps,
  AccordionItemContext,
  AccordionItemProps,
  AccordionRootProps,
  AccordionTriggerProps,
};
