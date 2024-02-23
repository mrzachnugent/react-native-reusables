import { Platform } from 'react-native';
import * as ContextMenuNative from './context-menu-native';
import * as ContextMenuWeb from './context-menu-web';

export const Root = Platform.select({
  web: ContextMenuWeb.Root,
  default: ContextMenuNative.Root,
});

export const Trigger = Platform.select({
  web: ContextMenuWeb.Trigger,
  default: ContextMenuNative.Trigger,
});

export const Portal = Platform.select({
  web: ContextMenuWeb.Portal,
  default: ContextMenuNative.Portal,
});

export const Overlay = Platform.select({
  web: ContextMenuWeb.Overlay,
  default: ContextMenuNative.Overlay,
});

export const Content = Platform.select({
  web: ContextMenuWeb.Content,
  default: ContextMenuNative.Content,
});

export const Item = Platform.select({
  web: ContextMenuWeb.Item,
  default: ContextMenuNative.Item,
});

export const Group = Platform.select({
  web: ContextMenuWeb.Group,
  default: ContextMenuNative.Group,
});

export const Label = Platform.select({
  web: ContextMenuWeb.Label,
  default: ContextMenuNative.Label,
});

export const CheckboxItem = Platform.select({
  web: ContextMenuWeb.CheckboxItem,
  default: ContextMenuNative.CheckboxItem,
});

export const RadioGroup = Platform.select({
  web: ContextMenuWeb.RadioGroup,
  default: ContextMenuNative.RadioGroup,
});

export const RadioItem = Platform.select({
  web: ContextMenuWeb.RadioItem,
  default: ContextMenuNative.RadioItem,
});

export const ItemIndicator = Platform.select({
  web: ContextMenuWeb.ItemIndicator,
  default: ContextMenuNative.ItemIndicator,
});

export const Separator = Platform.select({
  web: ContextMenuWeb.Separator,
  default: ContextMenuNative.Separator,
});

export const Sub = Platform.select({
  web: ContextMenuWeb.Sub,
  default: ContextMenuNative.Sub,
});

export const SubTrigger = Platform.select({
  web: ContextMenuWeb.SubTrigger,
  default: ContextMenuNative.SubTrigger,
});

export const SubContent = Platform.select({
  web: ContextMenuWeb.SubContent,
  default: ContextMenuNative.SubContent,
});

export const useRootContext = Platform.select({
  web: ContextMenuWeb.useContextMenuContext,
  default: ContextMenuNative.useContextMenuContext,
});

export const useSubContext = Platform.select({
  web: ContextMenuWeb.useSubContext,
  default: ContextMenuNative.useSubContext,
});
