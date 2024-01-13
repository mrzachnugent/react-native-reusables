import { Platform } from 'react-native';
import * as MenubarNative from './menubar-native';
import * as DropdownWeb from './menubar-web';

export const Root = Platform.select({
  web: DropdownWeb.Root,
  default: MenubarNative.Root,
});

export const Trigger = Platform.select({
  web: DropdownWeb.Trigger,
  default: MenubarNative.Trigger,
});

export const Menu = Platform.select({
  web: DropdownWeb.Menu,
  default: MenubarNative.Menu,
});

export const Portal = Platform.select({
  web: DropdownWeb.Portal,
  default: MenubarNative.Portal,
});

export const Overlay = Platform.select({
  web: DropdownWeb.Overlay,
  default: MenubarNative.Overlay,
});

export const Content = Platform.select({
  web: DropdownWeb.Content,
  default: MenubarNative.Content,
});

export const Item = Platform.select({
  web: DropdownWeb.Item,
  default: MenubarNative.Item,
});

export const Group = Platform.select({
  web: DropdownWeb.Group,
  default: MenubarNative.Group,
});

export const Label = Platform.select({
  web: DropdownWeb.Label,
  default: MenubarNative.Label,
});

export const CheckboxItem = Platform.select({
  web: DropdownWeb.CheckboxItem,
  default: MenubarNative.CheckboxItem,
});

export const RadioGroup = Platform.select({
  web: DropdownWeb.RadioGroup,
  default: MenubarNative.RadioGroup,
});

export const RadioItem = Platform.select({
  web: DropdownWeb.RadioItem,
  default: MenubarNative.RadioItem,
});

export const ItemIndicator = Platform.select({
  web: DropdownWeb.ItemIndicator,
  default: MenubarNative.ItemIndicator,
});

export const Separator = Platform.select({
  web: DropdownWeb.Separator,
  default: MenubarNative.Separator,
});

export const Sub = Platform.select({
  web: DropdownWeb.Sub,
  default: MenubarNative.Sub,
});

export const SubTrigger = Platform.select({
  web: DropdownWeb.SubTrigger,
  default: MenubarNative.SubTrigger,
});

export const SubContent = Platform.select({
  web: DropdownWeb.SubContent,
  default: MenubarNative.SubContent,
});
