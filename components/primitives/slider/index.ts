import { Platform } from 'react-native';

import * as SliderNative from './slider-native';
import * as SliderWeb from './slider-web';

export const Root = Platform.select({
  web: SliderWeb.Root,
  default: SliderNative.Root,
});

export const Track = Platform.select({
  web: SliderWeb.Track,
  default: SliderNative.Track,
});

export const Range = Platform.select({
  web: SliderWeb.Range,
  default: SliderNative.Range,
});

export const Thumb = Platform.select({
  web: SliderWeb.Thumb,
  default: SliderNative.Thumb,
});
