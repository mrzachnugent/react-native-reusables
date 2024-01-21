import { Platform } from 'react-native';
import * as NavigationMenuWeb from './navigation-menu-web';
import * as NavigationMenuNative from './navigation-menu-native';

export const Root = Platform.select({
  web: NavigationMenuWeb.Root,
  default: NavigationMenuNative.Root,
});

export const Trigger = Platform.select({
  web: NavigationMenuWeb.Trigger,
  default: NavigationMenuNative.Trigger,
});

export const Content = Platform.select({
  web: NavigationMenuWeb.Content,
  default: NavigationMenuNative.Content,
});

export const Item = Platform.select({
  web: NavigationMenuWeb.Item,
  default: NavigationMenuNative.Item,
});

export const Link = Platform.select({
  web: NavigationMenuWeb.Link,
  default: NavigationMenuNative.Link,
});

export const List = Platform.select({
  web: NavigationMenuWeb.List,
  default: NavigationMenuNative.List,
});

export const Portal = Platform.select({
  web: NavigationMenuWeb.Portal,
  default: NavigationMenuNative.Portal,
});

export const Viewport = Platform.select({
  web: NavigationMenuWeb.Viewport,
  default: NavigationMenuNative.Viewport,
});

export const Indicator = Platform.select({
  web: NavigationMenuWeb.Indicator,
  default: NavigationMenuNative.Indicator,
});

export const useRootContext = Platform.select({
  web: NavigationMenuWeb.useNavigationMenuContext,
  default: NavigationMenuNative.useNavigationMenuContext,
});

export const useItemContext = Platform.select({
  web: NavigationMenuWeb.useItemContext,
  default: NavigationMenuNative.useItemContext,
});
