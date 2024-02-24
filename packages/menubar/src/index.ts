import { Platform } from 'react-native';
import * as MenubarWeb from './menubar-web';
import * as MenubarNative from './menubar-native';

export const Root = Platform.select({
  web: MenubarWeb.Root,
  default: MenubarNative.Root,
});

export const Trigger = Platform.select({
  web: MenubarWeb.Trigger,
  default: MenubarNative.Trigger,
});

export const Menu = Platform.select({
  web: MenubarWeb.Menu,
  default: MenubarNative.Menu,
});

export const Portal = Platform.select({
  web: MenubarWeb.Portal,
  default: MenubarNative.Portal,
});

export const Overlay = Platform.select({
  web: MenubarWeb.Overlay,
  default: MenubarNative.Overlay,
});

export const Content = Platform.select({
  web: MenubarWeb.Content,
  default: MenubarNative.Content,
});

export const Item = Platform.select({
  web: MenubarWeb.Item,
  default: MenubarNative.Item,
});

export const Group = Platform.select({
  web: MenubarWeb.Group,
  default: MenubarNative.Group,
});

export const Label = Platform.select({
  web: MenubarWeb.Label,
  default: MenubarNative.Label,
});

export const CheckboxItem = Platform.select({
  web: MenubarWeb.CheckboxItem,
  default: MenubarNative.CheckboxItem,
});

export const RadioGroup = Platform.select({
  web: MenubarWeb.RadioGroup,
  default: MenubarNative.RadioGroup,
});

export const RadioItem = Platform.select({
  web: MenubarWeb.RadioItem,
  default: MenubarNative.RadioItem,
});

export const ItemIndicator = Platform.select({
  web: MenubarWeb.ItemIndicator,
  default: MenubarNative.ItemIndicator,
});

export const Separator = Platform.select({
  web: MenubarWeb.Separator,
  default: MenubarNative.Separator,
});

export const Sub = Platform.select({
  web: MenubarWeb.Sub,
  default: MenubarNative.Sub,
});

export const SubTrigger = Platform.select({
  web: MenubarWeb.SubTrigger,
  default: MenubarNative.SubTrigger,
});

export const SubContent = Platform.select({
  web: MenubarWeb.SubContent,
  default: MenubarNative.SubContent,
});

export const useRootContext = Platform.select({
  web: MenubarWeb.useMenubarContext,
  default: MenubarNative.useMenubarContext,
});

export const useMenuContext = Platform.select({
  web: MenubarWeb.useMenubarMenuContext,
  default: MenubarNative.useMenuContext,
});
export const useSubContext = Platform.select({
  web: MenubarWeb.useSubContext,
  default: MenubarNative.useSubContext,
});
