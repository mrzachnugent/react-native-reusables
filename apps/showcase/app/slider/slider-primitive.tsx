import * as React from 'react';
import { Pressable, View, Text, Platform } from 'react-native';
import * as Slider from '@rnr/slider';
import { cn } from '~/lib/utils';

export default function SliderScreen() {
  const [value, setValue] = React.useState(50);

  return (
    <>
      <View className='flex-1 justify-center items-center p-6 gap-12'>
        <Pressable
          onPress={() => {
            setValue(Math.floor(Math.random() * 100));
          }}
        >
          <Text className='text-5xl text-center text-foreground'>{Math.round(value)}</Text>
        </Pressable>
        <Slider.Root
          value={value}
          onValueChange={(vals) => {
            const nextValue = vals[0];
            if (typeof nextValue !== 'number') return;
            setValue(nextValue);
          }}
          className='w-full justify-center'
        >
          <Slider.Track className='h-4 bg-secondary rounded-full border border-border'>
            <Slider.Range
              style={{ width: `${value}%` }}
              className='bg-primary h-full rounded-full'
            />
            <Slider.Thumb
              style={{ left: `${value}%` }}
              className={cn(
                'h-10 w-10 bg-primary absolute -translate-y-3 -translate-x-1/2  rounded-full'
              )}
            />
          </Slider.Track>
        </Slider.Root>

        {Platform.OS !== 'web' && (
          <View>
            <Text className='text-xl text-center text-foreground pb-2'>
              You will have to implement the gesture handling
            </Text>
            <Text className='text-center text-sm text-foreground'>
              Press the number to change the slider's value
            </Text>
          </View>
        )}
      </View>
    </>
  );
}
