import { PopoverPreview } from '@/registry/examples/popover';
import * as React from 'react';
import { View } from 'react-native';

export default function PopoverScreen() {
  return (
    <View className="flex-1 items-center justify-center p-6">
      <PopoverPreview />
    </View>
  );
}
