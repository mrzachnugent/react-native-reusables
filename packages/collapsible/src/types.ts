import type { ForceMountable } from '@rnr/types';

interface RootContext {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  disabled: boolean;
}

interface CollapsibleRootProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}

type CollapsibleContentProps = ForceMountable;

export type { CollapsibleContentProps, CollapsibleRootProps, RootContext };
