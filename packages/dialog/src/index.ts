import { Platform } from 'react-native';
import * as AlertDialogWeb from './dialog-web';
import * as AlertDialogNative from './dialog-native';

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

export const Close = Platform.select({
  web: AlertDialogWeb.Close,
  default: AlertDialogNative.Close,
});

export const useContext = Platform.select({
  web: AlertDialogWeb.useDialogContext,
  default: AlertDialogNative.useDialogContext,
});
