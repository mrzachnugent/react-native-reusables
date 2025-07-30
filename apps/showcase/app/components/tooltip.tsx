import { TooltipPreview } from '@/registry/examples/tooltip';
import * as React from 'react';
import { View } from 'react-native';

export default function TooltipScreen() {
  return (
    <View className="flex-1 items-center justify-center p-6">
      <TooltipPreview />
    </View>
  );
}
