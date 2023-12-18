import React from 'react';
import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { Button } from '~/components/ui/button';
import { Progress } from '~/components/ui/progress';

export default function ProgressScreen() {
  const progress = useSharedValue(0);
  return (
    <View className='flex-1 justify-center p-6 gap-6'>
      <Progress progress={progress} />
      <Button
        onPress={() => {
          progress.value = Math.random() * 100;
        }}
        variant='ghost'
      >
        Randomize
      </Button>
    </View>
  );
}
