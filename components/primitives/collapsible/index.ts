import { Platform } from 'react-native';
import * as CollapsibleWeb from './collapsible-web';
import * as CollapsibleNative from './collapsible-native';

export const Root = Platform.select({
  web: CollapsibleWeb.Root,
  default: CollapsibleNative.Root,
});

export const Trigger = Platform.select({
  web: CollapsibleWeb.Trigger,
  default: CollapsibleNative.Trigger,
});

export const Content = Platform.select({
  web: CollapsibleWeb.Content,
  default: CollapsibleNative.Content,
});
