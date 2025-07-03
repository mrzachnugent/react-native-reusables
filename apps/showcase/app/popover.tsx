import { PopoverPreview } from '@/new-york/examples/popover';
import * as React from 'react';
import { View } from 'react-native';

export default function PopoverScreen() {
  return (
    <View className='flex-1 justify-center items-center p-6'>
      <PopoverPreview />
    </View>
  );
}
