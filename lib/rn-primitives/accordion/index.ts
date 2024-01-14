import { Platform } from 'react-native';
import * as AccordionWeb from './accordion-web';
import * as AccordionNative from './accordion-native';

export const Root = Platform.select({
  web: AccordionWeb.Root,
  default: AccordionNative.Root,
});

export const Item = Platform.select({
  web: AccordionWeb.Item,
  default: AccordionNative.Item,
});

export const Header = Platform.select({
  web: AccordionWeb.Header,
  default: AccordionNative.Header,
});

export const Trigger = Platform.select({
  web: AccordionWeb.Trigger,
  default: AccordionNative.Trigger,
});

export const Content = Platform.select({
  web: AccordionWeb.Content,
  default: AccordionNative.Content,
});

export const useRootContext = Platform.select({
  web: AccordionWeb.useAccordionContext,
  default: AccordionNative.useAccordionContext,
});

export const useItemContext = Platform.select({
  web: AccordionWeb.useAccordionItemContext,
  default: AccordionNative.useAccordionItemContext,
});
