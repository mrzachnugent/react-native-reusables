import { Platform } from 'react-native';
import * as RadioGroupNative from './radio-group-native';
import * as RadioGroupWeb from './radio-group-web';

export const Root = Platform.select({
  web: RadioGroupWeb.Root,
  default: RadioGroupNative.Root,
});
export const Item = Platform.select({
  web: RadioGroupWeb.Item,
  default: RadioGroupNative.Item,
});

export const Indicator = Platform.select({
  web: RadioGroupWeb.Indicator,
  default: RadioGroupNative.Indicator,
});
