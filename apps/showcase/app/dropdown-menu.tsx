import { DropdownMenuPreview } from '@/new-york/examples/dropdown-menu';
import * as React from 'react';
import { View } from 'react-native';

export default function DropdownMenuScreen() {
  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <DropdownMenuPreview />
    </View>
  );
}
