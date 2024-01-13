import { Platform } from 'react-native';
import * as ProgressNative from './progress-native';
import * as ProgressWeb from './progress-web';

export const Root = Platform.select({
  web: ProgressWeb.Root,
  default: ProgressNative.Root,
});

export const Indicator = Platform.select({
  web: ProgressWeb.Indicator,
  default: ProgressNative.Indicator,
});
