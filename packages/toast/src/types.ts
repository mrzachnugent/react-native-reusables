interface ToastRootProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  type?: 'foreground' | 'background';
}

export type { ToastRootProps };
