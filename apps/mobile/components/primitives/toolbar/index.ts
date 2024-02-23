import { Platform } from 'react-native';

import * as ToolbarNative from './toolbar-native';
import * as ToolbarWeb from './toolbar-web';

export const Root = Platform.select({
  web: ToolbarWeb.Root,
  default: ToolbarNative.Root,
});

export const Button = Platform.select({
  web: ToolbarWeb.Button,
  default: ToolbarNative.Button,
});
export const Link = Platform.select({
  web: ToolbarWeb.Link,
  default: ToolbarNative.Link,
});
export const Separator = Platform.select({
  web: ToolbarWeb.Separator,
  default: ToolbarNative.Separator,
});
export const ToggleGroup = Platform.select({
  web: ToolbarWeb.ToggleGroup,
  default: ToolbarNative.ToggleGroup,
});
export const ToggleItem = Platform.select({
  web: ToolbarWeb.ToggleItem,
  default: ToolbarNative.ToggleItem,
});
