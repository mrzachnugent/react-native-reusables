import { LabelPreview } from '@/new-york/examples/label';
import * as React from 'react';
import { View } from 'react-native';

export default function LabelScreen() {
  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <LabelPreview />
    </View>
  );
}
