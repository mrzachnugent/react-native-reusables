import React from 'react';
import { View, Text } from 'react-native';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Slider } from '~/components/ui/slider';

export default function SliderScreen() {
  const [value, setValue] = React.useState(0.5);
  return (
    <>
      <View className='p-6 w-full'>
        <Alert icon='Code' className='max-w-xl'>
          <AlertTitle>FYI</AlertTitle>
          <AlertDescription>
            This reusable does not use "rn-primitives"
          </AlertDescription>
        </Alert>
      </View>
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
    </>
  );
}
