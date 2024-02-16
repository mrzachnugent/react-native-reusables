import { Bold, Italic } from '~/components/Icons';
import * as React from 'react';
import { View } from 'react-native';
import { Alert, AlertDescription, AlertTitle } from '~/components/old-ui/alert';
import { Toggle } from '~/components/old-ui/toggle';

export default function ToggleScreen() {
  return (
    <View className='flex-1 justify-between items-center p-6'>
      <View style={{ height: 105 }} className='w-full opacity-0' />
      <View className='flex-row gap-3 justify-center items-center'>
        <Toggle aria-label='Toggle Italic'>
          <Italic className='text-foreground' />
        </Toggle>
        <Toggle aria-label='Toggle Bold'>
          <Bold className='text-foreground' />
        </Toggle>
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
