interface CollapsibleRootProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  disabled?: boolean;
}

interface CollapsibleContentProps {
  forceMount?: true | undefined;
}

export type { CollapsibleContentProps, CollapsibleRootProps };
