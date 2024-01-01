import React from 'react';
import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Button } from '~/components/ui/button';
import { Progress } from '~/components/ui/progress';

export default function ProgressScreen() {
  const progress = useSharedValue(0);
  return (
    <View className='flex-1 justify-between items-center p-6'>
      <View style={{ height: 105 }} className='w-full opacity-0' />
      <View className='w-full gap-8'>
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
      <View className='py-4 w-full'>
        <Alert icon='Code' className='max-w-xl'>
          <AlertTitle>FYI</AlertTitle>
          <AlertDescription>
            This reusable does not use "rn-primitives"
          </AlertDescription>
        </Alert>
      </View>
    </View>
  );
}
