import * as React from 'react';
import { View } from 'react-native';
import { CheckboxPreview } from '@/examples/checkbox';

export default function CheckboxScreen() {
  return (
    <View className='flex-1 justify-center items-center p-8'>
      <CheckboxPreview />
    </View>
  );
}
