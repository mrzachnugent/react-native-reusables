import * as React from 'react';
import { View } from 'react-native';
import { Alert, AlertDescription, AlertTitle } from '~/components/old-ui/alert';
import { Label } from '~/components/old-ui/label';

export default function LabelScreen() {
  return (
    <View className='flex-1 justify-between items-center p-6'>
      <View style={{ height: 105 }} className='w-full opacity-0' />
      <Label>This is a label</Label>
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
