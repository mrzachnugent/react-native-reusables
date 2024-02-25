import RNCSlider from '@react-native-community/slider';
import { useTheme } from '@react-navigation/native';
import * as React from 'react';

/**
 * @docs https://github.com/callstack/react-native-slider?tab=readme-ov-file#-react-native-communityslider-
 */
function Slider(props: React.ComponentProps<typeof RNCSlider>) {
  const { colors } = useTheme();
  const {
    minimumValue = 0,
    maximumValue = 1,
    minimumTrackTintColor = colors.text,
    maximumTrackTintColor = colors.border,
    thumbTintColor = colors.text,
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
