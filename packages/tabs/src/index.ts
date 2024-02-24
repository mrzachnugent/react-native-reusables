import { Platform } from 'react-native';

import * as TabsNative from './tabs-native';
import * as TabsWeb from './tabs-web';

export const Root = Platform.select({
  web: TabsWeb.Root,
  default: TabsNative.Root,
});

export const List = Platform.select({
  web: TabsWeb.List,
  default: TabsNative.List,
});

export const Trigger = Platform.select({
  web: TabsWeb.Trigger,
  default: TabsNative.Trigger,
});

export const Content = Platform.select({
  web: TabsWeb.Content,
  default: TabsNative.Content,
});

export const useRootContext = Platform.select({
  web: TabsWeb.useTabsContext,
  default: TabsNative.useTabsContext,
});

export const useTriggerContext = Platform.select({
  web: TabsWeb.useTriggerContext,
  default: TabsNative.useTriggerContext,
});
