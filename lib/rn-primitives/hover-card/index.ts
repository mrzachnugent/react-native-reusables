import { Platform } from 'react-native';
import * as HoverCardNative from './hover-card-native';
import * as DropdownWeb from './hover-card-web';

export const Root = Platform.select({
  web: DropdownWeb.Root,
  default: HoverCardNative.Root,
});

export const Trigger = Platform.select({
  web: DropdownWeb.Trigger,
  default: HoverCardNative.Trigger,
});

export const Portal = Platform.select({
  web: DropdownWeb.Portal,
  default: HoverCardNative.Portal,
});

export const Overlay = Platform.select({
  web: DropdownWeb.Overlay,
  default: HoverCardNative.Overlay,
});

export const Content = Platform.select({
  web: DropdownWeb.Content,
  default: HoverCardNative.Content,
});
