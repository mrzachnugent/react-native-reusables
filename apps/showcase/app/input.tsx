import { InputPreview } from '@showcase/components/styles/examples';
import * as React from 'react';
import { View } from 'react-native';

export default function InputScreen() {
  return (
    <View className='flex-1 justify-center items-center p-6'>
      <InputPreview />
    </View>
  );
}
