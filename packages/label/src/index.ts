import * as LabelWeb from './label-web';
import * as LabelNative from './label-native';
import { Platform } from 'react-native';

export const Root = Platform.select({
  web: LabelWeb.Root,
  default: LabelNative.Root,
});

export const Text = Platform.select({
  web: LabelWeb.Text,
  default: LabelNative.Text,
});
