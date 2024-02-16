import { Platform } from 'react-native';

import * as ToggleGroupNative from './toggle-group-native';
import * as ToggleGroupWeb from './toggle-group-web';
import { ToggleGroupUtils } from '~/components/primitives/utils';

export const Root = Platform.select({
  web: ToggleGroupWeb.Root,
  default: ToggleGroupNative.Root,
});

export const Item = Platform.select({
  web: ToggleGroupWeb.Item,
  default: ToggleGroupNative.Item,
});

export const useRootContext = Platform.select({
  web: ToggleGroupWeb.useToggleGroupContext,
  default: ToggleGroupNative.useToggleGroupContext,
});

export const useItemContext = Platform.select({
  web: ToggleGroupWeb.useItemContext,
  default: ToggleGroupNative.useItemContext,
});

export const utils = ToggleGroupUtils;
