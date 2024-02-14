import RNCSlider from '@react-native-community/slider';
import { useColorScheme } from '~/lib/useColorScheme';
import React from 'react';
import { NAV_THEME } from '~/lib/constants';
/**
 * @docs https://github.com/callstack/react-native-slider?tab=readme-ov-file#-react-native-communityslider-
 */

function Slider(props: React.ComponentProps<typeof RNCSlider>) {
  const { colorScheme } = useColorScheme();
  const {
    minimumValue = 0,
    maximumValue = 1,
    minimumTrackTintColor = NAV_THEME[colorScheme ?? 'light'].text,
    maximumTrackTintColor = NAV_THEME[colorScheme ?? 'light'].border,
    thumbTintColor = NAV_THEME[colorScheme ?? 'light'].text,
  } = props;
  return (
    <RNCSlider
      role='slider'
      minimumValue={minimumValue}
      maximumValue={maximumValue}
      minimumTrackTintColor={minimumTrackTintColor}
      maximumTrackTintColor={maximumTrackTintColor}
      thumbTintColor={thumbTintColor}
      {...props}
    />
  );
}

export { Slider };
