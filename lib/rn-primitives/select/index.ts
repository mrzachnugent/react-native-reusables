export type { Option } from './types';
import { Platform } from 'react-native';

import * as SelectNative from './select-native';
import * as SelectWeb from './select-web';

export const Root = Platform.select({
  web: SelectWeb.Root,
  default: SelectNative.Root,
});

export const Content = Platform.select({
  web: SelectWeb.Content,
  default: SelectNative.Content,
});

export const Group = Platform.select({
  web: SelectWeb.Group,
  default: SelectNative.Group,
});

export const Item = Platform.select({
  web: SelectWeb.Item,
  default: SelectNative.Item,
});

export const ItemIndicator = Platform.select({
  web: SelectWeb.ItemIndicator,
  default: SelectNative.ItemIndicator,
});

export const ItemText = Platform.select({
  web: SelectWeb.ItemText,
  default: SelectNative.ItemText,
});

export const Label = Platform.select({
  web: SelectWeb.Label,
  default: SelectNative.Label,
});

export const Overlay = Platform.select({
  web: SelectWeb.Overlay,
  default: SelectNative.Overlay,
});

export const Portal = Platform.select({
  web: SelectWeb.Portal,
  default: SelectNative.Portal,
});

export const Separator = Platform.select({
  web: SelectWeb.Separator,
  default: SelectNative.Separator,
});

export const Trigger = Platform.select({
  web: SelectWeb.Trigger,
  default: SelectNative.Trigger,
});

export const Value = Platform.select({
  web: SelectWeb.Value,
  default: SelectNative.Value,
});

export const ScrollUpButton = Platform.select({
  web: SelectWeb.ScrollUpButton,
  default: SelectNative.ScrollUpButton as typeof SelectWeb.ScrollUpButton,
});

export const ScrollDownButton = Platform.select({
  web: SelectWeb.ScrollDownButton,
  default: SelectNative.ScrollDownButton as typeof SelectWeb.ScrollDownButton,
});

export const Viewport = Platform.select({
  web: SelectWeb.Viewport,
  default: SelectNative.Viewport as typeof SelectWeb.Viewport,
});

export const useRootContext = Platform.select({
  web: SelectWeb.useSelectContext,
  default: SelectNative.useSelectContext,
});

export const useItemContext = Platform.select({
  web: SelectWeb.useItemContext,
  default: SelectNative.useItemContext,
});
