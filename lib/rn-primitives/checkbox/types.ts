interface CheckboxRootProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

interface CheckboxIndicator {
  forceMount?: true | undefined;
}

export type { CheckboxRootProps, CheckboxIndicator };
