import { Platform } from 'react-native';
import * as DropdownMenuNative from './dropdown-menu-native';
import * as DropdownWeb from './dropdown-menu-web';

export const Root = Platform.select({
  web: DropdownWeb.Root,
  default: DropdownMenuNative.Root,
});

export const Trigger = Platform.select({
  web: DropdownWeb.Trigger,
  default: DropdownMenuNative.Trigger,
});

export const Portal = Platform.select({
  web: DropdownWeb.Portal,
  default: DropdownMenuNative.Portal,
});

export const Overlay = Platform.select({
  web: DropdownWeb.Overlay,
  default: DropdownMenuNative.Overlay,
});

export const Content = Platform.select({
  web: DropdownWeb.Content,
  default: DropdownMenuNative.Content,
});

export const Item = Platform.select({
  web: DropdownWeb.Item,
  default: DropdownMenuNative.Item,
});

export const Group = Platform.select({
  web: DropdownWeb.Group,
  default: DropdownMenuNative.Group,
});

export const Label = Platform.select({
  web: DropdownWeb.Label,
  default: DropdownMenuNative.Label,
});

export const CheckboxItem = Platform.select({
  web: DropdownWeb.CheckboxItem,
  default: DropdownMenuNative.CheckboxItem,
});

export const RadioGroup = Platform.select({
  web: DropdownWeb.RadioGroup,
  default: DropdownMenuNative.RadioGroup,
});

export const RadioItem = Platform.select({
  web: DropdownWeb.RadioItem,
  default: DropdownMenuNative.RadioItem,
});

export const ItemIndicator = Platform.select({
  web: DropdownWeb.ItemIndicator,
  default: DropdownMenuNative.ItemIndicator,
});

export const Separator = Platform.select({
  web: DropdownWeb.Separator,
  default: DropdownMenuNative.Separator,
});

export const Sub = Platform.select({
  web: DropdownWeb.Sub,
  default: DropdownMenuNative.Sub,
});

export const SubTrigger = Platform.select({
  web: DropdownWeb.SubTrigger,
  default: DropdownMenuNative.SubTrigger,
});

export const SubContent = Platform.select({
  web: DropdownWeb.SubContent,
  default: DropdownMenuNative.SubContent,
});

export const useRootContext = Platform.select({
  web: DropdownWeb.useDropdownMenuContext,
  default: DropdownMenuNative.useDropdownMenuContext,
});

export const useSubContext = Platform.select({
  web: DropdownWeb.useSubContext,
  default: DropdownMenuNative.useSubContext,
});
