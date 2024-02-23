import * as CheckboxWeb from './checkbox-web';
import * as CheckboxNative from './checkbox-native';
import { Platform } from 'react-native';

export const Root = Platform.select({
  web: CheckboxWeb.Root,
  default: CheckboxNative.Root,
});

export const Indicator = Platform.select({
  web: CheckboxWeb.Indicator,
  default: CheckboxNative.Indicator,
});
