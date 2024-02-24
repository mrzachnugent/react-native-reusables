import { Platform } from 'react-native';
import * as TooltipWeb from './tooltip-web';
import * as TooltipNative from './tooltip-native';

export const Root = Platform.select({
  web: TooltipWeb.Root,
  default: TooltipNative.Root,
});

export const Trigger = Platform.select({
  web: TooltipWeb.Trigger,
  default: TooltipNative.Trigger,
});

export const Portal = Platform.select({
  web: TooltipWeb.Portal,
  default: TooltipNative.Portal,
});

export const Overlay = Platform.select({
  web: TooltipWeb.Overlay,
  default: TooltipNative.Overlay,
});

export const Content = Platform.select({
  web: TooltipWeb.Content,
  default: TooltipNative.Content,
});
