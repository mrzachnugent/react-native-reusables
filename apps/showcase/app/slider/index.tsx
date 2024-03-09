import { DeprecatedUi } from '@rnr/reusables';
import * as React from 'react';
import { Text, View } from 'react-native';
import { Code } from '~/components/Icons';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';

const { Slider } = DeprecatedUi;

export default function SliderScreen() {
  const [value, setValue] = React.useState(0.5);
  return (
    <>
      <View className='p-6 w-full'>
        <Alert icon={Code} className='max-w-xl'>
          <AlertTitle>FYI</AlertTitle>
          <AlertDescription>This reusable does not use "rn-primitives"</AlertDescription>
        </Alert>
      </View>
      <View className='flex-1 justify-center p-6 gap-5'>
        <Text nativeID='sliderLabel' className='text-5xl text-center text-foreground'>
          {Math.round(value * 100)}
        </Text>
        <Slider value={value} onValueChange={setValue} aria-labelledby='sliderLabel' />
      </View>
    </>
  );
}
