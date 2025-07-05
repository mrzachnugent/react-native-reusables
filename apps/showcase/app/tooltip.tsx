import { TooltipPreview } from '@/registry/default/examples/tooltip';
import * as React from 'react';
import { View } from 'react-native';

export default function TooltipScreen() {
  return (
    <View className='flex-1 justify-center items-center p-6'>
      <TooltipPreview />
    </View>
  );
}
