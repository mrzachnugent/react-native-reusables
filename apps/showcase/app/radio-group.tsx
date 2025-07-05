import { RadioGroupPreview } from '@/registry/new-york/examples';
import * as React from 'react';
import { View } from 'react-native';

export default function RadioGroupScreen() {
  return (
    <View className='flex-1 justify-center items-center p-6'>
      <RadioGroupPreview />
    </View>
  );
}
