import { Platform } from 'react-native';

import * as SwitchNative from './switch-native';
import * as SwitchWeb from './switch-web';

export const Root = Platform.select({
  web: SwitchWeb.Root,
  default: SwitchNative.Root,
});

export const Thumb = Platform.select({
  web: SwitchWeb.Thumb,
  default: SwitchNative.Thumb,
});
