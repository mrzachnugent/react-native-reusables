type AlertDialogRootProps = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
};

type AlertDialogContext = AlertDialogRootProps & {
  nativeID: string;
};

type TriggerProps = {};
type PortalProps = { forceMount?: true | undefined };
type OverlayProps = { forceMount?: true | undefined };
type ContentProps = { forceMount?: true | undefined };

export type {
  AlertDialogContext,
  AlertDialogRootProps,
  TriggerProps,
  PortalProps,
  OverlayProps,
  ContentProps,
};
