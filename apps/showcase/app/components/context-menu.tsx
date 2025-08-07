import { ContextMenuPreview } from '@/registry/examples/context-menu';
import * as React from 'react';
import { View } from 'react-native';

export default function ContextScreen() {
  return (
    <View className="flex-1 items-center gap-12 p-6">
      <ContextMenuPreview />
    </View>
  );
}
