import { Platform } from 'react-native';
import * as PopoverWeb from './popover-web';
import * as PopoverNative from './popover-native';

export const Root = Platform.select({
  web: PopoverWeb.Root,
  default: PopoverNative.Root,
});

export const Trigger = Platform.select({
  web: PopoverWeb.Trigger,
  default: PopoverNative.Trigger,
});

export const Portal = Platform.select({
  web: PopoverWeb.Portal,
  default: PopoverNative.Portal,
});

export const Overlay = Platform.select({
  web: PopoverWeb.Overlay,
  default: PopoverNative.Overlay,
});

export const Content = Platform.select({
  web: PopoverWeb.Content,
  default: PopoverNative.Content,
});

export const Close = Platform.select({
  web: PopoverWeb.Close,
  default: PopoverNative.Close,
});

export const useRootContext = Platform.select({
  web: PopoverWeb.usePopoverContext,
  default: PopoverNative.usePopoverContext,
});
