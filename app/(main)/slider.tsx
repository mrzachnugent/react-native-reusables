import React from 'react';
import { Text, View } from 'react-native';
import { Slider } from '~/components/ui/slider';

export default function SliderScreen() {
  const [value, setValue] = React.useState(0.5);

  return (
    <View className='flex-1 justify-center p-6 gap-5'>
      <Text
        nativeID='sliderLabel'
        className='text-5xl text-center text-foreground'
      >
        {Math.round(value * 100)}
      </Text>
      <Slider
        value={value}
        onValueChange={setValue}
        aria-labelledby='sliderLabel'
      />
    </View>
  );
}
