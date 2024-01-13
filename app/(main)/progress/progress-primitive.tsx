import React from 'react';
import { Pressable, View, Text } from 'react-native';
import * as Progress from '~/lib/rn-primitives/progress';

export default function ProgressPrimitiveScreen() {
  const [progress, setProgress] = React.useState(13);

  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <View className='w-full gap-8'>
        <Progress.Root
          className='rounded-xl h-4 bg-border overflow-hidden relative w-full'
          value={progress}
        >
          <Progress.Indicator
            style={{ width: `${progress}%` }}
            className='h-full bg-foreground'
          />
        </Progress.Root>
        <Pressable
          onPress={() => {
            setProgress(Math.floor(Math.random() * 100));
          }}
        >
          <Text className='text-xl text-foreground text-center'>Randomize</Text>
        </Pressable>
      </View>
    </View>
  );
}
