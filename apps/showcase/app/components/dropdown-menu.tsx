import { DropdownMenuPreview } from '@showcase/components/styles/examples';
import * as React from 'react';
import { View } from 'react-native';

export default function DropdownMenuScreen() {
  return (
    <View className='flex-1 items-center p-6 gap-12'>
      <DropdownMenuPreview />
    </View>
  );
}
