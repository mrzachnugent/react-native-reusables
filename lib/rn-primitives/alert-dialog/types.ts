type AlertDialogRootProps = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
};

type AlertDialogContext = AlertDialogRootProps & {
  nativeID: string;
};

type PortalProps = {
  forceMount?: true | undefined;
  /**
   * Platform: WEB ONLY
   */
  container?: HTMLElement | null | undefined;
};
type OverlayProps = { forceMount?: true | undefined };
type ContentProps = { forceMount?: true | undefined };

export type {
  AlertDialogContext,
  AlertDialogRootProps,
  PortalProps,
  OverlayProps,
  ContentProps,
};
