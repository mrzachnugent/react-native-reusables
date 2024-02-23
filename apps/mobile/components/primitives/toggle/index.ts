import { Platform } from 'react-native';

import * as ToggleNative from './toggle-native';
import * as ToggleWeb from './toggle-web';

export const Root = Platform.select({
  web: ToggleWeb.Root,
  default: ToggleNative.Root,
});
