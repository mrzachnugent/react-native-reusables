import { Platform } from 'react-native';
import * as HoverCardNative from './hover-card-native';
import * as HoverCardWeb from './hover-card-web';

export const Root = Platform.select({
  web: HoverCardWeb.Root,
  default: HoverCardNative.Root,
});

export const Trigger = Platform.select({
  web: HoverCardWeb.Trigger,
  default: HoverCardNative.Trigger,
});

export const Portal = Platform.select({
  web: HoverCardWeb.Portal,
  default: HoverCardNative.Portal,
});

export const Overlay = Platform.select({
  web: HoverCardWeb.Overlay,
  default: HoverCardNative.Overlay,
});

export const Content = Platform.select({
  web: HoverCardWeb.Content,
  default: HoverCardNative.Content as typeof HoverCardWeb.Content,
});

export const useRootContext = Platform.select({
  web: HoverCardWeb.useHoverCardContext,
  default: HoverCardNative.useHoverCardContext,
});
