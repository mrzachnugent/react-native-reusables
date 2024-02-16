import * as React from 'react';
import { View } from 'react-native';
import { Alert, AlertDescription, AlertTitle } from '~/components/old-ui/alert';
import { RadioGroup, RadioGroupItem } from '~/components/old-ui/radio-group';

export default function RadioGroupScreen() {
  return (
    <View className='flex-1 justify-between items-center p-6'>
      <View style={{ height: 105 }} className='w-full opacity-0' />
      <RadioGroup defaultValue='white'>
        <RadioGroupItem name='white'>Mr. White</RadioGroupItem>
        <RadioGroupItem name='blue'>Mr. Blue</RadioGroupItem>
        <RadioGroupItem name='pink'>Mr. Pink</RadioGroupItem>
      </RadioGroup>
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
