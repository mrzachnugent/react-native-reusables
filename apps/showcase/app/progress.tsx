import { ProgressPreview } from '@/registry/new-york/examples/progress';
import * as React from 'react';
import { View } from 'react-native';

export default function ProgressScreen() {
  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <ProgressPreview />
    </View>
  );
}
