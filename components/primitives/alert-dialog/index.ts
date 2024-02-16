import { Platform } from 'react-native';
import * as AlertDialogWeb from './alert-dialog-web';
import * as AlertDialogNative from './alert-dialog-native';

export const Root = Platform.select({
  web: AlertDialogWeb.Root,
  default: AlertDialogNative.Root,
});

export const Trigger = Platform.select({
  web: AlertDialogWeb.Trigger,
  default: AlertDialogNative.Trigger,
});

export const Portal = Platform.select({
  web: AlertDialogWeb.Portal,
  default: AlertDialogNative.Portal,
});

export const Overlay = Platform.select({
  web: AlertDialogWeb.Overlay,
  default: AlertDialogNative.Overlay,
});

export const Content = Platform.select({
  web: AlertDialogWeb.Content,
  default: AlertDialogNative.Content,
});

export const Title = Platform.select({
  web: AlertDialogWeb.Title,
  default: AlertDialogNative.Title,
});

export const Description = Platform.select({
  web: AlertDialogWeb.Description,
  default: AlertDialogNative.Description,
});

export const Cancel = Platform.select({
  web: AlertDialogWeb.Cancel,
  default: AlertDialogNative.Cancel,
});

export const Action = Platform.select({
  web: AlertDialogWeb.Action,
  default: AlertDialogNative.Action,
});

export const useContext = Platform.select({
  web: AlertDialogWeb.useAlertDialogContext,
  default: AlertDialogNative.useAlertDialogContext,
});
