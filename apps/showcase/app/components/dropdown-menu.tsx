import { DropdownMenuPreview } from '@/registry/examples/dropdown-menu';
import * as React from 'react';
import { View } from 'react-native';

export default function DropdownMenuScreen() {
  return (
    <View className="flex-1 items-center gap-12 p-6">
      <DropdownMenuPreview />
    </View>
  );
}
