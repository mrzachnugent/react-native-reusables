interface ToastRootProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  type?: 'foreground' | 'background';
  portalHostName?: string;
}

export type { ToastRootProps };
